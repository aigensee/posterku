"use client";

// Memilih gaya visual poster.
import { styles, type PosterRequest } from "@/lib/styles";

export function StylePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: PosterRequest["style"]) => void;
}) {
  return (
    <fieldset>
      <legend>Gaya poster</legend>
      <div className="style-grid">
        {styles.map((s) => (
          <label
            className={`style-option ${value === s.id ? "selected" : ""}`}
            key={s.id}
          >
            <input
              type="radio"
              name="style"
              value={s.id}
              checked={value === s.id}
              onChange={() => onChange(s.id)}
            />
            <span
              className="swatch"
              style={{
                background: `linear-gradient(135deg,${s.swatch.join(",")})`,
              }}
            >
              <span>Aa</span>
              {value === s.id && <b>✓</b>}
            </span>
            <strong>{s.label}</strong>
            <small>{s.tagline}</small>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
