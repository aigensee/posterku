# Cara memakai AGENTS.md, langkah demi langkah

## Apa itu AGENTS.md?

`AGENTS.md` adalah **surat tugas untuk AI programmer**. Isinya siapa kamu,
apa yang dibangun, standar kualitas, dan aturan yang tidak boleh dilanggar.
Codex dan Antigravity membacanya sendiri setiap kali mulai bekerja, jadi kamu
tidak perlu mengulang instruksi panjang di setiap prompt.

Tanpa AGENTS.md:
> "Buat tombol unduh" → AI membuat tombol seadanya, tidak dites, mungkin
> merusak bagian lain, lalu menjelaskannya dengan istilah teknis.

Dengan AGENTS.md:
> "Buat tombol unduh" → AI menulis rencana singkat, membuat tombol yang
> sesuai desain, menjalankan pemeriksaan, mengetesnya di browser, menyimpan
> titik aman, lalu melapor dengan bahasa awam.

## Isi AGENTS.md dan fungsinya

| Bagian | Isi | Efeknya ke hasil |
|---|---|---|
| Blok Next.js (paling atas) | "Next.js versi ini berbeda, baca dokumentasinya dulu" | AI tidak menulis kode gaya lama yang error. **Jangan dihapus.** |
| 1. Cara berkomunikasi | bahasa awam, rencana dulu, format laporan | kamu selalu tahu apa yang terjadi |
| 2. Definisi "selesai" | lint + typecheck + build lulus, dites, di-commit | AI tidak bilang "beres" padahal error |
| 3. Standar kualitas | tampilan profesional, loading/error jelas, aksesibel | hasil rapi walau prompt-mu singkat |
| 4. Keamanan dan biaya | API key hanya di server, pakai mode demo | key tidak bocor, kredit tidak terbuang |
| 5. Tentang produk | alur PosterKu + peta file | AI tahu harus mengubah file yang mana |
| 6. API Yorai | alamat dokumentasi + format request | AI memanggil API dengan benar |

---

## Langkah 1: Siapkan folder proyek

1. Download ZIP repository kelas, lalu ekstrak.
2. Salin folder `starter` ke `Documents`, lalu ganti namanya menjadi
   `posterku`.
3. Pastikan isinya ada: `AGENTS.md`, `kelas/`, dan `.agents/`.
   Folder `.agents` tersembunyi. Tampilkan dengan `Cmd + Shift + .` (Mac),
   atau di Windows: Explorer → View → Show → Hidden items.

> AGENTS.md harus ada di **folder paling luar** proyek. Kalau ada di dalam
> subfolder, AI tidak akan membacanya untuk seluruh proyek.

## Langkah 2A: Membuka di Google Antigravity

1. Buka Antigravity, pilih **Open Folder**, lalu pilih folder `posterku`.
2. Cek aturannya aktif: buka menu **Customizations → Rules** (letak menu
   bisa sedikit berbeda antarversi). Harus ada rule `posterku` dengan status
   *Always On*. Rule ini menyuruh agen membaca AGENTS.md.
3. Cek pintasannya: ketik `/` di kotak chat agen. Harus muncul `jalankan`,
   `cek-kualitas`, `simpan`, `batalkan`, dan `publish`.
4. Pilih mode **Planning**, bukan Fast, supaya agen menunjukkan rencananya
   dulu.

## Langkah 2B: Membuka di ChatGPT Codex

**Codex di komputer (aplikasi Codex / ekstensi VS Code / CLI):**

1. Buka folder `posterku` sebagai *workspace/project*.
2. Selesai. Codex otomatis membaca `AGENTS.md` di folder itu.

**Codex di web (chatgpt.com/codex):**

1. Buat repository baru di GitHub, lalu upload isi folder `posterku` lewat
   **Add file → Upload files**.
2. Di Codex web, buat *environment* untuk repository itu. Di bagian *setup
   script*, isi `npm install`.
3. Setiap tugas menghasilkan *pull request*. Kamu yang mengecek, lalu klik
   **Merge** di GitHub.

## Langkah 3: Tes apakah AI sudah membaca aturannya

Kirim prompt ini di percakapan pertama:

```
Sebelum mulai, baca AGENTS.md. Jelaskan ke saya dalam 5 poin singkat:
aturan kerja apa yang akan kamu ikuti, dan kapan sebuah tugas kamu anggap
selesai. Jangan mengubah file apa pun dulu.
```

Jawaban yang benar menyebut hal-hal ini: bahasa awam, rencana dulu,
lint/typecheck/build harus lulus, API key hanya di server, mode demo, dan
commit setiap selesai.

Kalau jawabannya melenceng, berarti AI tidak membaca file itu. Cek lagi
Langkah 1: AGENTS.md harus ada di folder paling luar.

