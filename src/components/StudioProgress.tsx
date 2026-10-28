"use client";

import { useEffect, useState } from "react";
import { models } from "@/lib/models";
import type { Activity } from "@/lib/studio";

export function StudioProgress({
  activity,
  compact = false,
}: {
  activity: Activity;
  compact?: boolean;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const elapsed = Math.max(0, Math.floor((now - activity.started) / 1000));
  const expected = models.find(
    (m) => m.id === activity.state.model,
  )!.expectedSeconds;
  const percent =
    activity.status === "queued"
      ? Math.min(5, 2 + Math.floor(elapsed / 3))
      : Math.min(95, Math.round(100 * (1 - Math.exp(-elapsed / expected))));
  const status =
    activity.status === "queued"
      ? "Mengantri…"
      : activity.state.kind === "video"
        ? "Membuat video…"
        : "Membuat gambar…";
  return (
    <div className="pending-progress">
      {!compact && <p role="status">{status}</p>}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={`Perkiraan progres ${activity.state.kind === "video" ? "video" : "gambar"}`}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      <small>
        {percent}% · {Math.floor(elapsed / 60)}:
        {String(elapsed % 60).padStart(2, "0")} · Perkiraan
      </small>
      {!compact && activity.state.kind === "video" && (
        <p>Video biasanya 1–3 menit</p>
      )}
    </div>
  );
}
