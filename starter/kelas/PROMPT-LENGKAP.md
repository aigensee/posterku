# Kumpulan prompt PosterKu Studio (siap salin)

Tujuh langkah langsung dari folder kosong sampai aplikasi online. Dipakai bersama
[PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md). Prompt yang sama juga ada per langkah di
folder [`prompts/`](prompts/).

**Cara pakai:** salin isi satu kotak, tempel ke chat Antigravity atau Codex, kirim,
tunggu laporannya, cek hasilnya, lalu simpan. **Satu kotak = satu pesan.**

| Tanda | Arti |
|---|---|
| 🆓 | gratis (mode demo) |
| 💰 | memakai kredit Yorai; agen wajib menyebut biayanya dulu |
| ✋ | ada langkah yang kamu kerjakan sendiri |

## Prompt pembuka: pastikan agen membaca aturan

```
Sebutkan 3 aturan terpenting dari AGENTS.md proyek ini, dalam bahasa awam.
```

Jawaban yang benar menyebut hal seperti "API key hanya di server", "pakai mode
demo untuk tes", dan "laporan dalam 4 bagian".

---

## Langkah 1: Proyek awal 🆓

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

Cek setelahnya:

- [ ] Halaman awal Next.js terbuka di `http://localhost:3000`
- [ ] Folder `kelas`, `.agents`, dan `AGENTS.md` masih ada
- [ ] Ada file `.env.example` dan `.env.local`

---

## Langkah 2: Tampilan studio (belum pakai AI) 🆓

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

Cek setelahnya:

- [ ] Terlihat seperti produk sungguhan, bukan template
- [ ] Ganti tema gelap/terang bekerja dan tetap setelah refresh
- [ ] Popover pengaturan: ganti Gambar ↔ Video mengubah daftar model dan rasio
- [ ] Di HP (390px) tidak ada scroll ke samping dan composer tidak menutupi isi
- [ ] Bisa berpindah dengan tombol Tab, fokusnya terlihat, Esc menutup popover

---

## Langkah 3: Semua fitur berjalan di mode demo (gratis) 🆓

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

Cek setelahnya:

- [ ] Klik Buat: kartu progres (persen + waktu) muncul dan prompt kosong lagi
- [ ] Gambar dan video contoh muncul; tab Gambar/Video memfilter dengan benar
- [ ] Prompt otomatis mengisi prompt dan caption ikut tampil di viewer
- [ ] Animasikan memindahkan gambar ke slot frame awal video
- [ ] Refresh halaman: riwayat masih ada

---

## Langkah 4: Sambungkan ke AI sungguhan (Yorai) 💰 ✋

**Biaya:** Prompt otomatis < Rp10; Z-Image ±Rp84/gambar; Nano Banana 2 Lite ±Rp416/gambar; video 5 detik 480p ±Rp1.500–2.000.

✋ **Sebelum menempel prompt:**

1. Buka file `.env.local` di editor.
2. Isi `YORAI_API_KEY=` dengan key dari yorai.id/app/api (tempel di sini, bukan
   di chat), lalu ubah `DEMO_MODE=false`. Simpan file.

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: sambungkan studio ke Yorai
SUNGGUHAN. Saya sudah mengisi YORAI_API_KEY di .env.local; jangan tampilkan
isinya. Mode demo harus tetap berfungsi saat DEMO_MODE=true.