## Langkah 4: Kerjakan prompt demi prompt

Untuk **setiap** file di `kelas/prompts/` (01 → 07):

1. **Buka percakapan baru.** Percakapan yang terlalu panjang membuat AI lupa
   aturan.
2. **Salin prompt** dari file itu, lalu tempel ke agen.
3. **Baca rencananya.** Sesuai dengan yang kamu mau? Kalau ya, ketik
   "Lanjut". Kalau belum, koreksi: "Jangan ubah X, fokus ke Y saja".
4. **Izinkan perintah terminal** yang diminta agen, seperti `npm install`,
   `npm run dev`, atau `git commit`. Tolak kalau ada perintah yang menghapus
   banyak file atau memakai `sudo`, lalu tanya alasannya.
5. **Baca laporannya.** Formatnya selalu sama karena diatur AGENTS.md:
   Yang berubah, Cara mengecek, Hasil pemeriksaan, Langkah berikutnya.
6. **Cek sendiri** sesuai bagian "Cara mengecek" dan checklist di file prompt.
7. **Simpan:** `/simpan` (Antigravity) atau "Commit perubahan ini"
   (Codex).

Prompt kita bisa pendek karena AGENTS.md sudah memuat semua standar.
Cukup tulis **apa yang mau dibuat**. Soal **bagaimana kualitasnya**, AI
sudah tahu dari AGENTS.md.

## Langkah 5: Kalau AI melanggar aturan

| Yang terjadi | Kirim ini |
|---|---|
| Laporan penuh istilah teknis | "Ikuti AGENTS.md bagian 1: jelaskan ulang dengan bahasa awam, format laporan." |
| Bilang selesai tapi ada error | "Menurut AGENTS.md bagian 2 ini belum selesai. Jalankan lint, typecheck, build sampai lulus." |
| Menyuruhmu mengedit kode | "Saya tidak bisa ngoding (AGENTS.md bagian 1). Tolong kamu yang kerjakan." |
| Menempelkan key di kode | "Ini melanggar AGENTS.md bagian 4. Pindahkan ke .env.local dan pastikan tidak ter-commit." |
| Mau memasang library baru | Tanya: "Kenapa perlu? Bisa tanpa library?" Lalu putuskan. |
| Tampilan tidak konsisten | "Ikuti AGENTS.md bagian 3: pakai warna dan komponen yang sudah ada." |

## Langkah 6: Mengubah AGENTS.md (aturan baru)

AGENTS.md boleh dan sebaiknya **tumbuh** seiring proyek. Contoh: setiap
kali kamu mengoreksi AI untuk hal yang sama dua kali, jadikan aturan.

Jangan mengedit manual. Suruh AI:

```
Tambahkan aturan ke AGENTS.md bagian 3: semua tombol utama memakai warna
oranye dan sudut membulat penuh. Jangan ubah bagian lain, termasuk blok
Next.js di paling atas. Tunjukkan perubahannya ke saya.
```

Aturan menulis aturan:
- **Spesifik dan bisa dicek.** "Semua teks tombol diawali kata kerja" lebih
  baik daripada "tombol harus bagus".
- **Singkat.** File yang terlalu panjang malah diabaikan sebagian. Antigravity
  membatasi satu file rules ±12.000 karakter.
- **Satu tempat.** Jangan menulis aturan yang sama di prompt dan di
  AGENTS.md dengan isi berbeda.

## Langkah 7: Pakai AGENTS.md untuk proyekmu sendiri

Setelah PosterKu selesai, kamu bisa membuat generator lain (misalnya
generator foto produk, generator lagu jingle, atau generator video pendek):

1. Salin AGENTS.md ke folder proyek baru.
2. **Bagian 1–4 biarkan.** Itu standar kerja yang berlaku untuk proyek apa
   pun.
3. Minta AI menulis ulang **bagian 5 dan 6**:

```
Saya mau membuat <ide aplikasi> untuk <siapa> agar mereka bisa <manfaat>.
Pakai API Yorai (baca https://yorai.id/llms.txt) dengan model <slug> dari
https://yorai.id/docs/api/models. Tulis ulang AGENTS.md bagian 5 (tentang
produk: alur pengguna + peta file) dan bagian 6 (API yang dipakai) untuk
aplikasi ini. Jangan ubah bagian 1–4 dan blok Next.js. Belum menulis kode.
```

4. Baca hasilnya. Sudah menggambarkan aplikasi yang kamu bayangkan? Kalau
   sudah, mulai dari prompt 01 dengan nama aplikasimu.

---

**Ringkasnya:** AGENTS.md = standar kualitas yang tetap. Prompt = apa yang
mau dibuat sekarang. Kamu = yang memutuskan dan mengecek.
