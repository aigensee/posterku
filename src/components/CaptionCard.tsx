"use client";

// Menampilkan caption dan hashtag siap pakai.
import type { HistoryItem } from "@/lib/styles";

export function CaptionCard({ item }: { item: HistoryItem }) {
  return (
    <div className="caption-card">
      <span className="eyebrow">CAPTION SIAP PAKAI</span>
      <h3>{item.headline}</h3>
      {item.fallback && (
        <p className="caption-note">
          Caption dibuat otomatis karena AI teks sedang sibuk. Poster tetap dibuat dengan AI.
        </p>
      )}
      <p>{item.caption}</p>
      <div className="hashtags">
        {item.hashtags.map((h, i) => (
          <span key={i}>{h}</span>
        ))}
      </div>
    </div>
  );
}
