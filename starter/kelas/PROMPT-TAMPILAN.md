# Prompt tampilan: meniru desain dari screenshot

Bisa! Agen di Antigravity (model Gemini) dan Codex bisa **melihat gambar**.
Kamu cukup melampirkan screenshot tampilan yang diinginkan, lalu meminta agen
meniru tata letak, warna, dan nuansanya.

Screenshot PosterKu Studio yang siap dipakai ada di folder
[`referensi-tampilan/`](referensi-tampilan/):

| File | Isinya |
|---|---|
| `01-studio-grid.jpg` | tampilan utama: rail kiri, top bar, tab filter, grid hasil, composer |
| `02-studio-kosong.jpg` | keadaan kosong (belum ada hasil) + contoh prompt |
| `03-popover-pengaturan.jpg` | popover Gambar/Video, model, rasio, durasi, kualitas |
| `04-prompt-otomatis.jpg` | modal Prompt otomatis dengan 5 pilihan gaya |
| `05-kartu-progres.jpg` | kartu yang sedang dibuat (spinner, persen, waktu) |
| `06-viewer.jpg` | detail karya + caption |
| `07-tema-terang.jpg` | mode terang |
| `08-hp-390px.jpg` | tampilan HP |

Belum punya folder `kelas`? Unduh gambarnya dari
https://github.com/aigensee/posterku/tree/main/kelas/referensi-tampilan (klik
gambarnya, lalu tombol **Download raw file**).

---

## Cara melampirkan screenshot ke agen

- **Antigravity:** seret file gambar ke kolom chat agen, atau salin gambarnya
  lalu tempel (Ctrl+V / Cmd+V) di kolom chat. Bisa juga lewat ikon lampiran
  (**+** / klip kertas) bila ada.
- **Codex:** seret gambar ke kolom chat, atau pakai tombol lampiran.
- Pilih model yang mendukung gambar (model Gemini terbaru di Antigravity sudah
  mendukung). Nama dan versi model bisa berbeda; pilih yang paling baru.

## 5 aturan supaya hasilnya mirip

1. **Satu layar per prompt.** Jangan lampirkan 8 gambar sekaligus. Mulai dari
   tampilan utama, lalu bagian lain satu per satu.
2. **Screenshot + tulisan.** AI bisa salah menebak warna dan ukuran dari
   gambar. Prompt di bawah sudah menuliskan kode warna dan ukurannya.
3. **Minta AI membandingkan.** Antigravity bisa membuka aplikasimu dan
   mengambil screenshot sendiri. Minta ia membandingkan hasilnya dengan
   gambar acuan, lalu memperbaiki perbedaannya.
4. **Tiru tata letak dan nuansa, bukan logo atau merek orang lain.** Untuk
   referensi dari aplikasi lain, pakai nama, logo, dan teksmu sendiri.
5. **Simpan setiap selesai satu bagian** (`/simpan`), supaya mudah kembali
   kalau percobaan berikutnya gagal.

---

## Prompt T1 — tampilan utama (lampirkan `01` dan `02`)

Pakai prompt ini sebagai pengganti **Langkah 2** di
[PROMPT-LENGKAP.md](PROMPT-LENGKAP.md), atau setelahnya untuk merapikan.

~~~~
Lanjutkan PosterKu (AGENTS.md). Saya melampirkan 2 screenshot: tampilan utama
dengan hasil (01) dan keadaan kosong (02). Buat TAMPILAN aplikasi semirip
mungkin dengan kedua gambar ini. Belum perlu memanggil AI atau API.

Lihat gambarnya dengan teliti, lalu ikuti juga spesifikasi ini:
- Font Geist (next/font/google), bahasa halaman Indonesia.
- Tema gelap: latar #0b0b0c, permukaan #141416 dan #1b1b1f, garis #26262b,
  teks #f4f4f5, teks redup #a1a1aa. Aksen oranye koral #E8553D (hover
  #d24631) dengan teks putih. Simpan sebagai variabel di globals.css.
- Rail ikon kiri 64px (logo bintang oranye di atas; ikon Studio; di bawah
  tombol tema dan ikon link). Top bar 56px: "Studio PosterKu" di kiri; chip
  saldo/"Mode demo" dan tombol "Aktivitas" di kanan.
- Tab filter berbentuk pill: Semua, Gambar, Video beserta jumlahnya.
- Grid masonry: 3 kolom di layar ≥1280px, 2 kolom di bawahnya; kartu sudut
  12px, label "▶ VIDEO" di kiri atas kartu video.
- Keadaan kosong: ilustrasi kecil di tengah, label oranye kecil "DARI IDE JADI
  KARYA", judul "Apa yang ingin kamu buat hari ini?", 3 kartu contoh prompt
  yang bisa diklik.
- Composer melayang di bawah tengah: lebar maksimal 800px, sudut 20px, ada
  slot "+ Foto referensi", kolom "Apa yang ingin kamu buat?" dengan penghitung
  karakter, tombol "✦ Prompt otomatis" di kiri bawah, pill pengaturan
  ("Z-Image · 1:1 ⌃") dan tombol oranye "Buat" dengan badge biaya di kanan
  bawah. Grid diberi ruang bawah supaya tidak tertutup composer.

Setelah selesai, buka aplikasinya di browser, ambil screenshot di lebar
1440px, bandingkan dengan gambar acuan, lalu perbaiki perbedaan yang terlihat
(jarak, ukuran huruf, warna, sudut). Ulangi sampai mirip. Laporkan bagian
yang masih berbeda. Commit "Tampilan studio".
~~~~

## Prompt T2 — popover pengaturan (lampirkan `03`)

