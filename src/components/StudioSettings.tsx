"use client";

// Pilihan model, rasio, dan pengaturan video dalam popover yang menjaga fokus.
import { useEffect, useLayoutEffect, useRef } from "react";
import { models, startingCredits } from "@/lib/models";
import { clamp, credits } from "@/lib/studio";
import type { Studio } from "./useStudio";

export function StudioSettings({
  app,
  onClose,
}: {
  app: Studio;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = app.composer;
  const model = models.find((m) => m.id === state.model)!;
  useLayoutEffect(() => {
    const popover = ref.current;
    const composer = popover?.closest<HTMLElement>(".composer");
    if (!popover || !composer) return;
    const updateHeight = () => {
      popover.style.setProperty(
        "--settings-max-height",
        `${Math.max(240, composer.getBoundingClientRect().top - 56 - 24)}px`,
      );
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    const observer = new ResizeObserver(updateHeight);
    observer.observe(composer);
    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Pengaturan karya"
      className="settings-popover"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
        if (e.key !== "Tab") return;
        const elements =
          ref.current?.querySelectorAll<HTMLElement>("button, input");
        if (!elements?.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }}
    >
      <div className="settings-sticky-header">
        <div className="dialog-header">
          <h2>Pengaturan karya</h2>
          <button type="button" onClick={onClose} aria-label="Tutup pengaturan">
            ×
          </button>
        </div>
        <div className="segments">
          {(["image", "video"] as const).map((kind) => (
            <button
              type="button"
              key={kind}
              aria-pressed={state.kind === kind}
              onClick={() => {
                const nextModel = models.find(
                  (m) =>
                    m.id ===
                    (kind === "video" ? "bytedance-seedance-2-mini" : "z-image"),
                )!;
                const oldPrompt =
                  state.kind === "video"
                    ? state.attached?.videoPrompt
                    : state.attached?.imagePrompt;
                const nextPrompt =
                  kind === "video"
                    ? state.attached?.videoPrompt
                    : state.attached?.imagePrompt;
                app.setComposer(
                  clamp(
                    {
                      ...state,
                      prompt:
                        kind !== state.kind &&
                        state.prompt === oldPrompt &&
                        nextPrompt !== undefined
                          ? nextPrompt.slice(0, nextModel.promptMax)
                          : state.prompt,
                      ratio: kind === "video" ? "9:16" : "1:1",
                      sound: true,
                    },
                    nextModel.id,
                  ),
                );
              }}
            >
              {kind === "image" ? "Gambar" : "Video"}
            </button>
          ))}
        </div>
      </div>
      <div className="model-list">
        {models
          .filter((m) => m.kind === state.kind)
          .map((m) => (
            <button
              type="button"
              className={m.id === model.id ? "selected" : ""}
              key={m.id}
              onClick={() => app.setComposer(clamp(state, m.id))}
            >
              <span>
                <strong>{m.label}</strong>
                <small>{m.note}</small>
              </span>
              <small>mulai {credits(startingCredits[m.id])} kredit</small>
            </button>
          ))}
      </div>
      <h3>Rasio</h3>
      <div className="ratio-grid">
        {model.ratios.map((ratio) => (
          <button
            type="button"
            key={ratio}
            aria-pressed={state.ratio === ratio}
            onClick={() => app.setComposer({ ...state, ratio })}
          >
            <i style={{ aspectRatio: ratio.replace(":", "/") }} />
            {ratio}
          </button>
        ))}
      </div>
      {state.kind === "video" && (
        <>
          <h3>Durasi</h3>
          <div className="chips">
            {model.durations?.map((duration) => (
              <button
                type="button"
                key={duration}
                aria-pressed={duration === state.duration}
                onClick={() => app.setComposer({ ...state, duration })}
              >
                {duration} dtk
              </button>
            ))}
          </div>
          <h3>Kualitas</h3>
          <div className="chips">
            {model.resolutions?.map((resolution) => (
              <button
                type="button"
                key={resolution}
                aria-pressed={resolution === state.resolution}
                onClick={() => app.setComposer({ ...state, resolution })}
              >
                {resolution}
              </button>
            ))}
          </div>
          {model.soundField && (
            <label className="sound-toggle">
              Suara AI
              <input
                type="checkbox"
                checked={state.sound}
                onChange={(e) =>
                  app.setComposer({ ...state, sound: e.target.checked })
                }
              />
            </label>
          )}
        </>
      )}
    </div>
  );
}
