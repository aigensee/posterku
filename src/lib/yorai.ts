// Menghubungkan server ke Yorai dan menerjemahkan kesalahan untuk pengguna.
import { config } from "./config";
import type { PosterJob } from "./styles";

export function friendlyMessage(status: number, code: string, message = "") {
  if (code === "file_expired" || status === 410)
    return "File sudah kedaluwarsa. Silakan buat poster baru.";
  const messages: Record<number, string> = {
    401: "API key Yorai salah atau sudah dicabut. Periksa konfigurasi server.",
    402: "Saldo kredit Yorai tidak cukup. Isi ulang di yorai.id/app/credits",
    429: "Terlalu banyak permintaan, tunggu sebentar lalu coba lagi",
    503: "API Yorai sedang tidak aktif",
    504: "Waktu tunggu AI habis. Silakan coba lagi.",
  };

  return (
    messages[status] ||
    `Terjadi kesalahan di server AI: ${message || "Silakan coba lagi"}`
  );
}

export class YoraiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

async function request(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  headers.set("Authorization", `Bearer ${config.apiKey}`);

  if (init.body && !(init.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  let response: Response;

  try {
    response = await fetch(config.baseUrl + path, {
      ...init,
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(95000),
    });
  } catch {
    throw new YoraiError(
      503,
      "network",
      "Tidak dapat terhubung ke Yorai. Periksa koneksi lalu coba lagi.",
    );
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));

    throw new YoraiError(
      response.status,
      data.error?.code || "upstream",
      friendlyMessage(response.status, data.error?.code, data.error?.message),
    );
  }

  return response;
}

export async function yoraiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  return (await request(path, init)).json();
}

const post = (body: unknown): RequestInit => ({
  method: "POST",
  body: JSON.stringify(body),
});

export type JobBody = {
  model: string;
  type: string;
  input: { prompt: string; aspect_ratio: string; image_urls?: string[] };
};

type Job = {
  id: string;
  status: PosterJob["status"];
  credits: number;
  outputs?: { id: string; mime: string; expires_at: string }[];
  error?: { code: string; message: string };
};

export function clientJob(job: Job): PosterJob {
  const file = job.outputs?.[0];

  return {
    id: job.id,
    status: job.status,
    credits: job.credits,
    fileId: file?.id || null,
    mime: file?.mime || null,
    expiresAt: file?.expires_at || null,
    error: job.error
      ? friendlyMessage(0, job.error.code, job.error.message)
      : null,
  };
}

export const chat = (messages: { role: string; content: string }[]) =>
  yoraiFetch<{ choices: { message: { content: string } }[] }>(
    "/chat/completions",
    post({ model: config.models.text, messages, max_tokens: 1600 }),
  );

export const quote = (body: JobBody) =>
  yoraiFetch<{ credits: number }>("/quote", post(body));

export const createJob = (body: JobBody) =>
  yoraiFetch<Job>("/jobs", {
    ...post(body),
    headers: { "Idempotency-Key": crypto.randomUUID() },
  });

export const getJob = (id: string) => yoraiFetch<Job>(`/jobs/${id}`);

export const getBalance = () =>
  yoraiFetch<{ available: number; held: number }>("/balance");

export const uploadFile = (body: FormData) =>
  yoraiFetch<{ id: string }>("/files", { method: "POST", body });

export const fetchFile = (id: string) => request(`/files/${id}`);
