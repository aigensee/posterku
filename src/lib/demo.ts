// Menyediakan latihan tanpa kredit, termasuk poster SVG dan pekerjaan simulasi.
import { fallbackCaption } from "./prompts";
import {
  styles,
  type PosterRequest,
  type CaptionResult,
  type PosterJob,
} from "./styles";

export const demoPattern =
  /^demo-(?:video-)?([a-z0-9]+)-(1:1|3:4|9:16|16:9)-(minimalis|ceria|mewah|retro|natural)-([A-Za-z0-9_-]{1,216})$/;

export function demoCaption(form: PosterRequest): CaptionResult {
  return fallbackCaption(form);
}

export function createDemo(prompt: string, ratio: string, style = "minimalis", video = false) {
  const title = prompt.match(/"([^"\n]+)"/)?.[1] || prompt.match(/poster for (.+?)(?:\.|$)/i)?.[1] || prompt.match(/Visual reference: (.+?)(?:\.|$)/i)?.[1] || "Produk pilihanmu";
  const truncated = title.slice(0, 40);
  const headline = title.length > 40 && /\S/.test(title[40])
    ? truncated.replace(/\s+\S*$/, "")
    : truncated.trimEnd();
  const encoded = Buffer.from(headline, "utf8").toString("base64url");
  const id = `demo-${video ? "video-" : ""}${Date.now().toString(36)}-${ratio}-${style}-${encoded}`;

  return demoJob(id);
}

export function demoJob(id: string): PosterJob {
  const match = id.match(demoPattern)!;
  const done = Date.now() - parseInt(match[1], 36) >= (id.startsWith("demo-video-") ? 5000 : 3000);

  return {
    id,
    status: done ? "succeeded" : "running",
    credits: 0,
    fileId: done ? id : null,
    mime: done ? "image/svg+xml" : null,
    expiresAt: null,
    error: null,
  };
}

const escapeXml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );

export function demoPosterSvg(id: string) {
  const match = id.match(demoPattern)!;
  const [a, b] = match[2].split(":").map(Number);
  const width = 800;
  const height = (800 * b) / a;
  const style = styles.find((s) => s.id === match[3])!;
  const title = Buffer.from(match[4], "base64url").toString("utf8").slice(0, 40);
  const lines: string[] = [];
  let line = "";

  for (const word of title.split(/\s+/)) {
    if (line && line.length + word.length + 1 > 16) {
      lines.push(line);
      line = "";
    }

    for (let offset = 0; offset < word.length; offset += 16) {
      const part = word.slice(offset, offset + 16);

      if (offset > 0) {
        lines.push(line);

        line = "";
      }

      line = line ? `${line} ${part}` : part;
    }
  }

  if (line) lines.push(line);
  const textColor = match[3] === "mewah" || match[3] === "retro" ? "#ffffff" : "#1c1917";
  const fontSize = match[2] === "16:9" ? 38 : 64;
  const titleY = Math.max(150, height * 0.24);
  const titleLines = lines.slice(0, 4).map((text, index) =>
    `<tspan x="70" y="${titleY + index * fontSize * 1.15}">${escapeXml(text)}</tspan>`,
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${style.swatch[0]}"/><stop offset="1" stop-color="${style.swatch[1]}"/></linearGradient></defs><rect width="800" height="${height}" fill="url(#g)"/><circle cx="680" cy="${height * 0.55}" r="290" fill="white" opacity=".18"/><rect x="40" y="40" width="720" height="${height - 80}" rx="20" fill="none" stroke="white" opacity=".6"/><text x="70" y="105" font-family="sans-serif" font-size="20" fill="${textColor}">POSTERKU / PILIHAN LOKAL</text><text font-family="sans-serif" font-size="${fontSize}" font-weight="bold" fill="${textColor}">${titleLines}</text><text x="70" y="${height - 130}" font-family="sans-serif" font-size="26" fill="${textColor}">Dibuat untuk usahamu. Pesan sekarang!</text><text x="70" y="${height - 75}" font-family="sans-serif" font-size="16" fill="${textColor}">MODE DEMO · TANPA KREDIT</text></svg>`;
}
