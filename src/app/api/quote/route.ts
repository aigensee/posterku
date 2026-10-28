// Menghitung biaya tanpa membuat pekerjaan atau menggunakan kredit.
import { checkPasscode, apiError } from "@/lib/guard";
import { config } from "@/lib/config";
import { studioBody } from "@/lib/jobs";
import { quote } from "@/lib/yorai";

export async function POST(request: Request) {
  const denied = checkPasscode(request);
  if (denied) return denied;
  try {
    const { body, model } = studioBody(await request.json());
    if (model.imageField) delete body.input[model.imageField];
    return Response.json(config.demo ? { credits: 0 } : await quote(body));
  } catch (e) {
    return apiError(e);
  }
}
