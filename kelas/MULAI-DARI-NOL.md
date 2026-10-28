# Mulai dari nol (tanpa clone, tanpa unduh)

Panduan ini untuk membuat PosterKu Studio dari **folder yang benar-benar
kosong**. Kamu tidak mengunduh apa pun dari repository kelas. Semua file,
termasuk buku aturannya, dibuat oleh agen AI dari prompt di halaman ini.

## Kenapa ada "buku aturan" dulu?

Agen AI bekerja jauh lebih rapi kalau sejak awal tahu aturannya: siapa
penggunanya, standar kualitas, larangan soal API key, kapan tugas dianggap
selesai, dan cara memakai API Yorai. Aturan itu ditulis di file
**`AGENTS.md`**, dan agen membacanya setiap kali kamu memberi perintah.

Jadi urutannya:

1. **Prompt 0A**: agen menulis `AGENTS.md` (buku aturan).
2. **Prompt 0B**: agen menulis aturan + pintasan khusus Antigravity
   (`/jalankan`, `/simpan`, dll.).
3. **Langkah 1–7**: agen membangun aplikasinya.

> **Ingin buku aturan untuk ide aplikasimu sendiri?** Ganti Prompt 0A dan 0B
> dengan prompt di [PROMPT-BUAT-AGENTS.md](PROMPT-BUAT-AGENTS.md): AI
> mewawancaraimu lalu menulis `AGENTS.md` dan `.agents` sendiri.

Sebelum mulai, pastikan **Node.js** dan **Git** sudah terpasang (lihat
[PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md), bagian A2).

## 1. Buat folder kosong dan buka di Antigravity

1. Di **Documents**, buat folder baru bernama `posterku`.
2. Buka Antigravity dalam tampilan **Editor**. Kalau yang muncul Agent Manager,
   tekan **Cmd+E** (Mac) atau **Ctrl+E** (Windows).
3. **File → Open Folder**, pilih `Documents/posterku`, lalu **Open**. Kalau
   ditanya apakah folder dipercaya, pilih **trust**.

## 2. Prompt 0A: tulis buku aturan (`AGENTS.md`)

Salin **seluruh** kotak ini (panjang, gulir sampai habis), lalu kirim:

~~~~
Folder ini masih kosong. Jalankan "git init", lalu buat file AGENTS.md di
folder ini dengan isi PERSIS seperti di antara tanda MULAI dan SELESAI (tanpa
kedua tanda itu). Jangan membuat file lain dan jangan membuat kode aplikasi.
Setelah itu, jelaskan isinya dalam 5 poin bahasa awam.

=== MULAI ===
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

PosterKu Studio adalah studio gambar & video promosi untuk UMKM, dengan
tampilan seperti workspace Yorai:

1. **Composer** melayang di bawah layar: slot referensi (foto/frame awal),
   kolom prompt, tombol "Prompt otomatis", pill pengaturan (Gambar | Video,
   model, rasio, durasi, kualitas, suara), dan tombol **Buat** yang menampilkan
   biaya dari `/api/quote` sebelum diklik.
2. **Prompt otomatis** (asisten UMKM): nama produk, deskripsi, promo, gaya →
   AI teks menulis prompt + headline/caption/hashtag (`/api/caption`). Kalau AI
   teks gagal atau lebih dari 40 detik, server memakai caption cadangan
   (`fallbackCaption`).
3. `/api/generate` membuat job gambar/video; browser mengecek `/api/jobs/[id]`
   (gambar tiap 2 detik, video tiap 5 detik). Maksimal 3 job berjalan bersamaan.
4. **Grid masonry** dengan tab Semua/Gambar/Video. Kartu bisa Unduh, Pakai
   prompt, Animasikan (gambar → frame awal video), Hapus; klik membuka viewer
   berisi detail dan caption. File lewat proxy `/api/file/[id]`. Riwayat di
   localStorage browser.
5. Tema gelap (bawaan), terang, dan sistem.

**Daftar model ada di `src/lib/models.ts`.** Untuk menambah model: baca
halaman `.md` model itu, lalu tambahkan entrinya (rasio, tipe, nama field
gambar, durasi, resolusi). UI dan server otomatis mengikutinya.

