# Langkah 4: Sambungkan ke AI sungguhan (Yorai)

**Tujuan:** teks, gambar, dan video dibuat oleh AI sungguhan lewat API Yorai.
**Biaya:** Prompt otomatis < Rp10; Z-Image ±Rp84/gambar; Nano Banana 2 Lite
±Rp416/gambar; video 5 detik 480p ±Rp1.500–2.000.
**Waktu:** 45–60 menit.

## Langkah manual (satu-satunya yang kamu lakukan sendiri)

1. Buka file `.env.local` di editor.
2. Isi `YORAI_API_KEY=` dengan key dari yorai.id/app/api (tempel di sini, bukan
   di chat), lalu ubah `DEMO_MODE=false`. Simpan file.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: sambungkan studio ke Yorai
SUNGGUHAN. Saya sudah mengisi YORAI_API_KEY di .env.local; jangan tampilkan
isinya. Mode demo harus tetap berfungsi saat DEMO_MODE=true.

Baca dulu https://yorai.id/llms.txt, https://yorai.id/docs/api/llms-full.txt,
dan halaman .md tiap model di src/lib/models.ts
(https://yorai.id/docs/api/models/<slug>.md). Cocokkan tipe, nama input
gambar, rasio, durasi, dan resolusi di models.ts dengan dokumentasi itu.

1. src/lib/yorai.ts: semua panggilan Yorai (Authorization Bearer) dengan pesan
   error ramah: 401 key salah, 402 saldo kurang + link yorai.id/app/credits,
   429 terlalu cepat, 503/504, gagal koneksi.
2. /api/caption: POST /chat/completions (model YORAI_TEXT_MODEL), balasan JSON
   {headline, caption, hashtags, image_prompt, video_prompt} dengan parser yang
   tahan banting. Kalau AI teks gagal atau lebih dari 40 detik (kecuali 401/402),
   pakai caption + prompt cadangan dari template.
3. /api/quote → POST /quote. /api/generate → POST /quote lalu POST /jobs
   (header Idempotency-Key acak). Foto referensi lewat POST /files. Untuk
   Animasikan, server mengunduh hasil gambar lalu meng-upload ulang ke
   POST /files dan memakai ID barunya.
4. /api/jobs/[id] → GET /jobs/{id}, disederhanakan menjadi
   {id, status, credits, fileId, mime, expiresAt, error}.
5. /api/file/[id] → GET /files/{id}: validasi UUID, teruskan header Range
   (supaya video bisa diputar dan digeser), 410 = "File sudah kedaluwarsa".
6. /api/balance → GET /balance; chip saldo di top bar, segarkan setelah job
   selesai.

Uji SEKALI dengan AI sungguhan: Prompt otomatis "Keripik Tempe Bu Sri" lalu
satu gambar Z-Image 1:1. Sebutkan biayanya sebelum mulai. Video sungguhan
hanya kalau saya minta. Commit "Tersambung ke Yorai".
```

## Cek hasil

- [ ] Biaya di tombol Buat muncul sebelum diklik (±0,084 untuk Z-Image)
- [ ] Gambar sungguhan muncul dalam ±10–30 detik dan saldo berkurang
- [ ] Key yang sengaja disalahkan (ubah satu huruf) memunculkan pesan "API key
      salah", bukan error teknis. Kembalikan key-nya setelah itu.

## Diskusi

- Kenapa lewat `/api/file` (proxy)? File Yorai butuh API key, dan key tidak
  boleh ada di browser.
- Kenapa ada caption cadangan? Model AI di penyedia bisa sedang gangguan.
- Hasil di Yorai hilang setelah 14 hari, jadi ajak pengguna langsung mengunduh.
