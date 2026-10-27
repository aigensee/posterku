"use client";

// Menampilkan galeri riwayat poster.
import type { HistoryItem } from "@/lib/styles";
import { HistoryThumb } from "./HistoryThumb";

export function HistoryGrid({
  items,
  onOpen,
  onClear,
  busy,
}: {
  items: HistoryItem[];
  onOpen: (item: HistoryItem) => void;
  onClear: () => void;
  busy: boolean;
}) {
  return (
    <section className="history-section">
      <div className="history-heading">
        <div>
          <h2>
            Karya sebelumnya <span>{items.length}</span>
          </h2>
          <p>Tersimpan di browser ini, siap dilihat lagi.</p>
        </div>
        {items.length > 0 && (
          <button className="text-button" onClick={onClear}>
            Hapus riwayat
          </button>
        )}
      </div>
      {items.length ? (
        <div className="history-grid">
          {items.map((item) => (
            <HistoryThumb
              key={item.jobId}
              item={item}
              disabled={busy}
              onOpen={() => onOpen(item)}
            />
          ))}
        </div>
      ) : (
        <div className="history-empty">
          Belum ada poster. Karya pertamamu akan tersimpan di sini.
        </div>
      )}
    </section>
  );
}
