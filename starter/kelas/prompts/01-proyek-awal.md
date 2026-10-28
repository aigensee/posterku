# Langkah 1: Proyek awal

**Tujuan:** proyek Next.js terpasang dan bisa dibuka di browser.
**Waktu:** 20–30 menit.

## Prompt (salin utuh)

```
Kita akan membangun aplikasi PosterKu. Baca AGENTS.md dan .agents/rules dulu.

Tugas langkah ini SAJA:
1. Buat proyek Next.js versi terbaru di folder ini: TypeScript, Tailwind CSS,
   ESLint, App Router, folder src, alias import @/*, npm.
   Folder ini sudah berisi AGENTS.md, .agents dan kelas: jangan dihapus atau
   ditimpa. Buat proyeknya di folder sementara, lalu pindahkan isinya ke sini.
   Kalau proyek baru membawa AGENTS.md sendiri, gabungkan: blok Next.js di
   paling atas, lalu seluruh isi AGENTS.md kita di bawahnya.
2. Buat .env.example berisi variabel di AGENTS.md (tanpa nilai rahasia) dan
   .env.local berisi DEMO_MODE=true. Pastikan .env.local diabaikan git, tetapi
   .env.example tidak.
3. Jalankan aplikasinya dan buka di browser.
4. Commit dengan pesan "Proyek awal".

Laporkan dengan format laporan di AGENTS.md.
```

## Cek hasil

- [ ] Halaman awal Next.js terbuka di `http://localhost:3000`
- [ ] Folder `kelas`, `.agents`, dan `AGENTS.md` masih ada
- [ ] Ada file `.env.example` dan `.env.local`

## Materi diskusi

- Apa itu *framework* (Next.js) dan *localhost*
- Kenapa ada file `.env.local`: tempat rahasia, tidak ikut ke GitHub
