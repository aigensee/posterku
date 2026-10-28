# Sesi 3: Alur lengkap dengan mode demo (tanpa biaya)

**Tujuan:** tombol "Buat" menjalankan seluruh alur (pesan job → tunggu →
hasil muncul di grid) memakai data contoh. Belum memakai kredit.
**Waktu:** 45–60 menit.

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
Lanjutkan PosterKu (AGENTS.md). Langkah ini: buat ALUR LENGKAP dengan MODE
DEMO. Belum memanggil Yorai sungguhan.

Server (src/lib dan src/app/api):
- config.ts membaca env (YORAI_API_KEY, APP_PASSCODE, DEMO_MODE, YORAI_BASE_URL,
  YORAI_TEXT_MODEL dengan default sesuai AGENTS.md).
- guard.ts: jika APP_PASSCODE diisi, semua route wajib header x-passcode yang
  cocok (perbandingan aman waktu-konstan). Kalau salah: 401 "Kode akses salah".
- jobs.ts: menyusun body job Yorai {model, type, input} dari pilihan composer
  memakai src/lib/models.ts.
- demo.ts: job palsu yang "selesai" beberapa detik setelah dibuat; hasilnya
  gambar contoh SVG (rasio sesuai, label kecil "MODE DEMO"); untuk video,
  SVG yang bergerak pelan.
- Route: GET /api/status ({configured, demo, passcodeRequired, textModel}),
  POST /api/quote (biaya → mode demo: 0), POST /api/generate, GET
  /api/jobs/[id], GET /api/file/[id] (?download=1 untuk unduh). Body quote dan
  generate sama: {model, prompt, ratio, duration?, resolution?, sound?}.
  Validasi semua input di server memakai models.ts, pesan bahasa Indonesia.

Browser:
- Hook useStudio: state composer (disimpan di localStorage), membuat job,
  menambah kartu "sedang dibuat" di grid (kerangka dengan rasio benar, efek
  shimmer, nama model, waktu berjalan), cek status (gambar tiap 2 detik,
  video tiap 5 detik), lalu kartu jadi hasil. Maksimal 3 job bersamaan.
- Tombol Buat menampilkan biaya dari /api/quote ("Gratis" di mode demo).
- Error tampil sebagai toast, kartu gagal punya tombol "Coba lagi".
- Chip "Mode demo" di top bar. Jika server belum dikonfigurasi (tidak ada key
  dan bukan demo), tampilkan panduan ramah cara mengisi .env.local.

Tes sendiri di browser dengan DEMO_MODE=true (gambar dan video) sampai mulus.
Commit "Alur studio mode demo".
```

## Cek hasil

- [ ] Klik Buat: kartu kerangka muncul, lalu berubah jadi gambar contoh
- [ ] Buat 3 sekaligus: semuanya berjalan bersamaan
- [ ] Prompt kosong: muncul pesan yang jelas, tidak error
- [ ] Chip "Mode demo" terlihat dan biaya tertulis "Gratis"
