# Sesi 7: Poles sampai siap dipakai orang lain

**Tujuan:** fitur-fitur kecil yang membuat studio terasa profesional, plus
pengaman sebelum dipublikasikan.
**Waktu:** 45–60 menit. Kerjakan prompt satu per satu, dan simpan setiap
selesai.

## Prompt A: riwayat dan viewer

```
Simpan 40 hasil terakhir di localStorage (id job, id file, jenis, model, prompt,
rasio, durasi, biaya, tanggal, tanggal kedaluwarsa, caption bila ada) supaya
grid tetap ada setelah refresh. Klik kartu membuka viewer: media besar dan
panel detail (prompt, model, rasio/durasi, biaya, tanggal, "Tersimpan di Yorai
sampai …", caption UMKM + tombol Salin caption). Jika file gagal dimuat,
tampilkan label "Kedaluwarsa". Bungkus akses localStorage dengan try/catch.
```

## Prompt B: aksi kartu dan aktivitas

```
Di setiap kartu (muncul saat hover; selalu terlihat di HP): Unduh, Pakai prompt
(mengembalikan prompt dan pengaturan ke composer), Animasikan (khusus gambar),
dan Hapus dengan konfirmasi di dalam halaman (bukan alert browser). Tombol
Aktivitas di top bar membuka panel kanan berisi job sesi ini (status, model,
waktu, biaya).
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
   passcode, input divalidasi dengan models.ts, tidak ada key di file yang
   di-commit.
2. Tampilan: cek 390px, 768px, 1280px, tema gelap dan terang; keadaan kosong,
   loading, error, sukses.
3. Aksesibilitas: label, fokus keyboard, Esc menutup popover/modal, kontras,
   teks alternatif gambar, prefers-reduced-motion.
4. Lint, typecheck, build.
Buat daftar temuan, perbaiki semuanya, lalu laporkan sebelum dan sesudah.
```

## Cek hasil

- [ ] Refresh halaman: grid masih ada
- [ ] Salah memasukkan kode akses: dialog muncul lagi dengan pesan jelas
- [ ] Audit tidak menyisakan temuan
