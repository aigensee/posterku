# Sesi 5: Menyambungkan AI gambar (poster)

**Tujuan:** poster dibuat oleh AI gambar sungguhan.
**Biaya:** z-image ±0,084 kredit ≈ Rp84 per poster.
**Waktu:** 45 menit.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: sambungkan pembuatan gambar ke
Yorai sungguhan (mode demo tetap berfungsi).

- /api/generate: terima {prompt (1–1000 karakter), ratio}. Cek harga dulu
  dengan POST /quote, lalu buat job dengan POST /jobs:
  {"model": YORAI_IMAGE_MODEL, "type": "text-to-image",
   "input": {"prompt": ..., "aspect_ratio": ...}}.
  Kirim header Idempotency-Key acak. Kembalikan job + biaya hasil quote.
  Cek dulu di https://yorai.id/docs/api/models/z-image.md rasio apa saja yang
  didukung, dan sesuaikan pilihan rasio di aplikasi.
- /api/jobs/[id]: ambil GET /jobs/{id} dan sederhanakan menjadi
  {id, status, credits, fileId, mime, expiresAt, error}.
- /api/file/[id]: teruskan file dari GET /files/{id} (butuh key) ke browser,
  dengan nama unduhan posterku-xxxx.jpg/png. Validasi id ketat (format UUID).
  Kalau sudah kedaluwarsa (410), tampilkan pesan "Poster sudah kedaluwarsa".
- /api/balance: saldo dari GET /balance; tampilkan di header sebagai chip
  "Saldo 9,52 kredit" (format Indonesia) dengan perkiraan Rupiah.
- Di panel hasil, tampilkan "Biaya: 0,084 kredit (≈ Rp84)".

Uji SEKALI dengan AI sungguhan. Commit "Poster dari AI".
```

## Cek hasil

- [ ] Poster sungguhan muncul dalam ±10–30 detik
- [ ] Saldo di header berkurang sesuai biaya
- [ ] Tombol Unduh menghasilkan file gambar

## Diskusi

- Kenapa harus lewat `/api/file` (proxy)? Karena file Yorai butuh API key, dan
  key tidak boleh ada di browser.
- Hasil di Yorai hilang setelah 14 hari, jadi ajak pengguna langsung mengunduh.
