"use client";

// Memilih dan meninjau foto produk.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function PhotoDrop({
  photo,
  onChange,
}: {
  photo?: File;
  onChange: (file?: File) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  function choose(file?: File) {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Gunakan foto JPG, PNG, atau WebP");

      return;
    }

    setError("");

    setPreview(URL.createObjectURL(file));

    onChange(file);
  }

  return (
    <div>
      <label className="field-label" htmlFor="photo">
        Foto produk <span>(opsional)</span>
      </label>
      <p className="field-hint">Hasil lebih mirip produk asli</p>
      <div
        className="photo-drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          choose(e.dataTransfer.files[0]);
        }}
      >
        <input
          ref={input}
          id="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => choose(e.target.files?.[0])}
        />
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Pratinjau foto produk"
              width={90}
              height={90}
              unoptimized
            />
            <div>
              <strong>{photo?.name}</strong>
              <button
                className="text-button"
                type="button"
                onClick={() => {
                  setPreview("");

                  onChange(undefined);

                  if (input.current) input.current.value = "";
                }}
              >
                Hapus foto
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="upload-button"
            onClick={() => input.current?.click()}
          >
            <span className="upload-icon">↥</span>
            <strong>Klik atau tarik foto ke sini</strong>
            <small>JPG, PNG, WebP · otomatis diperkecil</small>
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}
