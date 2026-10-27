---
description: Periksa kesiapan lalu publikasikan aplikasi ke GitHub dan Vercel
---

1. Jalankan workflow `/cek-kualitas`. Jangan lanjut jika ada yang gagal.
2. Pastikan `.env.local` tidak ter-commit dan `.env.example` ada.
3. Jika belum ada remote GitHub, bantu pengguna membuat repository (pakai `gh repo create --private --source . --push` jika GitHub CLI sudah login; kalau belum, jelaskan langkah lewat situs github.com).
4. Jika remote sudah ada, `git push`.
5. Tunjukkan langkah Vercel dari `kelas/PUBLISH-VERCEL.md`: import repo, isi Environment Variables (`YORAI_API_KEY`, `APP_PASSCODE`, `DEMO_MODE=false`), lalu Deploy.
6. Ingatkan: jangan menempelkan API key di chat. Pengguna mengisinya sendiri di dashboard Vercel.
