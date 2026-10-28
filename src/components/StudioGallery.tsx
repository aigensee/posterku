"use client";

// Galeri dua atau tiga kolom dengan antrean dan konfirmasi hapus di halaman.
import { useEffect, useState } from "react";
import { models } from "@/lib/models";
import { clamp, mediaUrl, type StudioItem } from "@/lib/studio";
import { StudioMedia } from "./StudioMedia";
import { StudioDialog } from "./StudioDialog";
import { StudioViewer } from "./StudioViewer";
import type { Studio } from "./useStudio";

export function StudioGallery({ app }: { app: Studio }) {
  const [filter, setFilter] = useState("all");
  const [viewer, setViewer] = useState<StudioItem | null>(null);
  const [remove, setRemove] = useState<StudioItem | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const pending = app.activities.filter((a) => a.status !== "succeeded");
  useEffect(() => {
    if (!pending.some((a) => a.status !== "failed")) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [pending]);
  const count = (kind: string) =>
    app.history.filter((i) => kind === "all" || i.kind === kind).length +
    pending.filter((i) => kind === "all" || i.state.kind === kind).length;
  return (
    <>
      <div className="gallery-heading">
        <div className="segments filter-tabs" aria-label="Filter karya">
          {[
            ["all", "Semua"],
            ["image", "Gambar"],
            ["video", "Video"],
          ].map(([kind, label]) => (
            <button
              key={kind}
              aria-pressed={filter === kind}
              onClick={() => setFilter(kind)}
            >
              {label} <span>{count(kind)}</span>
            </button>
          ))}
        </div>
        <span className="muted gallery-note">
          Ruang untuk semua ide bagusmu
        </span>
      </div>
      {!count(filter) ? (
        <section className="empty-state">
          <div className="empty-art" aria-hidden="true">
            <div>✦</div>
            <span>✧</span>
            <i>◈</i>
          </div>
          <span className="eyebrow">DARI IDE JADI KARYA</span>
          <h1>Apa yang ingin kamu buat hari ini?</h1>
          <p>
            Mulai dari composer di bawah.
            <br />
            Coba: Prompt otomatis untuk produk UMKM-mu.
          </p>
          <div className="example-prompts">
            {[
              "Poster kopi susu dengan nuansa hangat dan pencahayaan studio",
              "Foto produk skincare minimalis dengan latar krem",
              "Poster promo roti artisan segar, gaya editorial",
            ].map((prompt, index) => (
              <button
                key={prompt}
                onClick={() => app.setComposer({ ...app.composer, prompt })}
              >
                <span>{["☕", "✧", "◒"][index]}</span>
                {prompt}
                <b>↗</b>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <div className="results-grid">
          {pending
            .filter((a) => filter === "all" || a.state.kind === filter)
            .map((a) => {
              const seconds = Math.max(0, Math.floor((now - a.started) / 1000));
              let statusText = `Membuat… ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
              if (a.status === "queued") statusText = "Mengantri…";
              if (a.status === "failed")
                statusText = a.error || "Pembuatan gagal. Coba lagi.";
              return (
                <article
                  key={a.id}
                  className={`pending-card ${a.status === "failed" ? "failed-card" : "shimmer"}`}
                  style={{ aspectRatio: a.state.ratio.replace(":", "/") }}
                >
                  <span className="pending-symbol">
                    {a.status === "failed" ? "!" : "✦"}
                  </span>
                  <strong>
                    {models.find((m) => m.id === a.state.model)?.label}
                  </strong>
                  <p role="status">{statusText}</p>
                  {a.status === "failed" && (
                    <div className="chips">
                      <button
                        disabled={
                          app.activities.filter(
                            (item) =>
                              item.status === "queued" ||
                              item.status === "running",
                          ).length >= 3
                        }
                        onClick={() => {
                          app.setActivities((items) =>
                            items.filter((i) => i.id !== a.id),
                          );
                          void app.create(a.state);
                        }}
                      >
                        Coba lagi
                      </button>
                      <button
                        onClick={() =>
                          app.setActivities((items) =>
                            items.filter((i) => i.id !== a.id),
                          )
                        }
                      >
                        Tutup
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          {app.history
            .filter((i) => filter === "all" || i.kind === filter)
            .map((item) => (
              <article className="result-card" key={item.jobId}>
                <button
                  className="media-open"
                  aria-label={`Lihat ${item.attached?.headline || item.prompt.slice(0, 60)}`}
                  onClick={() => setViewer(item)}
                >
                  <StudioMedia item={item} />
                </button>
                {item.kind === "video" && (
                  <span className="video-badge">▶ VIDEO</span>
                )}
                <div className="card-actions">
                  <a
                    href={`${mediaUrl(item.fileId)}?download=1`}
                    title="Unduh"
                    aria-label="Unduh"
                  >
                    ↓
                  </a>
                  <button
                    title="Pakai prompt"
                    onClick={() =>
                      app.setComposer(clamp({ ...item }, item.model))
                    }
                  >
                    Pakai prompt
                  </button>
                  {item.kind === "image" && (
                    <button
                      title="Animasikan"
                      onClick={() => {
                        const videoModel =
                          models.find(
                            (m) =>
                              m.id === app.composer.model && m.kind === "video",
                          ) ||
                          models.find(
                            (m) => m.id === "bytedance-seedance-2-mini",
                          )!;
                        const videoState = clamp(
                          {
                            ...item,
                            ratio:
                              app.composer.kind === "video"
                                ? app.composer.ratio
                                : "9:16",
                          },
                          videoModel.id,
                        );
                        app.setComposer({
                          ...videoState,
                          ratio: videoModel.ratios.includes(item.ratio)
                            ? item.ratio
                            : videoState.ratio,
                          prompt:
                            item.attached?.videoPrompt ||
                            `Slow camera push-in, gentle motion. ${item.prompt}`.slice(
                              0,
                              2000,
                            ),
                          reference: {
                            sourceFileId: item.fileId,
                            preview: mediaUrl(item.fileId),
                          },
                        });
                      }}
                    >
                      Animasikan
                    </button>
                  )}
                  <button
                    title="Hapus"
                    aria-label="Hapus karya"
                    onClick={() => setRemove(item)}
                  >
                    ×
                  </button>
                </div>
              </article>
            ))}
        </div>
      )}
      {viewer && <StudioViewer item={viewer} onClose={() => setViewer(null)} />}
      {remove && (
        <StudioDialog
          title="Hapus dari riwayat?"
          onClose={() => setRemove(null)}
        >
          <p>
            Karya ini akan dihapus dari riwayat di browser ini. Unduh dahulu
            jika ingin menyimpannya.
          </p>
          <div className="dialog-actions">
            <button onClick={() => setRemove(null)}>Batal</button>
            <button
              className="primary"
              onClick={() => {
                app.setHistory((items) =>
                  items.filter((i) => i.jobId !== remove.jobId),
                );
                setRemove(null);
              }}
            >
              Hapus karya
            </button>
          </div>
        </StudioDialog>
      )}
    </>
  );
}
