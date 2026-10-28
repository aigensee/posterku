// Daftar model bersama tanpa konfigurasi rahasia.
export type StudioModel = {
  id: string;
  kind: "image" | "video";
  label: string;
  note: string;
  ratios: string[];
  promptMax: number;
  textType: string;
  imageType?: string;
  imageField?: string;
  imageFieldIsArray?: boolean;
  durations?: number[];
  resolutions?: string[];
  durationField?: string;
  resolutionField?: string;
  soundField?: string;
};

export const models: StudioModel[] = [
  {
    id: "z-image",
    kind: "image",
    label: "Z-Image",
    note: "Cepat & paling hemat",
    ratios: ["1:1", "3:4", "4:3", "16:9", "9:16"],
    promptMax: 1000,
    textType: "text-to-image",
  },
  {
    id: "nano-banana-2-lite",
    kind: "image",
    label: "Nano Banana 2 Lite",
    note: "Bisa pakai foto referensi",
    ratios: ["1:1", "3:4", "4:3", "16:9", "9:16"],
    promptMax: 2000,
    textType: "text-to-image",
    imageType: "image-to-image",
    imageField: "image_urls",
    imageFieldIsArray: true,
  },
  {
    id: "bytedance-seedance-2-mini",
    kind: "video",
    label: "Seedance 2 Mini",
    note: "Video + suara, rasio lengkap",
    ratios: ["1:1", "3:4", "9:16", "16:9"],
    promptMax: 2000,
    textType: "text-to-video",
    imageType: "image-to-video",
    imageField: "first_frame_url",
    durations: [5, 10],
    resolutions: ["480p", "720p"],
    durationField: "duration",
    resolutionField: "resolution",
    soundField: "generate_audio",
  },
  {
    id: "grok-imagine",
    kind: "video",
    label: "Grok Imagine",
    note: "Paling hemat untuk video",
    ratios: ["1:1", "9:16", "16:9", "2:3", "3:2"],
    promptMax: 2000,
    textType: "text-to-video",
    imageType: "image-to-video",
    imageField: "image_urls",
    imageFieldIsArray: true,
    durations: [6, 10],
    resolutions: ["480p", "720p"],
    durationField: "duration",
    resolutionField: "resolution",
  },
];

export const startingCredits: Record<string, number> = {
  "z-image": 0.084,
  "nano-banana-2-lite": 0.416,
  "bytedance-seedance-2-mini": 1.975,
  "grok-imagine": 1.5,
};
