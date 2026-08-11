/* Render the source CAD into fixed-camera previews or a WebM clip with Chrome. */

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const workspace = path.resolve(__dirname, "..");
const outputDir = path.join(workspace, "output", "robot-explosion");
const port = 43127;
const baseUrl = `http://127.0.0.1:${port}`;
const cameraArg = process.argv.find((argument) => argument.startsWith("--camera="));
const widthArg = process.argv.find((argument) => argument.startsWith("--width="));
const heightArg = process.argv.find((argument) => argument.startsWith("--height="));
const fpsArg = process.argv.find((argument) => argument.startsWith("--fps="));
const selectedCamera = cameraArg ? Number(cameraArg.split("=")[1]) : 2;
const renderWidth = widthArg ? Number(widthArg.split("=")[1]) : 3840;
const renderHeight = heightArg ? Number(heightArg.split("=")[1]) : 2160;
const renderFps = fpsArg ? Number(fpsArg.split("=")[1]) : 60;
const previewOnly = process.argv.includes("--preview-only");
const cameraSweep = process.argv.includes("--camera-sweep");
const inspectParts = process.argv.includes("--inspect-parts");

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
        console.log(`[server:404] ${pathname} -> ${filePath}`);
        response.writeHead(404).end("Not found");
        return;
      }
      console.log(`[server:200] ${pathname} (${stats.size} bytes)`);
      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        "Content-Length": stats.size,
        "Cache-Control": "no-store",
      });
      fs.createReadStream(filePath).pipe(response);
    });
  });
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
  const context = await browser.newContext({
    viewport: { width: renderWidth, height: renderHeight },
    deviceScaleFactor: 1,
    acceptDownloads: true,
  });
  const page = await context.newPage();
  page.on("console", (message) => console.log(`[browser:${message.type()}] ${message.text()}`));
  page.on("pageerror", (error) => console.error(`[browser:error] ${error.stack || error}`));
  page.on("requestfailed", (request) =>
    console.error(`[browser:requestfailed] ${request.url()} / ${request.failure()?.errorText}`),
  );

  try {
    console.log("Loading the 611 MB CAD model. This can take several minutes...");
    await page.goto(
      `${baseUrl}/tools/cad-explosion/render.html?camera=${selectedCamera}&width=${renderWidth}&height=${renderHeight}`,
      {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
      },
    );
    const deadline = Date.now() + 600_000;
    while (Date.now() < deadline) {
      const state = await page.evaluate(() => ({
        ready: Boolean(window.robotReady),
        error: window.robotError || null,
        progress: window.robotProgress || null,
        status: document.querySelector("#status")?.textContent || null,
      }));
      console.log("Load state:", state);
      if (state.ready || state.error) break;
      await new Promise((resolve) => setTimeout(resolve, 10_000));
    }
    const loadError = await page.evaluate(() => window.robotError || null);
    if (loadError) throw new Error(loadError);
    console.log("CAD loaded:", await page.evaluate(() => window.robotMetadata));

    if (inspectParts) {
      const diagnostics = await page.evaluate(() => {
        const darkMaterial = /(Rubber|Black|Opaque\((?:25|32|48|50|63|64|76|77),)/i;
        return window
          .getPartDiagnostics()
          .filter(
            (part) =>
              part.center[2] > 10 &&
              Math.max(...part.size) > 2 &&
              part.materials.some((name) => darkMaterial.test(name)),
          )
          .sort((left, right) => {
            const leftVolume = left.size[0] * left.size[1] * left.size[2];
            const rightVolume = right.size[0] * right.size[1] * right.size[2];
            return rightVolume - leftVolume;
          });
      });
      console.log(JSON.stringify(diagnostics, null, 2));
      return;
    }

    if (cameraSweep) {
      for (let preset = 0; preset < 4; preset += 1) {
        await page.evaluate((value) => window.setCameraPreset(value), preset);
        await page.screenshot({
          path: path.join(outputDir, `camera-${preset}.png`),
          type: "png",
        });
      }
      console.log(`Camera sweep written to ${outputDir}`);
      return;
    }

    const outputPrefix =
      renderWidth >= 3840
        ? `4k${renderFps}-cinematic`
        : `${renderFps}fps-cinematic-preview`;
    for (const [label, amount] of [
      ["assembled", 0],
      ["mid-transition", 0.5],
      ["exploded", 1],
    ]) {
      await page.evaluate((value) => window.renderExplosion(value), amount);
      await page.screenshot({
        path: path.join(outputDir, `${outputPrefix}-${label}.png`),
        type: "png",
      });
    }

    if (!previewOnly) {
      await page.evaluate(() => window.renderExplosion(0));
      const downloadPromise = page.waitForEvent("download", { timeout: 120_000 });
      const result = await page.evaluate(
        ({ fps }) => window.recordExplosion({ duration: 6, fps }),
        { fps: renderFps },
      );
      const download = await downloadPromise;
      const outputPath = path.join(
        outputDir,
        renderWidth >= 3840
          ? `robot-explosion-low-iso-4k${renderFps}-cinematic.webm`
          : `robot-explosion-low-iso-${renderFps}fps-cinematic-preview.webm`,
      );
      await download.saveAs(outputPath);
      console.log("Recorded", result, outputPath);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