Peta kode:

| Lokasi | Isi |
|---|---|
| `src/lib/config.ts` | membaca environment variable |
| `src/lib/models.ts` | daftar model terkurasi (dipakai UI + server) |
| `src/lib/jobs.ts` | menyusun body job Yorai dari pilihan composer |
| `src/lib/yorai.ts` | semua panggilan ke API Yorai + pesan error ramah |
| `src/lib/guard.ts` | cek kode akses (`APP_PASSCODE`) |
| `src/lib/prompts.ts` | instruksi AI teks + caption cadangan |
| `src/lib/styles.ts` | gaya visual UMKM dan tipe data bersama |
| `src/lib/demo.ts` | mode demo tanpa kredit |
| `src/app/api/*` | route server (penghubung browser ↔ Yorai) |
| `src/components/useStudio.ts` | state studio: composer, job, riwayat |
| `src/components/*` | tampilan (rail, top bar, grid, composer, viewer, dll.) |

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
- Model teks (asisten) default `deepseek-v4-1-flash` (env `YORAI_TEXT_MODEL`).
  Model gambar/video ada di `src/lib/models.ts`. Kalau menambah atau mengganti
  model, cek dulu nama input, tipe, dan rasio di halaman `.md` model tersebut.
=== SELESAI ===
~~~~

✅ Di panel kiri muncul file `AGENTS.md`.

## 3. Prompt 0B: aturan dan pintasan Antigravity

~~~~
Buat 6 file berikut dengan isi PERSIS seperti tertulis di bawah tiap judul
"=== FILE: ... ===" (judulnya jangan ikut ditulis). Buat foldernya bila belum
ada. Lalu commit semua file dengan pesan "Aturan kerja agen".

=== FILE: .agents/rules/posterku.md ===
---
trigger: always_on
---

# Aturan proyek PosterKu

Baca dan ikuti `AGENTS.md` di root proyek sebelum mengerjakan apa pun. Ringkasnya:

- Pengguna tidak bisa ngoding. Pakai bahasa Indonesia sederhana, jalankan
  semua perintah sendiri, dan jangan minta pengguna mengedit kode.
- Tulis rencana singkat dulu. Tanya izin hanya untuk library baru, menghapus
  fitur, atau sesuatu yang memakan biaya.
- Tugas baru selesai kalau `npm run lint`, `npx tsc --noEmit`, dan
  `npm run build` lulus, fitur sudah dicoba di browser (desktop dan lebar
  390px), lalu di-commit dengan pesan berbahasa Indonesia.
- `YORAI_API_KEY` hanya di server dan `.env.local`. Untuk tes, pakai
  `DEMO_MODE=true`; panggilan Yorai sungguhan memakai kredit.
- Tutup setiap tugas dengan laporan: Yang berubah / Cara mengecek / Hasil
  pemeriksaan / Langkah berikutnya.

=== FILE: .agents/workflows/jalankan.md ===
---
description: Siapkan dan jalankan aplikasi di komputer lalu buka di browser
---

1. Jika folder `node_modules` belum ada, jalankan `npm install`.
2. Jika `.env.local` belum ada, salin dari `.env.example`, lalu set `DEMO_MODE=true` agar aman tanpa kredit. Beri tahu pengguna bahwa mode demo aktif.
3. Jalankan `npm run dev` di latar belakang dan tunggu sampai muncul "Ready".
4. Buka `http://localhost:3000` di browser, ambil screenshot, dan pastikan tidak ada error di console.
5. Laporkan ke pengguna: alamat yang bisa dibuka, mode yang aktif (demo atau sungguhan), dan apa yang terlihat.

=== FILE: .agents/workflows/cek-kualitas.md ===
---
description: Periksa kualitas (lint, typecheck, build, tampilan) dan perbaiki sampai lulus
---

