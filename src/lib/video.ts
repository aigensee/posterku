// Memvalidasi pilihan video dan menyusun permintaan Yorai.
import { config } from "./config";
import { invalid } from "./guard";
import { ratios, type VideoSettings } from "./styles";
import type { VideoJobBody } from "./yorai";

export function videoBody(value: unknown): VideoJobBody {
  if (!value || typeof value !== "object" || Array.isArray(value))
    invalid("Data video tidak valid");

  const f = value as Record<string, unknown>;

  if (!ratios.some((r) => r.id === f.ratio) ||
    ![5, 10].includes(f.duration as number) ||
    !["480p", "720p"].includes(f.resolution as string) ||
    typeof f.sound !== "boolean")
    invalid("Pilih rasio, durasi, kualitas, dan suara video yang valid");

  return {
    model: config.models.video,
    type: "text-to-video",
    input: {
      prompt: "Product promotional video with gentle camera motion",
      aspect_ratio: f.ratio as string,
      duration: f.duration as number,
      resolution: f.resolution as VideoSettings["resolution"],
      generate_audio: f.sound as boolean,
    },
  };
}
