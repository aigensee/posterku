# Sesi 4: Menyambungkan AI teks (Prompt otomatis)

**Tujuan:** tombol "Prompt otomatis" memakai AI sungguhan: dari nama produk,
AI menulis prompt gambar/video plus headline, caption, dan hashtag.
**Biaya:** sangat kecil (DeepSeek V4.1 Flash, kurang dari Rp10 per caption).
**Waktu:** 30–45 menit.

## Langkah manual (satu-satunya yang kamu lakukan sendiri)

1. Buka file `.env.local` di editor.
2. Isi `YORAI_API_KEY=` dengan key dari yorai.id/app/api (tempel di sini, bukan
   di chat), lalu ubah `DEMO_MODE=false`. Simpan file.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: sambungkan /api/caption ke AI teks
Yorai sungguhan. Saya sudah mengisi YORAI_API_KEY di .env.local; jangan
tampilkan isinya.

Baca dulu https://yorai.id/llms.txt dan https://yorai.id/docs/api/llms-full.txt.
- Buat src/lib/yorai.ts: fungsi pemanggil Yorai yang menambahkan Authorization,
  dan mengubah error menjadi pesan ramah berbahasa Indonesia (401 key salah, 402
  saldo kurang + link yorai.id/app/credits, 429 terlalu cepat, 503 API tidak
  aktif, 504 waktu habis, gagal koneksi).
- Buat src/lib/prompts.ts: instruksi agar AI membalas JSON
  {headline, caption, hashtags, image_prompt, video_prompt}. Headline maksimal 6 kata
  bahasa Indonesia. Caption bahasa Indonesia, 2–4 kalimat pendek + ajakan,
  memakai teks promo. 5–8 hashtag. image_prompt dalam bahasa Inggris, maksimal
  900 karakter, mendeskripsikan poster promosi profesional sesuai gaya dan
  rasio, memuat headline dalam tanda kutip sebagai tipografi besar.
  video_prompt bahasa Inggris, maksimal 600 karakter: gerakan kamera & produk. Buat
  parser JSON yang tahan banting (abaikan ``` dan teks di luar kurung kurawal).
- /api/caption memakai POST /chat/completions dengan model YORAI_TEXT_MODEL
  (maxDuration 60 detik). Mode demo tetap berfungsi saat DEMO_MODE=true.
- Asisten "Prompt otomatis" (modal): Nama produk*, Deskripsi, Promo, Gaya (5
  pilihan dari src/lib/styles.ts). Hasilnya mengisi kolom prompt composer
  (prompt gambar atau video sesuai tab), dan caption ikut terlampir ke hasil
  berikutnya (chip "Caption UMKM terlampir ✕").
- Kalau AI teks gagal atau lebih dari 40 detik (kecuali API key salah atau
  saldo habis), pakai caption + prompt cadangan dari template, dan tampilkan
  catatan kecil "Caption dibuat otomatis".
- Gambar dan video MASIH memakai demo dulu.

Uji SEKALI dengan AI sungguhan (produk: "Keripik Tempe Bu Sri", promo: "Beli 2
gratis 1"), tunjukkan caption yang dihasilkan. Commit "Caption dari AI".
```

## Cek hasil

- [ ] Caption terasa ditulis manusia dan relevan dengan produk
- [ ] Key yang sengaja disalahkan (coba ubah satu huruf) memunculkan pesan
      "API key salah", bukan error teknis. Kembalikan key-nya setelah itu.

## Diskusi

- Kenapa perlu caption cadangan? Model AI di penyedia bisa sedang gangguan.
  Aplikasi profesional tetap jalan walau satu bagian bermasalah.

Bagian "instruksi untuk AI" (`prompts.ts`) adalah **resep rahasia** produkmu.
Coba minta AI mengubah gaya bahasanya: lebih santai, lebih Gen Z, atau formal.
