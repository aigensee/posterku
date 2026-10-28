// Membuat gambar atau video setelah memeriksa referensi dan biaya.
import { checkPasscode, apiError, invalid } from "@/lib/guard";
import { config } from "@/lib/config";
import { studioBody } from "@/lib/jobs";
import { createDemo } from "@/lib/demo";
import {
  quote,
  createJob,
  clientJob,
  fetchFile,
  uploadFile,
} from "@/lib/yorai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const denied = checkPasscode(request);
  if (denied) return denied;
  try {
    const { body, model, sourceFileId } = studioBody(await request.json());
    if (config.demo)
      return Response.json({
        job: createDemo(
          body.input.prompt,
          body.input.aspect_ratio,
          "minimalis",
          model.kind === "video",
        ),
        quotedCredits: 0,
      });
    if (sourceFileId) {
      const response = await fetchFile(sourceFileId);
      const blob = await response.blob();
      const extensions: Record<string, string> = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/webp": "webp",
      };
      const extension = extensions[blob.type];
      if (!extension || blob.size > 30 * 1024 * 1024)
        invalid(
          "Referensi harus berupa gambar JPG, PNG, atau WebP maksimal 30 MB",
        );
      const form = new FormData();
      form.set("file", blob, `referensi.${extension}`);
      const uploaded = await uploadFile(form);
      body.input[model.imageField!] = model.imageFieldIsArray
        ? [uploaded.id]
        : uploaded.id;
    }
    const price = await quote(body);
    return Response.json({
      job: clientJob(await createJob(body)),
      quotedCredits: price.credits,
    });
  } catch (e) {
    return apiError(e);
  }
}
