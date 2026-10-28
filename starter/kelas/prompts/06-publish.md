# Langkah 6: Publish ke internet (GitHub + Vercel, gratis)

**Tujuan:** aplikasi bisa dibuka siapa saja lewat link `xxx.vercel.app`.
**Waktu:** 30 menit. Panduan klik demi klik ada di `kelas/PUBLISH-VERCEL.md`.

## Prompt (Antigravity: cukup ketik `/publish`)

```
Siapkan PosterKu untuk dipublikasikan:
1. Jalankan lint, typecheck, dan build, lalu perbaiki sampai lulus.
2. Pastikan .env.local tidak ikut ter-commit dan .env.example lengkap.
3. Buat README.md berbahasa Indonesia: apa aplikasinya, cara menjalankan, daftar
   environment variable, dan cara deploy ke Vercel.
4. Commit, lalu buat repository GitHub PRIVATE bernama posterku dan push.
   Kalau GitHub CLI belum login, pandu saya langkah demi langkah lewat situs
   github.com.
5. Beri saya daftar environment variable yang harus saya isi sendiri di Vercel
   (tanpa nilainya).
```

## Langkah manual di Vercel

1. https://vercel.com/new → **Import** repository `posterku`.
2. Buka **Environment Variables** dan isi:
   - `YORAI_API_KEY` = key Yorai kamu
   - `APP_PASSCODE` = kode akses (misalnya `posterku2026`), **wajib** untuk aplikasi publik
   - `DEMO_MODE` = `false`
3. Klik **Deploy**, tunggu ±1–2 menit, lalu buka link-nya.
4. Coba di HP. Bagikan link + kode akses ke teman.

## Cek hasil

- [ ] Link `.vercel.app` bisa dibuka di HP
- [ ] Tanpa kode akses, aplikasi tidak bisa membuat apa pun
- [ ] Setiap perubahan yang di-commit dan di-push otomatis memperbarui situsnya

> Paket gratis Vercel (Hobby) khusus penggunaan **non-komersial**. Kalau
> aplikasi ini mau dijual atau dipakai untuk bisnis, pakai paket Pro atau
> hosting lain.
