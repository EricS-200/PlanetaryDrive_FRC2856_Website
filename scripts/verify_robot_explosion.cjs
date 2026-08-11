/* Decode a rendered MP4 in Chrome and capture representative verification frames. */

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const workspace = path.resolve(__dirname, "..");
const outputDir = path.join(workspace, "output", "robot-explosion");
const videoFilename = process.argv[2] || "robot-full-sequence-4k60-cinematic.mp4";
const videoPath = path.resolve(outputDir, videoFilename);
if (!videoPath.startsWith(`${outputDir}${path.sep}`)) {
  throw new Error("The verification target must be inside output/robot-explosion");
}
const capturePrefix = path.parse(videoFilename).name;
const port = 43128;

async function main() {
  const videoStats = fs.statSync(videoPath);
  const server = http.createServer((request, response) => {
    if (request.url === "/robot.mp4") {
      const range = request.headers.range;
      if (range) {
        const match = range.match(/bytes=(\d*)-(\d*)/);
        const start = match?.[1] ? Number(match[1]) : 0;
        const end = match?.[2] ? Number(match[2]) : videoStats.size - 1;
        response.writeHead(206, {
          "Content-Type": "video/mp4",
          "Content-Length": end - start + 1,
          "Content-Range": `bytes ${start}-${end}/${videoStats.size}`,
          "Accept-Ranges": "bytes",
        });
        fs.createReadStream(videoPath, { start, end }).pipe(response);
      } else {
        response.writeHead(200, {
          "Content-Type": "video/mp4",
          "Content-Length": videoStats.size,
          "Accept-Ranges": "bytes",
        });
        fs.createReadStream(videoPath).pipe(response);
      }
      return;
    }
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(
      '<style>html,body{margin:0;background:#000;width:100%;height:100%}video{display:block;width:100vw;height:100vh;object-fit:contain}</style>' +
        '<video id="clip" muted preload="auto" src="/robot.mp4"></video>',
    );
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector("#clip").readyState >= 1, null, {
      timeout: 30_000,
    });
    let metadata = await page.evaluate(() => {
      const video = document.querySelector("#clip");
      return {
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      };
    });
    if (!Number.isFinite(metadata.duration)) {
      const recoveredDuration = await page.evaluate(
        () =>
          new Promise((resolve, reject) => {
            const video = document.querySelector("#clip");
            const timeout = setTimeout(() => reject(new Error("Duration recovery timed out")), 10_000);
            video.addEventListener(
              "seeked",
              () => {
                clearTimeout(timeout);
                resolve(video.currentTime);
              },
              { once: true },
            );
            video.currentTime = Number.MAX_SAFE_INTEGER;
          }),
      );
      metadata = { ...metadata, duration: recoveredDuration };
    }

    const captureMoments = videoFilename.includes("full-sequence")
      ? [
          ["dark", 0],
          ["reveal", 1.1],
          ["assembled", 2.1],
          ["exploding", 3.35],
          ["exploded", 4.6],
          ["reverse-side", 6.85],
          ["reassembling", 10.35],
          ["final", Math.max(0, metadata.duration - 0.25)],
        ]
      : [
          ["opening", 0.2],
          ["middle", metadata.duration * 0.5],
          ["ending", Math.max(0, metadata.duration - 0.25)],
        ];

    for (const [label, time] of captureMoments) {
      await page.evaluate(
        ({ seekTime }) =>
          new Promise((resolve, reject) => {
            const video = document.querySelector("#clip");
            const timeout = setTimeout(() => reject(new Error("Video seek timed out")), 10_000);
            video.addEventListener(
              "seeked",
              () => {
                clearTimeout(timeout);
                resolve();
              },
              { once: true },
            );
            video.currentTime = seekTime;
          }),
        { seekTime: time },
      );
      await page.screenshot({
        path: path.join(outputDir, `${capturePrefix}-${label}.png`),
        type: "png",
      });
    }

    const playbackQuality = await page.evaluate(
      () =>
        new Promise((resolve, reject) => {
          const video = document.querySelector("#clip");
          const timeout = setTimeout(() => reject(new Error("Playback verification timed out")), 30_000);
          video.addEventListener(
            "ended",
            () => {
              clearTimeout(timeout);
              const quality = video.getVideoPlaybackQuality();
              resolve({
                totalVideoFrames: quality.totalVideoFrames,
                droppedVideoFrames: quality.droppedVideoFrames,
                corruptedVideoFrames: quality.corruptedVideoFrames,
              });
            },
            { once: true },
          );
          video.currentTime = 0;
          video.play().catch(reject);
        }),
    );

    console.log(JSON.stringify({ ...metadata, bytes: videoStats.size, ...playbackQuality }, null, 2));
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
