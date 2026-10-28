# Langkah 2: Tampilan studio (belum pakai AI)

**Tujuan:** halaman PosterKu Studio yang terlihat seperti aplikasi kreatif
sungguhan (mirip workspace Yorai). Tombolnya belum melakukan apa-apa.
**Waktu:** 45–60 menit.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: buat TAMPILAN STUDIO saja, belum
ada panggilan ke AI atau API. Contoh rasa tampilannya: workspace di yorai.id.

Identitas visual:
- Font Geist (next/font/google). Bahasa halaman: Indonesia (lang="id").
- Tema gelap sebagai bawaan, plus terang dan "ikuti sistem". Palet netral:
  gelap latar #0b0b0c, permukaan #141416/#1b1b1f, garis #26262b, teks #f4f4f5
  (redup #a1a1aa); terang latar #fafafa, permukaan #ffffff, garis #e4e4e7, teks
  #18181b (redup #71717a). Warna aksen oranye koral #E8553D. Simpan semuanya
  sebagai variabel tema di globals.css. Pilihan tema disimpan di localStorage
  dan diterapkan sebelum halaman tampil (tanpa kedipan).
- Judul tab: "PosterKu Studio — Gambar & video promosi dengan AI".

Susunan halaman:
1. Rail ikon di kiri (64px): logo, ikon Studio, lalu di bawah tombol tema dan
   link "Ditenagai Yorai" ke https://yorai.id/docs/api. Ikon SVG sendiri.
2. Top bar: judul "Studio PosterKu"; di kanan tempat saldo kredit dan tombol
   "Aktivitas".
3. Tab filter berbentuk pill: Semua, Gambar, Video (dengan jumlah).
4. Area hasil berupa grid masonry (3 kolom desktop, 2 kolom HP). Untuk sekarang
   tampilkan keadaan kosong yang elegan + 3 contoh prompt yang bisa diklik.
5. Composer melayang di bawah tengah (lebar maks 800px, sudut 20px): slot
   "+ Foto referensi", kolom "Apa yang ingin kamu buat?" dengan penghitung
   karakter, tombol "✦ Prompt otomatis", pill pengaturan (mis. "Z-Image · 1:1")
   yang membuka popover berisi tab Gambar | Video, daftar model, grid rasio,
   durasi, kualitas, dan suara; lalu tombol utama "Buat". Di HP composer
   menempel di bawah layar dan popover jadi bottom sheet.

Buat src/lib/models.ts berisi daftar model terkurasi (lihat AGENTS.md bagian 5):
z-image, nano-banana-2-lite (gambar), bytedance-seedance-2-mini, grok-imagine
(video), dengan rasio, durasi, dan resolusi masing-masing. Popover membaca
daftar ini. Hapus semua sisa konten bawaan Next.js. Cek di 1280px dan 390px.
Commit "Tampilan studio".
```

## Cek hasil

- [ ] Terlihat seperti produk sungguhan, bukan template
- [ ] Ganti tema gelap/terang bekerja dan tetap setelah refresh
- [ ] Popover pengaturan: ganti Gambar ↔ Video mengubah daftar model dan rasio
- [ ] Di HP (390px) tidak ada scroll ke samping dan composer tidak menutupi isi
- [ ] Bisa berpindah dengan tombol Tab, fokusnya terlihat, Esc menutup popover

## Latihan kreatif (opsional)

Minta perubahan visual dengan bahasamu sendiri, misalnya *"ganti warna aksen
jadi hijau daun"* atau *"buat composer lebih ramping"*. Simpan (`/simpan`)
sebelum bereksperimen.
