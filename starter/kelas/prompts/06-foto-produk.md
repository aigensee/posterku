# Sesi 6: Foto produk asli → gambar promosi (image-to-image)

**Tujuan:** pengguna menaruh foto produk di slot "Foto referensi", lalu AI
membuat gambar promosi dengan produk yang tetap mirip aslinya.
**Biaya:** nano-banana-2-lite ±0,416 kredit ≈ Rp416 per gambar.
**Waktu:** 30–45 menit.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: fitur foto referensi.

Baca dulu https://yorai.id/docs/api/models/nano-banana-2-lite.md (nama input
gambar dan tipenya), lalu lengkapi entrinya di src/lib/models.ts.
- Slot referensi di composer hanya muncul untuk model yang menerima gambar.
  Seret & lepas atau klik, ada pratinjau dan tombol hapus.
- Di browser, sebelum diunggah, perkecil foto ke maksimal 1600px sisi terpanjang
  dan ubah ke JPEG kualitas 0.88 (batas upload Vercel 4,5 MB). Tolak file yang
  bukan gambar.
- POST /api/upload: terima file (jpeg/png/webp, maksimal 4 MB), teruskan ke
  POST /files Yorai, kembalikan {fileId}. Mode demo: id palsu.
- /api/quote dan /api/generate menerima uploadFileId; jobs.ts memakai tipe
  image-to-image dan field gambar dari models.ts.
- Kalau model yang dipilih tidak menerima gambar (z-image), beri tahu pengguna
  dan tawarkan pindah ke model yang bisa.

Uji SEKALI dengan foto sungguhan. Commit "Gambar dari foto produk".
```

## Cek hasil

- [ ] Produk di hasil mirip foto aslinya
- [ ] Foto besar dari HP (±5–10 MB) tetap bisa diproses
- [ ] Biaya di tombol Buat berubah saat foto ditambahkan
