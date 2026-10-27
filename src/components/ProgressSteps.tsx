"use client";

// Menampilkan kemajuan pembuatan poster.
import type { Step } from "./usePosterku";

export function ProgressSteps({
  step,
  hasPhoto,
}: {
  step: Step;
  hasPhoto: boolean;
}) {
  const steps = [
    { key: "caption", label: "Menulis caption" },
    ...(hasPhoto ? [{ key: "uploading", label: "Mengunggah foto" }] : []),
    { key: "generating", label: "Membuat poster" },
    { key: "done", label: "Selesai" },
  ];
  const index = steps.findIndex(
    (s) => s.key === (step === "polling" ? "generating" : step),
  );

  function indicator(i: number) {
    if (i < index || step === "done") return "✓";

    if (i === index) return <span className="spinner" />;

    return i + 1;
  }

  return (
    <ol className="progress" aria-live="polite">
      {steps.map((s, i) => (
        <li key={s.key} className={i <= index ? "active" : ""}>
          <span>{indicator(i)}</span>
          {s.label}
        </li>
      ))}
    </ol>
  );
}
