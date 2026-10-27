"use client";

// Meminta kode akses sebelum menggunakan studio.
import { useEffect, useRef, useState } from "react";

export function PasscodeDialog({
  open,
  error,
  onSubmit,
}: {
  open: boolean;
  error: string;
  onSubmit: (code: string) => Promise<void>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [code, setCode] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();

    if (!open) dialog.current?.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className="passcode-dialog"
      aria-labelledby="passcode-title"
      onCancel={(e) => e.preventDefault()}
    >
      <span className="logo">✦</span>
      <h2 id="passcode-title">Selamat datang di studio</h2>
      <p>Masukkan kode akses untuk mulai membuat poster.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          setWaiting(true);

          try {
            await onSubmit(code);
          } finally {
            setWaiting(false);
          }
        }}
      >
        <label htmlFor="passcode">Kode akses</label>
        <input
          autoFocus
          id="passcode"
          type="password"
          autoComplete="current-password"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error && (
          <p role="alert" className="error-text">
            {error}
          </p>
        )}
        <button className="primary" disabled={waiting}>
          {waiting ? "Memeriksa…" : "Masuk studio →"}
        </button>
      </form>
    </dialog>
  );
}
