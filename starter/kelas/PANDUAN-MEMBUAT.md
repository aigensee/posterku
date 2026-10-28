# Panduan untuk pemula: membuat aplikasi AI tanpa bisa ngoding

Panduan ini untuk kamu yang **belum pernah ngoding sama sekali**. Kamu tidak
perlu mengerti kode. Kamu cukup bisa:

- mengetik dan menyalin-tempel (Ctrl+C, Ctrl+V; di Mac: Cmd+C, Cmd+V),
- membuka aplikasi dan situs web,
- membaca dan mengikuti langkah satu per satu.

Yang menulis kodenya adalah **asisten AI**. Kamu berperan sebagai "bos":
memberi perintah, melihat hasilnya, lalu bilang "simpan" atau "ulangi".

Hasil akhirnya seperti ini: https://posterku-one.vercel.app. Ini aplikasi
untuk membuat gambar dan video promosi produk UMKM dengan AI. Kamu bisa
membukanya dari HP mana pun.

Waktu total: sekitar 1 hari (bisa dibagi 2 hari).

---

## Kamus kecil (baca sekali, tidak perlu dihafal)

| Kata | Artinya, dengan bahasa sehari-hari |
|---|---|
| **Agen AI** | asisten AI yang bisa menulis kode dan menjalankan program di komputermu. Di kelas ini: **Antigravity** atau **Codex**. |
| **Prompt** | pesan perintah yang kamu kirim ke agen AI. Kita sudah menyiapkan semuanya; kamu tinggal salin-tempel. |
| **Folder proyek** | satu folder di komputermu yang berisi semua bahan aplikasi. Namanya `posterku`. |
| **`AGENTS.md`** | "buku aturan" untuk agen AI. Isinya cara kerja, standar kualitas, dan larangan. Agen membacanya sendiri. |
| **localhost** | aplikasimu yang sedang berjalan **di komputermu sendiri**. Alamatnya `http://localhost:3000`. Hanya kamu yang bisa membukanya. |
| **Mode demo** | aplikasi berjalan dengan hasil contoh, tanpa memakai kredit. Aman untuk latihan. |
| **Yorai** | layanan AI yang membuat teks, gambar, dan video. Kita "menyewa" kecerdasannya dengan kredit. |
| **API key** | "kunci rumah" untuk memakai Yorai atas namamu. **Rahasia.** Siapa pun yang memegangnya bisa memakai kreditmu. |
| **Simpan / commit** | membuat titik simpan, seperti *save game*. Kalau nanti rusak, kamu bisa kembali ke titik ini. |
| **GitHub** | tempat menyimpan salinan folder proyekmu di internet. |
| **Vercel** | tempat "menayangkan" aplikasimu di internet supaya bisa dibuka orang lain. Gratis. |
| **Deploy / publish** | menayangkan aplikasi ke internet. |

---

## Bagian A — Persiapan (sekali saja, ±1 jam)

### A1. Buat akun (semua gratis)

Buka setiap link, lalu daftar seperti mendaftar media sosial:

1. **GitHub**: https://github.com/signup
2. **Vercel**: https://vercel.com/signup. Pilih **Continue with GitHub** supaya
   kedua akun langsung tersambung.
3. **Yorai**: https://yorai.id/register

### A2. Pasang 3 program di komputer

Unduh, buka file unduhannya, lalu klik **Next** sampai **Finish**. Tidak ada
pengaturan yang perlu diubah.

1. **Node.js** (mesin untuk menjalankan aplikasi): https://nodejs.org. Pilih
   tombol yang bertuliskan **LTS**.
2. **Git** (pencatat titik simpan): Windows dari https://git-scm.com. Di Mac
   biasanya sudah ada; kalau muncul jendela "install Command Line Tools", klik
   **Install**.
3. **Google Chrome**: https://www.google.com/chrome

### A3. Pilih asisten AI (cukup salah satu)

| | **Google Antigravity** (disarankan) | **ChatGPT Codex** |
|---|---|---|
| Biaya | gratis dengan akun Google | perlu langganan ChatGPT |
| Kelebihan | bisa membuka browser dan mengecek aplikasimu sendiri | cocok kalau kamu sudah biasa memakai ChatGPT |
| Cara pasang | unduh di https://antigravity.google, lalu login dengan Google | pasang aplikasi Codex dari https://chatgpt.com/codex, lalu login dengan akun ChatGPT |

