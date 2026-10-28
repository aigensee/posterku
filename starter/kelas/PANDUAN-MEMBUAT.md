# Panduan lengkap: membuat PosterKu Studio dengan Antigravity atau Codex

Panduan ini memandu dari folder kosong sampai aplikasi online di
`xxx.vercel.app`, **tanpa menulis kode sendiri**. Tugasmu hanya tiga:
menempelkan prompt, mengecek hasilnya di browser, dan menyimpan versi yang
sudah bagus. Semua kodenya ditulis oleh agen AI.

Contoh hasil akhirnya: https://posterku-one.vercel.app

## Gambaran besar

```
  Kamu                     Agen AI                         Hasil
  ─────                    ───────                         ─────
  tempel prompt sesi  ──►  baca AGENTS.md + prompt   ──►  kode baru
  cek di browser      ◄──  jalankan & tes sendiri    ◄──  laporan 4 bagian
  /simpan (commit)    ──►  titik simpan git          ──►  bisa dibatalkan kapan saja
```

Yang membuat hasilnya rapi dan profesional bukan kemampuan ngoding kita,
melainkan **`AGENTS.md`**: cetak biru dan aturan kerja yang dibaca agen setiap
kali kamu memberi perintah. Isinya meliputi standar kualitas, keamanan API key,
definisi "selesai", dan cara memakai API Yorai. Penjelasan lengkapnya ada di
[CARA-PAKAI-AGENTS.md](CARA-PAKAI-AGENTS.md).

Aplikasi yang akan kamu bangun:

| Bagian | Fungsinya |
|---|---|
| Composer di bawah layar | tulis prompt, pilih Gambar/Video, model, rasio, durasi, lalu **Buat** |
| Prompt otomatis | dari nama produk, AI menulis prompt + headline, caption, hashtag |
| Grid hasil | kartu gambar/video dengan progres, Unduh, Pakai prompt, Animasikan |
| Server kecil (`/api/...`) | menyimpan API key dengan aman lalu memanggil Yorai |

## Langkah 0 — Persiapan (sekali saja, ±45 menit)

Ikuti [00-PERSIAPAN.md](00-PERSIAPAN.md). Ringkasnya:

1. Buat akun **GitHub**, **Vercel** (login dengan GitHub), dan **Yorai**.
2. Instal **Node.js LTS**, **Git**, dan **Google Chrome**.
3. Pasang salah satu agen AI: **Antigravity** atau **Codex** (lihat tabel di
   bawah).
4. Di Yorai, isi kredit (Rp10.000 cukup untuk latihan), lalu buat API key di
   https://yorai.id/app/api. Simpan key itu di catatan pribadi. **Jangan
   tempel ke chat AI.**
5. Unduh repository kelas (**Code → Download ZIP**), lalu salin folder
   `starter` menjadi, misalnya, `Documents/posterku`.

| | Google Antigravity | ChatGPT Codex |
|---|---|---|
| Cocok untuk | pemula, karena agen bisa membuka browser dan mengetes sendiri | yang sudah berlangganan ChatGPT |
| Cara membuka proyek | **Open Folder** → pilih folder `posterku` | aplikasi Codex / ekstensi VS Code: buka folder `posterku` |
| Aturan yang dibaca | `AGENTS.md` + `.agents/rules/posterku.md` | `AGENTS.md` |
| Pintasan | `/jalankan` `/cek-kualitas` `/simpan` `/batalkan` `/publish` | ketik kalimat biasa (lihat tabel pintasan di bawah) |
| Mode yang dipilih | agen **meminta persetujuan** untuk hal penting | *Agent* (boleh mengubah file di folder ini), bukan *Full access* |

## Langkah 1 — Buka folder dan pastikan agen membaca aturan

1. Buka folder `posterku` di Antigravity atau Codex.
2. Ketik di chat agen:

   ```
   Sebutkan 3 aturan terpenting dari AGENTS.md proyek ini, dalam bahasa awam.
   ```

3. Jawaban yang benar menyebut hal seperti "API key hanya di server", "pakai
   mode demo untuk tes", dan "laporan dalam 4 bagian". Kalau agen bilang tidak
   menemukan `AGENTS.md`, pastikan folder yang dibuka adalah folder `posterku`
   (bukan folder di atasnya).

