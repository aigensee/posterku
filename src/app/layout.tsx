// Mengatur bahasa, font, dan metadata aplikasi PosterKu.
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "PosterKu Studio — Gambar & video promosi dengan AI",
  description:
    "Buat poster promosi menarik untuk usaha lokal dengan AI. Tulis produkmu, pilih gaya, dan unduh poster beserta caption dalam hitungan detik.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('posterku.theme');document.documentElement.dataset.theme=['dark','light','system'].includes(t)?t:'dark'}catch(e){}`,
          }}
        />
      </head>
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
