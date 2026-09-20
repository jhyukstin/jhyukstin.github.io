/**
 * Minimal intrinsic-size reader for PNG / JPEG / GIF / WebP.
 * Used so every <img> can carry width + height and the browser reserves the
 * right space before the file arrives (no layout shift, no squashed art).
 * No dependencies — it just reads the file header.
 */
import { openSync, readSync, closeSync, statSync } from 'node:fs';

function readHead(file, bytes = 65536) {
  const size = Math.min(statSync(file).size, bytes === Infinity ? Number.MAX_SAFE_INTEGER : bytes);
  const buf = Buffer.alloc(size);
  const fd = openSync(file, 'r');
  try {
    readSync(fd, buf, 0, size, 0);
  } finally {
    closeSync(fd);
  }
  return buf;
}

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i += 1; continue; }
    const marker = buf[i + 1];
    // SOF0-SOF15, excluding DHT(c4), JPGA(c8) and DAC(cc)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function webpSize(buf) {
  const fourCC = buf.toString('ascii', 12, 16);
  if (fourCC === 'VP8 ') {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (fourCC === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (fourCC === 'VP8X') {
    const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    const h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
    return { width: w, height: h };
  }
  return null;
}

/** @returns {{width:number,height:number}|null} */
export function imageSize(file) {
  let buf;
  try {
    buf = readHead(file);
  } catch {
    return null;
  }
  if (buf.length < 24) return null;

  // PNG
  if (buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // GIF
  if (buf.toString('ascii', 0, 3) === 'GIF') {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    // Some JPEGs carry a large XMP block or embedded thumbnail before the
    // frame header, so fall back to scanning the whole file.
    return jpegSize(buf) || jpegSize(readHead(file, Infinity));
  }
  // WebP
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return webpSize(buf);
  }
  return null;
}
