# Kumpulan prompt PosterKu Studio (siap salin)

Semua prompt untuk membangun PosterKu Studio, berurutan dari folder kosong sampai
online. Dipakai bersama [PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md). Prompt yang sama
juga ada per sesi di folder [`prompts/`](prompts/).

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

## Sesi 1: Proyek awal 🆓

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

## Sesi 2: Tampilan studio (belum pakai AI) 🆓

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

## Sesi 3: Alur lengkap dengan mode demo (tanpa biaya) 🆓

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
  menambah kartu "sedang dibuat" di grid, cek status (gambar tiap 2 detik,
  video tiap 5 detik), lalu kartu jadi hasil. Maksimal 3 job bersamaan.
- Kartu "sedang dibuat": rasio benar, efek shimmer, dan di BAGIAN ATAS kartu
  (agar tidak tertutup composer) spinner, nama model, status, bar progres
  dengan persen perkiraan (dari lama proses biasa tiap model, berhenti di 95%
  sampai selesai), dan waktu berjalan.
- Setelah Buat diklik, kosongkan prompt dan foto referensi di composer
  (pengaturan model/rasio tetap). Kalau pengiriman gagal, kembalikan isinya.
- Tombol Buat menampilkan biaya dari /api/quote ("Gratis" di mode demo).
- Error tampil sebagai toast, kartu gagal punya tombol "Coba lagi".
- Chip "Mode demo" di top bar. Jika server belum dikonfigurasi (tidak ada key
  dan bukan demo), tampilkan panduan ramah cara mengisi .env.local.

Tes sendiri di browser dengan DEMO_MODE=true (gambar dan video) sampai mulus.
Commit "Alur studio mode demo".
```

Cek setelahnya:

- [ ] Klik Buat: kartu progres (persen + waktu) muncul, prompt kosong lagi,
      lalu kartu berubah jadi gambar contoh
- [ ] Buat 3 sekaligus: semuanya berjalan bersamaan
- [ ] Prompt kosong: muncul pesan yang jelas, tidak error
- [ ] Chip "Mode demo" terlihat dan biaya tertulis "Gratis"

---

## Sesi 4: Menyambungkan AI teks (Prompt otomatis) 💰 ✋

**Biaya:** sangat kecil (DeepSeek V4.1 Flash, kurang dari Rp10 per caption).

✋ **Sebelum menempel prompt:** buka `.env.local`, isi `YORAI_API_KEY=` dengan key
Yorai-mu, ubah `DEMO_MODE=false`, lalu simpan. Jangan tempel key ke chat.

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: sambungkan /api/caption ke AI teks
Yorai sungguhan. Saya sudah mengisi YORAI_API_KEY di .env.local; jangan
tampilkan isinya.

Baca dulu https://yorai.id/llms.txt dan https://yorai.id/docs/api/llms-full.txt.
- Buat src/lib/yorai.ts: fungsi pemanggil Yorai yang menambahkan Authorization,
  dan mengubah error menjadi pesan ramah berbahasa Indonesia (401 key salah, 402
  saldo kurang + link yorai.id/app/credits, 429 terlalu cepat, 503 API tidak
  aktif, 504 waktu habis, gagal koneksi).
- Buat src/lib/prompts.ts: instruksi agar AI membalas JSON
  {headline, caption, hashtags, image_prompt, video_prompt}. Headline maksimal 6 kata
  bahasa Indonesia. Caption bahasa Indonesia, 2–4 kalimat pendek + ajakan,
  memakai teks promo. 5–8 hashtag. image_prompt dalam bahasa Inggris, maksimal
  900 karakter, mendeskripsikan poster promosi profesional sesuai gaya dan
  rasio, memuat headline dalam tanda kutip sebagai tipografi besar.
  video_prompt bahasa Inggris, maksimal 600 karakter: gerakan kamera & produk. Buat
  parser JSON yang tahan banting (abaikan
```

Cek setelahnya:

- [ ] Caption terasa ditulis manusia dan relevan dengan produk
- [ ] Key yang sengaja disalahkan (coba ubah satu huruf) memunculkan pesan
      "API key salah", bukan error teknis. Kembalikan key-nya setelah itu.

---

## Sesi 5: Menyambungkan AI gambar 💰

**Biaya:** z-image ±0,084 kredit ≈ Rp84 per gambar.

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: sambungkan pembuatan gambar ke
Yorai sungguhan (mode demo tetap berfungsi).

Baca dulu https://yorai.id/docs/api/models/z-image.md dan pastikan entri
z-image di src/lib/models.ts (tipe, rasio, panjang prompt) sesuai.
- /api/quote: teruskan body dari jobs.ts ke POST /quote, kembalikan {credits}.
- /api/generate: cek harga dulu dengan POST /quote, lalu POST /jobs dengan
  header Idempotency-Key acak. Kembalikan job + biaya hasil quote.
