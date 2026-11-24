// "The World Today — Monday, 23 November 2026" (Node 22, standard library only):
// the entry is the entry.png beside this file — a dense one-page summary of the
// world news of 23 November 2026 (43 stories, 11 regions, UTC time bar, world map),
// rendered from HTML/CSS in headless Chromium. The program copies it to
// /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB and
// 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(src, dest);

// Verify the copy is whole: non-empty and the same size as the source, so a
// truncated or failed write fails loudly instead of shipping a broken entry.
const srcSize = statSync(src).size;
const destSize = statSync(dest).size;
if (destSize === 0 || destSize !== srcSize) {
  throw new Error(`entry.png copy failed: source ${srcSize} bytes, output ${destSize} bytes`);
}
