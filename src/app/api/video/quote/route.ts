// Mengambil estimasi biaya video tanpa membuat pekerjaan berbayar.
import { config } from "@/lib/config";
import { apiError, checkPasscode } from "@/lib/guard";
import { videoBody } from "@/lib/video";
import { quote } from "@/lib/yorai";

export async function POST(request: Request) {
  const denied = checkPasscode(request);

  if (denied) return denied;

  try {
    const body = videoBody(await request.json());

    if (config.demo) return Response.json({ credits: 0, demo: true });

    const price = await quote(body);

    return Response.json({ credits: price.credits });
  } catch (e) {
    return apiError(e);
  }
}
