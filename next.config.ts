// Konfigurasi kompilasi CSS dan runtime aplikasi PosterKu.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Endpoint AI memakai runtime Node.js dan data langsung dari server.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
