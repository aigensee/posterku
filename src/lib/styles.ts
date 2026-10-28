// Preset visual dan tipe data yang dipakai bersama oleh server dan browser.
export const styles = [
  {
    id: "minimalis",
    label: "Minimalis",
    tagline: "Bersih & modern",
    swatch: ["#f5e6d3", "#c9b398"],
    promptHint: "minimal contemporary editorial, generous negative space",
  },
  {
    id: "ceria",
    label: "Ceria",
    tagline: "Segar & penuh warna",
    swatch: ["#ffe195", "#f48a88"],
    promptHint: "playful vibrant colors, joyful graphic shapes",
  },
  {
    id: "mewah",
    label: "Mewah",
    tagline: "Elegan & premium",
    swatch: ["#33302d", "#bfa26a"],
    promptHint: "luxury black and gold, dramatic studio lighting",
  },
  {
    id: "retro",
    label: "Retro",
    tagline: "Klasik & berkarakter",
    swatch: ["#e9a76d", "#9f4d39"],
    promptHint: "vintage typography, warm retro print textures",
  },
  {
    id: "natural",
    label: "Natural",
    tagline: "Organik & menenangkan",
    swatch: ["#dce6c9", "#6c8965"],
    promptHint: "organic botanical composition, soft daylight, earthy tones",
  },
] as const;

export const ratios = [
  { id: "1:1", label: "Feed", hint: "Instagram feed" },
  { id: "3:4", label: "Portrait" },
  { id: "9:16", label: "Story/Reels" },
  { id: "16:9", label: "Banner" },
] as const;

export type PosterRequest = {
  product: string;
  description: string;
  promo: string;
  style: (typeof styles)[number]["id"];
  ratio: (typeof ratios)[number]["id"];
  withPhoto: boolean;
};

export type CaptionResult = {
  headline: string;
  caption: string;
  hashtags: string[];
  imagePrompt: string;
  videoPrompt: string;
  fallback?: boolean;
};

export type PosterJob = {
  id: string;
  status: "queued" | "running" | "succeeded" | "failed";
  credits: number;
  fileId: string | null;
  mime: string | null;
  expiresAt: string | null;
  error: string | null;
};

export type HistoryItem = CaptionResult & {
  kind: "poster" | "video";
  videoFileId?: string;
  jobId: string;
  fileId: string;
  product: string;
  ratio: PosterRequest["ratio"];
  style: PosterRequest["style"];
  credits: number;
  createdAt: string;
  expiresAt: string | null;
};

export type VideoSettings = {
  duration: 5 | 10;
  resolution: "480p" | "720p";
  sound: boolean;
};

export const defaultVideoOptions: VideoSettings = {
  duration: 5,
  resolution: "480p",
  sound: true,
};
