"use client";

// Penampil hasil beserta rincian biaya dan caption siap disalin.
import { useState } from "react";
import { models } from "@/lib/models";
import { credits, mediaUrl, type StudioItem } from "@/lib/studio";
import { StudioDialog } from "./StudioDialog";
import { StudioMedia } from "./StudioMedia";

export function StudioViewer({
  item,
  onClose,
}: {
  item: StudioItem;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState("");
  const caption = item.attached;
  return (
    <StudioDialog
      title="Detail karya"
      onClose={onClose}
      className="viewer-dialog"
    >
      <div className="viewer-content">
        <StudioMedia item={item} viewer />
        <aside>
          <span className="eyebrow">
            {item.kind === "video" ? "VIDEO" : "GAMBAR"} / POSTERKU
          </span>
          <h3>Prompt</h3>
          <p className="prompt-detail">{item.prompt}</p>
          <dl>
            <dt>Model</dt>
            <dd>
              {models.find((m) => m.id === item.model)?.label || item.model}
            </dd>
            <dt>Pengaturan</dt>
            <dd>
              {item.ratio}
              {item.kind === "video" &&
                ` · ${item.duration} dtk · ${item.resolution}`}
            </dd>
            <dt>Biaya</dt>
            <dd>◈ {credits(item.credits)} kredit</dd>
            <dt>Dibuat</dt>
            <dd>{new Date(item.createdAt).toLocaleString("id-ID")}</dd>
          </dl>
          <p className="muted">
            {item.expiresAt
              ? `Tersimpan di Yorai sampai ${new Date(item.expiresAt).toLocaleDateString("id-ID")}`
              : "Hasil mode demo · tanpa kredit"}
          </p>
          <a
            className="primary download-button"
            href={`${mediaUrl(item.fileId)}?download=1`}
          >
            Unduh {item.kind === "video" ? "video" : "gambar"} ↓
          </a>
          {caption && (
            <section className="caption-block">
              <h3>{caption.headline}</h3>
              {caption.fallback && (
                <small className="muted">Caption cadangan dari template</small>
              )}
              <p>{caption.caption}</p>
              <p className="hashtags">{caption.hashtags.join(" ")}</p>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `${caption.headline}\n\n${caption.caption}\n\n${caption.hashtags.join(" ")}`,
                    );
                    setCopied("Caption disalin");
                  } catch {
                    setCopied(
                      "Tidak dapat menyalin. Coba pilih dan salin teks caption.",
                    );
                  }
                }}
              >
                Salin caption
              </button>
              <small role="status">{copied}</small>
            </section>
          )}
        </aside>
      </div>
    </StudioDialog>
  );
}