~~~~
Lanjutkan PosterKu (AGENTS.md). Lihat screenshot terlampir: popover
"Pengaturan karya" yang terbuka di atas pill pengaturan composer. Buat
popover yang sama:
- Judul "Pengaturan karya" + tombol tutup ×.
- Tab Gambar | Video (segmented control).
- Daftar model dari src/lib/models.ts: nama tebal, catatan kecil di bawahnya,
  "mulai 0,084 kredit" di kanan; model terpilih bergaris lebih terang.
- "Rasio": grid 3 kolom berisi ikon bentuk + teks (1:1, 3:4, 9:16, 16:9);
  yang terpilih bergaris oranye.
- Khusus Video: "Durasi" (chip 5 dtk / 10 dtk), "Kualitas" (480p / 720p),
  dan "Suara AI" dengan centang oranye.
- Tinggi maksimal mengikuti ruang di atas composer; kalau tidak muat, isinya
  bisa di-scroll dan judulnya tetap terlihat.
- Esc dan klik di luar menutup popover. Di HP berubah menjadi bottom sheet.
Bandingkan hasilnya dengan screenshot, perbaiki perbedaannya, lalu commit.
~~~~

## Prompt T3 — modal Prompt otomatis (lampirkan `04`)

~~~~
Lanjutkan PosterKu (AGENTS.md). Lihat screenshot terlampir: modal "Prompt
otomatis". Buat modal yang sama:
- Judul + tombol ×, kalimat "Ceritakan produkmu. Kami bantu menulis ide
  visual dan caption siap posting."
- Input "Nama produk *" (bintang sebaris dengan label), textarea "Deskripsi",
  input "Promo", masing-masing dengan placeholder contoh.
- "Gaya visual": 5 kartu kecil berisi gradasi warna + tulisan "Aa"
  (Minimalis, Ceria, Mewah, Retro, Natural) dengan nama dan tagline di
  bawahnya; yang terpilih bergaris oranye dengan centang di pojok.
- Tombol penuh oranye "Tulis prompt & caption".
- Latar di belakang modal digelapkan dan diburamkan; Esc menutup modal.
Bandingkan dengan screenshot, perbaiki, lalu commit.
~~~~

## Prompt T4 — kartu progres dan viewer (lampirkan `05` dan `06`)

~~~~
Lanjutkan PosterKu (AGENTS.md). Saya melampirkan 2 screenshot: kartu yang
sedang dibuat (05) dan viewer "Detail karya" (06). Samakan tampilannya:
- Kartu progres: rasio sesuai hasil, efek shimmer pelan; di BAGIAN ATAS kartu
  spinner oranye kecil, nama model tebal, status ("Membuat video…"), bar
  progres tipis oranye, teks "12% · 0:42 · Perkiraan", dan untuk video
  "Video biasanya 1–3 menit".
- Viewer: modal lebar; kiri media besar bersudut 12px; kanan label oranye
  kecil "GAMBAR / POSTERKU", "Prompt", tabel kecil Model / Pengaturan / Biaya /
  Dibuat, tombol oranye "Unduh gambar ↓", garis pemisah, lalu headline,
  caption, hashtag berwarna oranye, dan tombol "Salin caption".
Bandingkan dengan screenshot, perbaiki, lalu commit.
~~~~

## Prompt T5 — tema terang dan HP (lampirkan `07` dan `08`)

~~~~
Lanjutkan PosterKu (AGENTS.md). Saya melampirkan screenshot mode terang (07)
dan tampilan HP 390px (08).
- Tema terang: latar #fafafa, permukaan #ffffff, garis #e4e4e7, teks #18181b,
  teks redup #71717a, aksen tetap #E8553D. Tombol tema di rail berputar
  Gelap → Terang → Sistem, disimpan di localStorage, dan diterapkan sebelum
  halaman tampil (tanpa kedipan).
- HP: rail disembunyikan, top bar berisi logo kecil + "Studio PosterKu",
  tombol tema, chip saldo, ikon Aktivitas; grid 2 kolom; composer menempel di
  bawah layar selebar penuh, kolom prompt maksimal 4 baris; tidak ada scroll
  ke samping.
Cek di lebar 390px dan 1440px pada kedua tema, bandingkan dengan screenshot,
perbaiki, lalu commit.
~~~~

---

## Prompt cek kemiripan (kapan saja)

~~~~
Buka aplikasinya di browser. Ambil screenshot di lebar 1440px dan 390px, lalu
bandingkan dengan gambar acuan yang saya lampirkan. Buat daftar perbedaan
(maksimal 10, urut dari yang paling terlihat): jarak, ukuran huruf, warna,
sudut, posisi tombol, ikon. Perbaiki semuanya, ambil screenshot lagi, dan
tunjukkan sebelum-sesudahnya.
~~~~

## Pakai referensi desainmu sendiri

Punya contoh tampilan yang kamu suka (dari Dribbble, Pinterest, atau aplikasi
lain)? Lampirkan screenshot-nya, lalu kirim:

~~~~
Lanjutkan proyek ini (AGENTS.md). Screenshot terlampir adalah referensi gaya
yang saya suka. Ambil NUANSANYA saja (tata letak, kepadatan, warna, bentuk
tombol, ukuran huruf) untuk halaman <nama halaman>. Jangan menyalin logo, nama
merek, gambar, atau teks dari referensi; pakai nama dan isi aplikasi kita.
Sebelum mengubah, jelaskan dulu dalam 5 poin gaya apa yang kamu tangkap dari
gambar itu. Setelah selesai, bandingkan dengan referensi, perbaiki, lalu
commit.
~~~~
