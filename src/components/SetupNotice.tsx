"use client";

// Menjelaskan konfigurasi awal aplikasi.


export function SetupNotice() {
  return (
    <section className="setup-notice">
      <h2>Siapkan studio PosterKu</h2>
      <p>
        Tambahkan konfigurasi berikut di <code>.env.local</code> atau
        Environment Variables di Vercel, lalu mulai ulang aplikasi.
      </p>
      <ol>
        <li>
          Ambil kunci API di{" "}
          <a href="https://yorai.id/app/api" target="_blank" rel="noreferrer">
            yorai.id/app/api
          </a>
          .
        </li>
        <li>
          Isi <code>YORAI_API_KEY=kunci_kamu</code>.
        </li>
        <li>
          Untuk latihan tanpa kredit, gunakan <code>DEMO_MODE=true</code>.
        </li>
      </ol>
    </section>
  );
}
