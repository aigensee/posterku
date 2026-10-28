# Langkah 0: Persiapan (kerjakan sebelum kelas)

Waktu: ±45 menit. Semua gratis, kecuali kredit Yorai (cukup Rp10.000).

## 1. Akun

| Akun | Untuk apa | Link |
|---|---|---|
| GitHub | menyimpan kode online | https://github.com/signup |
| Vercel | mempublikasikan aplikasi (gratis) | https://vercel.com/signup, pilih **Continue with GitHub** |
| Yorai | API AI (teks, gambar, video) | https://yorai.id/register |
| Google (Antigravity) **atau** ChatGPT (Codex) | agen AI programmer | lihat bagian 3 |

## 2. Program di komputer

1. **Node.js LTS**: https://nodejs.org, unduh versi LTS lalu instal (Next, Next, Finish).
2. **Git**: Windows dari https://git-scm.com. Di macOS biasanya sudah ada; kalau
   diminta memasang "Command Line Tools", setujui.
3. **Google Chrome** (dipakai agen untuk mengetes tampilan).

Tidak perlu belajar perintah apa pun. Agen yang akan menjalankannya.

## 3. Pilih alat AI (boleh dua-duanya)

### A. Google Antigravity (disarankan untuk pemula)

1. Unduh dari https://antigravity.google, instal, login dengan akun Google.
2. Saat pertama dibuka, pilih mode agen yang **meminta persetujuan** untuk hal
   penting (jangan mode yang serba otomatis tanpa review) supaya kamu tetap
   bisa melihat apa yang dikerjakan.
3. Pasang ekstensi browser Antigravity bila ditawarkan. Dengan ekstensi itu,
   agen bisa membuka aplikasimu dan mengetesnya sendiri.
4. Aturan proyek otomatis terbaca dari folder `.agents/rules/`. Pintasan kerja
   siap pakai: `/jalankan`, `/cek-kualitas`, `/simpan`, `/batalkan`, `/publish`.

### B. ChatGPT Codex

Butuh langganan ChatGPT yang menyertakan Codex. Pilih salah satu:

- **Codex di komputer** (aplikasi Codex, ekstensi VS Code/Cursor, atau CLI):
  bekerja langsung di folder proyekmu. Ini yang paling mirip Antigravity.
- **Codex di web** (chatgpt.com/codex): bekerja di repository GitHub. Hasilnya
  berupa *pull request* yang kamu *merge* di GitHub. Bagus untuk tahap
  publish, tapi kamu tidak bisa melihat `localhost` dari sana.

Codex otomatis membaca `AGENTS.md`. Pintasan `/jalankan` dan lainnya khusus
Antigravity; di Codex, ketik saja kalimatnya, misalnya *"Jalankan aplikasinya
dan beri tahu alamatnya"*.

## 4. Siapkan Yorai

1. Login di https://yorai.id, lalu isi kredit di **Kredit** (Rp10.000 cukup untuk
   ±100 gambar latihan).
2. Buka https://yorai.id/app/api dan klik **Buat key**. Beri nama `posterku`.
3. **Salin key dan simpan di catatan pribadi.** Key hanya ditampilkan sekali.
   Jangan kirim ke siapa pun, termasuk ke chat AI.

## 5. Ambil starter kit

1. Buka repository kelas (link dari pengajar), lalu **Code → Download ZIP**.
2. Ekstrak, lalu salin folder `starter` ke tempat yang mudah dicari, misalnya
   `Documents/posterku`.
3. Buka folder itu di Antigravity (**Open Folder**) atau di Codex.

Isi starter: `AGENTS.md` (aturan dan cetak biru untuk AI), `.agents/` (aturan +
pintasan Antigravity), dan `kelas/` (materi ini). Belum ada kode sama sekali;
kodenya akan dibuat oleh AI selama kelas.
