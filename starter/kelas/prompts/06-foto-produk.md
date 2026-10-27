# Sesi 6: Foto produk asli → poster (image-to-image)

**Tujuan:** pengguna mengunggah foto produk, lalu AI menjadikannya poster
dengan produk yang tetap mirip aslinya.
**Biaya:** nano-banana-2-lite ±0,416 kredit ≈ Rp416 per poster.
**Waktu:** 30–45 menit.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: fitur foto produk.

- Di browser, sebelum diunggah, perkecil foto ke maksimal 1600px sisi terpanjang
  dan ubah ke JPEG kualitas 0.88 (batas upload Vercel 4,5 MB). Tolak file yang
  bukan gambar.
- POST /api/upload: terima file (jpeg/png/webp, maksimal 4 MB), teruskan ke
  POST /files Yorai, kembalikan {fileId}. Mode demo: kembalikan id palsu.
- Jika ada foto, /api/generate memakai YORAI_PHOTO_MODEL dengan type
  "image-to-image" dan input image_urls: [fileId]. Cek nama input di
  https://yorai.id/docs/api/models/nano-banana-2-lite.md.
- prompts.ts: saat ada foto, prompt gambar harus menekankan "pertahankan produk
  dari foto referensi persis sama, ubah latar, pencahayaan, dan tata letak
  menjadi poster".
- Progres menampilkan langkah tambahan "Mengunggah foto".

Uji SEKALI dengan foto sungguhan. Commit "Poster dari foto produk".
```

## Cek hasil

- [ ] Produk di poster mirip foto aslinya
- [ ] Foto besar dari HP (±5–10 MB) tetap bisa diproses
