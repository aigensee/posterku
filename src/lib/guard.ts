// Melindungi endpoint berbayar dan menyamakan bentuk kesalahan API.
import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { config } from "./config";
import { YoraiError } from "./yorai";

export function checkPasscode(request: Request) {
  if (!config.passcode) return null;
  const actual = Buffer.from(request.headers.get("x-passcode") || "");
  const expected = Buffer.from(config.passcode);

  return actual.length === expected.length && timingSafeEqual(actual, expected)
    ? null
    : NextResponse.json(
      { error: { code: "passcode", message: "Kode akses salah" } },
      { status: 401 },
    );
}

export function apiError(e: unknown) {
  if (e instanceof YoraiError) {
    return NextResponse.json(
      { error: { code: e.code, message: e.message } },
      { status: e.status },
    );
  }

  if (e instanceof SyntaxError) {
    return NextResponse.json(
      { error: { code: "invalid_request", message: "Data JSON tidak valid" } },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { error: { code: "internal", message: "Terjadi kesalahan. Silakan coba lagi." } },
    { status: 500 },
  );
}

export function invalid(message: string): never {
  throw new YoraiError(400, "invalid_request", message);
}

export const validId = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
