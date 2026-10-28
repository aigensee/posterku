# Langkah 5: Kode akses + audit sebelum rilis

**Tujuan:** aplikasi aman dibagikan ke orang lain dan lolos pemeriksaan
seperti produk profesional.
**Waktu:** 30–45 menit.

## Prompt

```
Lanjutkan PosterKu (AGENTS.md). Langkah ini: kode akses lalu audit akhir.

1. Kode akses: jika server mewajibkan APP_PASSCODE, tampilkan dialog yang rapi
   untuk memasukkan kode. Simpan di localStorage, kirim sebagai header
   x-passcode di setiap request, dan buka dialog lagi jika server membalas
   "Kode akses salah". Uji dengan APP_PASSCODE=kelas123 di .env.local.
2. Audit seperti reviewer profesional:
   - Keamanan: key hanya di server, semua route (kecuali status dan file)
     dicek passcode, input divalidasi dengan models.ts, tidak ada key di file
     yang di-commit.
   - Tampilan: 390px, 768px, 1280px, tema gelap dan terang; keadaan kosong,
     loading, error, sukses; tidak ada scroll ke samping.
   - Aksesibilitas: label, fokus keyboard, Esc menutup popover/modal, kontras,
     teks alternatif, prefers-reduced-motion.
   - Lint, typecheck, build.
   Buat daftar temuan, perbaiki semuanya, lalu laporkan sebelum dan sesudah.
Commit "Kode akses dan audit".
```

## Cek hasil

- [ ] Salah memasukkan kode akses: dialog muncul lagi dengan pesan jelas
- [ ] Audit tidak menyisakan temuan
