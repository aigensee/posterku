# Sesi 2: Tampilan profesional (belum pakai AI)

**Tujuan:** halaman PosterKu yang cantik dengan form lengkap. Tombolnya belum
melakukan apa-apa.
**Waktu:** 45 menit.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: buat TAMPILAN saja, belum ada
panggilan ke AI atau API.

Identitas visual:
- Font Plus Jakarta Sans (next/font). Bahasa halaman: Indonesia (lang="id").
- Latar putih gading hangat (#FAF7F2), teks hitam kecokelatan (#1C1917),
  warna utama oranye koral (#E8553D), kartu putih dengan bayangan halus,
  sudut membulat 16–20px. Simpan warna sebagai variabel tema di globals.css.
- Ikon tab: SVG kotak membulat oranye dengan simbol kilau. Judul tab:
  "PosterKu — Poster promosi UMKM dengan AI".

Isi halaman (lebar maksimal 6xl, tengah, jarak tepi 16px di HP):
1. Header: logo + tulisan PosterKu di kiri; di kanan, tempat untuk saldo kredit.
2. Hero: judul "Poster promosi siap posting dalam hitungan detik" + satu
   kalimat penjelasan.
3. Dua kolom di desktop (form 5/12 menempel saat di-scroll, hasil 7/12), satu
   kolom di HP:
   - Form: Nama produk* (maks 60, penghitung karakter), Deskripsi singkat
     (maks 500, contoh "Kopi susu gula aren, 250ml, tanpa pengawet"), Promo /
     ajakan (opsional, maks 100, contoh "Diskon 20% khusus minggu ini"),
     pilihan Gaya berupa kartu dengan gradasi warna kecil (Minimalis, Ceria,
     Mewah, Retro, Natural; masing-masing punya tagline), pilihan Rasio berupa
     tombol segmen dengan ikon bentuk (1:1 Feed, 3:4 Portrait, 9:16
     Story/Reels, 16:9 Banner), area unggah Foto produk (opsional, seret &
     lepas, ada pratinjau dan tombol hapus), tombol besar "Buat Poster".
   - Panel hasil: keadaan kosong yang elegan, berupa kerangka poster dan
     tulisan "Poster kamu akan muncul di sini".
4. Bagian "Riwayat" di bawah (sementara kosong).
5. Footer: "Dibuat dengan PosterKu · Ditenagai Yorai AI API" (link ke
   https://yorai.id/docs/api).

Hapus semua sisa konten bawaan Next.js. Simpan daftar gaya dan rasio di
src/lib/styles.ts agar bisa dipakai ulang. Cek di lebar 1280px dan 390px.
Commit "Tampilan halaman utama".
```

## Cek hasil

- [ ] Terlihat seperti produk sungguhan, bukan template
- [ ] Di HP (390px) tidak ada scroll ke samping
- [ ] Memilih gaya dan rasio terlihat jelas mana yang aktif
- [ ] Bisa pindah antar-input dengan tombol Tab, dan fokusnya terlihat

## Latihan kreatif (opsional)

Minta perubahan visual dengan bahasamu sendiri, misalnya: *"Buat lebih
premium, seperti aplikasi desain"* atau *"ganti warna utama jadi hijau
daun"*. Simpan (`/simpan`) sebelum bereksperimen.
