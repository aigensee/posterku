# PosterKu Studio

Studio gambar & video promosi untuk UMKM, dengan tampilan seperti workspace
Yorai. Tulis prompt, atau biarkan **Prompt otomatis** menuliskannya dari nama
produkmu, lalu klik **Buat**. Ditenagai [Yorai AI API](https://yorai.id/docs/api),
dibangun dengan Next.js, dan bisa dipublikasikan gratis di Vercel.

**Demo:** https://posterku-one.vercel.app

> Repository ini adalah **contoh untuk kelas "AI tanpa ngoding"**. Materi dan
> prompt kelas ada di [`kelas/`](kelas/README.md); titik mulai peserta ada di
> [`starter/`](starter/).

## Fitur

- **Composer** di bawah layar: prompt, slot foto referensi / frame awal, pilihan
  Gambar | Video, model, rasio, durasi, kualitas, dan suara AI
- **Biaya tampil sebelum klik** (diambil dari Yorai `POST /quote`)
- **Prompt otomatis untuk UMKM:** nama produk, deskripsi, promo, dan gaya →
  prompt gambar/video + headline, caption, dan hashtag (`deepseek-v4-1-flash`),
  dengan caption cadangan bila AI teks sedang gangguan
- **Model terkurasi** di `src/lib/models.ts`:

  | Model | Jenis | Catatan |
  |---|---|---|
  | `z-image` | gambar | cepat & paling hemat (±Rp84) |
  | `nano-banana-2-lite` | gambar | bisa pakai foto referensi |
  | `bytedance-seedance-2-mini` | video | video + suara, rasio lengkap |
  | `grok-imagine` | video | paling hemat untuk video |

- Grid masonry dengan tab Semua/Gambar/Video, viewer detail, Unduh, Pakai prompt,
  **Animasikan** (gambar jadi frame awal video), dan Hapus
- Hingga 3 job berjalan bersamaan, panel Aktivitas, saldo kredit di top bar
- Tema gelap/terang/sistem, nyaman di HP
- Kode akses (`APP_PASSCODE`) dan **mode demo** tanpa kredit

## Menjalankan di komputer

Butuh Node.js 20 atau lebih baru.

```bash
npm install
cp .env.example .env.local   # lalu isi YORAI_API_KEY, atau set DEMO_MODE=true
npm run dev
```

Buka http://localhost:3000.

Tidak bisa ngoding? Buka folder ini di Antigravity atau Codex dan ketik
`/jalankan` (Antigravity) atau *"jalankan aplikasinya"* (Codex).

## Environment variable

| Nama | Wajib | Keterangan |
|---|---|---|
| `YORAI_API_KEY` | ya* | key dari https://yorai.id/app/api. Hanya dipakai di server. |
| `APP_PASSCODE` | disarankan | kode akses untuk memakai aplikasi |
| `DEMO_MODE` | tidak | `true` = hasil contoh, tanpa memanggil Yorai |
| `YORAI_BASE_URL` | tidak | bawaan `https://yorai.id/api/v1` |
| `YORAI_TEXT_MODEL` | tidak | model asisten Prompt otomatis, bawaan `deepseek-v4-1-flash` |

\* Tidak wajib jika `DEMO_MODE=true`. Model gambar/video diatur di
`src/lib/models.ts`, bukan lewat env.

## Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Di https://vercel.com/new, import repository-nya.
3. Isi `YORAI_API_KEY`, `APP_PASSCODE`, dan `DEMO_MODE=false` di Environment
   Variables, lalu klik **Deploy**.

Panduan klik demi klik: [`kelas/PUBLISH-VERCEL.md`](kelas/PUBLISH-VERCEL.md).
Paket Hobby Vercel hanya untuk penggunaan non-komersial.

## Cara kerjanya

```
Browser ──► /api/caption ──► Yorai POST /chat/completions      (Prompt otomatis)
        ──► /api/upload  ──► Yorai POST /files                 (foto referensi)
        ──► /api/quote   ──► Yorai POST /quote                 (biaya sebelum klik)
        ──► /api/generate──► Yorai POST /files + /quote + /jobs (gambar/video)
        ──► /api/jobs/:id──► Yorai GET /jobs/{id}              (dicek berkala)
        ──► /api/file/:id──► Yorai GET /files/{id}             (tampil & unduh)
```

API key tidak pernah dikirim ke browser; semua panggilan ke Yorai lewat
route server di `src/app/api/`. Hasil di Yorai disimpan 14 hari.