- /api/jobs/[id]: ambil GET /jobs/{id} dan sederhanakan menjadi
  {id, status, credits, fileId, mime, expiresAt, error}.
- /api/file/[id]: teruskan file dari GET /files/{id} (butuh key) ke browser
  dengan nama unduhan posterku-xxxx.jpg/png. Validasi id ketat (UUID). Kalau
  kedaluwarsa (410), tampilkan "File sudah kedaluwarsa".
- /api/balance: saldo dari GET /balance; tampilkan di top bar sebagai chip
  "◈ 9,52" (format Indonesia) dengan perkiraan Rupiah di tooltip. Segarkan
  setelah setiap job selesai.

Uji SEKALI dengan AI sungguhan. Commit "Gambar dari AI".
```

Cek setelahnya:

- [ ] Biaya di tombol Buat muncul sebelum diklik (±0,084)
- [ ] Gambar sungguhan muncul di grid dalam ±10–30 detik
- [ ] Saldo di top bar berkurang sesuai biaya

---

## Sesi 6: Foto produk asli → gambar promosi (image-to-image) 💰

**Biaya:** nano-banana-2-lite ±0,416 kredit ≈ Rp416 per gambar.

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: fitur foto referensi.

Baca dulu https://yorai.id/docs/api/models/nano-banana-2-lite.md (nama input
gambar dan tipenya), lalu lengkapi entrinya di src/lib/models.ts.
- Slot referensi di composer hanya muncul untuk model yang menerima gambar.
  Seret & lepas atau klik, ada pratinjau dan tombol hapus.
- Di browser, sebelum diunggah, perkecil foto ke maksimal 1600px sisi terpanjang
  dan ubah ke JPEG kualitas 0.88 (batas upload Vercel 4,5 MB). Tolak file yang
  bukan gambar.
- POST /api/upload: terima file (jpeg/png/webp, maksimal 4 MB), teruskan ke
  POST /files Yorai, kembalikan {fileId}. Mode demo: id palsu.
- /api/quote dan /api/generate menerima uploadFileId; jobs.ts memakai tipe
  image-to-image dan field gambar dari models.ts.
- Kalau model yang dipilih tidak menerima gambar (z-image), beri tahu pengguna
  dan tawarkan pindah ke model yang bisa.

Uji SEKALI dengan foto sungguhan. Commit "Gambar dari foto produk".
```

Cek setelahnya:

- [ ] Produk di hasil mirip foto aslinya
- [ ] Foto besar dari HP (±5–10 MB) tetap bisa diproses
- [ ] Biaya di tombol Buat berubah saat foto ditambahkan

---

## Sesi 6b: Video promo (text-to-video & Animasikan) 💰

**Biaya:** Seedance 2 Mini ±0,4 kredit/detik (480p), jadi video 5 detik ≈ Rp2.000; 720p sekitar dua kali lipat. Grok Imagine ±0,25 kredit/detik (480p). Selalu cek biaya di tombol Buat.

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: tab VIDEO di composer.

Baca dulu https://yorai.id/docs/api/models/bytedance-seedance-2-mini.md dan
https://yorai.id/docs/api/models/grok-imagine.md untuk nama input, rasio,
durasi, dan resolusinya, lalu lengkapi entrinya di src/lib/models.ts.

1. Tab Video di popover pengaturan: pilihan model, rasio, Durasi, Kualitas
   (480p/720p), dan toggle "Suara AI" (hanya untuk model yang mendukung).
   Biaya di tombol Buat diperbarui saat pilihan berubah.
2. Slot referensi berubah jadi "+ Frame awal" untuk model video.
3. Di kartu gambar, tombol "Animasikan": gambar itu jadi frame awal dan composer
   pindah ke Video. Server mengunduh gambar itu lalu meng-upload ulang ke
   POST /files dan memakai ID barunya (sourceFileId).
4. Video dicek tiap 5 detik (maksimal 10 menit). Kartu video punya tanda ▶,
   diputar tanpa suara saat kursor di atasnya; viewer menampilkan pemutar
   dan tombol Unduh MP4.
5. /api/file harus meneruskan header Range agar video bisa diputar dan digeser.
6. Prompt otomatis juga menulis prompt video (gerakan kamera & produk).

