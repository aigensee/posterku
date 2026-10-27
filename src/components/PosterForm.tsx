"use client";

// Mengumpulkan informasi produk untuk poster.
import { useState } from "react";
import type { PosterRequest } from "@/lib/styles";
import type { Status } from "./usePosterku";
import { prettyModel } from "@/lib/format";
import { StylePicker } from "./StylePicker";
import { RatioPicker } from "./RatioPicker";
import { PhotoDrop } from "./PhotoDrop";

export function PosterForm({
  busy,
  disabled,
  status,
  onCreate,
}: {
  busy: boolean;
  disabled: boolean;
  status: Status | null;
  onCreate: (form: PosterRequest, photo?: File) => void;
}) {
  const [form, setForm] = useState<PosterRequest>({
    product: "",
    description: "",
    promo: "",
    style: "minimalis",
    ratio: "1:1",
    withPhoto: false,
  });
  const [photo, setPhoto] = useState<File>();

  function modelNote() {
    if (!status) return "Memuat konfigurasi…";

    const imageModel = photo ? status.models.photo : status.models.image;

    return `Teks: ${prettyModel(status.models.text)} · Gambar: ${prettyModel(imageModel)}`;
  }

  return (
    <form
      className="card form-card"
      onSubmit={(e) => {
        e.preventDefault();

        onCreate(form, photo);
      }}
    >
      <div className="section-heading">
        <span className="number">01</span>
        <div>
          <h2>Ceritakan produkmu</h2>
          <p>Ide darimu, sentuhan kreatif dari AI.</p>
        </div>
      </div>
      <fieldset disabled={busy || disabled} className="form-fields">
        <div>
          <label htmlFor="product">
            Nama produk <span className="required">*</span>
          </label>
          <input
            id="product"
            required
            maxLength={60}
            value={form.product}
            placeholder="Contoh: Kopi Susu Senja"
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          />
          <small className="counter">{form.product.length}/60</small>
        </div>
        <div>
          <label htmlFor="description">Deskripsi singkat</label>
          <textarea
            id="description"
            maxLength={500}
            rows={3}
            value={form.description}
            placeholder="Kopi susu gula aren, 250ml, tanpa pengawet"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <small className="counter">{form.description.length}/500</small>
        </div>
        <div>
          <label htmlFor="promo">
            Promo / ajakan <span>(opsional)</span>
          </label>
          <input
            id="promo"
            maxLength={100}
            value={form.promo}
            placeholder="Diskon 20% khusus minggu ini"
            onChange={(e) => setForm({ ...form, promo: e.target.value })}
          />
          <small className="counter">{form.promo.length}/100</small>
        </div>
        <StylePicker
          value={form.style}
          onChange={(style) => setForm({ ...form, style })}
        />
        <RatioPicker
          value={form.ratio}
          onChange={(ratio) => setForm({ ...form, ratio })}
        />
        <PhotoDrop photo={photo} onChange={setPhoto} />
        <button
          className="primary create-button"
          disabled={busy || disabled}
          type="submit"
        >
          {busy ? (
            <>
              <span className="spinner" /> Sedang membuat…
            </>
          ) : (
            <>
              ✦ &nbsp; Buat Poster <span>↗</span>
            </>
          )}
        </button>
      </fieldset>
      <p className="model-note">{modelNote()}</p>
    </form>
  );
}
