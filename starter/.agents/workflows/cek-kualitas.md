---
description: Periksa kualitas (lint, typecheck, build, tampilan) dan perbaiki sampai lulus
---

1. Jalankan `npm run lint`. Perbaiki semua error, lalu ulangi sampai lulus.
2. Jalankan `npx tsc --noEmit`. Perbaiki semua error, lalu ulangi sampai lulus.
3. Jalankan `npm run build`. Perbaiki semua error, lalu ulangi sampai lulus.
4. Dengan `npm run dev` berjalan, buka `http://localhost:3000` di lebar desktop dan 390px. Cek: tidak ada scroll ke samping, teks terbaca, tombol bisa diklik, tidak ada error console.
5. Pastikan `YORAI_API_KEY` tidak muncul di kode `src/components/` atau di file yang di-commit (`git grep -n "yor_live_"` harus kosong).
6. Laporkan hasil tiap langkah (lulus/gagal) dan apa saja yang diperbaiki, dalam bahasa awam.
