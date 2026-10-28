"use client";

/* eslint-disable @next/next/no-img-element -- File privat dan SVG demo disajikan melalui proxy. */

// Media mempertahankan rasio dan hanya memutar video saat diarahkan di desktop.
import { useSyncExternalStore, useState } from "react";
import { mediaUrl, type StudioItem } from "@/lib/studio";

function subscribeMotion(callback: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function StudioMedia({
  item,
  viewer = false,
}: {
  item: StudioItem;
  viewer?: boolean;
}) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const imageSource = `${mediaUrl(item.fileId)}${reducedMotion ? "?still=1" : ""}`;
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const video =
    item.kind === "video" &&
    item.mime !== "image/svg+xml" &&
    !item.fileId.startsWith("demo-");
  return (
    <div
      className={`media-box ${loaded ? "loaded" : ""}`}
      style={{ aspectRatio: item.ratio.replace(":", "/") }}
    >
      {failed ? (
        <p className="media-error">
          File tidak dapat dibuka atau sudah kedaluwarsa. Coba unduh atau buat
          ulang.
        </p>
      ) : (
        <>
          {video ? (
            <video
              src={mediaUrl(item.fileId)}
              controls={viewer}
              muted={!viewer}
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setLoaded(true)}
              onError={() => setFailed(true)}
              onMouseEnter={(e) => {
                if (
                  !viewer &&
                  matchMedia("(hover: hover)").matches &&
                  !matchMedia("(prefers-reduced-motion: reduce)").matches
                )
                  void e.currentTarget.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                if (!viewer) e.currentTarget.pause();
              }}
            />
          ) : (
            <img
              src={imageSource}
              alt={item.attached?.headline || item.prompt.slice(0, 100)}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          )}
        </>
      )}
    </div>
  );
}
