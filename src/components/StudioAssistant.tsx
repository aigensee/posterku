"use client";

// Asisten UMKM menempelkan prompt dan caption untuk karya berikutnya.
import { useState } from "react";
import { StudioDialog } from "./StudioDialog";
import { StylePicker } from "./StylePicker";
import type { Studio } from "./useStudio";
import type { CaptionResult, PosterRequest } from "@/lib/styles";

export function StudioAssistant({
  app,
  onClose,
}: {
  app: Studio;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    product: "",
    description: "",
    promo: "",
    style: "minimalis" as PosterRequest["style"],
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <StudioDialog title="Prompt otomatis" onClose={onClose}>
      <p className="muted">
        Ceritakan produkmu. Kami bantu menulis ide visual dan caption siap
        posting.
      </p>
      <form
        className="assistant-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          const state = app.composer;
          try {
            const attached = await app.api<CaptionResult>("caption", {
              method: "POST",
              body: JSON.stringify({
                ...form,
                kind: state.kind,
                ratio: state.ratio,
                withPhoto: Boolean(state.reference),
              }),
            });
            app.setComposer((current) => ({
              ...current,
              attached,
              prompt:
                state.kind === "video"
                  ? attached.videoPrompt
                  : attached.imagePrompt,
            }));
            onClose();
          } catch (e) {
            setError(
              e instanceof Error
                ? e.message
                : "Prompt belum berhasil ditulis. Coba lagi.",
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <label>
          <span>
            Nama produk <span aria-hidden="true">*</span>
          </span>
          <input
            required
            maxLength={60}
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            placeholder="Contoh: Kopi Susu Senja"
          />
        </label>
        <label>
          Deskripsi
          <textarea
            maxLength={500}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Apa yang membuat produkmu istimewa?"
          />
        </label>
        <label>
          Promo
          <input
            maxLength={100}
            value={form.promo}
            onChange={(e) => setForm({ ...form, promo: e.target.value })}
            placeholder="Contoh: Beli 2 gratis 1, khusus hari ini"
          />
        </label>
        <StylePicker
          value={form.style}
          onChange={(style) => setForm({ ...form, style })}
        />
        {error && (
          <p role="alert" className="error-text">
            {error}
          </p>
        )}
        <button className="primary" disabled={busy}>
          {busy ? "Menulis prompt & caption…" : "Tulis prompt & caption"}
        </button>
      </form>
    </StudioDialog>
  );
}