Saat pertama dibuka, kalau ditanya mode kerja, pilih mode yang **meminta
persetujuan** sebelum melakukan hal penting. Jangan pilih mode "serba
otomatis/full access". Dengan begitu kamu selalu tahu apa yang dikerjakan AI.

### A4. Siapkan Yorai (kredit + API key)

1. Login di https://yorai.id, buka menu **Kredit**, lalu isi **Rp10.000**. Itu
   cukup untuk ±100 gambar latihan.
2. Buka https://yorai.id/app/api, klik **Buat key**, beri nama `posterku`.
3. Sebuah kode panjang muncul. **Salin, lalu simpan di aplikasi catatan
   pribadimu** (misalnya Notes atau Google Keep). Kode ini hanya ditampilkan
   sekali.

> ⚠️ **Jangan pernah menempelkan API key ke chat AI, WhatsApp, atau grup.**
> Nanti ada satu tempat khusus untuk mengisinya (Bagian C, langkah 4).

### A5. Ambil folder awal

> Lebih suka mulai dari folder kosong? Ikuti [MULAI-DARI-NOL.md](MULAI-DARI-NOL.md)
> lalu lompat ke Bagian C.

1. Buka repository kelas (link dari pengajar).
2. Klik tombol hijau **Code**, lalu **Download ZIP**.
3. Buka file ZIP-nya (klik dua kali). Di dalamnya ada folder bernama
   `starter`.
4. Salin folder `starter` ke folder **Documents** (Dokumen), lalu ganti namanya
   menjadi `posterku`.

Isi folder ini masih sangat sedikit: buku aturan untuk AI (`AGENTS.md`) dan
materi kelas (`kelas`). Belum ada aplikasinya. Aplikasinya akan dibuat AI.

---

## Bagian B — Buka folder di asisten AI (5 menit)

### Kalau memakai Antigravity

