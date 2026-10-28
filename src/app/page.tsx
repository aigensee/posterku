"use client";

// Studio kreatif PosterKu dengan galeri, composer, dan aktivitas sesi.
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStudio } from "@/components/useStudio";
import { StudioComposer } from "@/components/StudioComposer";
import { StudioGallery } from "@/components/StudioGallery";
import { StudioDialog } from "@/components/StudioDialog";
import { StudioIcon } from "@/components/StudioIcon";
import { PasscodeDialog } from "@/components/PasscodeDialog";
import { SetupNotice } from "@/components/SetupNotice";
import { models } from "@/lib/models";
import { credits } from "@/lib/studio";

export default function Home() {
  const app = useStudio();
  const [activity, setActivity] = useState(false);
  const [theme, setTheme] = useState("Gelap");
  useEffect(() => {
    queueMicrotask(() => {
      const saved = document.documentElement.dataset.theme || "dark";
      setTheme(
        (
          { dark: "Gelap", light: "Terang", system: "Sistem" } as Record<
            string,
            string
          >
        )[saved] || "Gelap",
      );
    });
  }, []);
  function cycleTheme() {
    const current = document.documentElement.dataset.theme || "dark";
    const next =
      (
        { dark: "light", light: "system", system: "dark" } as Record<
          string,
          string
        >
      )[current] || "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("posterku.theme", next);
    } catch {
      /* Tema tetap berlaku pada sesi ini. */
    }
    setTheme(
      (
        { dark: "Gelap", light: "Terang", system: "Sistem" } as Record<
          string,
          string
        >
      )[next],
    );
  }
  let balanceLabel = "◈ …";
  if (app.balance !== null) balanceLabel = `◈ ${credits(app.balance)}`;
  if (app.status?.demo) balanceLabel = "Mode demo";
  let content = <StudioGallery app={app} />;
  if (app.status && !app.status.configured) content = <SetupNotice />;
  if (!app.ready || !app.status)
    content = (
      <div className="loading-state" role="status">
        Menyiapkan studio…
        {app.error && (
          <p>
            <button onClick={() => window.location.reload()}>
              Coba muat ulang
            </button>
          </p>
        )}
      </div>
    );
  return (
    <div className="studio-shell">
      <nav className="icon-rail" aria-label="Navigasi studio">
        <Link className="brand-mark" href="/" aria-label="PosterKu">
          ✦
        </Link>
        <button
          className="rail-active"
          aria-label="Studio"
          title="Studio"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
        >
          <StudioIcon name="studio" />
        </button>
        <div className="rail-bottom">
          <button
            title={`Tema: ${theme}. Klik untuk mengganti`}
            aria-label="Ganti tema Terang, Gelap, atau Sistem"
            onClick={cycleTheme}
          >
            <StudioIcon name="theme" />
          </button>
          <a
            href="https://yorai.id/docs/api"
            target="_blank"
            rel="noreferrer"
            title="Ditenagai Yorai"
            aria-label="Ditenagai Yorai"
          >
            <StudioIcon name="link" />
          </a>
        </div>
      </nav>
      <div className="workspace">
        <header className="topbar">
          <div className="studio-title">
            <span className="mobile-brand">✦</span>Studio{" "}
            <strong>PosterKu</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="mobile-theme icon-button"
              aria-label={`Tema ${theme}, ganti tema`}
              title={`Tema: ${theme}`}
              onClick={cycleTheme}
            >
              <StudioIcon name="theme" />
            </button>
            <span
              className="balance-chip"
              title={
                app.balance === null
                  ? "Mode latihan tanpa menggunakan kredit"
                  : `≈ Rp${Math.round(app.balance * 1000).toLocaleString("id-ID")}`
              }
            >
              {balanceLabel}
            </span>
            <button
              onClick={() => setActivity(true)}
              className="activity-button"
              aria-label="Aktivitas"
            >
              <StudioIcon name="activity" />
              <span>Aktivitas</span>
              {app.activities.some(
                (a) => a.status === "queued" || a.status === "running",
              ) && <i />}
            </button>
          </div>
        </header>
        <main>{content}</main>
        {app.status?.configured && <StudioComposer app={app} />}
      </div>
      <div className="toast-region" aria-live="polite">
        {app.error && (
          <div className="toast">
            <span>{app.error}</span>
            <button
              aria-label="Tutup pemberitahuan"
              onClick={() => app.setError("")}
            >
              ×
            </button>
          </div>
        )}
      </div>
      <PasscodeDialog
        open={app.needsPasscode}
        error={app.error}
        onSubmit={async (code) => {
          try {
            await app.unlock(code);
          } catch {
            /* Pesan kesalahan ditampilkan dalam dialog. */
          }
        }}
      />
      {activity && (
        <StudioDialog
          title="Aktivitas"
          className="activity-drawer"
          onClose={() => setActivity(false)}
        >
          <p className="muted">Pekerjaan dari sesi browser ini.</p>
          {!app.activities.length && (
            <p className="activity-empty">
              Belum ada aktivitas. Mulai buat karya pertamamu.
            </p>
          )}
          {app.activities.map((a) => (
            <article className="activity-item" key={a.id}>
              <strong>
                {models.find((m) => m.id === a.state.model)?.label}
              </strong>
              <span className={`status-label ${a.status}`}>
                {
                  {
                    queued: "Mengantri",
                    running: "Membuat",
                    succeeded: "Selesai",
                    failed: "Gagal",
                  }[a.status]
                }
              </span>
              <p>{a.state.prompt.slice(0, 100)}</p>
              <small>
                {new Date(a.started).toLocaleTimeString("id-ID")} · ◈{" "}
                {credits(a.credits)} kredit
              </small>
              {a.error && <p className="error-text">{a.error}</p>}
            </article>
          ))}
        </StudioDialog>
      )}
    </div>
  );
}
