# Langkah 7: Kembangkan sendiri (tantangan)

Pilih satu ide, isi template di bawah, lalu presentasikan hasilnya.

| Ide | Isi untuk "Tambahkan fitur" |
|---|---|
| Bagikan ke WhatsApp | tombol Bagikan ke WhatsApp di viewer yang membuka wa.me dengan caption terisi |
| Banyak bahasa | pilihan bahasa caption di Prompt otomatis: Indonesia, Inggris, Jawa |
| 4 variasi sekaligus | pilihan jumlah 1–4 di composer, total biaya tampil sebelum mulai |
| Template acara | gaya Ramadan, Kemerdekaan, Harbolnas, dan Imlek di Prompt otomatis |
| Musik latar | tab Audio di composer memakai model musik Yorai (cek https://yorai.id/docs/api/models) |
| Tambah model | model `<slug>` dari https://yorai.id/docs/api/models ke src/lib/models.ts (baca halaman .md-nya) |
| Branding toko | input nama toko dan warna brand di Prompt otomatis, lalu masukkan ke prompt |

## Prompt (template)

```
Lanjutkan PosterKu (AGENTS.md). Tambahkan fitur: <ide kamu>.
Untuk siapa: <siapa yang memakai, misalnya pemilik warung di HP>.
Detail: <apa yang terlihat dan bisa diklik>.
Batasan: jangan menambah library tanpa izin; kalau memakai kredit, tampilkan
biaya sebelum tombol diklik.
Cara mengecek: <apa yang harus saya coba di browser>.
Uji di mode demo dulu, lalu commit dengan pesan yang jelas.
```