1. Buka Antigravity.
2. Klik **Open Folder** (atau menu **File → Open Folder**).
3. Pilih folder `Documents/posterku`, lalu klik **Open**/**Select Folder**.
4. Kalau muncul pertanyaan "Do you trust the authors of this folder?", klik
   **Yes, I trust**. Folder ini milikmu sendiri.
5. Di sisi kanan ada kotak chat agen. Di situlah kamu akan menempel prompt.

### Kalau memakai Codex

1. Buka aplikasi Codex.
2. Pilih **folder proyek** dan arahkan ke `Documents/posterku`.
3. Pastikan mode kerjanya bukan *full access*.
4. Kotak chat Codex adalah tempat kamu menempel prompt.

### Tes: apakah AI sudah membaca buku aturan?

Ketik pesan ini di kotak chat agen, lalu tekan Enter:

```
Sebutkan 3 aturan terpenting dari AGENTS.md proyek ini, dalam bahasa awam.
```

✅ **Berhasil** kalau jawabannya menyebut hal seperti "API key hanya disimpan
di server", "pakai mode demo untuk tes", atau "laporan dalam 4 bagian".

❌ **Belum berhasil** kalau AI bilang tidak menemukan `AGENTS.md`. Artinya
folder yang dibuka salah. Ulangi Bagian B dan pastikan yang dipilih adalah
folder `posterku` itu sendiri, bukan folder Documents.

---

## Bagian C — Membuat aplikasinya (7 prompt)

### Cara mengambil prompt

Semua prompt ada di satu file: **`kelas/PROMPT-LENGKAP.md`**.

1. Di panel daftar file (sebelah kiri), buka folder `kelas`, lalu klik
   `PROMPT-LENGKAP.md`.
2. Setiap prompt ada di dalam **kotak abu-abu**. Blok seluruh isi satu kotak
   dengan mouse, lalu salin (Ctrl+C / Cmd+C).
3. Tempel di kotak chat agen (Ctrl+V / Cmd+V), lalu tekan Enter.

> **Aturan paling penting: satu kotak = satu pesan.** Jangan menempel dua
> kotak sekaligus. Tunggu sampai satu langkah selesai, baru lanjut.

### Yang terjadi setiap kali kamu mengirim prompt

1. **AI menulis rencana singkat.** Baca sekilas. Kalau AI bertanya, misalnya
   "Boleh lanjut?", jawab **"ya, lanjut"**.
2. **AI meminta izin menjalankan sesuatu.** Akan muncul tombol seperti
   **Accept**, **Allow**, **Run**, atau **Approve**. Klik saja. Itu AI yang
   sedang memasang bahan atau menjalankan aplikasimu. Satu-satunya yang perlu
   kamu tolak: perintah yang menyebut **`sudo`** atau "hapus banyak file".
   Kalau melihatnya, klik tolak lalu tanya AI, "Kenapa perlu itu?"
3. **Tunggu.** Biasanya 3–15 menit. Ambil kopi. ☕
4. **AI memberi laporan** dengan 4 bagian: *Yang berubah*, *Cara mengecek*,
   *Hasil pemeriksaan*, *Langkah berikutnya*. Kalau *Hasil pemeriksaan*
   bertuliskan **lulus**, berarti aman.
5. **Lihat hasilnya sendiri.** Buka Chrome, ketik `localhost:3000` di
   kolom alamat, lalu tekan Enter. (Antigravity sering membukakannya
   untukmu.) Cocokkan dengan daftar "Cek setelahnya" di bawah prompt.
6. **Simpan.** Ketik `/simpan` (Antigravity) atau
   *"Simpan semua perubahan dengan commit."* (Codex).

Kalau hasilnya **tidak sesuai**, ceritakan saja apa yang kamu lihat dengan
bahasamu sendiri. Contoh: *"Tombol Buat-nya tertutup di HP, tolong
perbaiki."* Kalau hasilnya **makin rusak**, ketik `/batalkan` (Antigravity)
atau *"Kembalikan ke titik simpan terakhir."* (Codex).

### Ketujuh langkahnya

| # | Yang kamu kirim | Yang kamu lihat setelahnya | Biaya |
|---|---|---|---|
| 1 | Prompt **Langkah 1: Proyek awal** | halaman putih bawaan di `localhost:3000` | gratis |
| 2 | Prompt **Langkah 2: Tampilan studio** | tampilan studio gelap dengan kotak tulisan di bawah | gratis |
| 3 | Prompt **Langkah 3: Semua fitur di mode demo** | klik **Buat** memunculkan gambar/video contoh | gratis |
| 4 | ✋ Isi API key dulu, lalu prompt **Langkah 4** | gambar dan video dari AI sungguhan | ±Rp100 untuk tes |
| 5 | Prompt **Langkah 5: Kode akses + audit** | aplikasi meminta kode akses | gratis |
| 6 | ✋ Prompt **Langkah 6: Publish**, lalu isi Vercel | aplikasimu online di `xxx.vercel.app` | gratis |
| 7 | Prompt **Langkah 7** (opsional) | fitur ide kamu sendiri | tergantung |

### Langkah 4 butuh satu hal yang kamu kerjakan sendiri ✋

Sebelum mengirim prompt Langkah 4, kamu harus memberikan API key Yorai ke
aplikasi. Caranya **bukan lewat chat**:

1. Di panel daftar file (kiri), cari file bernama **`.env.local`** lalu klik.
   (Kalau tidak terlihat, ketik ke agen: *"Buka file .env.local untuk saya."*)
2. Kamu akan melihat beberapa baris tulisan. Cari baris `YORAI_API_KEY=`, lalu
   tempel API key-mu tepat setelah tanda `=` (tanpa spasi).
3. Cari baris `DEMO_MODE=true` dan ubah menjadi `DEMO_MODE=false`.
4. Simpan file: Ctrl+S (Mac: Cmd+S).
5. Sekarang kirim prompt Langkah 4. AI akan menyebutkan perkiraan biaya
   sebelum memakai kredit.

> Mulai Langkah 4, setiap klik **Buat** memakai kredit sungguhan. Biayanya
> selalu tertulis di tombol **Buat** sebelum kamu klik.

### Langkah 6: menayangkan ke internet ✋

1. Kirim prompt Langkah 6 (di Antigravity cukup ketik `/publish`). AI akan
   menyimpan proyekmu ke GitHub. Kalau AI meminta kamu login GitHub, ikuti
   petunjuknya di browser.
2. Buka https://vercel.com/new. Di daftar repository, cari `posterku` lalu
   klik **Import**.
3. Klik bagian **Environment Variables**. Isi tiga baris ini (kolom kiri =
   nama, kolom kanan = nilai), klik **Add** setiap selesai satu baris:

   | Nama (kiri) | Nilai (kanan) |
   |---|---|
   | `YORAI_API_KEY` | API key Yorai-mu (dari catatan pribadimu) |
   | `APP_PASSCODE` | kata sandi bebas buatanmu, misalnya `kopi2026` |
   | `DEMO_MODE` | `false` |

4. Klik **Deploy**. Tunggu 1–2 menit sampai muncul kembang api 🎉.
5. Klik gambar pratinjaunya. Itulah aplikasimu di internet. Buka di HP,
   masukkan `APP_PASSCODE` tadi, lalu coba buat gambar.

> `APP_PASSCODE` adalah gembok aplikasimu. Bagikan link-nya boleh, tapi kode
> aksesnya hanya untuk orang yang kamu percaya, karena setiap gambar dan video
> memakai kreditmu.

Panduan klik demi klik yang lebih rinci: [PUBLISH-VERCEL.md](PUBLISH-VERCEL.md).

---

## Bagian D — Cek akhir sebelum dibagikan

Centang satu per satu:

- [ ] Aplikasi bisa dibuka di HP dan tidak perlu digeser ke samping
- [ ] Tanpa kode akses, aplikasi tidak bisa membuat apa pun
- [ ] **Prompt otomatis** → isi nama produk → **Buat** menghasilkan gambar
- [ ] Saat gambar sedang dibuat, ada tanda progres (persen dan waktu)
- [ ] Tombol **Unduh**, **Pakai prompt**, **Animasikan**, dan **Hapus** berfungsi
- [ ] Saldo di pojok kanan atas berkurang sesuai biaya

---

## Kalau ada masalah

| Yang kamu lihat | Yang kamu lakukan |
|---|---|
| Tulisan merah/error di aplikasi | salin pesan errornya, tempel ke agen, lalu tulis: *"Muncul error ini. Perbaiki dan jelaskan dengan bahasa awam."* |
| Tampilan berantakan | ambil screenshot, tempel ke agen (Antigravity/Codex bisa menerima gambar), lalu jelaskan yang aneh |
| AI berputar-putar, hasil makin rusak | `/batalkan` (atau *"Kembalikan ke titik simpan terakhir"*), lalu ulangi prompt yang sama di **percakapan baru** |
| AI menyuruhmu mengetik kode atau perintah | balas: *"Saya tidak bisa ngoding. Ikuti AGENTS.md: jalankan semuanya sendiri."* |
| `localhost:3000` tidak bisa dibuka | ketik ke agen `/jalankan` (atau *"Jalankan aplikasinya dan beri tahu alamatnya"*) |
| "Saldo kurang" | isi kredit di https://yorai.id/app/credits |
| "Server terlalu lama merespons" | AI di Yorai sedang sibuk. Tunggu sebentar lalu coba lagi |
| API key terlanjur ditempel di chat | buka https://yorai.id/app/api, hapus key lama, buat yang baru, lalu isi ulang di `.env.local` dan Vercel |

Prompt siap pakai untuk masalah lain: [PROMPT-DARURAT.md](PROMPT-DARURAT.md).

---

## Tips supaya hasilnya bagus

1. **Ceritakan apa yang kamu mau, bukan caranya.** Contoh: *"Pemilik warung
   harus bisa membuat video promo dari HP dalam 3 klik."* AI yang memikirkan
   caranya.
2. **Satu permintaan, satu pesan.** Lalu cek dan simpan.
3. **Simpan sebelum bereksperimen.** Kalau eksperimennya gagal, tinggal
   batalkan.
4. **Selalu cek di HP**, karena kebanyakan pengguna membukanya dari HP.
5. **Percakapan sudah sangat panjang?** Buka percakapan baru. AI bisa "lupa"
   kalau percakapannya terlalu panjang. Aturannya tetap terbaca dari
   `AGENTS.md`.
6. **Mau membuat aplikasi lain?** Lihat [CARA-PAKAI-AGENTS.md](CARA-PAKAI-AGENTS.md),
   langkah 7.
