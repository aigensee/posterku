"use client";

// Menampilkan caption dan hashtag siap pakai.
import type { HistoryItem } from "@/lib/styles";

export function CaptionCard({ item }: { item: HistoryItem }) {
  return (
    <div className="caption-card">
      <span className="eyebrow">CAPTION SIAP PAKAI</span>
      <h3>{item.headline}</h3>
      <p>{item.caption}</p>
      <div className="hashtags">
        {item.hashtags.map((h, i) => (
          <span key={i}>{h}</span>
        ))}
      </div>
    </div>
  );
}
