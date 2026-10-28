# PosterKu

Generator poster promosi untuk UMKM. Isi nama produk, pilih gaya, lalu AI
menuliskan caption + hashtag dan membuat posternya. Ditenagai
[Yorai AI API](https://yorai.id/docs/api), dibangun dengan Next.js, dan bisa
dipublikasikan gratis di Vercel.

**Demo (mode demo, tanpa kredit):** https://posterku-one.vercel.app

> Repository ini adalah **contoh untuk kelas "AI tanpa ngoding"**. Materi dan
> prompt kelas ada di [`kelas/`](kelas/README.md); titik mulai peserta ada di
> [`starter/`](starter/).

## Fitur

- Caption, headline, dan hashtag bahasa Indonesia dari AI teks (`deepseek-v4-1-flash`), dengan caption cadangan otomatis bila AI teks sedang gangguan
- Poster dari AI gambar (`z-image`), atau dari foto produk asli (`nano-banana-2-lite`)
- 5 gaya visual dan 4 rasio (Feed, Portrait, Story/Reels, Banner)
- Progres langkah demi langkah, unduh, salin caption, buat variasi, edit prompt
- Riwayat 12 poster terakhir (disimpan di browser)
- Saldo kredit Yorai di header, biaya tiap poster
- Kode akses (`APP_PASSCODE`) agar aplikasi publik tidak dipakai orang lain
- **Mode demo** untuk latihan tanpa kredit

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
| `YORAI_TEXT_MODEL` | tidak | bawaan `deepseek-v4-1-flash` |
| `YORAI_IMAGE_MODEL` | tidak | bawaan `z-image` |
| `YORAI_PHOTO_MODEL` | tidak | bawaan `nano-banana-2-lite` |

\* Tidak wajib jika `DEMO_MODE=true`.

## Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Di https://vercel.com/new, import repository-nya.
3. Isi `YORAI_API_KEY`, `APP_PASSCODE`, dan `DEMO_MODE=false` di Environment
   Variables, lalu klik **Deploy**.

Panduan klik demi klik: [`kelas/PUBLISH-VERCEL.md`](kelas/PUBLISH-VERCEL.md).
Paket Hobby Vercel hanya untuk penggunaan non-komersial.

## Cara kerjanya

```
Browser ──► /api/caption ──► Yorai POST /chat/completions   (caption + prompt gambar)
        ──► /api/upload  ──► Yorai POST /files              (opsional: foto produk)
        ──► /api/generate──► Yorai POST /quote + POST /jobs (buat poster)
        ──► /api/jobs/:id──► Yorai GET /jobs/{id}           (dicek tiap 2 detik)
        ──► /api/file/:id──► Yorai GET /files/{id}          (tampilkan & unduh)
```

API key tidak pernah dikirim ke browser; semua panggilan ke Yorai lewat
route server di `src/app/api/`. Hasil di Yorai disimpan 14 hari.
