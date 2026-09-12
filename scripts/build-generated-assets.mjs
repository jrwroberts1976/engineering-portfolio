import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(
  root,
  'public/images/projects/homelab-engineering-platform-dashboard.webp',
);
const target = path.join(
  root,
  'public/images/projects/engineering-platform-dashboard.webp',
);

const encoded = (await readFile(source, 'utf8')).trim();

if (!encoded.startsWith('UklGR')) {
  throw new Error('Engineering platform image source is not valid base64 WebP data.');
}

const image = Buffer.from(encoded, 'base64');
const riff = image.subarray(0, 4).toString('ascii');
const webp = image.subarray(8, 12).toString('ascii');

if (riff !== 'RIFF' || webp !== 'WEBP') {
  throw new Error('Decoded engineering platform image is not a valid WebP file.');
}

await writeFile(target, image);
console.log(`Generated ${path.relative(root, target)} (${image.length} bytes)`);
