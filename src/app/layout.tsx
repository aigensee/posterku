// Mengatur bahasa, font, dan metadata aplikasi PosterKu.
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "PosterKu — Poster promosi UMKM dengan AI",
  description:
    "Buat poster promosi menarik untuk usaha lokal dengan AI. Tulis produkmu, pilih gaya, dan unduh poster beserta caption dalam hitungan detik.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={jakarta.variable}>{children}</body>
    </html>
  );
}
