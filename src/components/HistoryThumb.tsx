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

  return (
    <button className="history-item" onClick={onOpen} disabled={disabled}>
      <div>
        {failed ? (
          <span>Kedaluwarsa</span>
        ) : (
          <Image
            src={`/api/file/${encodeURIComponent(item.fileId)}`}
            alt={`Poster ${item.product}`}
            width={250}
            height={250}
            unoptimized
            onError={() => setFailed(true)}
          />
        )}
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
