// Mengirim gambar poster dari Yorai atau demo untuk ditampilkan dan diunduh.
import { config } from "@/lib/config";
import { apiError, invalid, validId } from "@/lib/guard";
import { demoPattern, demoPosterSvg } from "@/lib/demo";
import { fetchFile } from "@/lib/yorai";

export const runtime = "nodejs";

// Tanpa passcode karena img tidak mengirim header; UUID file tidak dapat ditebak.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const demo = config.demo && demoPattern.test(id);

    if (!validId(id) && !demo) invalid("ID file tidak valid");

    const upstream = demo ? null : await fetchFile(id);

    const mime = demo
      ? "image/svg+xml"
      : upstream!.headers.get("content-type") || "application/octet-stream";

    const headers = new Headers({
      "Content-Type": mime,
      "Cache-Control": "private, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    });

    if (new URL(request.url).searchParams.get("download") === "1") {
      const ext: Record<string, string> = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/webp": "webp",
        "image/svg+xml": "svg",
      };

      headers.set(
        "Content-Disposition",
        `attachment; filename="posterku-${id.slice(0, 8)}.${ext[mime] || "bin"}"`,
      );
    }

    return new Response(demo ? demoPosterSvg(id) : upstream!.body, { headers });
  } catch (e) {
    return apiError(e);
  }
}
