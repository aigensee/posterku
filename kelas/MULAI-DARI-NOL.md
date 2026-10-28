# Mulai dari folder kosong (Antigravity)

Panduan singkat ini untuk kamu yang ingin mulai benar-benar dari **folder
kosong**, tanpa mengunduh ZIP. Agen AI yang akan mengambil starter kit
(buku aturan `AGENTS.md` + prompt kelas) untukmu.

Sebelum mulai, pastikan **Node.js** dan **Git** sudah terpasang
(lihat [PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md), bagian A2).

## 1. Buat folder kosong

1. Buka **Finder** (Mac) atau **File Explorer** (Windows), lalu masuk ke folder
   **Documents**.
2. Klik kanan → **New Folder**, lalu beri nama `posterku`.

## 2. Buka folder itu di Antigravity

1. Buka Antigravity. Kalau yang muncul adalah **Agent Manager**, tekan
   **Cmd+E** (Mac) atau **Ctrl+E** (Windows) untuk pindah ke tampilan
   **Editor**.
2. Klik **File → Open Folder**, pilih `Documents/posterku`, lalu klik **Open**.
3. Kalau muncul pertanyaan apakah folder ini dipercaya, pilih **trust / Yes**.
4. Panel file di kiri masih kosong. Kolom chat agen ada di kanan.

## 3. Prompt 0: ambil starter kit

Salin kotak ini ke chat agen, lalu kirim:

```
Folder ini masih kosong. Siapkan starter kit kelas PosterKu dari repository
publik https://github.com/aigensee/posterku:
1. Unduh repository itu ke folder sementara di luar folder ini
   (git clone --depth 1).
2. Salin SELURUH ISI folder starter/ (termasuk folder tersembunyi .agents) ke
   folder ini: AGENTS.md, .agents/, kelas/, README.md. Jangan salin folder lain.
3. Hapus folder sementara itu.
4. Jalankan git init di folder ini, lalu commit dengan pesan "Starter kit".
5. Tampilkan daftar file yang sekarang ada dengan bahasa awam.
Jangan membuat kode aplikasi apa pun dulu.
```

Klik **Accept / Run** kalau agen meminta izin menjalankan perintah.

✅ **Berhasil** kalau panel kiri sekarang berisi `AGENTS.md`, `.agents`,
`kelas`, dan `README.md`.

## 4. Mulai percakapan baru

Klik tombol **percakapan/chat baru** (biasanya ikon **+** di panel chat).
Ini supaya agen membaca aturan baru di `.agents/rules` dan `AGENTS.md` dari
awal.

Lalu kirim:

```
Sebutkan 3 aturan terpenting dari AGENTS.md proyek ini, dalam bahasa awam.
```

✅ Jawabannya menyebut hal seperti "API key hanya di server", "pakai mode demo
untuk tes", atau "laporan dalam 4 bagian".

## 5. Lanjutkan 7 langkah

Buka `kelas/PROMPT-LENGKAP.md` di panel kiri, lalu kirim prompt **Langkah 1**,
**Langkah 2**, dan seterusnya. Satu kotak = satu pesan, tunggu laporan, cek,
lalu ketik `/simpan`.

Cara kerja lengkap tiap langkah ada di [PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md),
bagian C.
