/* Render the complete deterministic CAD sequence and pipe exact frames to FFmpeg. */

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { once } = require("node:events");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const workspace = path.resolve(__dirname, "..");
const outputDir = path.join(workspace, "output", "robot-explosion");
const ffmpegRoot = path.join(workspace, "tools", "ffmpeg");

function numericArgument(name, fallback) {
  const prefix = "--" + name + "=";
  const match = process.argv.find((argument) => argument.startsWith(prefix));
  return match ? Number(match.slice(prefix.length)) : fallback;
}

const previewOnly = process.argv.includes("--preview-only");
const renderWidth = numericArgument("width", previewOnly ? 1280 : 3840);
const renderHeight = numericArgument("height", previewOnly ? 720 : 2160);
const frameRate = numericArgument("fps", 60);
const duration = 12;
const frameCount = frameRate * duration;
const port = 43130;
const baseUrl = "http://127.0.0.1:" + port;
const mp4Path = path.join(outputDir, "robot-full-sequence-4k60-cinematic.mp4");

const ffmpegRelativePath = fs
  .readdirSync(ffmpegRoot, { recursive: true })
  .find((entry) => entry.toLowerCase().endsWith(path.sep + "ffmpeg.exe"));
if (!ffmpegRelativePath) throw new Error("FFmpeg executable was not found under tools/ffmpeg");
const ffmpegPath = path.join(ffmpegRoot, ffmpegRelativePath);

const contentTypes = {
  ".glb": "model/gltf-binary",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smootherStep(value) {
  const x = clamp(value);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function ramp(time, start, end) {
  return clamp((time - start) / (end - start));
}

function sequenceStateAt(time) {
  const reveal = ramp(time, 0.35, 1.85);

  let explosion = 0;
  if (time >= 2.35 && time < 4.35) {
    explosion = ramp(time, 2.35, 4.35);
  } else if (time >= 4.35 && time < 9.35) {
    explosion = 1;
  } else if (time >= 9.35 && time < 11.35) {
    explosion = 1 - ramp(time, 9.35, 11.35);
  }

  let rotation = 0;
  if (time >= 4.85 && time < 8.85) {
    rotation = Math.PI * 2 * smootherStep(ramp(time, 4.85, 8.85));
  } else if (time >= 8.85) {
    rotation = Math.PI * 2;
  }

  return { reveal, explosion, rotation };
}

function createServer() {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, baseUrl).pathname);
    const relative = pathname === "/" ? "tools/cad-explosion/render.html" : pathname.slice(1);
    const filePath = path.resolve(workspace, relative);
    if (filePath !== workspace && !filePath.startsWith(workspace + path.sep)) {
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
  const encoderArguments = [
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
    "-g",
    String(frameRate),
    "-keyint_min",
    String(frameRate),
    "-sc_threshold",
    "0",
    "-movflags",
    "+faststart",
    mp4Path,
  ];
  const encoder = spawn(ffmpegPath, encoderArguments, { stdio: ["pipe", "ignore", "pipe"] });
  encoder.stderr.on("data", (chunk) => process.stderr.write(chunk));
  return encoder;
}

async function renderPreviewFrames(page, canvas) {
  const previewMoments = [
    ["00-dark", 0],
    ["01-reveal", 1.1],
    ["02-assembled", 2.1],
    ["03-exploding", 3.35],
    ["04-exploded", 4.6],
    ["05-spinning", 6.85],
    ["06-reassembling", 10.35],
    ["07-final", 11.7],
  ];
  for (const [label, time] of previewMoments) {
    await page.evaluate((state) => window.renderSequenceState(state), sequenceStateAt(time));
    const previewPath = path.join(outputDir, "full-sequence-preview-" + label + ".png");
    await canvas.screenshot({ path: previewPath, type: "png" });
    console.log("Wrote preview frame:", { label, time, previewPath });
  }
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
  page.on("pageerror", (error) => console.error("[browser:error] " + (error.stack || error)));

  try {
    console.log("Loading and batching the source CAD...");
    await page.goto(
      baseUrl + "/tools/cad-explosion/render.html?camera=2&width=" + renderWidth + "&height=" + renderHeight,
      { waitUntil: "domcontentloaded", timeout: 30_000 },
    );
    await page.waitForFunction(() => window.robotReady || window.robotError, null, {
      timeout: 600_000,
      polling: 500,
    });
    const loadError = await page.evaluate(() => window.robotError || null);
    if (loadError) throw new Error(loadError);
    console.log("CAD ready:", await page.evaluate(() => window.robotMetadata));

    const canvas = page.locator("canvas");
    if (previewOnly) {
      await renderPreviewFrames(page, canvas);
      return;
    }

    const encoder = startEncoder();
    const encoderClosed = once(encoder, "close");

    for (let frame = 0; frame < frameCount; frame += 1) {
      const time = frame / frameRate;
      await page.evaluate((state) => window.renderSequenceState(state), sequenceStateAt(time));
      const png = await canvas.screenshot({ type: "png" });
      if (!encoder.stdin.write(png)) await once(encoder.stdin, "drain");
      if ((frame + 1) % frameRate === 0 || frame === 0) {
        console.log("Rendered " + (frame + 1) + "/" + frameCount + " frames");
      }
    }

    encoder.stdin.end();
    const [exitCode] = await encoderClosed;
    if (exitCode !== 0) throw new Error("FFmpeg exited with code " + exitCode);
    console.log("Wrote exact-60-FPS full-sequence master:", { mp4Path, duration, frameCount });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
