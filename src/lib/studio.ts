// Tipe studio dan penyimpanan lokal yang aman untuk browser.
import { models } from "./models";
import type { CaptionResult } from "./styles";

export type Reference = {
  uploadFileId?: string;
  sourceFileId?: string;
  preview: string;
};
export type ComposerState = {
  kind: "image" | "video";
  model: string;
  ratio: string;
  duration: number;
  resolution: string;
  sound: boolean;
  prompt: string;
  reference?: Reference;
  attached?: CaptionResult;
};
export type StudioItem = ComposerState & {
  jobId: string;
  fileId: string;
  credits: number;
  createdAt: string;
  expiresAt: string | null;
  mime?: string | null;
};
export type Activity = {
  id: string;
  state: ComposerState;
  status: string;
  started: number;
  credits: number;
  error?: string;
};
export const defaults: ComposerState = {
  kind: "image",
  model: "z-image",
  ratio: "1:1",
  duration: 5,
  resolution: "480p",
  sound: true,
  prompt: "",
};

export function clamp(state: ComposerState, id: string): ComposerState {
  const model = models.find((m) => m.id === id) || models[0];
  return {
    ...state,
    model: model.id,
    kind: model.kind,
    ratio: model.ratios.includes(state.ratio) ? state.ratio : model.ratios[0],
    duration: model.durations?.includes(state.duration)
      ? state.duration
      : model.durations?.[0] || 5,
    resolution: model.resolutions?.includes(state.resolution)
      ? state.resolution
      : model.resolutions?.[0] || "480p",
    reference: model.imageField ? state.reference : undefined,
  };
}
export function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Penyimpanan bisa dibatasi browser. */
  }
}
export function jobRequest(state: ComposerState) {
  return {
    model: state.model,
    prompt: state.prompt,
    ratio: state.ratio,
    ...(state.kind === "video"
      ? {
          duration: state.duration,
          resolution: state.resolution,
          sound: state.sound,
        }
      : {}),
    ...(state.reference?.uploadFileId
      ? { uploadFileId: state.reference.uploadFileId }
      : {}),
    ...(state.reference?.sourceFileId
      ? { sourceFileId: state.reference.sourceFileId }
      : {}),
  };
}
export const credits = (value: number) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: 3 });
export const mediaUrl = (id: string) => `/api/file/${encodeURIComponent(id)}`;

// Data lokal dari versi lama dipulihkan tanpa mempercayai bentuk JSON-nya.
export function restoreComposer(value: unknown): ComposerState {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return defaults;
  const item = value as Record<string, unknown>;
  const state: ComposerState = {
    ...defaults,
    prompt: typeof item.prompt === "string" ? item.prompt : "",
    ratio: typeof item.ratio === "string" ? item.ratio : defaults.ratio,
    duration:
      typeof item.duration === "number" ? item.duration : defaults.duration,
    resolution:
      typeof item.resolution === "string"
        ? item.resolution
        : defaults.resolution,
    sound: typeof item.sound === "boolean" ? item.sound : defaults.sound,
  };
  const caption = item.attached as Record<string, unknown> | undefined;
  if (
    caption &&
    typeof caption.headline === "string" &&
    typeof caption.caption === "string" &&
    typeof caption.imagePrompt === "string" &&
    Array.isArray(caption.hashtags) &&
    caption.hashtags.every((tag) => typeof tag === "string")
  ) {
    state.attached = {
      headline: caption.headline,
      caption: caption.caption,
      hashtags: caption.hashtags,
      imagePrompt: caption.imagePrompt,
      videoPrompt:
        typeof caption.videoPrompt === "string"
          ? caption.videoPrompt
          : `Slow camera push-in. ${caption.imagePrompt}`.slice(0, 600),
      fallback: caption.fallback === true,
    };
  }
  const reference = item.reference as Record<string, unknown> | undefined;
  if (
    reference &&
    typeof reference.preview === "string" &&
    (/^data:image\/(jpeg|png|webp);base64,/.test(reference.preview) ||
      reference.preview.startsWith("/api/file/"))
  ) {
    if (typeof reference.uploadFileId === "string")
      state.reference = {
        uploadFileId: reference.uploadFileId,
        preview: reference.preview,
      };
    else if (typeof reference.sourceFileId === "string")
      state.reference = {
        sourceFileId: reference.sourceFileId,
        preview: reference.preview,
      };
  }
  return clamp(
    state,
    typeof item.model === "string" ? item.model : defaults.model,
  );
}

export function restoreHistory(value: unknown): StudioItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item) =>
        item &&
        typeof item.fileId === "string" &&
        typeof item.jobId === "string" &&
        typeof item.createdAt === "string" &&
        Number.isFinite(Date.parse(item.createdAt)),
    )
    .slice(0, 40)
    .map((item) => {
      const kind = item.kind === "video" ? "video" : "image";
      const model =
        item.model ||
        (kind === "video" ? "bytedance-seedance-2-mini" : "z-image");
      const state = restoreComposer({
        ...item,
        model,
        attached: item.attached || (item.caption ? item : undefined),
        prompt:
          item.prompt ||
          (kind === "video" ? item.videoPrompt : item.imagePrompt),
      });
      return {
        ...item,
        ...state,
        kind,
        fileId: item.fileId,
        jobId: item.jobId,
        credits:
          typeof item.credits === "number" && Number.isFinite(item.credits)
            ? item.credits
            : 0,
        expiresAt: typeof item.expiresAt === "string" ? item.expiresAt : null,
        createdAt: item.createdAt,
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
