/* Render deterministic 4K PNG frames and pipe them to FFmpeg at an exact 60 FPS. */

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { once } = require("node:events");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const workspace = path.resolve(__dirname, "..");
const outputDir = path.join(workspace, "output", "robot-explosion");
const ffmpegRoot = path.join(workspace, "tools", "ffmpeg");
const renderWidth = 3840;
const renderHeight = 2160;
const frameRate = 60;
const duration = 6;
const frameCount = frameRate * duration;
const port = 43129;
const baseUrl = `http://127.0.0.1:${port}`;
const mp4Path = path.join(outputDir, "robot-explosion-low-iso-4k60-cinematic.mp4");

const ffmpegRelativePath = fs
  .readdirSync(ffmpegRoot, { recursive: true })
  .find((entry) => entry.toLowerCase().endsWith(`${path.sep}ffmpeg.exe`));
if (!ffmpegRelativePath) throw new Error("FFmpeg executable was not found under tools/ffmpeg");
const ffmpegPath = path.join(ffmpegRoot, ffmpegRelativePath);

const contentTypes = {
  ".glb": "model/gltf-binary",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

function createServer() {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, baseUrl).pathname);
    const relative = pathname === "/" ? "tools/cad-explosion/render.html" : pathname.slice(1);
    const filePath = path.resolve(workspace, relative);
    if (filePath !== workspace && !filePath.startsWith(`${workspace}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    fs.stat(filePath, (error, stats) => {
      if (error || !stats.isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }
      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        "Content-Length": stats.size,
        "Cache-Control": "no-store",
      });
      fs.createReadStream(filePath).pipe(response);
    });
  });
}

function startEncoder() {
  const args = [
    "-hide_banner",
    "-loglevel",
    "warning",
    "-y",
    "-framerate",
    String(frameRate),
    "-f",
    "image2pipe",
    "-vcodec",
    "png",
    "-i",
    "pipe:0",
    "-map",
    "0:v:0",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "16",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    mp4Path,
  ];
  const encoder = spawn(ffmpegPath, args, { stdio: ["pipe", "ignore", "pipe"] });
  encoder.stderr.on("data", (chunk) => process.stderr.write(chunk));
  return encoder;
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const server = createServer();
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--enable-webgl", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({
    viewport: { width: renderWidth, height: renderHeight },
    deviceScaleFactor: 1,
  });
  page.on("pageerror", (error) => console.error(`[browser:error] ${error.stack || error}`));

  try {
    console.log("Loading and batching the source CAD...");
    await page.goto(
      `${baseUrl}/tools/cad-explosion/render.html?camera=2&width=${renderWidth}&height=${renderHeight}`,
      { waitUntil: "domcontentloaded", timeout: 30_000 },
    );
    await page.waitForFunction(() => window.robotReady || window.robotError, null, {
      timeout: 600_000,
      polling: 500,
    });
    const loadError = await page.evaluate(() => window.robotError || null);
    if (loadError) throw new Error(loadError);
    console.log("CAD ready:", await page.evaluate(() => window.robotMetadata));

    const encoder = startEncoder();
    const encoderClosed = once(encoder, "close");
    const canvas = page.locator("canvas");

    for (let frame = 0; frame < frameCount; frame += 1) {
      const clipProgress = frame / (frameCount - 1);
      const explosionProgress = Math.min(1, Math.max(0, (clipProgress - 0.13) / 0.7));
      await page.evaluate((progress) => window.renderExplosion(progress), explosionProgress);
      const png = await canvas.screenshot({ type: "png" });
      if (!encoder.stdin.write(png)) await once(encoder.stdin, "drain");
      if ((frame + 1) % 30 === 0 || frame === 0) {
        console.log(`Rendered ${frame + 1}/${frameCount} frames`);
      }
    }

    encoder.stdin.end();
    const [exitCode] = await encoderClosed;
    if (exitCode !== 0) throw new Error(`FFmpeg exited with code ${exitCode}`);
    console.log("Wrote exact-60-FPS master:", { mp4Path });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
