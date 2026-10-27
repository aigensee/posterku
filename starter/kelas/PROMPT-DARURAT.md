# Prompt darurat (salin, tempel, sesuaikan)

## Ada error

> Muncul error ini saat saya [klik tombol X / membuka halaman Y]:
> ```
> [tempel error utuh di sini]
> ```
> Jelaskan dulu penyebabnya dengan bahasa awam dalam 2 kalimat, lalu
> perbaiki. Setelah itu jalankan lint, typecheck, dan build sampai lulus.

## Tampilan berantakan

> Tampilan [bagian apa] terlihat [masalahnya: berantakan/terpotong/terlalu
> rapat] di [HP/desktop]. Saya lampirkan screenshot. Rapikan supaya terlihat
> profesional dan konsisten dengan bagian lain. Cek ulang di lebar 390px dan
> 1280px.

## AI berputar-putar / hasil makin rusak

> Berhenti dulu. Kembalikan semua file ke titik simpan terakhir yang berjalan
> baik (git), lalu jelaskan dengan singkat apa yang tadi salah. Setelah itu
> usulkan cara yang lebih sederhana, tapi tunggu persetujuan saya.

## Saya tidak mengerti apa yang dilakukan AI

> Jelaskan apa yang baru saja kamu ubah seolah-olah saya pemilik toko yang
> tidak paham teknologi. Maksimal 5 poin. Lalu beri tahu cara saya
> mengeceknya sendiri.

## Aplikasi tidak mau jalan di komputer

> Aplikasi tidak bisa dibuka di http://localhost:3000. Periksa apakah
> dependensi sudah terpasang, `.env.local` ada, dan server dev berjalan.
> Perbaiki lalu buka sendiri halamannya untuk memastikan.

## Hasil poster jelek / tidak sesuai

> Poster yang dihasilkan [masalahnya: teks typo / produk tidak terlihat /
> warnanya norak]. Perbaiki instruksi untuk AI teks di `src/lib/prompts.ts`
> agar prompt gambarnya [harapan]. Jangan memanggil AI sungguhan untuk
> mengetes. Tunjukkan contoh prompt gambar yang baru (versi mode demo).

## Error saat deploy di Vercel

> Deploy di Vercel gagal. Ini log build-nya:
> ```
> [tempel log dari Vercel → Deployments → klik deploy yang gagal]
> ```
> Jelaskan penyebabnya, perbaiki di kode, pastikan `npm run build` lulus di
> sini, lalu commit dan push.

## API key tidak sengaja bocor

> Saya tidak sengaja menempelkan API key di [chat/kode/GitHub]. Hapus dari
> semua file di proyek, pastikan tidak ada di git yang akan di-push, dan
> ingatkan saya langkah mencabut key di yorai.id/app/api.

Setelah itu, **cabut key-nya di https://yorai.id/app/api dan buat key baru.**
