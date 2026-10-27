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