Baca dulu https://yorai.id/llms.txt, https://yorai.id/docs/api/llms-full.txt,
dan halaman .md tiap model di src/lib/models.ts
(https://yorai.id/docs/api/models/<slug>.md). Cocokkan tipe, nama input
gambar, rasio, durasi, dan resolusi di models.ts dengan dokumentasi itu.

1. src/lib/yorai.ts: semua panggilan Yorai (Authorization Bearer) dengan pesan
   error ramah: 401 key salah, 402 saldo kurang + link yorai.id/app/credits,
   429 terlalu cepat, 503/504, gagal koneksi.
2. /api/caption: POST /chat/completions (model YORAI_TEXT_MODEL), balasan JSON
   {headline, caption, hashtags, image_prompt, video_prompt} dengan parser yang
   tahan banting. Kalau AI teks gagal atau lebih dari 40 detik (kecuali 401/402),
   pakai caption + prompt cadangan dari template.
3. /api/quote → POST /quote. /api/generate → POST /quote lalu POST /jobs
   (header Idempotency-Key acak). Foto referensi lewat POST /files. Untuk
   Animasikan, server mengunduh hasil gambar lalu meng-upload ulang ke
   POST /files dan memakai ID barunya.
4. /api/jobs/[id] → GET /jobs/{id}, disederhanakan menjadi
   {id, status, credits, fileId, mime, expiresAt, error}.
5. /api/file/[id] → GET /files/{id}: validasi UUID, teruskan header Range
   (supaya video bisa diputar dan digeser), 410 = "File sudah kedaluwarsa".
6. /api/balance → GET /balance; chip saldo di top bar, segarkan setelah job
   selesai.

Uji SEKALI dengan AI sungguhan: Prompt otomatis "Keripik Tempe Bu Sri" lalu
satu gambar Z-Image 1:1. Sebutkan biayanya sebelum mulai. Video sungguhan
hanya kalau saya minta. Commit "Tersambung ke Yorai".
```

Cek setelahnya:

- [ ] Biaya di tombol Buat muncul sebelum diklik (±0,084 untuk Z-Image)
- [ ] Gambar sungguhan muncul dalam ±10–30 detik dan saldo berkurang
- [ ] Key yang sengaja disalahkan (ubah satu huruf) memunculkan pesan "API key
      salah", bukan error teknis. Kembalikan key-nya setelah itu.

---

## Langkah 5: Kode akses + audit sebelum rilis 🆓

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: kode akses lalu audit akhir.

1. Kode akses: jika server mewajibkan APP_PASSCODE, tampilkan dialog yang rapi
   untuk memasukkan kode. Simpan di localStorage, kirim sebagai header
   x-passcode di setiap request, dan buka dialog lagi jika server membalas
   "Kode akses salah". Uji dengan APP_PASSCODE=kelas123 di .env.local.
2. Audit seperti reviewer profesional:
   - Keamanan: key hanya di server, semua route (kecuali status dan file)
     dicek passcode, input divalidasi dengan models.ts, tidak ada key di file
     yang di-commit.
   - Tampilan: 390px, 768px, 1280px, tema gelap dan terang; keadaan kosong,
     loading, error, sukses; tidak ada scroll ke samping.
   - Aksesibilitas: label, fokus keyboard, Esc menutup popover/modal, kontras,
     teks alternatif, prefers-reduced-motion.
   - Lint, typecheck, build.
   Buat daftar temuan, perbaiki semuanya, lalu laporkan sebelum dan sesudah.
Commit "Kode akses dan audit".
```

Cek setelahnya:

- [ ] Salah memasukkan kode akses: dialog muncul lagi dengan pesan jelas
- [ ] Audit tidak menyisakan temuan

---

## Langkah 6: Publish ke internet (GitHub + Vercel, gratis) 🆓 ✋

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

✋ **Lalu di Vercel (kamu sendiri):**

1. https://vercel.com/new → **Import** repository `posterku`.
2. Buka **Environment Variables** dan isi:
   - `YORAI_API_KEY` = key Yorai kamu
   - `APP_PASSCODE` = kode akses (misalnya `posterku2026`), **wajib** untuk aplikasi publik
   - `DEMO_MODE` = `false`
3. Klik **Deploy**, tunggu ±1–2 menit, lalu buka link-nya.
4. Coba di HP. Bagikan link + kode akses ke teman.

Cek setelahnya:

- [ ] Link `.vercel.app` bisa dibuka di HP
- [ ] Tanpa kode akses, aplikasi tidak bisa membuat apa pun
- [ ] Setiap perubahan yang di-commit dan di-push otomatis memperbarui situsnya

---

## Langkah 7: Kembangkan sendiri (tantangan) 🆓/💰

```
Lanjutkan PosterKu (AGENTS.md). Tambahkan fitur: <ide kamu>.
Untuk siapa: <siapa yang memakai, misalnya pemilik warung di HP>.
Detail: <apa yang terlihat dan bisa diklik>.
Batasan: jangan menambah library tanpa izin; kalau memakai kredit, tampilkan
biaya sebelum tombol diklik.
Cara mengecek: <apa yang harus saya coba di browser>.
Uji di mode demo dulu, lalu commit dengan pesan yang jelas.
```

| Ide | Isi untuk "Tambahkan fitur" |
|---|---|
| Bagikan ke WhatsApp | tombol Bagikan ke WhatsApp di viewer yang membuka wa.me dengan caption terisi |
| Banyak bahasa | pilihan bahasa caption di Prompt otomatis: Indonesia, Inggris, Jawa |
| 4 variasi sekaligus | pilihan jumlah 1–4 di composer, total biaya tampil sebelum mulai |
| Template acara | gaya Ramadan, Kemerdekaan, Harbolnas, dan Imlek di Prompt otomatis |
| Musik latar | tab Audio di composer memakai model musik Yorai (cek https://yorai.id/docs/api/models) |
| Tambah model | model `<slug>` dari https://yorai.id/docs/api/models ke src/lib/models.ts (baca halaman .md-nya) |
| Branding toko | input nama toko dan warna brand di Prompt otomatis, lalu masukkan ke prompt |

---

## Pintasan untuk Codex

Antigravity punya pintasan `/jalankan`, `/cek-kualitas`, `/simpan`, `/batalkan`,
dan `/publish`. Di Codex, pakai prompt berikut.

**Jalankan aplikasi** (`/jalankan`)

```
Kerjakan langkah berikut, lalu laporkan dalam bahasa awam:
1. Jika folder `node_modules` belum ada, jalankan `npm install`.
2. Jika `.env.local` belum ada, salin dari `.env.example`, lalu set `DEMO_MODE=true` agar aman tanpa kredit. Beri tahu pengguna bahwa mode demo aktif.
3. Jalankan `npm run dev` di latar belakang dan tunggu sampai muncul "Ready".
4. Buka `http://localhost:3000` di browser, ambil screenshot, dan pastikan tidak ada error di console.
5. Laporkan ke pengguna: alamat yang bisa dibuka, mode yang aktif (demo atau sungguhan), dan apa yang terlihat.
```

**Cek kualitas** (`/cek-kualitas`)

```
Kerjakan langkah berikut, lalu laporkan dalam bahasa awam:
1. Jalankan `npm run lint`. Perbaiki semua error, lalu ulangi sampai lulus.
2. Jalankan `npx tsc --noEmit`. Perbaiki semua error, lalu ulangi sampai lulus.
3. Jalankan `npm run build`. Perbaiki semua error, lalu ulangi sampai lulus.
4. Dengan `npm run dev` berjalan, buka `http://localhost:3000` di lebar desktop dan 390px. Cek: tidak ada scroll ke samping, teks terbaca, tombol bisa diklik, tidak ada error console.
5. Pastikan `YORAI_API_KEY` tidak muncul di kode `src/components/` atau di file yang di-commit (`git grep -n "yor_live_"` harus kosong).
6. Laporkan hasil tiap langkah (lulus/gagal) dan apa saja yang diperbaiki, dalam bahasa awam.
```

**Simpan (titik aman)** (`/simpan`)

```
Kerjakan langkah berikut, lalu laporkan dalam bahasa awam:
1. Jalankan `git status` dan ringkas perubahan dalam bahasa awam.
2. Pastikan `.env.local` tidak ikut (harus diabaikan oleh `.gitignore`).
3. Jalankan `git add -A` lalu `git commit -m "<ringkasan perubahan dalam bahasa Indonesia>"`.
4. Laporkan: nama titik simpan (pesan commit) dan cara kembali ke titik ini kalau nanti ada yang rusak (cukup minta "kembalikan ke titik simpan <pesan commit>").
```

**Batalkan ke titik simpan** (`/batalkan`)

```
Kerjakan langkah berikut, lalu laporkan dalam bahasa awam:
1. Tampilkan 5 titik simpan terakhir (`git log --oneline -5`) dengan penjelasan awam masing-masing.
2. Tanyakan pengguna mau kembali ke titik mana. Jika pengguna sudah menyebutkannya, lanjutkan.
3. Sebelum membatalkan, simpan perubahan yang belum di-commit dengan `git stash push -u -m "cadangan sebelum batal"` agar tidak hilang permanen.
4. Kembalikan file ke titik tersebut dengan `git restore --source <commit> -- .` lalu commit dengan pesan "Kembali ke: <pesan commit>".
5. Jalankan `/cek-kualitas` dan laporkan hasilnya.
```

**Publish** (`/publish`)

```
Kerjakan langkah berikut, lalu laporkan dalam bahasa awam:
1. Jalankan workflow `/cek-kualitas`. Jangan lanjut jika ada yang gagal.
2. Pastikan `.env.local` tidak ter-commit dan `.env.example` ada.
3. Jika belum ada remote GitHub, bantu pengguna membuat repository (pakai `gh repo create --private --source . --push` jika GitHub CLI sudah login; kalau belum, jelaskan langkah lewat situs github.com).
4. Jika remote sudah ada, `git push`.
5. Tunjukkan langkah Vercel dari `kelas/PUBLISH-VERCEL.md`: import repo, isi Environment Variables (`YORAI_API_KEY`, `APP_PASSCODE`, `DEMO_MODE=false`), lalu Deploy.
6. Ingatkan: jangan menempelkan API key di chat. Pengguna mengisinya sendiri di dashboard Vercel.
```

---

## Kalau ada masalah

Prompt darurat (error, tampilan rusak, AI berputar-putar, gagal deploy, key bocor)
ada di [PROMPT-DARURAT.md](PROMPT-DARURAT.md).