## Langkah 2 — Pola kerja yang diulang di setiap sesi

Setiap sesi memakai pola yang sama:

1. **Buka file prompt sesi** di folder `kelas/prompts/`, lalu salin **seluruh**
   isi blok prompt (kotak abu-abu).
2. **Tempel ke chat agen**, lalu kirim.
3. Agen menulis **rencana singkat**. Kalau rencananya menambah library,
   menghapus fitur, atau memakai biaya, agen akan bertanya dulu. Jawab
   "ya, lanjut" atau minta perubahan.
4. Tunggu agen selesai. Agen menjalankan lint, typecheck, dan build sendiri.
5. Baca **laporan 4 bagian**: Yang berubah, Cara mengecek, Hasil pemeriksaan,
   dan Langkah berikutnya.
6. **Cek sendiri di browser** memakai checklist "Cek hasil" di file prompt.
7. Kalau sudah bagus: **simpan**. Kalau rusak: **batalkan**.

| Maksud | Antigravity | Codex (ketik kalimat ini) |
|---|---|---|
| Menjalankan aplikasi | `/jalankan` | "Jalankan aplikasinya dan beri tahu alamatnya." |
| Memeriksa kualitas | `/cek-kualitas` | "Jalankan lint, typecheck, dan build, lalu perbaiki sampai lulus." |
| Menyimpan versi | `/simpan` | "Commit semua perubahan dengan pesan bahasa Indonesia yang jelas." |
| Kembali ke versi terakhir | `/batalkan` | "Batalkan semua perubahan sejak commit terakhir. Tanya saya dulu." |
| Publish | `/publish` | salin prompt sesi 8 |

> **Satu sesi, satu prompt.** Jangan menggabungkan beberapa sesi dalam satu
> pesan. Agen bekerja paling baik dengan langkah kecil yang bisa dicek.

## Langkah 3 — Bangun aplikasinya, sesi demi sesi

| Sesi | File prompt | Yang kamu lihat setelahnya | Biaya |
|---|---|---|---|
| 1 | [01-proyek-awal](prompts/01-proyek-awal.md) | halaman awal Next.js di `localhost:3000` | gratis |
| 2 | [02-tampilan](prompts/02-tampilan.md) | studio gelap: rail, grid kosong, composer, popover pengaturan | gratis |
| 3 | [03-mode-demo](prompts/03-mode-demo.md) | klik **Buat** → kartu progres → gambar/video contoh | gratis |
| 4 | [04-ai-teks](prompts/04-ai-teks.md) | **Prompt otomatis** menulis prompt + caption dengan AI sungguhan | < Rp10 |
| 5 | [05-ai-gambar](prompts/05-ai-gambar.md) | gambar sungguhan dari Z-Image, saldo tampil di atas | ±Rp84/gambar |
| 6 | [06-foto-produk](prompts/06-foto-produk.md) | foto produk di slot referensi → gambar promosi | ±Rp416/gambar |
| 6b | [06b-video](prompts/06b-video.md) | tab Video + tombol **Animasikan** | ±Rp2.000/video 5 dtk |
| 7 | [07-poles](prompts/07-poles.md) | riwayat, viewer, aksi kartu, kode akses, audit | gratis |
| 8 | [08-publish](prompts/08-publish.md) | aplikasi online di `xxx.vercel.app` | gratis |
| 9 | [09-kembangkan](prompts/09-kembangkan.md) | fitur pilihanmu sendiri | tergantung |

Catatan per sesi:

- **Sesi 1–3 memakai mode demo** (`DEMO_MODE=true`). Semua alur bisa dicoba
  tanpa kredit, jadi bereksperimenlah sepuasnya di sini.
- **Sebelum sesi 4** ada satu langkah manual: buka `.env.local`, isi
  `YORAI_API_KEY=` dengan key-mu, ubah `DEMO_MODE=false`, lalu simpan. Ini
  satu-satunya file yang kamu sentuh sendiri. Jangan pernah menempelkan key
  ke chat.
