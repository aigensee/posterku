"use client";

// Menampilkan pratinjau poster dalam riwayat.
import { useState } from "react";
import Image from "next/image";
import type { HistoryItem } from "@/lib/styles";

export function HistoryThumb({
  item,
  onOpen,
  disabled,
}: {
  item: HistoryItem;
  onOpen: () => void;
  disabled: boolean;
}) {
  const [failed, setFailed] = useState(false);

  function thumbnail() {
    if (failed) return <span>Kedaluwarsa</span>;

    if (item.kind === "video" && !item.fileId.startsWith("demo-video-")) return (
      <video
        src={`/api/file/${encodeURIComponent(item.videoFileId || item.fileId)}`}
        muted playsInline preload="metadata"
        onError={() => setFailed(true)}
        aria-label={`Video ${item.product}`}
      />
    );

    return (
      <Image
        src={`/api/file/${encodeURIComponent(item.fileId)}`}
        alt={`Promosi ${item.product}`}
        width={250}
        height={250}
        unoptimized
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <button className="history-item" onClick={onOpen} disabled={disabled}>
      <div>
        {item.kind === "video" && <span className="video-badge">▶</span>}
        {thumbnail()}
      </div>
      <strong>{item.product}</strong>
      <small>
        {new Date(item.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        })}{" "}
        · {item.ratio}
      </small>
    </button>
  );
}
