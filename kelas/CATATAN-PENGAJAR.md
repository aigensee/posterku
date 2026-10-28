# Catatan pengajar

## Struktur repository ini

| Folder | Untuk siapa | Isi |
|---|---|---|
| root (`src/`, `AGENTS.md`, `.agents/`) | pengajar | **Aplikasi jadi** (kunci jawaban + demo di awal kelas) |
| `starter/` | peserta | titik mulai kosong: `AGENTS.md`, `.agents/`, `kelas/` |
| `kelas/` | semua | materi, prompt per sesi, aturan pakai |

`starter/AGENTS.md`, `starter/.agents/`, dan `starter/kelas/` adalah salinan
dari root. Setelah mengubah materi, sinkronkan dengan `npm run sync-starter`.

## Jadwal yang disarankan

| Hari | Sesi | Durasi |
|---|---|---|
| Sebelum kelas | 0 Persiapan (PR) | 45 menit |
| Hari 1 | Pembukaan + demo aplikasi jadi | 20 menit |
| | 1 Proyek awal | 30 menit |
| | 2 Tampilan | 45 menit |
| | 3 Alur mode demo | 60 menit |
| | 4 AI teks | 45 menit |
| Hari 2 | 5 AI gambar | 45 menit |
| | 6 Foto produk | 45 menit |
| | 6b Video promo | 60 menit |
| | 7 Poles + audit | 60 menit |
| | 8 Publish | 30 menit |
| | 9 Tantangan + showcase | 60 menit |

Untuk kelas satu hari (±4 jam): sesi 1 → 3 → 4+5 (gabung) → 8, lalu sesi 2,
6, dan 7 dijadikan PR.

## Biaya latihan per peserta

| Aksi | Model | Perkiraan |
|---|---|---|
| Caption | `deepseek-v4-1-flash` | < Rp10 |
| Poster dari teks | `z-image` | ±Rp84 |
| Poster dari foto | `nano-banana-2-lite` | ±Rp416 |
| Video 5 detik 480p | `bytedance-seedance-2-mini` | ±Rp2.000 (720p ±Rp4.300) |

Saldo Rp10.000 per peserta cukup untuk poster; tambah ±Rp5.000 per peserta bila
sesi 6b (video) dipraktikkan dengan AI sungguhan. Mode demo (`DEMO_MODE=true`)
gratis, jadi pakai mode ini selama sesi 1–3.

Harga dapat berubah. Cek di https://yorai.id/docs/api/models.

## Hal yang sering terjadi di kelas

- **Peserta menempelkan API key di chat AI.** Minta mereka mencabut key di
  yorai.id/app/api lalu membuat yang baru. Tekankan ini sejak sesi 0.
- **Satu key dipakai bersama.** Batas API per key: 20 job/menit, 10 job aktif
  per akun. Tiap peserta wajib memakai akun dan key sendiri.
- **Agen "sok tahu" soal Next.js.** Next.js 16 berbeda dari data latih AI.
  Blok paling atas di `AGENTS.md` menyuruh agen membaca dokumentasi di
  `node_modules/next/dist/docs/`. Jangan dihapus.
- **Hasil berbeda antar peserta.** Wajar. Agen AI tidak deterministik.
  Gunakan checklist "Cek hasil" di tiap prompt sebagai standar, bukan
  kesamaan kode.
- **Agen menambah library.** Aturan `AGENTS.md` melarangnya tanpa izin. Kalau
  agen meminta izin, diskusikan di kelas: perlu atau tidak?
- **Teks di poster typo.** Model gambar kadang salah mengeja. Ajarkan untuk
  memakai *Buat variasi*, atau pendekkan headline.
- **Model AI sedang gangguan.** Pernah terjadi: `claude-haiku-5-5` mengembalikan
  error 500 dari penyedia. Aplikasi otomatis memakai caption cadangan. Model teks
  bisa diganti lewat env `YORAI_TEXT_MODEL` tanpa mengubah kode.
- **Codex web tidak bisa membuka localhost.** Peserta Codex web mengecek lewat
  *preview deployment* Vercel di setiap pull request.

## Batasan API Yorai yang relevan

- `/chat/completions` belum menerima gambar dan tidak streaming.
- Hasil file dihapus setelah 14 hari (riwayat aplikasi menandai
  "Kedaluwarsa").
- Upload di Vercel dibatasi ±4,5 MB per request. Aplikasi sudah memperkecil
  foto di browser.
- Paket Vercel Hobby hanya untuk non-komersial.

## Demo pembuka (5 menit)

1. Buka aplikasi jadi (deploy milik pengajar), lalu buat poster "Keripik Tempe
   Bu Sri".
2. Tunjukkan `AGENTS.md`: *"Ini satu-satunya 'kode' yang kita tulis: aturan
   dan cetak biru untuk AI."*
3. Tunjukkan https://yorai.id/llms.txt: dokumentasi yang dibaca AI, bukan
   oleh kita.
