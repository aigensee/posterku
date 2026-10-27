// Konfigurasi rahasia hanya dibaca di server.
export const config = {
  apiKey: process.env.YORAI_API_KEY || "",
  baseUrl: (process.env.YORAI_BASE_URL || "https://yorai.id/api/v1").replace(
    /\/$/,
    "",
  ),
  models: {
    text: process.env.YORAI_TEXT_MODEL || "claude-haiku-5-5",
    image: process.env.YORAI_IMAGE_MODEL || "z-image",
    photo: process.env.YORAI_PHOTO_MODEL || "nano-banana-2-lite",
  },
  passcode: process.env.APP_PASSCODE || "",
  demo: process.env.DEMO_MODE === "true",
};

export const configured = config.demo || Boolean(config.apiKey);
