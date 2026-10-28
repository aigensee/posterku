# Publish ke Vercel, klik demi klik

Vercel menyediakan paket **Hobby** gratis untuk proyek pribadi/non-komersial.
Setiap kali kode di GitHub berubah, Vercel otomatis memperbarui situsmu.

## A. Kode ke GitHub

**Cara termudah:** minta agen (`/publish` di Antigravity, atau prompt
`kelas/prompts/06-publish.md` di Codex). Agen akan membuat repository dan
mengunggah kodenya.

**Kalau agen tidak bisa login GitHub:**

1. Buka https://github.com/new, isi nama `posterku`, pilih **Private**, lalu
   klik **Create repository**. Jangan centang README.
2. Salin link repository (`https://github.com/<nama>/posterku.git`).
3. Ke agen: *"Hubungkan proyek ini ke <link> lalu push. Jika butuh login,
   pandu saya."* Biasanya akan muncul jendela login GitHub di browser.

## B. Import ke Vercel

1. Buka https://vercel.com/new, lalu login dengan GitHub.
2. Di **Import Git Repository**, klik **Install/Adjust GitHub App** bila
   `posterku` belum terlihat, beri akses ke repository itu, lalu klik
   **Import**.
3. Framework otomatis terdeteksi sebagai **Next.js**. Jangan ubah pengaturan
   build.
4. Buka bagian **Environment Variables** dan tambahkan satu per satu:

   | Key | Value |
   |---|---|
   | `YORAI_API_KEY` | key dari https://yorai.id/app/api |
   | `APP_PASSCODE` | kode akses pilihanmu, misalnya `posterku2026` |
   | `DEMO_MODE` | `false` |

   Variabel model (`YORAI_TEXT_MODEL` dan lainnya) tidak perlu diisi; nilai
   bawaannya sudah benar.
5. Klik **Deploy**. Tunggu sampai muncul confetti 🎉, lalu klik gambar
   pratinjau untuk membuka situsmu.

## C. Setelah online

- Link-nya berbentuk `posterku-xxxx.vercel.app`. Bisa diganti di **Settings →
  Domains** (misalnya `posterku-namakamu.vercel.app`).
- Ubah sesuatu? Minta agen mengubah, cek, commit, dan push. Vercel otomatis
  deploy ulang dalam ±1 menit.
- Mengganti key/kode akses: **Settings → Environment Variables**, ubah nilainya,
  lalu **Deployments → ⋯ → Redeploy**.

## Masalah umum

| Gejala | Penyebab | Solusi |
|---|---|---|
| Deploy merah (Failed) | build error | salin log, lalu pakai prompt "Error saat deploy" di `PROMPT-DARURAT.md` |
| Halaman menampilkan panduan pengaturan | `YORAI_API_KEY` belum diisi | isi di Environment Variables, lalu Redeploy |
| "Kode akses salah" terus | salah ketik / spasi | cek nilai `APP_PASSCODE` di Vercel |
| "Saldo kredit tidak cukup" | kredit Yorai habis | isi ulang di yorai.id |
| Upload foto gagal | foto terlalu besar | aplikasi sudah memperkecil foto; kalau masih gagal, pakai foto lain |
