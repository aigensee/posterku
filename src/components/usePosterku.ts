"use client";

// Mengatur alur pembuatan poster, akses, saldo, dan riwayat lokal.
import { useEffect, useRef, useState } from "react";
import { ratios, styles } from "@/lib/styles";
import type {
  CaptionResult,
  HistoryItem,
  PosterJob,
  PosterRequest,
} from "@/lib/styles";

export type Status = {
  configured: boolean;
  demo: boolean;
  passcodeRequired: boolean;
  models: { text: string; image: string; photo: string };
};

export type Step =
  | "idle"
  | "caption"
  | "uploading"
  | "generating"
  | "polling"
  | "done"
  | "error";

const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch { }
};

export async function downscale(file: File): Promise<File> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error("Pilih foto JPG, PNG, atau WebP");
  const bitmap = await createImageBitmap(file);

  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));

    const canvas = document.createElement("canvas");

    canvas.width = Math.round(bitmap.width * scale);

    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Browser tidak mendukung pengolahan foto");

    ctx.fillStyle = "#fff";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) =>
          b ? resolve(b) : reject(new Error("Foto tidak dapat diproses")),
        "image/jpeg",
        0.88,
      ),
    );

    if (blob.size > 4 * 1024 * 1024)
      throw new Error("Foto masih melebihi 4 MB. Pilih foto lebih kecil.");

    return new File([blob], "produk.jpg", { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

function responseMessage(status: number) {
  if (status === 413) return "Foto terlalu besar untuk diunggah. Coba foto lain.";

  if (status === 502 || status === 504) return "Server terlalu lama merespons. Silakan coba lagi.";

  return `Server mengembalikan respons tak terduga (HTTP ${status}).`;
}

export function usePosterku() {
  const [status, setStatus] = useState<Status | null>(null);
  const [passcode, setPasscode] = useState("");
  const [needsPasscode, setNeedsPasscode] = useState(false);
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [result, setResult] = useState<HistoryItem | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const active = useRef(false);
  const alive = useRef(true);
  const photoId = useRef<string | undefined>(undefined);
  const current = useRef<{ form: PosterRequest; caption: CaptionResult } | null>(
    null,
  );
  const busy = ["caption", "uploading", "generating", "polling"].includes(step);

  async function api<T>(
    path: string,
    init: RequestInit = {},
    code = passcode,
  ): Promise<T> {
    const headers = new Headers(init.headers);

    headers.set("x-passcode", code);

    if (init.body && !(init.body instanceof FormData))
      headers.set("Content-Type", "application/json");

    let response: Response;

    try {
      response = await fetch(`/api/${path}`, {
        ...init,
        headers,
        signal: init.signal || AbortSignal.timeout(95000),
      });
    } catch {
      throw new ApiError(
        "Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.",
        0,
      );
    }

    const data = await response.json().catch(() => null);

    if (response.status === 413 || response.status === 502 || response.status === 504) {
      throw new ApiError(responseMessage(response.status), response.status);
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new ApiError(responseMessage(response.status), response.status);
    }

    if (!response.ok) {
      if (data.error?.code === "passcode") setNeedsPasscode(true);

      throw new ApiError(data.error?.message || responseMessage(response.status), response.status);
    }

    return data;
  }

  useEffect(() => {
    alive.current = true;

    queueMicrotask(() => {
      if (!alive.current) return;

      const code = read("posterku.passcode") || "";
      setPasscode(code);

      try {
        const stored = JSON.parse(read("posterku.history") || "[]");

        if (Array.isArray(stored))
          setHistory(
            stored
              .filter(
                (i) =>
                  i &&
                  [
                    "fileId",
                    "jobId",
                    "product",
                    "headline",
                    "caption",
                    "imagePrompt",
                    "createdAt",
                  ].every((key) => typeof i[key] === "string") &&
                  typeof i.credits === "number" &&
                  ratios.some((r) => r.id === i.ratio) &&
                  styles.some((s) => s.id === i.style) &&
                  Array.isArray(i.hashtags) &&
                  i.hashtags.every((h: unknown) => typeof h === "string"),
              )
              .slice(0, 12),
          );
      } catch { }

      fetch("/api/status")
        .then((r) => r.json())
        .then((s: Status) => {
          if (!alive.current) return;

          setStatus(s);

          setNeedsPasscode(s.passcodeRequired && !code);

          if (s.configured && (!s.passcodeRequired || code))
            void api<{ available: number | null }>("balance", {}, code)
              .then((b) => setBalance(b.available))
              .catch((e) => setError(e.message));
        })
        .catch(() => setError("Tidak dapat memuat konfigurasi aplikasi"));
    });

    return () => {
      alive.current = false;
    };
    // Konfigurasi dan penyimpanan lokal dimuat sekali saat browser siap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function unlock(code: string) {
    try {
      const b = await api<{ available: number | null }>("balance", {}, code);
      setBalance(b.available);
      setPasscode(code);

      save("posterku.passcode", code);
      setNeedsPasscode(false);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kode akses salah");
    }
  }

  async function render(form: PosterRequest, caption: CaptionResult) {
    setStep("generating");

    let { job } = await api<{ job: PosterJob }>("generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: caption.imagePrompt,
        ratio: form.ratio,
        style: form.style,
        photoFileId: photoId.current,
      }),
    });

    setStep("polling");

    const deadline = Date.now() + 180000;

    let consecutiveFailures = 0;

    while (job.status === "queued" || job.status === "running") {
      if (Date.now() >= deadline)
        throw new Error(
          "Poster belum selesai setelah 3 menit. Silakan coba lagi nanti.",
        );

      await new Promise((r) => setTimeout(r, 2000));

      if (!alive.current) return;

      if (Date.now() >= deadline) {
        throw new Error("Poster belum selesai setelah 3 menit. Silakan coba lagi nanti.");
      }

      try {
        ({ job } = await api<{ job: PosterJob }>(
          `jobs/${encodeURIComponent(job.id)}`,
          { signal: AbortSignal.timeout(Math.max(1, Math.min(15000, deadline - Date.now()))) },
        ));

        consecutiveFailures = 0;
      } catch (error) {
        const transient = !(error instanceof ApiError) || error.status === 0 || error.status >= 500;

        consecutiveFailures += 1;

        if (!transient || consecutiveFailures > 3) throw error;
      }
    }

    if (job.status === "failed" || !job.fileId)
      throw new Error(job.error || "Poster gagal dibuat. Silakan coba lagi.");

    if (!alive.current) return;

    const item: HistoryItem = {
      ...caption,
      jobId: job.id,
      fileId: job.fileId,
      product: form.product,
      ratio: form.ratio,
      style: form.style,
      credits: job.credits,
      createdAt: new Date().toISOString(),
      expiresAt: job.expiresAt,
    };

    setResult(item);

    setHistory((previous) => {
      const next = [item, ...previous].slice(0, 12);

      save("posterku.history", JSON.stringify(next));

      return next;
    });

    setStep("done");

    void api<{ available: number | null }>("balance")
      .then((b) => setBalance(b.available))
      .catch(() => { });
  }

  async function run(work: () => Promise<void>) {
    if (active.current) return;

    active.current = true;

    setError("");

    try {
      await work();
    } catch (e) {
      if (alive.current) {
        setError(e instanceof Error ? e.message : "Terjadi kesalahan");

        setStep("error");
      }
    } finally {
      active.current = false;
    }
  }

  const create = (form: PosterRequest, photo?: File) =>
    run(async () => {
      setHasPhoto(Boolean(photo));
      setResult(null);

      photoId.current = undefined;
      setStep("caption");

      const caption = await api<CaptionResult>("caption", {
        method: "POST",
        body: JSON.stringify({ ...form, withPhoto: Boolean(photo) }),
      });

      current.current = { form, caption };

      if (photo) {
        setStep("uploading");

        const body = new FormData();

        body.set("file", await downscale(photo));

        photoId.current = (
          await api<{ fileId: string }>("upload", { method: "POST", body })
        ).fileId;
      }

      await render(form, caption);
    });
  const regenerate = (prompt: string) =>
    run(async () => {
      if (!current.current) return;

      if (!prompt.trim() || prompt.length > 1000)
        throw new Error("Prompt harus 1–1000 karakter");

      const { form, caption } = current.current;

      const next = { ...caption, imagePrompt: prompt };

      current.current = { form, caption: next };

      await render(form, next);
    });

  return {
    status,
    step,
    error,
    busy,
    history,
    result,
    balance,
    hasPhoto,
    needsPasscode,
    unlock,
    create,
    regenerate,
    variation: () => regenerate(current.current?.caption.imagePrompt || ""),
    open: (item: HistoryItem) => {
      if (active.current) return;
      setResult(item);

      photoId.current = undefined;
      setHasPhoto(false);

      current.current = {
        form: {
          product: item.product,
          description: "",
          promo: "",
          ratio: item.ratio,
          style: item.style,
          withPhoto: false,
        },
        caption: item,
      };
      setStep("done");
      setError("");
    },
    clearHistory: () => {
      setHistory([]);

      save("posterku.history", "[]");
    },
  };
}
