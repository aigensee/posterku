// Menyalin panduan dan bahan kelas terbaru ke starter siswa.
import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const starter = join(root, "starter");

await mkdir(starter, { recursive: true });

for (const name of ["AGENTS.md", ".agents", "kelas"]) {
  const destination = join(starter, name);
  await rm(destination, { recursive: true, force: true });
  await cp(join(root, name), destination, { recursive: true });
  console.log(`Disalin: ${name} → starter/${name}`);
}
