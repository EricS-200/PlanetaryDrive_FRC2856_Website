/* Inspect WebM block timestamps without requiring ffprobe. */

const fs = require("node:fs");
const path = require("node:path");

const defaultPath = path.resolve(
  __dirname,
  "..",
  "output",
  "robot-explosion",
  "robot-explosion-low-iso-4k60-cinematic.webm",
);
const videoPath = path.resolve(process.argv[2] || defaultPath);
const bytes = fs.readFileSync(videoPath);

function vintLength(firstByte) {
  for (let length = 1; length <= 8; length += 1) {
    if (firstByte & (0x80 >> (length - 1))) return length;
  }
  throw new Error("Invalid EBML variable-length integer");
}

function readId(offset) {
  const length = vintLength(bytes[offset]);
  let value = 0n;
  for (let index = 0; index < length; index += 1) {
    value = (value << 8n) | BigInt(bytes[offset + index]);
  }
  return { length, value };
}

function readSize(offset) {
  const length = vintLength(bytes[offset]);
  const marker = 0x80 >> (length - 1);
  let value = BigInt(bytes[offset] & (marker - 1));
  for (let index = 1; index < length; index += 1) {
    value = (value << 8n) | BigInt(bytes[offset + index]);
  }
  const unknownValue = (1n << BigInt(7 * length)) - 1n;
  return { length, value: value === unknownValue ? null : Number(value) };
}

function readHeader(offset, parentEnd = bytes.length) {
  const id = readId(offset);
  const size = readSize(offset + id.length);
  const dataStart = offset + id.length + size.length;
  const dataEnd = size.value === null ? parentEnd : Math.min(parentEnd, dataStart + size.value);
  return { id: id.value, dataStart, dataEnd };
}

function readUnsigned(start, end) {
  let value = 0n;
  for (let offset = start; offset < end; offset += 1) {
    value = (value << 8n) | BigInt(bytes[offset]);
  }
  return Number(value);
}

function readBlockTimecode(start) {
  const trackNumberLength = vintLength(bytes[start]);
  const timecodeOffset = start + trackNumberLength;
  return bytes.readInt16BE(timecodeOffset);
}

const EBML = 0x1a45dfa3n;
const SEGMENT = 0x18538067n;
const INFO = 0x1549a966n;
const TIMECODE_SCALE = 0x2ad7b1n;
const CLUSTER = 0x1f43b675n;
const CLUSTER_TIMECODE = 0xe7n;
const SIMPLE_BLOCK = 0xa3n;
const BLOCK_GROUP = 0xa0n;
const BLOCK = 0xa1n;

const header = readHeader(0);
if (header.id !== EBML) throw new Error("Input is not an EBML/WebM file");
const segment = readHeader(header.dataEnd);
if (segment.id !== SEGMENT) throw new Error("WebM Segment element was not found");

let timecodeScale = 1_000_000;
const timestamps = [];
let clusterCount = 0;

function collectBlockGroup(start, end, relativeTimes) {
  let offset = start;
  while (offset < end) {
    const element = readHeader(offset, end);
    if (element.id === BLOCK) relativeTimes.push(readBlockTimecode(element.dataStart));
    if (element.dataEnd <= offset) break;
    offset = element.dataEnd;
  }
}

function collectCluster(start, end) {
  let offset = start;
  let clusterTimecode = 0;
  const relativeTimes = [];
  while (offset < end) {
    const element = readHeader(offset, end);
    if (element.id === CLUSTER_TIMECODE) {
      clusterTimecode = readUnsigned(element.dataStart, element.dataEnd);
    } else if (element.id === SIMPLE_BLOCK) {
      relativeTimes.push(readBlockTimecode(element.dataStart));
    } else if (element.id === BLOCK_GROUP) {
      collectBlockGroup(element.dataStart, element.dataEnd, relativeTimes);
    }
    if (element.dataEnd <= offset) break;
    offset = element.dataEnd;
  }
  relativeTimes.forEach((relative) => timestamps.push(clusterTimecode + relative));
}

let offset = segment.dataStart;
while (offset < segment.dataEnd) {
  const element = readHeader(offset, segment.dataEnd);
  if (element.id === INFO) {
    let infoOffset = element.dataStart;
    while (infoOffset < element.dataEnd) {
      const child = readHeader(infoOffset, element.dataEnd);
      if (child.id === TIMECODE_SCALE) {
        timecodeScale = readUnsigned(child.dataStart, child.dataEnd);
      }
      if (child.dataEnd <= infoOffset) break;
      infoOffset = child.dataEnd;
    }
  } else if (element.id === CLUSTER) {
    clusterCount += 1;
    collectCluster(element.dataStart, element.dataEnd);
  }
  if (element.dataEnd <= offset) break;
  offset = element.dataEnd;
}

timestamps.sort((left, right) => left - right);
const intervals = [];
for (let index = 1; index < timestamps.length; index += 1) {
  const interval = timestamps[index] - timestamps[index - 1];
  if (interval > 0) intervals.push(interval);
}
intervals.sort((left, right) => left - right);
const medianInterval = intervals[Math.floor(intervals.length / 2)];
const frameRate = medianInterval ? 1_000_000_000 / (medianInterval * timecodeScale) : null;
const duration = timestamps.length
  ? ((timestamps.at(-1) - timestamps[0] + (medianInterval || 0)) * timecodeScale) / 1_000_000_000
  : null;

console.log(
  JSON.stringify(
    {
      path: videoPath,
      bytes: bytes.length,
      clusters: clusterCount,
      frames: timestamps.length,
      timecodeScale,
      medianFrameIntervalMs: medianInterval ? (medianInterval * timecodeScale) / 1_000_000 : null,
      frameRate,
      duration,
    },
    null,
    2,
  ),
);
