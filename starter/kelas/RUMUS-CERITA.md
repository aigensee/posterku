# Rumus "cukup bercerita": membuat aplikasi hanya lewat chat

Cara paling sederhana. Kamu **tidak menulis file apa pun** dan tidak perlu
mengerti `AGENTS.md`. Rumusnya hanya tiga:

> **1. Tempel satu "pesan pemandu".**
> **2. Ceritakan idemu seperti curhat ke teman.**
> **3. Jawab pertanyaannya, lalu bilang "lanjut".**

AI yang bertanya balik, menyusun rencana, menulis kode, mengetes, menyimpan,
dan mencatat semuanya sendiri.

---

## Sebelum mulai

1. Buat folder kosong, misalnya `Documents/warungku`.
2. Buka Antigravity dalam tampilan **Editor** (Cmd/Ctrl+E kalau yang muncul
   Agent Manager), lalu **File → Open Folder** dan pilih folder itu.
3. Node.js dan Git sudah terpasang (lihat
   [PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md), bagian A2).

## Langkah 1 — Tempel pesan pemandu (sekali saja per proyek)

Salin kotak ini ke chat agen, lalu kirim:

~~~~
Mulai sekarang kamu adalah mentor sekaligus programmer pribadiku. Aku tidak
bisa ngoding sama sekali. Aku hanya akan bercerita, dan kamu yang mengubah
ceritaku menjadi aplikasi web yang profesional.

Cara kita bekerja:
1. Pakai bahasa Indonesia yang sangat sederhana, tanpa istilah teknis. Kalau
   terpaksa, jelaskan dengan perumpamaan sehari-hari.
2. Kamu yang mengerjakan semua hal teknis: membuat dan mengubah file,
   menjalankan perintah, dan mengetes di browser. Jangan pernah memintaku
   menulis kode atau mengedit file, kecuali mengisi kunci rahasia di
   .env.local (pandu aku klik demi klik).
3. Kamu yang menjaga catatan proyek di file AGENTS.md: ringkasan ceritaku,
   keputusan kita, aturan kualitas dan keamanan, serta bagian "Kemajuan"
   (apa yang sudah jadi dan langkah berikutnya). Kalau kamu Antigravity, buat
   juga .agents/rules/proyek.md (diawali "---", "trigger: always_on", "---")
   yang menyuruh agen selalu membaca AGENTS.md; kalau tidak bisa, lewati
   saja. Perbarui catatan ini sendiri setiap
   ada keputusan baru; cukup kabari aku satu kalimat. Kalau AGENTS.md sudah
   ada, baca dulu dan lanjutkan dari bagian "Kemajuan".
4. Kalau ceritaku belum lengkap, tanya balik SATU pertanyaan per pesan
   (maksimal 5), selalu dengan 2–3 contoh jawaban yang bisa kupilih. Setelah
   cukup, ringkas rencanamu dalam 5 poin dan tunggu aku bilang "lanjut".
5. Bangun sedikit demi sedikit. Di setiap langkah: kerjakan, cek sendiri
   (lint, typecheck, build, lalu buka di browser ukuran laptop dan HP),
   simpan titik aman dengan git commit berbahasa Indonesia, lalu laporkan
   apa yang bisa kucoba sekarang (klik apa, di mana) dan beri 3 pilihan
   langkah berikutnya.
6. Mulai dengan mode demo (hasil contoh, gratis). Untuk AI sungguhan pakai
   API Yorai; baca dulu https://yorai.id/llms.txt. Kunci API hanya boleh ada
   di server dan .env.local, tidak pernah di kode atau chat. Sebutkan
   perkiraan biaya dalam Rupiah sebelum memakai kredit.
7. Kualitas wajib: tampilan profesional dan nyaman di HP, setiap tombol punya
   keadaan sedang diproses/berhasil/gagal, pesan error mudah dimengerti, dan
   tidak menambah library baru tanpa izinku.
8. Kalau aku bilang "batalkan", kembalikan ke titik simpan sebelumnya. Kalau
   aku bilang "online-kan", pandu aku sampai aplikasinya tayang di Vercel.

Kalau sudah paham, perkenalkan dirimu dalam 2 kalimat, lalu minta aku
bercerita.
~~~~

## Langkah 2 — Bercerita

Tidak ada format khusus. Supaya AI cepat paham, ceritakan **5 hal** ini
dengan bahasamu sendiri (rumus **S-P-M-K-C**):

