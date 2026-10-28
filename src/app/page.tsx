"use client";

// Halaman utama studio poster promosi untuk UMKM Indonesia.
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePosterku } from "@/components/usePosterku";
import { PosterForm } from "@/components/PosterForm";
import { HistoryGrid } from "@/components/HistoryGrid";
import { ResultPanel } from "@/components/ResultPanel";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Header } from "@/components/Header";
import { PasscodeDialog } from "@/components/PasscodeDialog";
import { SetupNotice } from "@/components/SetupNotice";

export default function Home() {
  const app = usePosterku();
  const resultAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (app.busy) {
      resultAnchor.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }, [app.busy]);

  return (
    <div className="site-shell">
      <Header status={app.status} balance={app.balance} />
      <main>
        <section className="hero">
          <span className="eyebrow">
            <i /> IDE LOKAL, VISUAL MAKSIMAL
          </span>
          <h1>
            Poster promosi siap posting
            <br className="hidden sm:inline" />{" "}
            dalam <em>hitungan detik.</em>
          </h1>
          <p>
            Ubah cerita produkmu jadi poster yang menarik perhatian. Mudah,
            cepat, dan pakai AI.
          </p>
          <div className="hero-notes">
            <span>✦ Dibuat untuk UMKM</span>
            <span>✓ Tanpa perlu jago desain</span>
          </div>
          <div className="hero-decoration" aria-hidden="true">
            ✳
          </div>
        </section>
        {app.status && !app.status.configured && <SetupNotice />}
        <ErrorAlert message={app.error} />
        <div className="studio-grid">
          <PosterForm
            app={app}
            busy={app.busy}
            disabled={!app.status?.configured || app.needsPasscode}
            status={app.status}
            onCreate={app.create}
          />
          <div className="min-w-0" ref={resultAnchor}>
            <ResultPanel
              app={app}
              key={app.result?.jobId || "empty"}
              demo={app.status?.demo ?? false}
              result={app.result}
              busy={app.busy}
              step={app.step}
              hasPhoto={app.hasPhoto}
              variation={app.variation}
              regenerate={app.regenerate}
            />
          </div>
        </div>
        <HistoryGrid
          items={app.history}
          onOpen={app.open}
          onClear={app.clearHistory}
          busy={app.busy}
        />
      </main>
      <footer>
        <Link className="footer-brand" href="/">
          ✦ PosterKu
        </Link>
        <span>
          Dibuat dengan PosterKu · Ditenagai{" "}
          <a href="https://yorai.id/docs/api" target="_blank" rel="noreferrer">
            Yorai AI API ↗
          </a>
        </span>
        <small>Ide bagus layak tampil bagus.</small>
      </footer>
      <PasscodeDialog
        open={app.needsPasscode}
        error={app.error}
        onSubmit={app.unlock}
      />
    </div>
  );
}
