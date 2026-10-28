# Sesi 5: Menyambungkan AI gambar

**Tujuan:** tombol Buat menghasilkan gambar dari AI sungguhan.
**Biaya:** z-image ±0,084 kredit ≈ Rp84 per gambar.
**Waktu:** 45 menit.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: sambungkan pembuatan gambar ke
Yorai sungguhan (mode demo tetap berfungsi).

Baca dulu https://yorai.id/docs/api/models/z-image.md dan pastikan entri
z-image di src/lib/models.ts (tipe, rasio, panjang prompt) sesuai.
- /api/quote: teruskan body dari jobs.ts ke POST /quote, kembalikan {credits}.
- /api/generate: cek harga dulu dengan POST /quote, lalu POST /jobs dengan
  header Idempotency-Key acak. Kembalikan job + biaya hasil quote.
- /api/jobs/[id]: ambil GET /jobs/{id} dan sederhanakan menjadi
  {id, status, credits, fileId, mime, expiresAt, error}.
- /api/file/[id]: teruskan file dari GET /files/{id} (butuh key) ke browser
  dengan nama unduhan posterku-xxxx.jpg/png. Validasi id ketat (UUID). Kalau
  kedaluwarsa (410), tampilkan "File sudah kedaluwarsa".
- /api/balance: saldo dari GET /balance; tampilkan di top bar sebagai chip
  "◈ 9,52" (format Indonesia) dengan perkiraan Rupiah di tooltip. Segarkan
  setelah setiap job selesai.

Uji SEKALI dengan AI sungguhan. Commit "Gambar dari AI".
```

## Cek hasil

- [ ] Biaya di tombol Buat muncul sebelum diklik (±0,084)
- [ ] Gambar sungguhan muncul di grid dalam ±10–30 detik
- [ ] Saldo di top bar berkurang sesuai biaya

## Diskusi

- Kenapa harus lewat `/api/file` (proxy)? File Yorai butuh API key, dan key
  tidak boleh ada di browser.
- Hasil di Yorai hilang setelah 14 hari, jadi ajak pengguna langsung mengunduh.