| | Pertanyaan | Contoh |
|---|---|---|
| **S**iapa aku | apa usahamu / pekerjaanmu? | "Aku punya kedai kopi kecil di Bandung." |
| **P**engguna | siapa yang akan memakai aplikasinya? | "Aku sendiri dan teman-teman UMKM di komunitasku, lewat HP." |
| **M**asalah | apa yang sekarang merepotkan? | "Bikin poster promo tiap minggu itu lama, desainer mahal." |
| **K**eajaiban | andai ada aplikasi yang bisa apa? | "Ketik nama produk dan promonya, langsung jadi poster dan caption Instagram. Kalau bisa, jadi video pendek juga." |
| **C**ontoh rasa | tampilannya ingin seperti apa? | "Seperti aplikasi studio desain: gelap, elegan, rapi." (boleh lampirkan screenshot) |

Contoh pesan lengkap:

> Aku punya kedai kopi kecil di Bandung. Tiap minggu aku harus bikin poster
> promo buat Instagram, dan itu makan waktu lama. Aku ingin aplikasi di HP:
> cukup ketik nama produk dan promonya, langsung jadi gambar promosi plus
> caption dan hashtag. Kalau bisa gambarnya juga bisa dijadikan video pendek.
> Nanti teman-teman UMKM di komunitasku juga ingin pakai. Tampilannya seperti
> studio desain yang gelap dan elegan.

Setelah itu AI akan bertanya balik beberapa hal, misalnya:

> *"Apakah pengguna perlu kode akses supaya kreditmu tidak dipakai orang
> lain? (a) Ya, pakai kode akses sederhana (b) Tidak perlu dulu"*

Cukup jawab **a** atau **b**, atau tulis dengan kata-katamu.

## Langkah 3 — Membangun sambil mengobrol

Setelah AI meringkas rencananya, tinggal pakai **kalimat-kalimat ini**:

| Kamu ingin… | Ketik saja |
|---|---|
| AI mulai / meneruskan | **"lanjut"** |
| melihat hasilnya | **"tunjukkan cara mencobanya"** |
| mengubah sesuatu | **"tombolnya kurang besar"**, **"warnanya terlalu gelap"**, **"di HP teksnya kepotong"** |
| meniru tampilan | lampirkan screenshot + **"buat mirip ini"** |
| menambah fitur | **"tambahkan tombol bagikan ke WhatsApp"** |
| membatalkan yang barusan | **"batalkan"** |
| memakai AI sungguhan | **"sambungkan ke AI sungguhan"** (AI akan memandu mengisi kunci API) |
| menayangkan ke internet | **"online-kan"** |
| tidak paham penjelasannya | **"aku bingung, jelaskan pelan-pelan dengan contoh"** |
| ada tulisan error | tempel errornya + **"ini apa? tolong perbaiki"** |

> **Tips:** satu permintaan per pesan. Tunggu AI selesai dan coba hasilnya
> dulu sebelum meminta hal berikutnya.

## Kalau besok mau melanjutkan

Buka folder yang sama, mulai **chat baru**, lalu ketik:

```
lanjutkan proyek ini
```

AI akan membaca catatan di `AGENTS.md` (yang ia tulis sendiri) dan melanjutkan
dari bagian "Kemajuan". Kamu tidak perlu menempel pesan pemandu lagi.

## Kenapa rumus ini berhasil?

- **Pesan pemandu** mengubah AI dari "penjawab pertanyaan" menjadi mentor yang
  bertanya balik, bekerja bertahap, dan selalu memberi pilihan berikutnya.
- **Cerita** memberi AI konteks yang tidak bisa diberikan daftar fitur:
  siapa penggunanya dan kenapa aplikasinya penting. Dari situ AI bisa
  mengambil keputusan desain yang masuk akal.
- **Catatan proyek (`AGENTS.md`) ditulis oleh AI sendiri**, jadi aturan
  kualitas dan keamanan tetap ada tanpa kamu harus tahu cara menulisnya.

## Kalau mau lebih terarah

Rumus cerita memberi hasil yang berbeda-beda untuk tiap orang. Itu wajar.
Kalau ingin hasilnya persis seperti PosterKu Studio, pakai jalur berpemandu:
[PANDUAN-MEMBUAT.md](PANDUAN-MEMBUAT.md) + [PROMPT-LENGKAP.md](PROMPT-LENGKAP.md),
dan [PROMPT-TAMPILAN.md](PROMPT-TAMPILAN.md) untuk meniru tampilannya.
