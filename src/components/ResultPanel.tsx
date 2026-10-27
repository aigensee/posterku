"use client";

// Menampilkan hasil poster dan aksi berikutnya.
import { useState } from "react";
import Image from "next/image";
import type { HistoryItem } from "@/lib/styles";
import type { Step } from "./usePosterku";
import { credit, rupiah } from "@/lib/format";
import { CaptionCard } from "./CaptionCard";
import { ProgressSteps } from "./ProgressSteps";

export function ResultPanel({
  result,
  demo,
  busy,
  step,
  hasPhoto,
  variation,
  regenerate,
}: {
  result: HistoryItem | null;
  demo: boolean;
  busy: boolean;
  step: Step;
  hasPhoto: boolean;
  variation: () => void;
  regenerate: (prompt: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [prompt, setPrompt] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);

  async function copy() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(
        `${result.caption}\n\n${result.hashtags.join(" ")}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(
        "Caption belum dapat disalin. Silakan salin teks secara manual.",
      );
    }
  }

  function posterContent() {
    if (busy) return (
      <div className="skeleton">
        <div className="spark">✦</div>
        <strong>Sedikit lagi, jadi karya.</strong>
        <p>AI sedang meracik visual terbaik untukmu.</p>
      </div>
    );

    if (result) return (
      <div
        className="poster-frame"
        style={{ aspectRatio: result.ratio.replace(":", "/") }}
      >
        {expired ? (
          <p>Kedaluwarsa · Buat poster baru untuk mengunduh.</p>
        ) : (
          <Image
            src={`/api/file/${encodeURIComponent(result.fileId)}`}
            alt={`Poster promosi ${result.product}`}
            width={900}
            height={900}
            unoptimized
            onError={() => setExpired(true)}
          />
        )}
      </div>
    );

    return (
      <div className="empty-result">
        <div className="poster-outline">
          <span>✦</span>
          <i />
          <i />
          <b />
        </div>
        <h3>Poster kamu akan muncul di sini</h3>
        <p>
          Mulai dari cerita kecil tentang produkmu.
          <br />
          Biar AI yang membuatnya bersinar.
        </p>
        <span className="empty-label">DARI IDE JADI PROMOSI</span>
      </div>
    );
  }

  return (
    <section className="card result-card">
      <div className="section-heading">
        <span className="number">02</span>
        <div>
          <h2>Ruang kreatifmu</h2>
          <p>Satu ide, banyak kemungkinan.</p>
        </div>
        <span className="tiny-badge">✦ AI STUDIO</span>
      </div>
      {(busy || step === "done") && (
        <ProgressSteps step={step} hasPhoto={hasPhoto} />
      )}
      <div className={`poster-stage ${busy ? "loading" : ""}`} aria-busy={busy}>
        {posterContent()}
      </div>
      {result && !busy && (
        <>
          <div className="result-actions">
            <a
              className="primary"
              href={`/api/file/${encodeURIComponent(result.fileId)}?download=1`}
            >
              ↓ Unduh
            </a>
            <button onClick={copy}>
              {copied ? "✓ Tersalin!" : "Salin caption"}
            </button>
            <button
              onClick={() => {
                setExpired(false);

                variation();
              }}
            >
              ↻ Buat variasi
            </button>
          </div>
          {copyError && (
            <p role="alert" className="error-text">
              {copyError}
            </p>
          )}
          <p className="cost">
            {demo ? "Gratis · mode demo" : `Biaya: ${credit(result.credits)} kredit (≈ ${rupiah(result.credits)})`}
          </p>
          <CaptionCard item={result} />
          <details className="prompt-editor">
            <summary>
              Edit prompt <span>↗</span>
            </summary>
            <label htmlFor="edited-prompt">Arahan gambar untuk AI</label>
            <textarea
              id="edited-prompt"
              maxLength={1000}
              rows={5}
              value={prompt ?? result.imagePrompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <small className="counter">
              {(prompt ?? result.imagePrompt).length}/1000
            </small>
            <button
              disabled={!(prompt ?? result.imagePrompt).trim()}
              onClick={() => {
                setExpired(false);

                regenerate(prompt ?? result.imagePrompt);
              }}
              className="secondary"
            >
              Buat ulang
            </button>
          </details>
        </>
      )}
    </section>
  );
}
