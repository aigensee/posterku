// Memvalidasi pengaturan studio dan menyusun satu format pekerjaan Yorai.
import { models } from "./models";
import { config } from "./config";
import { invalid, validId } from "./guard";
import { demoPattern } from "./demo";
import type { JobBody } from "./yorai";

export function studioBody(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    invalid("Data permintaan tidak valid");
  const f = value as Record<string, unknown>;
  const model = models.find((m) => m.id === f.model);

  if (!model) invalid("Pilih model yang tersedia");
  if (
    typeof f.prompt !== "string" ||
    !f.prompt.trim() ||
    f.prompt.length > model.promptMax
  )
    invalid(`Prompt harus 1–${model.promptMax} karakter`);
  if (typeof f.ratio !== "string" || !model.ratios.includes(f.ratio))
    invalid("Rasio tidak tersedia untuk model ini");
  if (f.uploadFileId !== undefined && f.sourceFileId !== undefined)
    invalid("Gunakan satu foto referensi saja");
  for (const key of ["uploadFileId", "sourceFileId"]) {
    const id = f[key];
    if (
      id !== undefined &&
      (typeof id !== "string" ||
        !(
          validId(id) ||
          (config.demo && (id === "demo-photo" || demoPattern.test(id)))
        ))
    )
      invalid("ID referensi tidak valid");
  }
  const reference = f.uploadFileId ?? f.sourceFileId;
  if (reference && !model.imageField)
    invalid("Model ini tidak menerima foto referensi");
  const input: JobBody["input"] = {
    prompt: f.prompt.trim(),
    aspect_ratio: f.ratio,
  };

  if (model.kind === "video") {
    if (
      !model.durations?.includes(f.duration as number) ||
      !model.resolutions?.includes(f.resolution as string) ||
      typeof f.sound !== "boolean"
    )
      invalid("Pilih durasi, kualitas, dan suara yang valid");
    input[model.durationField!] = f.duration as number;
    input[model.resolutionField!] = f.resolution as string;
    if (model.soundField) input[model.soundField] = f.sound;
  } else if (
    f.duration !== undefined ||
    f.resolution !== undefined ||
    f.sound !== undefined
  )
    invalid("Pengaturan video hanya untuk model video");
  const body: JobBody = {
    model: model.id,
    type: reference ? model.imageType! : model.textType,
    input,
  };
  if (reference)
    input[model.imageField!] = model.imageFieldIsArray
      ? [reference as string]
      : (reference as string);

  return { body, model, sourceFileId: f.sourceFileId as string | undefined };
}
