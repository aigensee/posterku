---
description: Kembalikan aplikasi ke titik simpan terakhir yang masih berjalan baik
---

1. Tampilkan 5 titik simpan terakhir (`git log --oneline -5`) dengan penjelasan awam masing-masing.
2. Tanyakan pengguna mau kembali ke titik mana. Jika pengguna sudah menyebutkannya, lanjutkan.
3. Sebelum membatalkan, simpan perubahan yang belum di-commit dengan `git stash push -u -m "cadangan sebelum batal"` agar tidak hilang permanen.
4. Kembalikan file ke titik tersebut dengan `git restore --source <commit> -- .` lalu commit dengan pesan "Kembali ke: <pesan commit>".
5. Jalankan `/cek-kualitas` dan laporkan hasilnya.