Uji di mode demo dulu. Lalu uji SEKALI video sungguhan 5 detik 480p dan
sebutkan biayanya sebelum mulai. Commit "Fitur video promo".
```

Cek setelahnya:

- [ ] Biaya berubah saat durasi/kualitas diganti
- [ ] Video bisa diputar di HP dan bisa diunduh
- [ ] "Animasikan" menghasilkan video yang diawali gambar tersebut
- [ ] Tab Video di grid hanya menampilkan video

---

## Sesi 7: Poles sampai siap dipakai orang lain 🆓

**Prompt A: riwayat dan viewer**

```
Simpan 40 hasil terakhir di localStorage (id job, id file, jenis, model, prompt,
rasio, durasi, biaya, tanggal, tanggal kedaluwarsa, caption bila ada) supaya
grid tetap ada setelah refresh. Klik kartu membuka viewer: media besar dan
panel detail (prompt, model, rasio/durasi, biaya, tanggal, "Tersimpan di Yorai
sampai …", caption UMKM + tombol Salin caption). Jika file gagal dimuat,
tampilkan label "Kedaluwarsa". Bungkus akses localStorage dengan try/catch.
```

**Prompt B: aksi kartu dan aktivitas**

```
Di setiap kartu (muncul saat hover; selalu terlihat di HP): Unduh, Pakai prompt
(mengembalikan prompt dan pengaturan ke composer), Animasikan (khusus gambar),
dan Hapus dengan konfirmasi di dalam halaman (bukan alert browser). Tombol
Aktivitas di top bar membuka panel kanan berisi job sesi ini (status, model,
waktu, biaya).
```

**Prompt C: kode akses**

```
Aktifkan kode akses: jika server mewajibkan APP_PASSCODE, tampilkan dialog
modal yang rapi untuk memasukkan kode. Simpan di localStorage, kirim sebagai
header x-passcode di setiap request, dan buka dialog lagi jika server
membalas "Kode akses salah". Uji dengan APP_PASSCODE=kelas123 di .env.local.
```

**Prompt D: audit akhir**

```
Lakukan audit akhir seperti reviewer profesional sebelum rilis:
1. Keamanan: key hanya di server, semua route (kecuali status dan file) dicek
   passcode, input divalidasi dengan models.ts, tidak ada key di file yang
   di-commit.
2. Tampilan: cek 390px, 768px, 1280px, tema gelap dan terang; keadaan kosong,
   loading, error, sukses.
3. Aksesibilitas: label, fokus keyboard, Esc menutup popover/modal, kontras,
   teks alternatif gambar, prefers-reduced-motion.
4. Lint, typecheck, build.
Buat daftar temuan, perbaiki semuanya, lalu laporkan sebelum dan sesudah.
```

Cek setelahnya:

- [ ] Refresh halaman: grid masih ada
- [ ] Salah memasukkan kode akses: dialog muncul lagi dengan pesan jelas
- [ ] Audit tidak menyisakan temuan

---

## Sesi 8: Publish ke internet (GitHub + Vercel, gratis) 🆓 ✋

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

✋ **Lalu di Vercel (kamu sendiri):** import repository, isi `YORAI_API_KEY`,
`APP_PASSCODE`, dan `DEMO_MODE=false`, lalu Deploy. Lihat
[PUBLISH-VERCEL.md](PUBLISH-VERCEL.md).

Cek setelahnya:

- [ ] Link `.vercel.app` bisa dibuka di HP
- [ ] Tanpa kode akses, aplikasi tidak bisa membuat poster
- [ ] Setiap kali minta AI mengubah sesuatu, lalu commit + push, Vercel
      otomatis memperbarui situsnya

> Paket gratis Vercel (Hobby) khusus penggunaan **non-komersial**. Kalau
> aplikasi ini mau dijual atau dipakai untuk bisnis, pakai paket Pro atau
> hosting lain.

---

## Sesi 9: Kembangkan sendiri (tantangan) 🆓/💰

| Ide | Prompt awal |
|---|---|
| Bagikan ke WhatsApp | "Tambahkan tombol Bagikan ke WhatsApp di viewer yang membuka wa.me dengan caption terisi." |
| Banyak bahasa | "Tambahkan pilihan bahasa caption di Prompt otomatis: Indonesia, Inggris, Jawa." |
| 4 variasi sekaligus | "Tambahkan pilihan jumlah 1–4 di composer. Tampilkan total biaya sebelum mulai." |
| Template acara | "Tambahkan gaya Ramadan, Kemerdekaan, Harbolnas, dan Imlek di Prompt otomatis." |
| Musik latar | "Tambahkan tab Audio di composer memakai model musik Yorai. Cek katalog https://yorai.id/docs/api/models dan tampilkan biaya sebelum membuat." |
| Tambah model | "Tambahkan model <slug> dari https://yorai.id/docs/api/models ke src/lib/models.ts. Baca halaman .md-nya untuk input dan rasionya." |
| Branding toko | "Tambahkan input nama toko dan warna brand di Prompt otomatis, lalu masukkan ke prompt." |

Bungkus idenya dengan rumus ini:

```
Lanjutkan PosterKu (AGENTS.md). Tambahkan fitur: <ide kamu>.
Untuk siapa: <siapa yang memakai, misalnya pemilik warung di HP>.
Detail: <apa yang terlihat dan bisa diklik>.
Batasan: jangan menambah library tanpa izin; kalau memakai kredit, tampilkan
biaya sebelum tombol diklik.
Cara mengecek: <apa yang harus saya coba di browser>.
Uji di mode demo dulu, lalu commit dengan pesan yang jelas.
```

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
