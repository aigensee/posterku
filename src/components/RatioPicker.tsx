"use client";

// Memilih ukuran poster.
import { ratios, type PosterRequest } from "@/lib/styles";

export function RatioPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: PosterRequest["ratio"]) => void;
}) {
  return (
    <fieldset>
      <legend>Rasio ukuran</legend>
      <div className="ratio-grid">
        {ratios.map((r) => (
          <label
            title={"hint" in r ? r.hint : r.label}
            className={value === r.id ? "selected" : ""}
            key={r.id}
          >
            <input
              type="radio"
              name="ratio"
              checked={value === r.id}
              onChange={() => onChange(r.id)}
            />
            <span
              className="ratio-shape"
              style={{
                aspectRatio: r.id.replace(":", "/"),
                height: r.id === "16:9" ? 14 : 22,
              }}
            />
            <strong>{r.label}</strong>
            <small>{r.id}</small>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
