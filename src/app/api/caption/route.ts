// Meminta AI teks menulis headline, caption, hashtag, dan prompt gambar.
import { config } from "@/lib/config";
import { checkPasscode, apiError, invalid } from "@/lib/guard";
import { styles, ratios, type PosterRequest } from "@/lib/styles";
import { captionMessages, fallbackCaption, parseCaption } from "@/lib/prompts";
import { demoCaption } from "@/lib/demo";
import { chat, YoraiError } from "@/lib/yorai";

export const runtime = "nodejs";

export const maxDuration = 60;

export async function POST(request: Request) {
  const denied = checkPasscode(request);

  if (denied) return denied;

  try {
    const f = await request.json();

    if (!f || typeof f !== "object" || Array.isArray(f))
      invalid("Data permintaan tidak valid");

    const fieldLabels = { product: "Nama produk", description: "Deskripsi", promo: "Promo" };

    for (const [key, max, required] of [
      ["product", 60, true],
      ["description", 500, false],
      ["promo", 100, false],
    ] as const) {
      if (
        typeof f[key] !== "string" ||
        f[key].length > max ||
        (required && !f[key].trim())
      )
        invalid(
          `${fieldLabels[key]} harus diisi dengan benar (maksimal ${max} karakter)`,
        );
    }

    if (
      !styles.some((s) => s.id === f.style) ||
      !ratios.some((r) => r.id === f.ratio) ||
      typeof f.withPhoto !== "boolean"
    )
      invalid("Gaya, rasio, atau pilihan foto tidak valid");

    if (config.demo) return Response.json(demoCaption(f as PosterRequest));

    const form = f as PosterRequest;

    try {
      const result = await chat(captionMessages(form), 40000);

      try {
        return Response.json(parseCaption(result.choices[0].message.content));
      } catch {
        throw new YoraiError(
          502,
          "invalid_caption",
          "AI mengembalikan caption yang tidak valid. Silakan coba lagi.",
        );
      }
    } catch (e) {
      if (e instanceof YoraiError && (e.status === 401 || e.status === 402))
        throw e;

      const code = e instanceof YoraiError ? e.code : "invalid_response";

      console.warn("caption fallback", code);

      return Response.json({ ...fallbackCaption(form), fallback: true });
    }
  } catch (e) {
    return apiError(e);
  }
}
