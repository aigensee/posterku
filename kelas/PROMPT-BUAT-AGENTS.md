# Prompt: minta AI membuatkan buku aturan (`AGENTS.md`) untukmu

Kamu tidak perlu tahu cara menulis `AGENTS.md`. Cukup ceritakan idemu dengan
bahasa sehari-hari, lalu AI yang menyusun buku aturannya. Buku aturan itu
memuat standar kualitas, keamanan, dan cara kerja, sama seperti yang dipakai
untuk PosterKu.

Ada dua cara. Pilih salah satu:

| Cara | Cocok untuk |
|---|---|
| **A. Diwawancarai AI** | kamu belum yakin mau membuat apa; AI bertanya satu per satu |
| **B. Isi formulir singkat** | kamu sudah tahu idenya; cukup isi titik-titik |

Keduanya dipakai di **folder kosong** yang sudah dibuka di Antigravity
(tampilan Editor) atau Codex. Lihat [MULAI-DARI-NOL.md](MULAI-DARI-NOL.md)
bagian 1.

---

## Cara A: diwawancarai AI

Salin kotak ini, kirim, lalu jawab pertanyaan AI dengan bahasamu sendiri.
Jawab "tidak tahu" pun boleh; AI akan memberi saran.

~~~~
Saya tidak bisa ngoding sama sekali. Saya ingin membuat aplikasi web generator
AI memakai API Yorai (https://yorai.id/llms.txt), lalu mempublikasikannya
gratis di Vercel. Kamu yang akan menulis semua kodenya nanti.

Sebelum membuat kode apa pun, bantu saya menyusun buku aturan proyek.

TAHAP 1 — WAWANCARA
Wawancarai saya dengan bahasa Indonesia yang sangat sederhana, SATU pertanyaan
per pesan, maksimal 8 pertanyaan. Berikan contoh jawaban di setiap pertanyaan.
Tanyakan:
1. Nama aplikasinya.
2. Untuk siapa (contoh: pemilik UMKM, guru, content creator).
3. Apa yang dihasilkan (teks, gambar, video, atau suara) dan contohnya.
4. Apa yang diisi pengguna (contoh: nama produk, foto produk, gaya).
5. Fitur yang wajib ada di versi pertama (maksimal 5).
6. Kesan tampilan (contoh: gelap elegan seperti studio, ceria, minimalis).
7. Apakah aplikasinya perlu kode akses supaya kredit tidak dipakai orang asing.
8. Apa saja yang sebaiknya TIDAK dibuat dulu.
Setelah semua terjawab, ringkas jawaban saya dalam 5–8 poin dan tanyakan
"Sudah benar?". Lanjut hanya kalau saya bilang benar.

TAHAP 2 — RISET
Baca https://yorai.id/llms.txt dan https://yorai.id/docs/api/llms-full.txt.
Pilih model Yorai yang paling cocok dan paling hemat untuk kebutuhan saya,
lalu baca halaman https://yorai.id/docs/api/models/<slug>.md untuk tiap model
yang dipilih. Sebutkan perkiraan biaya per hasil dalam Rupiah
(1 kredit = Rp1.000).

TAHAP 3 — TULIS FILE
Jalankan "git init" bila belum, lalu buat file-file di bawah. Jangan membuat
kode aplikasi.

(a) AGENTS.md, dengan bagian berikut (bahasa Indonesia, jelas, tidak bertele-tele):
  1. Cara berkomunikasi: pengguna tidak bisa ngoding; bahasa sederhana; tulis
     rencana singkat (maks 5 poin) sebelum mengubah; tanya izin hanya untuk
     library baru, menghapus fitur, atau sesuatu yang memakai biaya; jalankan
     semua perintah terminal sendiri, jangan pernah menyuruh pengguna mengetik
     perintah atau mengedit file kecuali mengisi rahasia di .env.local; laporan
     akhir selalu 4 bagian: Yang berubah, Cara mengecek, Hasil pemeriksaan,
     Langkah berikutnya.
  2. Definisi "selesai": npm run lint, npx tsc --noEmit, dan npm run build
     lulus; dicoba di browser (desktop dan lebar 390px) bila bisa; di-commit
     dengan pesan bahasa Indonesia.
  3. Standar kualitas: tampilan profesional dan nyaman di HP tanpa scroll ke
     samping; setiap aksi punya keadaan loading/berhasil/gagal; pesan error
     untuk orang awam; aksesibel; kode kecil, satu file satu tanggung jawab;
     tidak menambah library tanpa izin; semua input divalidasi di server.
  4. Keamanan dan biaya: YORAI_API_KEY hanya dibaca di server dan disimpan di
     .env.local (tidak pernah ke browser, kode, log, atau commit); ingatkan
     pengguna mencabut key bila tertempel di chat; tes memakai DEMO_MODE=true;
     panggilan sungguhan hanya bila diminta dan setelah menyebut biaya;
     semua route API dilindungi kode akses (APP_PASSCODE) bila dipakai.
  5. Tentang produk: ringkasan hasil wawancara (pengguna, alur, fitur versi
     pertama, gaya tampilan, yang tidak dibuat dulu) dan daftar model yang
     dipilih beserta tipe dan biayanya; rencana peta file (src/lib untuk
     server, src/app/api untuk route, src/components untuk tampilan).
  6. API Yorai: link dokumentasi di atas, base URL https://yorai.id/api/v1,
     header Authorization: Bearer; teks lewat POST /chat/completions; gambar,
     video, dan audio lewat POST /jobs {"model","type","input"} lalu cek
     GET /jobs/{id}; cek biaya dengan POST /quote; file lewat POST /files dan
     GET /files/{id} (hasil hilang setelah 14 hari); selalu baca halaman .md
     model sebelum memakainya.
  Teknologi: Next.js versi terbaru (App Router, TypeScript, Tailwind), npm,
  siap deploy di Vercel.

(b) .agents/rules/proyek.md (untuk Antigravity), diawali baris
    "---", "trigger: always_on", "---", berisi ringkasan 5 aturan terpenting
    dari AGENTS.md dan perintah "Baca dan ikuti AGENTS.md".

(c) Pintasan Antigravity di .agents/workflows/, masing-masing diawali
    "---", "description: <satu kalimat>", "---", lalu langkah bernomor:
    - jalankan.md: npm install bila perlu, siapkan .env.local dengan
      DEMO_MODE=true bila belum ada, jalankan npm run dev, buka localhost,
      laporkan alamatnya.
    - cek-kualitas.md: lint, typecheck, build, cek tampilan desktop dan 390px,
      pastikan tidak ada API key di kode; perbaiki sampai lulus.
    - simpan.md: ringkas perubahan, pastikan .env.local tidak ikut, commit.
    - batalkan.md: tampilkan 5 titik simpan terakhir dengan bahasa awam, simpan
      cadangan perubahan yang belum di-commit, kembali ke titik yang dipilih.
    - publish.md: cek kualitas, pastikan .env.local tidak ikut, push ke
      repository GitHub private, lalu pandu saya mengisi Environment Variables
      di Vercel (tanpa menampilkan nilainya).

(d) .gitignore yang mengabaikan .env*.local, node_modules, dan .next.

TAHAP 4 — LAPOR
Commit dengan pesan "Buku aturan proyek". Lalu jelaskan isi AGENTS.md dalam
5 poin bahasa awam, dan usulkan 6–7 langkah pembangunan aplikasi (dari proyek
awal sampai publish), masing-masing satu kalimat, dengan langkah awal memakai
mode demo yang gratis.
~~~~

---

## Cara B: isi formulir singkat

Ganti semua teks di dalam `<...>` dengan jawabanmu, lalu kirim. Contoh
jawaban untuk PosterKu ada di dalam kurung.

~~~~
Saya tidak bisa ngoding sama sekali. Saya ingin membuat aplikasi web generator
AI memakai API Yorai (https://yorai.id/llms.txt) yang nanti dipublikasikan
gratis di Vercel. Kamu yang menulis semua kodenya.

Ide saya:
- Nama aplikasi: <PosterKu Studio>
- Untuk siapa: <pemilik UMKM yang memakai HP>
- Yang dihasilkan: <gambar dan video promosi produk>
- Yang diisi pengguna: <prompt, atau nama produk + deskripsi + promo + gaya;
  boleh menambah foto produk>
- Fitur wajib versi pertama: <tombol Prompt otomatis yang menulis prompt dan
  caption; pilihan gambar/video, model, rasio; biaya tampil sebelum klik;
  riwayat hasil; tombol Animasikan gambar menjadi video>
- Kesan tampilan: <seperti studio kreatif Yorai: gelap, elegan, ada mode terang>
- Perlu kode akses: <ya>
- Jangan dibuat dulu: <login pengguna, pembayaran>

Sebelum membuat kode apa pun, susun buku aturan proyek:
1. Baca https://yorai.id/llms.txt dan https://yorai.id/docs/api/llms-full.txt,
   pilih model Yorai yang paling cocok dan hemat, baca halaman .md tiap model
   (https://yorai.id/docs/api/models/<slug>.md), lalu sebutkan perkiraan biaya
   per hasil dalam Rupiah (1 kredit = Rp1.000).
2. Jalankan "git init" bila belum, lalu buat AGENTS.md berbahasa Indonesia
   dengan 6 bagian:
   (1) cara berkomunikasi dengan pengguna yang tidak bisa ngoding (bahasa
   sederhana, rencana singkat dulu, jalankan semua perintah sendiri, laporan 4
   bagian: Yang berubah / Cara mengecek / Hasil pemeriksaan / Langkah
   berikutnya);
   (2) definisi "selesai" (lint, typecheck, build lulus; dicoba di browser
   desktop dan 390px; commit berbahasa Indonesia);
   (3) standar kualitas (profesional, nyaman di HP, loading/berhasil/gagal,
   pesan error awam, aksesibel, kode kecil, tanpa library baru tanpa izin,
   validasi input di server);
   (4) keamanan dan biaya (API key hanya di server dan .env.local, DEMO_MODE
   untuk tes, sebut biaya sebelum memanggil API sungguhan, kode akses
   APP_PASSCODE untuk semua route API);
   (5) tentang produk (ringkasan ide saya, model yang dipilih, rencana peta
   file);
   (6) ringkasan API Yorai (/chat/completions, /jobs, /quote, /files, hasil
   hilang 14 hari, selalu baca halaman .md model).
   Teknologi: Next.js versi terbaru (App Router, TypeScript, Tailwind), npm.
3. Buat juga .agents/rules/proyek.md (frontmatter "trigger: always_on") berisi
   ringkasan aturan, dan pintasan Antigravity di .agents/workflows/:
   jalankan, cek-kualitas, simpan, batalkan, publish (frontmatter
   "description:"), plus .gitignore untuk .env*.local, node_modules, .next.
4. Jangan membuat kode aplikasi. Commit "Buku aturan proyek", lalu jelaskan
   isi AGENTS.md dalam 5 poin bahasa awam dan usulkan 6–7 langkah pembangunan
   (mulai dari mode demo yang gratis sampai publish).
~~~~

---

## Setelah buku aturannya jadi

1. Buka **chat baru** (ikon **+**) supaya aturan baru terbaca dari awal.
2. Tes dengan prompt ini:

   ```
   Sebutkan 3 aturan terpenting dari AGENTS.md proyek ini, dalam bahasa awam.
   ```

3. Bangun aplikasinya langkah demi langkah:
   - **Untuk PosterKu:** pakai prompt Langkah 1–7 di
     [PROMPT-LENGKAP.md](PROMPT-LENGKAP.md).
   - **Untuk idemu sendiri:** minta AI menjalankan usulan langkahnya satu per
     satu, misalnya *"Kerjakan langkah 1 dari usulanmu tadi saja."* Setelah
     selesai, cek hasilnya di `localhost:3000`, ketik `/simpan`, lalu lanjut
     *"Kerjakan langkah 2."*

## Kalau isi AGENTS.md kurang pas

Kamu tidak perlu mengedit file itu sendiri. Cukup minta:

```
Ubah AGENTS.md: <apa yang ingin diubah, misalnya "tampilannya ceria dengan
warna hijau" atau "tambahkan fitur bagikan ke WhatsApp di versi pertama">.
Tunjukkan bagian yang berubah dalam bahasa awam, lalu commit.
```
