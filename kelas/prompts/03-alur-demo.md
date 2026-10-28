# Langkah 3: Semua fitur berjalan di mode demo (gratis)

**Tujuan:** seluruh studio sudah bisa dipakai (gambar, video, Prompt otomatis,
progres, riwayat, viewer, Animasikan) memakai hasil contoh. Belum memakai
kredit, jadi bebas dicoba berkali-kali.
**Waktu:** 60–90 menit.

## Konsep yang dijelaskan pengajar

```
Browser ──(fetch)──► /api/... (server kita) ──► Yorai API
                         ▲
                API key disimpan di sini, tidak pernah di browser
```

Gambar dan video dibuat AI sebagai **job**: kita memesan, lalu mengecek
"sudah jadi belum?" berulang kali (polling).

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: buat SEMUA FITUR studio berjalan
di MODE DEMO (DEMO_MODE=true). Belum memanggil Yorai sungguhan.

Server (src/lib dan src/app/api):
- config.ts (env sesuai AGENTS.md), guard.ts (header x-passcode, perbandingan
  waktu-konstan, 401 "Kode akses salah"), jobs.ts (validasi pilihan composer
  dengan models.ts lalu menyusun body Yorai {model, type, input}), demo.ts
  (job palsu selesai beberapa detik; hasil SVG contoh berisi nama produk,
  rasio benar, label "MODE DEMO"; untuk video SVG yang bergerak pelan).
- Route: GET /api/status, POST /api/quote, POST /api/generate, GET
  /api/jobs/[id], GET /api/file/[id] (?download=1), POST /api/upload,
  POST /api/caption, GET /api/balance. Semua input divalidasi, pesan error
  bahasa Indonesia.

Browser (hook src/components/useStudio.ts + komponen kecil, satu file satu
komponen):
1. Klik Buat → kartu "sedang dibuat" langsung muncul di grid: rasio benar,
   shimmer, dan di BAGIAN ATAS kartu (agar tidak tertutup composer) spinner,
   nama model, status, bar progres dengan persen perkiraan (dari lama proses
   biasa tiap model, berhenti di 95% sampai selesai), dan waktu berjalan.
   Cek status: gambar tiap 2 detik, video tiap 5 detik. Maksimal 3 job
   bersamaan. Gagal → kartu error dengan "Coba lagi" dan toast.
2. Setelah Buat, kosongkan prompt dan referensi di composer (pengaturan model
   tetap). Kalau pengiriman gagal, kembalikan isinya.
3. Tombol Buat menampilkan biaya dari /api/quote (mode demo: "Gratis").
4. Prompt otomatis: modal Nama produk*, Deskripsi, Promo, Gaya (5 pilihan) →
   /api/caption → mengisi prompt (gambar atau video sesuai tab) dan
   melampirkan headline/caption/hashtag ke hasil berikutnya (chip
   "Caption UMKM terlampir ✕").
5. Slot referensi (foto/frame awal) dengan seret & lepas; foto diperkecil di
   browser ke 1600px JPEG 0.88 sebelum /api/upload.
6. Riwayat 40 hasil terakhir di localStorage. Kartu: Unduh, Pakai prompt,
   Animasikan (khusus gambar: jadi frame awal video, composer pindah ke Video
   dengan rasio gambar itu), Hapus (konfirmasi di halaman). Klik kartu →
   viewer: media besar, prompt, model, pengaturan, biaya, tanggal, caption +
   Salin caption. Tab Semua/Gambar/Video menghitung jumlahnya.
7. Saldo/"Mode demo" di top bar, panel Aktivitas, panduan ramah bila server
   belum dikonfigurasi.

Tes sendiri di browser (desktop dan 390px), gambar dan video, sampai mulus.
Commit "Studio berjalan di mode demo".
```

## Cek hasil

- [ ] Klik Buat: kartu progres (persen + waktu) muncul dan prompt kosong lagi
- [ ] Gambar dan video contoh muncul; tab Gambar/Video memfilter dengan benar
- [ ] Prompt otomatis mengisi prompt dan caption ikut tampil di viewer
- [ ] Animasikan memindahkan gambar ke slot frame awal video
- [ ] Refresh halaman: riwayat masih ada