- **Sesi 4–6b memakai kredit sungguhan.** Agen diminta menyebutkan perkiraan
  biaya sebelum memanggil API. Lihat juga biaya di tombol **Buat** sebelum
  mengeklik.
- **Sesi 2 boleh kreatif.** Minta perubahan visual dengan bahasamu sendiri,
  misalnya *"ganti warna aksen jadi hijau daun"*. Jangan lupa `/simpan`
  sebelum bereksperimen.

## Langkah 4 — Publish ke internet

1. Jalankan sesi 8 (`/publish` di Antigravity). Agen akan mengecek kualitas,
   membuat README, lalu push ke repository GitHub **private**.
2. Di https://vercel.com/new, **Import** repository `posterku`.
3. Di **Environment Variables**, isi sendiri (jangan lewat agen):

   | Nama | Nilai |
   |---|---|
   | `YORAI_API_KEY` | key Yorai-mu |
   | `APP_PASSCODE` | kode akses pilihanmu, misalnya `posterku2026` |
   | `DEMO_MODE` | `false` |

4. Klik **Deploy**, tunggu 1–2 menit, lalu buka link-nya di HP.
5. Setelah ini, setiap perubahan yang di-commit lalu di-push ke GitHub akan
   otomatis memperbarui situsnya.

Panduan klik demi klik: [PUBLISH-VERCEL.md](PUBLISH-VERCEL.md).

> `APP_PASSCODE` wajib untuk aplikasi publik. Tanpa kode akses, siapa pun yang
> tahu link-nya bisa menghabiskan kreditmu.

## Langkah 5 — Cek akhir sebelum dibagikan

- [ ] Dibuka di HP: tidak ada scroll ke samping, composer tidak menutupi hasil
- [ ] Tanpa kode akses, aplikasi tidak bisa membuat apa pun
- [ ] Prompt otomatis → Buat (Z-Image) menghasilkan gambar, dan saldo berkurang ±0,084
- [ ] Kartu menampilkan progres saat dibuat, dan prompt kosong lagi setelah Buat
- [ ] Unduh, Pakai prompt, Animasikan, dan Hapus bekerja
- [ ] `.env.local` tidak ada di GitHub (cek di halaman repository)

## Kalau ada masalah

| Masalah | Yang dilakukan |
|---|---|
| Error merah, tampilan rusak, AI berputar-putar | salin prompt yang cocok dari [PROMPT-DARURAT.md](PROMPT-DARURAT.md) |
| Hasil makin rusak setelah beberapa percobaan | `/batalkan` (kembali ke titik simpan), lalu ulangi dengan prompt yang lebih kecil |
| Agen menyuruhmu mengetik perintah atau mengedit kode | ingatkan: *"Ikuti AGENTS.md bagian 1: jalankan sendiri."* |
| "Server terlalu lama merespons" | model AI di penyedia sedang gangguan; coba lagi, atau minta agen mengganti `YORAI_TEXT_MODEL` |
| "Saldo kurang" | isi kredit di https://yorai.id/app/credits |
| API key terlanjur ditempel di chat | cabut key di https://yorai.id/app/api, buat yang baru, isi ulang di `.env.local` dan Vercel |

## Tips agar hasilnya profesional

1. **Jelaskan "apa" dan "untuk siapa"**, bukan "bagaimana". Contoh: *"Pemilik
   warung di HP harus bisa membuat video promo dalam 3 klik."*
2. **Satu permintaan per pesan**, lalu cek dan simpan.
3. **Selalu minta bukti**: *"Tunjukkan hasil lint, typecheck, dan build."*
4. **Uji di HP** setiap selesai mengubah tampilan.
5. **Rumus prompt**: konteks → tujuan → detail → batasan → cara mengecek
   (lihat [ATURAN-PAKAI.md](ATURAN-PAKAI.md)).
6. **Mau membuat generator lain?** Salin `AGENTS.md`, ganti bagian 5 (tentang
   produk), lalu mulai lagi dari sesi 1
   ([CARA-PAKAI-AGENTS.md](CARA-PAKAI-AGENTS.md), langkah 7).
