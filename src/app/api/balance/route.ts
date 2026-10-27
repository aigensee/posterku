// Memeriksa saldo kredit yang tersedia dan ditahan di Yorai.
import { config } from "@/lib/config";
import { checkPasscode, apiError } from "@/lib/guard";
import { getBalance } from "@/lib/yorai";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = checkPasscode(request);

  if (denied) return denied;

  try {
    return Response.json(
      config.demo
        ? { available: null, held: 0, demo: true }
        : await getBalance(),
    );
  } catch (e) {
    return apiError(e);
  }
}
