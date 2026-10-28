# Kelas: membuat Generator AI tanpa ngoding

Studi kasus: **PosterKu**, generator poster promosi UMKM yang memakai API
Yorai (AI teks + AI gambar) dan dipublikasikan gratis di Vercel. Dibangun
sepenuhnya dengan memberi instruksi ke agen AI (**Google Antigravity** atau
**ChatGPT Codex**).

## Urutan belajar

| # | File | Hasil akhir sesi |
|---|---|---|
| 0 | [00-PERSIAPAN.md](00-PERSIAPAN.md) | akun, alat, API key, starter kit |
| — | [ATURAN-PAKAI.md](ATURAN-PAKAI.md) | **baca dulu**: 10 aturan emas + rumus prompt |
| — | [CARA-PAKAI-AGENTS.md](CARA-PAKAI-AGENTS.md) | langkah demi langkah memakai `AGENTS.md` di Antigravity/Codex |
| 1 | [prompts/01-proyek-awal.md](prompts/01-proyek-awal.md) | proyek berjalan di localhost |
| 2 | [prompts/02-tampilan.md](prompts/02-tampilan.md) | halaman profesional |
| 3 | [prompts/03-mode-demo.md](prompts/03-mode-demo.md) | alur lengkap tanpa biaya |
| 4 | [prompts/04-ai-teks.md](prompts/04-ai-teks.md) | caption dari AI sungguhan |
| 5 | [prompts/05-ai-gambar.md](prompts/05-ai-gambar.md) | poster dari AI sungguhan |
| 6 | [prompts/06-foto-produk.md](prompts/06-foto-produk.md) | poster dari foto produk |
| 6b | [prompts/06b-video.md](prompts/06b-video.md) | video promo (text-to-video & animasikan poster) |
| 7 | [prompts/07-poles.md](prompts/07-poles.md) | riwayat, aksi, kode akses, audit |
| 8 | [prompts/08-publish.md](prompts/08-publish.md) + [PUBLISH-VERCEL.md](PUBLISH-VERCEL.md) | online di `.vercel.app` |
| 9 | [prompts/09-kembangkan.md](prompts/09-kembangkan.md) | fitur tantangan |
| — | [PROMPT-DARURAT.md](PROMPT-DARURAT.md) | saat error, tampilan rusak, atau AI berputar-putar |

## Cara kerja kit ini

- **`AGENTS.md`** adalah cetak biru dan aturan kerja untuk AI: siapa
  penggunanya, standar kualitas, keamanan API key, definisi "selesai", dan
  ringkasan API Yorai. Codex dan Antigravity membacanya otomatis, jadi
  prompt kita bisa pendek tetapi hasilnya tetap konsisten dan profesional.
- **`.agents/rules/`** memastikan Antigravity selalu menerapkan aturan itu.
- **`.agents/workflows/`** adalah pintasan Antigravity:

  | Ketik | Fungsinya |
  |---|---|
  | `/jalankan` | memasang dependensi, menyalakan aplikasi, membukanya di browser |
  | `/cek-kualitas` | lint, typecheck, build, dan cek tampilan, lalu perbaiki sampai lulus |
  | `/simpan` | membuat titik simpan (git commit) |
  | `/batalkan` | kembali ke titik simpan sebelumnya |
  | `/publish` | cek kesiapan, push ke GitHub, panduan Vercel |

  Di Codex, ketik saja maksudnya dengan kalimat biasa, misalnya *"jalankan
  lint, typecheck, dan build, lalu perbaiki sampai lulus"*.

## Antigravity atau Codex?

| | Antigravity | Codex (aplikasi/IDE/CLI) | Codex web |
|---|---|---|---|
| Bekerja di | folder di komputer | folder di komputer | repository GitHub |
| Bisa membuka & mengetes UI sendiri | ya (browser agent) | terbatas | tidak |
| Aturan proyek | `AGENTS.md` + `.agents/rules` | `AGENTS.md` | `AGENTS.md` |
| Pintasan `/…` | ya | tidak (pakai kalimat) | tidak |
| Cocok untuk | sesi 1–7 | sesi 1–7 | sesi 8–9 (PR → preview Vercel) |

Semua prompt di folder `prompts/` ditulis agar bisa dipakai di keduanya.
