"use client";

// Pilihan video dan estimasi biaya terbaru dengan jeda saat pilihan berubah.
import { useEffect, useState } from "react";
import type { PosterRequest, VideoSettings } from "@/lib/styles";
import { credit, rupiah } from "@/lib/format";

type Quote = { credits: number; demo?: boolean };

export function VideoOptions({ value, onChange, ratio, demo, api }: {
  value: VideoSettings;
  onChange: (value: VideoSettings) => void;
  ratio: PosterRequest["ratio"];
  demo: boolean;
  api: <T>(path: string, init?: RequestInit) => Promise<T>;
}) {
  const [estimate, setEstimate] = useState<{ key: string; quote?: Quote; error?: string } | null>(null);
  const key = JSON.stringify({ ...value, ratio });

  useEffect(() => {
    if (demo) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      void api<Quote>("video/quote", { method: "POST", body: key, signal: controller.signal })
        .then((quote) => { if (!controller.signal.aborted) setEstimate({ key, quote }); })
        .catch(() => { if (!controller.signal.aborted) setEstimate({ key, error: "Biaya belum dapat dimuat. Ubah pilihan untuk mencoba lagi." }); });
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // Fungsi API mengikuti kode akses terbaru; perubahan pilihan memicu permintaan.
  }, [key, demo, api]);

  let message = "Memuat perkiraan biaya…";

  if (demo) message = "Gratis · mode demo";
  else if (estimate?.key === key && estimate.error) message = estimate.error;
  else if (estimate?.key === key && estimate.quote)
    message = `Perkiraan biaya: ${credit(estimate.quote.credits)} kredit (≈ ${rupiah(estimate.quote.credits)})`;

  return <div className="video-options">
    <label>Durasi
      <select value={value.duration} onChange={(e) => onChange({ ...value, duration: Number(e.target.value) as 5 | 10 })}>
        <option value={5}>5 detik</option><option value={10}>10 detik</option>
      </select>
    </label>
    <label>Kualitas
      <select value={value.resolution} onChange={(e) => onChange({ ...value, resolution: e.target.value as VideoSettings["resolution"] })}>
        <option value="480p">Hemat 480p</option><option value="720p">HD 720p</option>
      </select>
    </label>
    <label className="sound-option"><input type="checkbox" checked={value.sound} onChange={(e) => onChange({ ...value, sound: e.target.checked })} /> Dengan suara AI</label>
    <p className="cost" aria-live="polite">{message}</p>
  </div>;
}
