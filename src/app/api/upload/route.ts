// Memvalidasi dan mengunggah foto produk ke Yorai.
import { config } from "@/lib/config";
import { checkPasscode, apiError, invalid } from "@/lib/guard";
import { uploadFile } from "@/lib/yorai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = checkPasscode(request);

  if (denied) return denied;

  try {
    const form = await request.formData();

    const file = form.get("file");

    if (
      !(file instanceof File) ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 4 * 1024 * 1024 ||
      file.size === 0
    )
      invalid("Gunakan foto JPG, PNG, atau WebP maksimal 4 MB");

    const body = new FormData();

    body.set("file", file);

    return Response.json({
      fileId: config.demo ? "demo-photo" : (await uploadFile(body)).id,
    });
  } catch (e) {
    return apiError(e);
  }
}
