# Sesi 3: Alur lengkap dengan mode demo (tanpa biaya)

**Tujuan:** tombol "Buat Poster" menjalankan seluruh alur (caption → poster →
hasil) memakai data contoh. Belum memakai kredit.
**Waktu:** 45–60 menit.

## Konsep yang dijelaskan pengajar

```
Browser ──(fetch)──► /api/... (server kita) ──► Yorai API
                         ▲
                API key disimpan di sini, tidak pernah di browser
```

Poster dibuat oleh AI sebagai **job**: kita memesan, lalu mengecek "sudah
jadi belum?" setiap 2 detik (polling).

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: buat ALUR LENGKAP dengan MODE
DEMO. Belum memanggil Yorai sungguhan.

Server (src/lib dan src/app/api):
- config.ts membaca env (YORAI_API_KEY, APP_PASSCODE, DEMO_MODE, YORAI_BASE_URL,
  YORAI_TEXT_MODEL, YORAI_IMAGE_MODEL, YORAI_PHOTO_MODEL dengan default sesuai
  AGENTS.md).
- guard.ts: jika APP_PASSCODE diisi, semua route wajib header x-passcode yang
  cocok (perbandingan aman waktu-konstan). Kalau salah: 401 "Kode akses salah".
- demo.ts: caption contoh dari input pengguna; job palsu yang "selesai" 3 detik
  setelah dibuat; poster contoh berupa SVG (gradasi warna gaya, rasio sesuai,
  headline produk, label kecil "MODE DEMO").
- Route: GET /api/status ({configured, demo, passcodeRequired, models}),
  POST /api/caption, POST /api/generate, GET /api/jobs/[id],
  GET /api/file/[id] (menampilkan/mengunduh gambar; ?download=1 untuk unduh).
  Validasi semua input di server dengan pesan bahasa Indonesia.
  Untuk sekarang semua route memakai demo.ts.

Browser:
- Hook usePosterku yang mengatur alur: menulis caption → membuat poster →
  cek status tiap 2 detik (maksimal 3 menit) → selesai atau gagal.
- Langkah progres yang terlihat (Menulis caption → Membuat poster → Selesai)
  dengan animasi loading dan centang.
- Panel hasil: poster dengan rasio yang benar (efek shimmer saat menunggu),
  headline, caption, hashtag, tombol Unduh.
- Badge "Mode demo" di header saat DEMO_MODE=true.
- Jika server belum dikonfigurasi (tidak ada key dan bukan demo), tampilkan
  panduan ramah cara mengisi .env.local.

Tes sendiri di browser dengan DEMO_MODE=true sampai alurnya mulus.
Commit "Alur poster mode demo".
```

## Cek hasil

- [ ] Klik Buat Poster: progres berjalan, lalu muncul poster contoh
- [ ] Unduh menghasilkan file gambar
- [ ] Nama produk kosong: muncul pesan yang jelas, tidak error
- [ ] Badge "Mode demo" terlihat
