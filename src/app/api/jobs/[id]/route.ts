// Memeriksa kemajuan dan hasil pekerjaan pembuatan poster.
import { config } from "@/lib/config";
import { checkPasscode, apiError, invalid, validId } from "@/lib/guard";
import { demoPattern, demoJob } from "@/lib/demo";
import { getJob, clientJob } from "@/lib/yorai";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = checkPasscode(request);

  if (denied) return denied;

  try {
    const { id } = await params;

    if (!validId(id) && !(config.demo && demoPattern.test(id)))
      invalid("ID pekerjaan tidak valid");

    return Response.json({
      job:
        config.demo && demoPattern.test(id)
          ? demoJob(id)
          : clientJob(await getJob(id)),
    });
  } catch (e) {
    return apiError(e);
  }
}
