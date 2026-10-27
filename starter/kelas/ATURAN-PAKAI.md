# Aturan pakai: membangun aplikasi dengan AI tanpa ngoding

Berlaku untuk **Google Antigravity** maupun **ChatGPT Codex**. Kamu berperan
sebagai *pemilik produk*, dan AI berperan sebagai *programmer*. Kamu tidak
perlu mengerti kodenya, tetapi kamu harus jelas soal **apa yang kamu mau** dan
**bagaimana mengecek hasilnya**.

## 10 aturan emas

1. **Satu prompt, satu tujuan.** Jangan minta lima fitur sekaligus. Pakai
   prompt dari folder `kelas/prompts/` sesuai urutan.
2. **Mulai dari percakapan baru untuk tiap langkah besar.** Percakapan yang
   terlalu panjang membuat AI lupa dan mulai ngawur.
3. **Minta rencana dulu untuk hal besar.** Tambahkan: *"Tulis rencanamu dulu,
   tunggu persetujuan saya."* Baca rencananya: masuk akal? sesuai mau kamu?
4. **Cek dengan mata sendiri.** Setelah AI bilang "selesai", buka aplikasinya
   dan coba seperti pengguna biasa. Jangan percaya laporan saja.
5. **Simpan setiap kali berhasil.** Ketik `/simpan` (Antigravity) atau
   *"Commit perubahan ini dengan pesan yang jelas"* (Codex). Ini titik aman
   untuk kembali kalau nanti ada yang rusak.
6. **Kalau error, tempel errornya utuh.** Salin pesan error (atau screenshot),
   lalu tulis: *"Muncul error ini saat saya klik X. Jelaskan penyebabnya
   dengan bahasa awam, lalu perbaiki."*
7. **Kalau AI berputar-putar (3 kali gagal), mundur.** Ketik `/batalkan`
   atau *"Kembalikan ke titik simpan terakhir"*, lalu ulangi dengan prompt
   yang lebih jelas atau lebih kecil.
8. **API key itu rahasia seperti PIN ATM.** Jangan pernah menempelkannya di
   chat AI, di kode, atau di GitHub. Tempel hanya di file `.env.local` (di
   komputer) dan di *Environment Variables* Vercel.
9. **Pakai mode demo saat latihan.** `DEMO_MODE=true` tidak memakai kredit.
   Matikan hanya ketika siap mencoba AI sungguhan.
10. **Deskripsikan hasil, bukan cara.** Tulis *"tombolnya terlalu kecil di HP
    dan warnanya kurang kontras"*, bukan *"ubah padding jadi 12px"*. Biarkan
    AI memilih caranya.

## Rumus prompt yang bagus

```
[Konteks]  Kita sedang membangun PosterKu (lihat AGENTS.md).
[Tugas]    Tambahkan <fitur> agar <pengguna> bisa <manfaat>.
[Detail]   Tampilannya <deskripsi>, letaknya <di mana>, perilakunya <bagaimana>.
[Batasan]  Jangan ubah <bagian lain>. Jangan tambah library baru.
[Selesai]  Selesai kalau <hal yang bisa saya cek sendiri>.
```

Contoh:

> Kita sedang membangun PosterKu (lihat AGENTS.md). Tambahkan tombol
> "Bagikan ke WhatsApp" di bawah poster agar pengguna bisa langsung mengirim
> caption ke WhatsApp. Tombolnya hijau WhatsApp, sejajar dengan tombol Unduh.
> Di HP, tombol membuka aplikasi WhatsApp dengan caption terisi. Jangan ubah
> bagian lain. Selesai kalau saya klik tombolnya dan WhatsApp Web terbuka
> dengan caption poster.

## Cara mengecek hasil (tanpa membaca kode)

| Cek | Caranya |
|---|---|
| Tampilan desktop | buka `http://localhost:3000` di browser |
| Tampilan HP | di Chrome: klik kanan → *Inspect* → ikon HP, pilih iPhone. Atau minta AI: *"cek tampilan di lebar 390px dan kirim screenshot"* |
| Fitur jalan | coba seperti pengguna: isi form, klik, tunggu, unduh |
| Error tersembunyi | minta AI: *"jalankan /cek-kualitas"* (Antigravity) atau *"jalankan lint, typecheck, dan build, lalu perbaiki sampai lulus"* (Codex) |
| Biaya | lihat saldo di pojok kanan atas aplikasi, atau di yorai.id |
