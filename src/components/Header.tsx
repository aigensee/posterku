"use client";

// Menampilkan identitas aplikasi dan saldo.
import Link from "next/link";
import type { Status } from "./usePosterku";
import { credit, rupiah } from "@/lib/format";

export function Header({
  status,
  balance,
}: {
  status: Status | null;
  balance: number | null;
}) {
  const balanceTitle = balance === null ? "Saldo belum tersedia" : `≈ ${rupiah(balance)}`;
  const balanceCredit = balance === null ? "—" : credit(balance);

  return (
    <header className="header">
      <Link className="brand" href="/">
        <span className="logo">✦</span>Poster<span>Ku</span>
        <small>STUDIO PROMOSI</small>
      </Link>
      <div className="header-chips">
        {status?.demo ? (
          <span className="demo-badge">
            <i /> Mode demo
          </span>
        ) : (
          <span
            className="balance"
            title={balanceTitle}
          >
            ◈ &nbsp; Saldo {balanceCredit} kredit
          </span>
        )}
      </div>
    </header>
  );
}
