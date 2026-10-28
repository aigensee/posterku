"use client";

// Mengatur composer, antrean paralel, akses, dan riwayat studio.
import { useCallback, useEffect, useRef, useState } from "react";
import {
  restoreComposer,
  restoreHistory,
  defaults,
  jobRequest,
  read,
  save,
  type Activity,
  type ComposerState,
  type StudioItem,
} from "@/lib/studio";
import type { PosterJob } from "@/lib/styles";

type Status = {
  configured: boolean;
  demo: boolean;
  passcodeRequired: boolean;
  textModel: string;
};
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export function useStudio() {
  const [composer, setComposer] = useState(defaults);
  const [history, setHistory] = useState<StudioItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [needsPasscode, setNeedsPasscode] = useState(false);
  const [ready, setReady] = useState(false);
  const code = useRef("");
  const active = useRef(0);
  const alive = useRef(true);
  const controllers = useRef(new Set<AbortController>());

  const api = useCallback(
    async <T>(
      path: string,
      init: RequestInit = {},
      passcode = code.current,
    ): Promise<T> => {
      const headers = new Headers(init.headers);
      headers.set("x-passcode", passcode);
      if (init.body && !(init.body instanceof FormData))
        headers.set("Content-Type", "application/json");
      const controller = new AbortController();
      controllers.current.add(controller);
      try {
        const response = await fetch(`/api/${path}`, {
          ...init,
          headers,
          signal: AbortSignal.any([
            controller.signal,
            init.signal || AbortSignal.timeout(95000),
          ]),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data) {
          if (data?.error?.code === "passcode") setNeedsPasscode(true);
          throw new ApiError(
            data?.error?.message ||
              "Server belum dapat merespons. Silakan coba lagi.",
            response.status,
          );
        }
        return data;
      } catch (e) {
        if (e instanceof ApiError) throw e;
        throw new ApiError(
          "Koneksi terputus. Periksa internet lalu coba lagi.",
          0,
        );
      } finally {
        controllers.current.delete(controller);
      }
    },
    [],
  );

  const refreshBalance = useCallback(async () => {
    const result = await api<{ available: number | null }>("balance");
    if (alive.current) setBalance(result.available);
  }, [api]);

  useEffect(() => {
    alive.current = true;
    const pendingControllers = controllers.current;
    queueMicrotask(() => {
      code.current = read("posterku.passcode") || "";
      try {
        const stored = JSON.parse(read("posterku.composer") || "null");
        if (stored) setComposer(restoreComposer(stored));
        setHistory(
          restoreHistory(JSON.parse(read("posterku.history") || "[]")),
        );
      } catch {
        /* Abaikan data lokal yang rusak. */
      }
      setReady(true);
      void api<Status>("status")
        .then((s) => {
          if (!alive.current) return;
          setStatus(s);
          setNeedsPasscode(s.passcodeRequired && !code.current);
          if (s.configured && (!s.passcodeRequired || code.current))
            void refreshBalance().catch((e) => setError(e.message));
        })
        .catch((e) => setError(e.message));
    });
    return () => {
      alive.current = false;
      pendingControllers.forEach((controller) => controller.abort());
    };
  }, [api, refreshBalance]);

  useEffect(() => {
    if (ready) save("posterku.composer", composer);
  }, [composer, ready]);
  useEffect(() => {
    if (ready) save("posterku.history", history);
  }, [history, ready]);
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 6000);
    return () => clearTimeout(timer);
  }, [error]);

  async function unlock(passcode: string) {
    const result = await api<{ available: number | null }>(
      "balance",
      {},
      passcode,
    ).catch((e) => {
      setError(e.message);
      throw e;
    });
    code.current = passcode;
    try {
      localStorage.setItem("posterku.passcode", passcode);
    } catch {
      /* Akses tetap berlaku pada sesi ini. */
    }
    setBalance(result.available);
    setNeedsPasscode(false);
    setError("");
  }

  async function create(state = composer) {
    if (active.current >= 3) {
      setError("Tiga karya sedang dibuat. Tunggu salah satunya selesai.");
      return;
    }
    if (!state.prompt.trim()) {
      setError("Tulis ide atau gunakan Prompt otomatis dahulu.");
      return;
    }
    active.current += 1;
    const id = crypto.randomUUID();
    const started = Date.now();
    const update = (patch: Partial<Activity>) =>
      setActivities((items) =>
        items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      );
    setActivities((items) => [
      { id, state, started, status: "queued", credits: 0 },
      ...items,
    ]);
    const fromComposer = state === composer;
    let jobExists = false;
    if (fromComposer)
      setComposer((current) => ({
        ...current,
        prompt: "",
        reference: undefined,
        attached: undefined,
      }));
    try {
      const result = await api<{ job: PosterJob; quotedCredits: number }>(
        "generate",
        { method: "POST", body: JSON.stringify(jobRequest(state)) },
      );
      jobExists = true;
      let job = result.job;
      update({ status: job.status, credits: result.quotedCredits });
      const deadline = started + (state.kind === "video" ? 600000 : 180000);
      let failures = 0;
      while (job.status === "queued" || job.status === "running") {
        await new Promise((resolve) =>
          setTimeout(resolve, state.kind === "video" ? 5000 : 2000),
        );
        if (!alive.current) return;
        if (Date.now() >= deadline)
          throw new Error(
            "Pembuatan melewati batas waktu. Silakan coba lagi nanti.",
          );
        try {
          ({ job } = await api<{ job: PosterJob }>(
            `jobs/${encodeURIComponent(job.id)}`,
            {
              signal: AbortSignal.timeout(
                Math.min(15000, deadline - Date.now()),
              ),
            },
          ));
          failures = 0;
          update({ status: job.status });
        } catch (e) {
          failures += 1;
          if (
            failures > 3 ||
            (e instanceof ApiError && e.status > 0 && e.status < 500)
          )
            throw e;
        }
      }
      if (job.status !== "succeeded" || !job.fileId)
        throw new Error(
          job.error || "Karya gagal dibuat. Coba lagi dengan prompt lain.",
        );
      if (!alive.current) return;
      const item: StudioItem = {
        ...state,
        jobId: job.id,
        fileId: job.fileId,
        credits: job.credits,
        createdAt: new Date(started).toISOString(),
        expiresAt: job.expiresAt,
        mime: job.mime,
      };
      setHistory((items) =>
        [item, ...items]
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .slice(0, 40),
      );
      update({ status: "succeeded", credits: job.credits });
    } catch (e) {
      if (!alive.current) return;
      const message =
        e instanceof Error ? e.message : "Pembuatan gagal. Silakan coba lagi.";
      if (fromComposer && !jobExists)
        setComposer((current) =>
          current.prompt === ""
            ? {
                ...current,
                prompt: state.prompt,
                reference: state.reference,
                attached: state.attached,
              }
            : current,
        );
      update({ status: "failed", error: message });
      setError(message);
    } finally {
      active.current -= 1;
      if (alive.current) void refreshBalance().catch(() => {});
    }
  }

  return {
    composer,
    setComposer,
    history,
    setHistory,
    activities,
    setActivities,
    status,
    balance,
    error,
    setError,
    needsPasscode,
    unlock,
    api,
    create,
    ready,
  };
}

export type Studio = ReturnType<typeof useStudio>;
export type { ComposerState };
