#!/usr/bin/env node

/**
 * build-own-covers.mjs
 * Scans public/covers/ for your own album photos and builds a manifest
 * mapping record id -> public path.
 *
 * Usage: node scripts/build-own-covers.mjs
 *
 * Drop your photos in public/covers/ named by the record id, e.g.:
 *   public/covers/86.jpg   ->  disc #86
 *   public/covers/117.png  ->  disc #117
 *   public/covers/47.webp  ->  disc #47
 *
 * Accepted extensions: .jpg .jpeg .png .webp .avif .gif
 * The manifest is written to src/data/own-covers.json and takes
 * priority over API-fetched covers on the site.
 */

import { readdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const COVERS_DIR = resolve(ROOT, 'public/covers');
const OUTPUT = resolve(ROOT, 'src/data/own-covers.json');

const VALID_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function main() {
  const files = readdirSync(COVERS_DIR);
  const manifest = {};
  const skipped = [];

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!VALID_EXT.has(ext)) continue; // ignore .gitkeep and anything else

    const name = basename(file, ext);
    // Only accept files named as a plain integer id
    if (!/^\d+$/.test(name)) {
      skipped.push(file);
      continue;
    }

    // Public path is served from the web root
    manifest[name] = `/covers/${file}`;
  }

  // Deterministic ordering by numeric id
  const ordered = {};
  for (const id of Object.keys(manifest).sort((a, b) => Number(a) - Number(b))) {
    ordered[id] = manifest[id];
  }

  writeFileSync(OUTPUT, JSON.stringify(ordered, null, 2) + '\n', 'utf-8');

  const count = Object.keys(ordered).length;
  console.log('📸 NOFXLAND own-covers manifest');
  console.log('================================');
  console.log(`✅ Found ${count} own photo(s) in public/covers/`);
  if (count > 0) {
    console.log('   ' + Object.entries(ordered).map(([id, p]) => `#${id} -> ${p}`).join('\n   '));
  }
  if (skipped.length > 0) {
    console.log(`\n⚠️  Ignored (name is not a plain id): ${skipped.join(', ')}`);
    console.log('   Rename them to "<id>.<ext>", e.g. 86.jpg');
  }
  console.log(`\n📁 Saved to: src/data/own-covers.json`);
}

main();
