# Sesi 7: Poles sampai siap dipakai orang lain

**Tujuan:** fitur-fitur kecil yang membuat aplikasi terasa profesional, plus
pengaman sebelum dipublikasikan.
**Waktu:** 45–60 menit. Kerjakan prompt satu per satu, dan simpan setiap
selesai.

## Prompt A: riwayat

```
Tambahkan Riwayat: simpan 12 poster terakhir di localStorage (id job, id file,
produk, headline, caption, hashtag, prompt gambar, rasio, gaya, biaya, tanggal,
tanggal kedaluwarsa). Tampilkan sebagai grid thumbnail di bagian Riwayat; klik
untuk membuka lagi di panel hasil. Jika gambar gagal dimuat, tampilkan label
"Kedaluwarsa". Ada tombol "Hapus riwayat" dengan konfirmasi di dalam halaman
(bukan alert browser). Bungkus akses localStorage dengan try/catch.
```

## Prompt B: aksi hasil

```
Di panel hasil, tambahkan: "Salin caption" (menyalin caption + hashtag, lalu
tombol berubah jadi "Tersalin!" 2 detik), "Buat variasi" (prompt sama, gambar
baru), dan "Edit prompt" (textarea yang bisa dibuka-tutup, penghitung karakter
maks 1000, tombol "Buat ulang").
```

## Prompt C: kode akses

```
Aktifkan kode akses: jika server mewajibkan APP_PASSCODE, tampilkan dialog
modal yang rapi untuk memasukkan kode. Simpan di localStorage, kirim sebagai
header x-passcode di setiap request, dan buka dialog lagi jika server
membalas "Kode akses salah". Uji dengan APP_PASSCODE=kelas123 di .env.local.
```

## Prompt D: audit akhir

```
Lakukan audit akhir seperti reviewer profesional sebelum rilis:
1. Keamanan: key hanya di server, semua route (kecuali status dan file) dicek
   passcode, input divalidasi, tidak ada key di file yang di-commit.
2. Tampilan: cek 390px, 768px, 1280px; keadaan kosong, loading, error, sukses.
3. Aksesibilitas: label, fokus keyboard, kontras, teks alternatif gambar.
4. Lint, typecheck, build.
Buat daftar temuan, perbaiki semuanya, lalu laporkan sebelum dan sesudah.
```

## Cek hasil

- [ ] Refresh halaman: riwayat masih ada
- [ ] Salah memasukkan kode akses: dialog muncul lagi dengan pesan jelas
- [ ] Audit tidak menyisakan temuan
