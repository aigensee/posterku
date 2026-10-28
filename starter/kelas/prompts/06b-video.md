# Sesi 6b: Video promo (text-to-video & image-to-video)

**Tujuan:** selain poster, aplikasi bisa membuat video promo pendek, baik dari
nol maupun dengan menganimasikan poster yang sudah jadi.
**Biaya:** Seedance 2 Mini ±0,4 kredit/detik (480p), jadi video 5 detik ≈ Rp2.000.
720p sekitar dua kali lipat. Selalu cek perkiraan biaya di aplikasi.
**Waktu:** 60 menit.

## Konsep yang dijelaskan pengajar

- **Text-to-video:** AI membuat video hanya dari deskripsi.
- **Image-to-video:** AI menggerakkan sebuah gambar (foto produk atau poster)
  yang dijadikan *frame pertama*.
- Video jauh lebih mahal dan lebih lama dibanding gambar (1–3 menit). Karena itu
  aplikasi wajib **menampilkan perkiraan biaya sebelum tombol diklik**.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: fitur VIDEO PROMO memakai model
Yorai bytedance-seedance-2-mini (env YORAI_VIDEO_MODEL). Baca dulu
https://yorai.id/docs/api/models/bytedance-seedance-2-mini.md untuk nama input,
rasio, durasi, dan resolusinya.

1. Di atas form, tambahkan pilihan mode "Poster" | "Video". Mode Video memakai
   form yang sama + pilihan Durasi (5/10 detik), Kualitas (Hemat 480p / HD 720p),
   dan "Dengan suara AI". Tampilkan perkiraan biaya langsung dari POST /quote.
2. AI teks juga menulis video_prompt (gerakan kamera & produk, bahasa Inggris).
   Siapkan cadangannya juga, seperti caption cadangan.
3. Tanpa foto: text-to-video. Dengan foto produk: image-to-video, foto sebagai
   first_frame_url (ID dari POST /files).
4. Di hasil poster, tambahkan tombol "Animasikan poster": poster dijadikan
   frame pertama video. Server mengunduh poster lalu meng-upload ulang ke
   POST /files, dan memakai ID barunya.
5. Video dicek tiap 5 detik (maksimal 10 menit). Tampilkan pemutar video,
   tombol Unduh MP4, dan catatan "Video biasanya selesai 1–3 menit".
6. /api/file harus mendukung header Range agar video bisa diputar dan digeser.
7. Mode demo: video palsu (poster contoh dengan animasi zoom pelan).

Uji di mode demo dulu. Lalu uji SEKALI video sungguhan 5 detik 480p dan
sebutkan biayanya sebelum mulai. Commit "Fitur video promo".
```

## Cek hasil

- [ ] Perkiraan biaya berubah saat durasi/kualitas diganti
- [ ] Video bisa diputar di HP dan bisa diunduh
- [ ] "Animasikan poster" menghasilkan video yang diawali poster tersebut
- [ ] Riwayat menampilkan video dengan tanda ▶

## Diskusi

- Kenapa harga ditampilkan sebelum klik? Video 10 detik 720p bisa ±Rp8.500.
  Pengguna harus tahu sebelum membayar.
- Kenapa poster di-upload ulang? API hanya menerima file milik kita yang
  diunggah lewat `POST /files` sebagai input.