1. Jalankan `npm run lint`. Perbaiki semua error, lalu ulangi sampai lulus.
2. Jalankan `npx tsc --noEmit`. Perbaiki semua error, lalu ulangi sampai lulus.
3. Jalankan `npm run build`. Perbaiki semua error, lalu ulangi sampai lulus.
4. Dengan `npm run dev` berjalan, buka `http://localhost:3000` di lebar desktop dan 390px. Cek: tidak ada scroll ke samping, teks terbaca, tombol bisa diklik, tidak ada error console.
5. Pastikan `YORAI_API_KEY` tidak muncul di kode `src/components/` atau di file yang di-commit (`git grep -n "yor_live_"` harus kosong).
6. Laporkan hasil tiap langkah (lulus/gagal) dan apa saja yang diperbaiki, dalam bahasa awam.

=== FILE: .agents/workflows/simpan.md ===
---
description: Simpan progres sebagai titik aman (git commit)
---

1. Jalankan `git status` dan ringkas perubahan dalam bahasa awam.
2. Pastikan `.env.local` tidak ikut (harus diabaikan oleh `.gitignore`).
3. Jalankan `git add -A` lalu `git commit -m "<ringkasan perubahan dalam bahasa Indonesia>"`.
4. Laporkan: nama titik simpan (pesan commit) dan cara kembali ke titik ini kalau nanti ada yang rusak (cukup minta "kembalikan ke titik simpan <pesan commit>").

=== FILE: .agents/workflows/batalkan.md ===
---
description: Kembalikan aplikasi ke titik simpan terakhir yang masih berjalan baik
---

1. Tampilkan 5 titik simpan terakhir (`git log --oneline -5`) dengan penjelasan awam masing-masing.
2. Tanyakan pengguna mau kembali ke titik mana. Jika pengguna sudah menyebutkannya, lanjutkan.
3. Sebelum membatalkan, simpan perubahan yang belum di-commit dengan `git stash push -u -m "cadangan sebelum batal"` agar tidak hilang permanen.
4. Kembalikan file ke titik tersebut dengan `git restore --source <commit> -- .` lalu commit dengan pesan "Kembali ke: <pesan commit>".
5. Jalankan `/cek-kualitas` dan laporkan hasilnya.

=== FILE: .agents/workflows/publish.md ===
---
description: Periksa kesiapan lalu publikasikan aplikasi ke GitHub dan Vercel
---

1. Jalankan workflow `/cek-kualitas`. Jangan lanjut jika ada yang gagal.
2. Pastikan `.env.local` tidak ter-commit dan `.env.example` ada.
3. Jika belum ada remote GitHub, bantu pengguna membuat repository (pakai `gh repo create --private --source . --push` jika GitHub CLI sudah login; kalau belum, jelaskan langkah lewat situs github.com).
4. Jika remote sudah ada, `git push`.
5. Tunjukkan langkah Vercel dari `kelas/PUBLISH-VERCEL.md`: import repo, isi Environment Variables (`YORAI_API_KEY`, `APP_PASSCODE`, `DEMO_MODE=false`), lalu Deploy.
6. Ingatkan: jangan menempelkan API key di chat. Pengguna mengisinya sendiri di dashboard Vercel.
~~~~

✅ Di panel kiri muncul folder `.agents` berisi `rules` dan `workflows`.

## 4. Buka chat baru dan tes aturannya

Klik ikon **+** (chat baru) di panel chat supaya agen memuat aturan baru, lalu
kirim:

```
Sebutkan 3 aturan terpenting dari AGENTS.md proyek ini, dalam bahasa awam.
```

✅ Jawabannya menyebut hal seperti "API key hanya di server", "pakai mode demo
untuk tes", atau "laporan dalam 4 bagian".

## 5. Bangun aplikasinya: Langkah 1–7

Prompt Langkah 1–7 ada di
**https://github.com/aigensee/posterku/blob/main/kelas/PROMPT-LENGKAP.md**.
Buka halaman itu di browser, lalu salin kotak prompt satu per satu ke chat
agen.

- Satu kotak = satu pesan. Tunggu laporan 4 bagian, cek hasilnya di
  `localhost:3000`, lalu ketik `/simpan`.
- Prompt Langkah 1 menyebut folder `kelas`. Di cara "dari nol" folder itu
  memang tidak ada, jadi abaikan saja; agen tetap akan menjaga `AGENTS.md` dan
  `.agents`.
- Sebelum Langkah 4, isi API key Yorai di `.env.local` sendiri (bukan lewat
  chat). Caranya ada di [PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md), bagian C.
