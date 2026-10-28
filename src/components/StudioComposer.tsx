"use client";

/* eslint-disable @next/next/no-img-element -- Referensi lokal sudah diperkecil sebelum diunggah. */

// Composer mengambang dengan referensi gambar dan perkiraan biaya terbaru.
import { useCallback, useEffect, useRef, useState } from "react";
import { models } from "@/lib/models";
import { credits, jobRequest } from "@/lib/studio";
import { StudioSettings } from "./StudioSettings";
import { StudioAssistant } from "./StudioAssistant";
import { StudioIcon } from "./StudioIcon";
import type { Studio } from "./useStudio";

async function downscale(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error("Pilih foto JPG, PNG, atau WebP.");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Foto tidak dapat diproses di browser ini.");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (value) =>
          value
            ? resolve(value)
            : reject(new Error("Foto gagal diproses. Coba foto lain.")),
        "image/jpeg",
        0.88,
      ),
    );
    if (blob.size > 4 * 1024 * 1024)
      throw new Error("Foto masih terlalu besar. Pilih foto yang lebih kecil.");
    return new File([blob], "referensi.jpg", { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}

export function StudioComposer({ app }: { app: Studio }) {
  const [settings, setSettings] = useState(false);
  const [assistant, setAssistant] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [quote, setQuote] = useState<{
    request: string;
    credits: number;
  } | null>(null);
  const [quoteAttempt, setQuoteAttempt] = useState(0);
  const [quoteError, setQuoteError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const state = app.composer;
  const model = models.find((m) => m.id === state.model)!;
  const request = JSON.stringify(jobRequest(state));
  const enabled = Boolean(app.status?.configured && !app.needsPasscode);
  const closeSettings = useCallback(() => setSettings(false), []);
  const { api, setError, setComposer } = app;
  useEffect(() => {
    const element = textarea.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(192, Math.max(64, element.scrollHeight))}px`;
  }, [state.prompt]);
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      void api<{ credits: number }>("quote", {
        method: "POST",
        body: JSON.stringify({
          ...JSON.parse(request),
          prompt: JSON.parse(request).prompt.trim() || "Promosi produk",
        }),
        signal: controller.signal,
      })
        .then((result) => {
          if (!controller.signal.aborted) {
            setQuote({ request, credits: result.credits });
            setQuoteError("");
          }
        })
        .catch((e) => {
          if (!controller.signal.aborted) {
            setQuote(null);
            setQuoteError(e.message);
          }
        });
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [request, enabled, api, quoteAttempt]);
  const price = quote?.request === request ? quote.credits : null;
  let priceLabel = "…";
  if (price !== null) priceLabel = credits(price);
  if (app.status?.demo) priceLabel = "Gratis";
  const referenceLabel =
    state.kind === "video" ? "+ Frame awal" : "+ Foto referensi";
  useEffect(() => {
    const element = formRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--composer-height",
        `${element.getBoundingClientRect().height}px`,
      );
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--composer-height");
    };
  }, []);

  async function upload(file?: File) {
    if (!file || uploading || !enabled) return;
    setUploading(true);
    const selectedModel = state.model;
    try {
      const scaled = await downscale(file);
      const body = new FormData();
      body.set("file", scaled);
      const result = await api<{ fileId: string }>("upload", {
        method: "POST",
        body,
      });
      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () =>
          reject(new Error("Pratinjau foto gagal dibuka."));
        reader.readAsDataURL(scaled);
      });
      setComposer((current) =>
        current.model === selectedModel
          ? { ...current, reference: { uploadFileId: result.fileId, preview } }
          : current,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unggah gagal. Coba lagi.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }
  const running = app.activities.filter(
    (a) => a.status === "queued" || a.status === "running",
  ).length;
  return (
    <>
      <form
        ref={formRef}
        className="composer"
        aria-label="Buat karya"
        onSubmit={(e) => {
          e.preventDefault();
          if (enabled && price !== null && !uploading && running < 3)
            void app.create();
        }}
      >
        {model.imageField && (
          <div
            className="reference-row"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              void upload(e.dataTransfer.files[0]);
            }}
          >
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              aria-label="Unggah foto referensi"
              disabled={uploading || !enabled}
              onChange={(e) => void upload(e.target.files?.[0])}
            />
            {state.reference ? (
              <div className="reference-preview">
                <img src={state.reference.preview} alt="Referensi terlampir" />
                <button
                  type="button"
                  aria-label="Hapus referensi"
                  onClick={() =>
                    setComposer({ ...state, reference: undefined })
                  }
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="reference-slot"
                disabled={uploading || !enabled}
                onClick={() => fileInput.current?.click()}
              >
                {uploading ? "Mengunggah…" : referenceLabel}
              </button>
            )}
            <small className="muted">
              {uploading
                ? "Menyiapkan foto…"
                : "Tarik foto ke sini atau klik untuk memilih"}
            </small>
          </div>
        )}
        {state.attached && (
          <button
            type="button"
            className="caption-chip"
            onClick={() => setComposer({ ...state, attached: undefined })}
          >
            Caption UMKM terlampir {state.attached.fallback && "· template"}{" "}
            <span aria-label="Lepas caption">×</span>
          </button>
        )}
        <label className="sr-only" htmlFor="studio-prompt">
          Apa yang ingin kamu buat?
        </label>
        <textarea
          id="studio-prompt"
          ref={textarea}
          rows={2}
          maxLength={model.promptMax}
          placeholder="Apa yang ingin kamu buat?"
          value={state.prompt}
          onChange={(e) => {
            setQuote(null);
            setComposer({ ...state, prompt: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <div className="prompt-counter">
          {state.prompt.length} / {model.promptMax}
        </div>
        <div className="composer-actions">
          <button
            type="button"
            className="assistant-button"
            disabled={!enabled}
            onClick={() => setAssistant(true)}
          >
            <StudioIcon name="spark" />
            <span>Prompt otomatis</span>
          </button>
          <div className="composer-right">
            <button
              type="button"
              className="settings-pill"
              aria-expanded={settings}
              onClick={() => setSettings(!settings)}
            >
              {model.label} · {state.ratio}
              {state.kind === "video" &&
                ` · ${state.duration} dtk · ${state.resolution}`}{" "}
              <span>⌃</span>
            </button>
            <button
              className="primary create-button"
              disabled={
                !enabled ||
                uploading ||
                price === null ||
                running >= 3 ||
                !state.prompt.trim() ||
                state.prompt.length > model.promptMax
              }
            >
              Buat <span>◈ {priceLabel}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        {quoteError && (
          <p className="quote-error" role="status">
            {quoteError}{" "}
            <button
              type="button"
              onClick={() => {
                setQuote(null);
                setQuoteAttempt((attempt) => attempt + 1);
              }}
            >
              Coba lagi
            </button>
          </p>
        )}
        {settings && <StudioSettings app={app} onClose={closeSettings} />}
      </form>
      {assistant && (
        <StudioAssistant app={app} onClose={() => setAssistant(false)} />
      )}
    </>
  );
}
