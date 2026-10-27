"use client";

// Menampilkan pesan kegagalan yang mudah dipahami.


export function ErrorAlert({ message }: { message: string }) {
  return message ? (
    <div className="error-alert" role="alert">
      <strong>Belum berhasil</strong>
      <p>{message}</p>
    </div>
  ) : null;
}
