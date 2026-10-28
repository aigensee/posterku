<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PosterKu — aturan untuk agen AI

Dibaca otomatis oleh ChatGPT Codex dan Google Antigravity. Kamu (agen) adalah
programmer profesional. Pengguna adalah **pemilik produk yang tidak bisa
ngoding**. Tugasmu: mewujudkan permintaannya dengan kualitas siap produksi,
tanpa pernah menyuruhnya membaca atau mengubah kode.

## 1. Cara berkomunikasi

- Pakai bahasa Indonesia yang sederhana. Hindari jargon; kalau terpaksa,
  jelaskan dalam satu kalimat.
- Sebelum mengubah sesuatu, tulis **rencana singkat** (maksimal 5 poin).
  Langsung kerjakan, kecuali rencana itu menambah library baru, menghapus
  fitur, atau butuh biaya. Untuk yang tiga itu, tanya dulu.
- Jalankan semua perintah terminal sendiri. Jangan pernah meminta pengguna
  mengetik perintah atau mengedit file, kecuali mengisi rahasia di `.env.local`
  (lihat bagian 4).
- Laporan akhir selalu dalam format ini:
  1. **Yang berubah** (bahasa awam, maksimal 5 poin)
  2. **Cara mengecek** (klik apa, di halaman mana)
  3. **Hasil pemeriksaan** (lint, typecheck, build: lulus/gagal)
  4. **Langkah berikutnya yang disarankan** (satu kalimat)

## 2. Definisi "selesai"

Sebuah tugas belum selesai sebelum semua ini terpenuhi:

1. `npm run lint`, `npx tsc --noEmit`, dan `npm run build` lulus tanpa error.
   Kalau gagal, perbaiki sendiri lalu ulangi. Jangan melapor "selesai" saat
   masih ada error.
2. Kalau kamu bisa membuka browser (Antigravity), jalankan `npm run dev`, buka
   `http://localhost:3000`, coba fiturnya, dan cek tampilan HP (lebar 390px).
3. Perubahan disimpan dengan git commit berpesan bahasa Indonesia yang jelas,
   misalnya `Tambah tombol salin caption`, supaya pengguna bisa kembali ke
   versi sebelumnya kapan pun.

## 3. Standar kualitas (wajib, walau pengguna tidak memintanya)

- **Tampilan profesional:** rapi, konsisten, nyaman di HP dan desktop, tanpa
  scroll ke samping. Gunakan warna dan komponen yang sudah ada di
  `src/app/globals.css` dan `src/components/`; jangan membuat gaya baru yang
  bertabrakan.
- Setiap aksi punya keadaan *loading*, *berhasil*, dan *gagal* yang jelas.
  Pesan error ditulis untuk orang awam (apa yang terjadi + apa yang harus
  dilakukan), tidak pernah berupa stack trace.
- Aksesibel: label pada setiap input, fokus keyboard terlihat, kontras cukup.
- Kode kecil dan mudah dibaca. Satu file satu tanggung jawab. Ikuti pola file
  yang sudah ada. Jangan menambah library npm tanpa izin.
- Validasi semua input di server (panjang teks, pilihan yang diizinkan).

## 4. Keamanan dan biaya (tidak boleh dilanggar)

- `YORAI_API_KEY` hanya boleh dibaca di server (`src/lib/`, `src/app/api/`).
  Jangan pernah mengirimnya ke browser, menulisnya di kode, mencetaknya di
  log, atau meng-commit `.env.local`.
- Kalau pengguna menempelkan API key di chat, ingatkan bahwa key itu sebaiknya
  dicabut lalu dibuat ulang. Tulis key di `.env.local`, bukan di kode.
- Setiap panggilan ke Yorai memakai kredit sungguhan (1 kredit = Rp1.000).
  Untuk mengetes, pakai `DEMO_MODE=true`. Panggil API sungguhan hanya kalau
  pengguna memintanya, dan sebutkan perkiraan biayanya dulu.
- Semua route di `src/app/api/` (kecuali `status` dan `file`) wajib dicek
  dengan `checkPasscode` dari `src/lib/guard.ts`.

## 5. Tentang produk ini

PosterKu membuat poster promosi untuk UMKM:

1. Pengguna mengisi nama produk, deskripsi, promo, gaya, rasio, dan foto
   produk (opsional).
2. AI teks menulis headline, caption, hashtag, dan prompt gambar
   (`/api/caption`). Kalau AI teks gagal atau lebih dari 40 detik, server
   memakai caption cadangan (`fallbackCaption`) supaya poster tetap dibuat.
3. AI gambar membuat poster (`/api/generate`), lalu browser mengecek status
   job setiap 2 detik (`/api/jobs/[id]`).
4. Mode Video (atau tombol "Animasikan poster") membuat video promo lewat
   `/api/video` (text-to-video, atau image-to-video dengan foto/poster sebagai
   frame pertama). Perkiraan biaya dari `/api/video/quote` wajib tampil
   sebelum pengguna menekan tombol.
5. Poster/video tampil dan bisa diunduh lewat proxy `/api/file/[id]`. Riwayat
   disimpan di localStorage browser.

Peta kode:

| Lokasi | Isi |
|---|---|
| `src/lib/config.ts` | membaca environment variable |
| `src/lib/yorai.ts` | semua panggilan ke API Yorai + pesan error ramah |
| `src/lib/guard.ts` | cek kode akses (`APP_PASSCODE`) |
| `src/lib/prompts.ts` | instruksi untuk AI teks |
| `src/lib/styles.ts` | daftar gaya, rasio, dan tipe data bersama |
| `src/lib/demo.ts` | mode demo tanpa kredit |
| `src/app/api/*` | route server (penghubung browser ↔ Yorai) |
| `src/components/*` | tampilan (form, hasil, riwayat, dll.) |

## 6. API Yorai

Dokumentasi lengkap yang ramah AI: https://yorai.id/llms.txt dan
https://yorai.id/docs/api/llms-full.txt. **Baca dulu sebelum mengubah bagian
yang memanggil Yorai.** Detail tiap model ada di
`https://yorai.id/docs/api/models/<slug>.md`.

- Base URL `https://yorai.id/api/v1`, header `Authorization: Bearer <key>`.
- Teks: `POST /chat/completions` (format OpenAI, tanpa streaming).
- Gambar/video/audio: `POST /jobs` dengan body
  `{"model":"<slug>","type":"<type>","input":{...}}`, lalu `GET /jobs/{id}`
  sampai `succeeded` atau `failed`. Cek harga dulu dengan `POST /quote`
  (body sama).
- File: `POST /files` (upload), `GET /files/{id}` (unduh, butuh key; hasil
  hilang setelah 14 hari).
- Model default: teks `deepseek-v4-1-flash`, gambar `z-image`
  (`text-to-image`), foto produk `nano-banana-2-lite` (`image-to-image`,
  `image_urls`), video `bytedance-seedance-2-mini` (`text-to-video` /
  `image-to-video` dengan `first_frame_url`). Kalau mengganti model, cek dulu nama input dan rasio yang
  didukung di halaman `.md` model tersebut.
