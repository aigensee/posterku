// Memeriksa perkiraan biaya dan memulai pembuatan poster.
import { config } from "@/lib/config";
import { checkPasscode, apiError, invalid, validId } from "@/lib/guard";
import { ratios, styles } from "@/lib/styles";
import { createDemo } from "@/lib/demo";
import { photoPrompt } from "@/lib/prompts";
import { quote, createJob, clientJob, type JobBody } from "@/lib/yorai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = checkPasscode(request);

  if (denied) return denied;

  try {
    const f = await request.json();

    if (!f || typeof f !== "object" || Array.isArray(f))
      invalid("Data permintaan tidak valid");

    if (
      typeof f.prompt !== "string" ||
      !f.prompt.trim() ||
      f.prompt.length > 1000 ||
      !ratios.some((r) => r.id === f.ratio)
    )
      invalid("Prompt harus 1–1000 karakter dan rasio harus valid");

    if (
      f.photoFileId !== undefined &&
      (typeof f.photoFileId !== "string" ||
        !(
          validId(f.photoFileId) ||
          (config.demo && f.photoFileId === "demo-photo")
        ))
    )
      invalid("ID foto tidak valid");

    if (f.style !== undefined && !styles.some((s) => s.id === f.style)) {
      invalid("Gaya poster tidak valid");
    }

    if (config.demo) {
      return Response.json({
        job: createDemo(f.prompt, f.ratio, f.style),
        quotedCredits: 0,
      });
    }

    const body: JobBody = {
      model: f.photoFileId ? config.models.photo : config.models.image,
      type: f.photoFileId ? "image-to-image" : "text-to-image",
      input: {
        prompt: f.photoFileId ? photoPrompt(f.prompt) : f.prompt,
        aspect_ratio: f.ratio,
        ...(f.photoFileId ? { image_urls: [f.photoFileId] } : {}),
      },
    };

    const price = await quote(body);

    return Response.json({
      job: clientJob(await createJob(body)),
      quotedCredits: price.credits,
    });
  } catch (e) {
    return apiError(e);
  }
}
