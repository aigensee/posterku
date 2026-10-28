# Sesi 6b: Video promo (text-to-video & Animasikan)

**Tujuan:** composer bisa membuat video promo pendek, dari nol maupun dengan
menganimasikan gambar yang sudah jadi.
**Biaya:** Seedance 2 Mini ±0,4 kredit/detik (480p), jadi video 5 detik ≈
Rp2.000; 720p sekitar dua kali lipat. Grok Imagine ±0,25 kredit/detik (480p).
Selalu cek biaya di tombol Buat.
**Waktu:** 60 menit.

## Konsep yang dijelaskan pengajar

- **Text-to-video:** AI membuat video hanya dari deskripsi.
- **Image-to-video:** AI menggerakkan sebuah gambar (foto produk atau hasil
  gambar) yang dijadikan *frame pertama*.
- Video jauh lebih mahal dan lebih lama dibanding gambar (1–3 menit). Karena itu
  aplikasi wajib **menampilkan biaya sebelum tombol diklik**.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: tab VIDEO di composer.

Baca dulu https://yorai.id/docs/api/models/bytedance-seedance-2-mini.md dan
https://yorai.id/docs/api/models/grok-imagine.md untuk nama input, rasio,
durasi, dan resolusinya, lalu lengkapi entrinya di src/lib/models.ts.

1. Tab Video di popover pengaturan: pilihan model, rasio, Durasi, Kualitas
   (480p/720p), dan toggle "Suara AI" (hanya untuk model yang mendukung).
   Biaya di tombol Buat diperbarui saat pilihan berubah.
2. Slot referensi berubah jadi "+ Frame awal" untuk model video.
3. Di kartu gambar, tombol "Animasikan": gambar itu jadi frame awal dan composer
   pindah ke Video. Server mengunduh gambar itu lalu meng-upload ulang ke
   POST /files dan memakai ID barunya (sourceFileId).
4. Video dicek tiap 5 detik (maksimal 10 menit). Kartu video punya tanda ▶,
   diputar tanpa suara saat kursor di atasnya; viewer menampilkan pemutar
   dan tombol Unduh MP4.
5. /api/file harus meneruskan header Range agar video bisa diputar dan digeser.
6. Prompt otomatis juga menulis prompt video (gerakan kamera & produk).

Uji di mode demo dulu. Lalu uji SEKALI video sungguhan 5 detik 480p dan
sebutkan biayanya sebelum mulai. Commit "Fitur video promo".
```

## Cek hasil

- [ ] Biaya berubah saat durasi/kualitas diganti
- [ ] Video bisa diputar di HP dan bisa diunduh
- [ ] "Animasikan" menghasilkan video yang diawali gambar tersebut
- [ ] Tab Video di grid hanya menampilkan video

## Diskusi

- Kenapa harga ditampilkan sebelum klik? Video 10 detik 720p bisa ±Rp8.500.
  Pengguna harus tahu sebelum membayar.
- Kenapa gambar di-upload ulang? API hanya menerima file milik kita yang
  diunggah lewat `POST /files` sebagai input.
