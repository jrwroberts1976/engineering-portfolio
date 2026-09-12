import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(
  root,
  'scripts/assets/engineering-platform-dashboard',
);
const target = path.join(
  root,
  'public/images/projects/engineering-platform-dashboard.avif',
);

const names = (await readdir(sourceDir))
  .filter((name) => name.endsWith('.b64'))
  .sort();

const encoded = (
  await Promise.all(
    names.map((name) => readFile(path.join(sourceDir, name), 'utf8')),
  )
)
  .join('')
  .replace(/\s+/g, '');

const image = Buffer.from(encoded, 'base64');
const sha = createHash('sha256').update(image).digest('hex');

const expectedBytes = 34759;
const expectedSha =
  '0157fa82e082a3b25d55d621abc3541802942ca0b40a03bfa7c2f7205d83856a';

if (image.length !== expectedBytes || sha !== expectedSha) {
  throw new Error(
    `Engineering platform image validation failed: ${image.length} bytes, sha256 ${sha}`,
  );
}

await writeFile(target, image);

console.log(
  `Generated ${path.relative(root, target)} (${image.length} bytes, sha256 ${sha})`,
);
