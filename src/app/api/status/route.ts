// Memberikan status konfigurasi, mode demo, dan nama model tanpa rahasia.
import { config, configured } from "@/lib/config";

export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    configured,
    demo: config.demo,
    passcodeRequired: Boolean(config.passcode),
    models: config.models,
  });
}
