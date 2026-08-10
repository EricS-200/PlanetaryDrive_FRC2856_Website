import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceDir = path.join(projectRoot, "source-assets", "additional-photos");
const outputDir = path.join(projectRoot, "public", "images", "team");

const selectedPhotos = [
  "IMG_0627.jpg",
  "IMG_1664.jpg",
  "IMG_1720.jpg",
  "IMG_1721.jpg",
  "IMG_1740.jpg",
  "IMG_5150.jpg",
  "IMG_5151.jpg",
  "IMG_6122.jpg",
  "IMG_6124.jpg",
  "IMG_7231.jpg",
  "IMG_7342.jpg",
];

await mkdir(outputDir, { recursive: true });

for (const filename of selectedPhotos) {
  const outputName = filename.replace(/\.jpg$/i, ".webp");
  const result = await sharp(path.join(sourceDir, filename))
    .rotate()
    .resize({
      width: 2200,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(path.join(outputDir, outputName));

  console.log(`${outputName}: ${result.width}x${result.height}, ${result.size} bytes`);
}
