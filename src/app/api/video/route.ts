// Membuat video dari naskah, foto produk, atau poster yang diunggah ulang.
import { config } from "@/lib/config";
import { apiError, checkPasscode, invalid, validId } from "@/lib/guard";
import { videoBody } from "@/lib/video";
import { createDemo, demoPattern } from "@/lib/demo";
import { styles } from "@/lib/styles";
import { clientJob, createJob, fetchFile, quote, uploadFile } from "@/lib/yorai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const denied = checkPasscode(request);

  if (denied) return denied;

  try {
    const f = await request.json();
    const body = videoBody(f);

    if (
      typeof f.prompt !== "string" ||
      !f.prompt.trim() ||
      f.prompt.length > 2000
    )
      invalid("Arahan video harus 1–2000 karakter");

    if (f.photoFileId !== undefined && f.posterFileId !== undefined)
      invalid("Pilih satu foto atau poster sebagai bingkai pertama");

    for (const key of ["photoFileId", "posterFileId"]) {
      const id = f[key];

      if (
        id !== undefined &&
        (typeof id !== "string" ||
          !(
            validId(id) ||
            (config.demo && (id === "demo-photo" || demoPattern.test(id)))
          ))
      )
        invalid("ID foto atau poster tidak valid");
    }

    if (f.style !== undefined && !styles.some((s) => s.id === f.style))
      invalid("Gaya video tidak valid");

    if (config.demo)
      return Response.json({
        job: createDemo(f.prompt, f.ratio, f.style, true),
        quotedCredits: 0,
      });

    let firstFrame = f.photoFileId;

    if (f.posterFileId) {
      const response = await fetchFile(f.posterFileId);
      const file = await response.blob();
      const upload = new FormData();
      const ext =
        file.type === "image/jpeg"
          ? "jpg"
          : file.type === "image/webp"
            ? "webp"
            : "png";

      upload.set("file", file, `poster.${ext}`);
      firstFrame = (await uploadFile(upload)).id;
    }

    body.input.prompt = f.prompt.trim();

    if (firstFrame) {
      body.type = "image-to-video";
      body.input.first_frame_url = firstFrame;
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
