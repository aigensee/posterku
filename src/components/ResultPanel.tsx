"use client";

// Menampilkan hasil poster dan aksi berikutnya.
import { VideoOptions } from "./VideoOptions";
import type { usePosterku } from "./usePosterku";
import { useState } from "react";
import Image from "next/image";
import type { HistoryItem } from "@/lib/styles";
import type { Step } from "./usePosterku";
import { credit, rupiah } from "@/lib/format";
import { CaptionCard } from "./CaptionCard";
import { ProgressSteps } from "./ProgressSteps";

export function ResultPanel({
  result,
  app,
  demo,
  busy,
  step,
  hasPhoto,
  variation,
  regenerate,
}: {
  app: ReturnType<typeof usePosterku>;
  result: HistoryItem | null;
  demo: boolean;
  busy: boolean;
  step: Step;
  hasPhoto: boolean;
  variation: () => void;
  regenerate: (prompt: string) => void;
}) {
  const [animating, setAnimating] = useState(false);
  const video = busy ? app.workingKind === "video" : result?.kind === "video";
  const demoVideo = result?.fileId.startsWith("demo-video-") ?? false;
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

  function resultMedia() {
    if (!result) return null;

    if (expired) return <p>Kedaluwarsa · Buat karya baru untuk mengunduh.</p>;

    if (video && !demoVideo) return (
      <video
        src={`/api/file/${encodeURIComponent(result.videoFileId || result.fileId)}`}
        controls playsInline loop muted autoPlay
        onError={() => setExpired(true)}
      />
    );

    return (
      <Image
        src={`/api/file/${encodeURIComponent(result.fileId)}`}
        alt={`Promosi ${result.product}`}
        width={900}
        height={900}
        unoptimized
        onError={() => setExpired(true)}
      />
    );
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
        className={`poster-frame ${demoVideo ? "demo-video" : ""}`}
        style={{ aspectRatio: result.ratio.replace(":", "/") }}
      >
        {demoVideo && <span className="demo-video-badge">MODE DEMO</span>}
        {resultMedia()}
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
        <h3>
          {app.mode === "video"
            ? "Video kamu akan muncul di sini"
            : "Poster kamu akan muncul di sini"}
        </h3>
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
        <ProgressSteps step={step} hasPhoto={hasPhoto} video={video} />
      )}
      {busy && video && <p className="cost">Video biasanya selesai dalam 1–3 menit. Jangan tutup halaman ini.</p>}
      <div className={`poster-stage ${busy ? "loading" : ""}`} aria-busy={busy}>
        {posterContent()}
      </div>
      {result && !busy && (
        <>
          <div className="result-actions">
            {!demoVideo && <a
              className="primary"
              href={`/api/file/${encodeURIComponent(result.fileId)}?download=1`}
            >
              ↓ {video ? "Unduh MP4" : "Unduh"}
            </a>}
            <button onClick={copy}>
              {copied ? "✓ Tersalin!" : "Salin caption"}
            </button>
            <button
              onClick={() => {
                setExpired(false);

                variation();
              }}
            >
              ↻ {video ? "Buat ulang video" : "Buat variasi"}
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
          {!video && <button className="secondary" onClick={() => setAnimating(!animating)} aria-expanded={animating}>Animasikan poster</button>}
          {!video && animating && <div>
            <VideoOptions value={app.videoOptions} onChange={app.setVideoOptions} ratio={result.ratio} demo={demo} api={app.api} />
            <button className="primary" onClick={app.animatePoster}>Buat Video</button>
          </div>}
          {!video && <details className="prompt-editor">
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
          </details>}
        </>
      )}
    </section>
  );
}
