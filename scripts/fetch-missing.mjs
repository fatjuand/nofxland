#!/usr/bin/env node
/**
 * Fetches covers only for records that are null in cover-urls.json
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const coverUrlsPath = resolve(ROOT, 'src/data/cover-urls.json');
const coverUrls = JSON.parse(readFileSync(coverUrlsPath, 'utf-8'));

// Parse catalog
const catalogPath = resolve(ROOT, 'src/data/vinyl-catalog.ts');
const content = readFileSync(catalogPath, 'utf-8');
const records = [];
const regex = /\{\s*id:\s*(\d+)\s*,\s*band:\s*'([^']+)'\s*,\s*album:\s*'([^']+)'/g;
let m;
while ((m = regex.exec(content)) !== null) {
  records.push({ id: parseInt(m[1]), band: m[2], album: m[3] });
}

function artistMatches(itunesArtist, catalogBand) {
  const a = itunesArtist.toLowerCase().trim();
  const b = catalogBand.toLowerCase().trim();
  return a === b || a.includes(b) || b.includes(a);
}

async function fetchCover(band, album) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${band} ${album}`)}&media=music&entity=album&limit=5`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.results?.length) return null;
    const match = data.results.find(r => artistMatches(r.artistName, band));
    return match?.artworkUrl100?.replace('100x100bb', '600x600bb') || null;
  } catch { return null; }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const missing = records.filter(r => coverUrls[r.id] === null);
  console.log(`🔄 Retrying ${missing.length} missing covers (2s delay)...\n`);
  let found = 0;
  for (let i = 0; i < missing.length; i++) {
    const r = missing[i];
    process.stdout.write(`[${i+1}/${missing.length}] ${r.band} — ${r.album}... `);
    const url = await fetchCover(r.band, r.album);
    if (url) { coverUrls[r.id] = url; found++; console.log('✅'); }
    else console.log('❌');
    await sleep(2000);
  }
  writeFileSync(coverUrlsPath, JSON.stringify(coverUrls, null, 2), 'utf-8');
  console.log(`\n✅ Found ${found} more covers. Total: ${Object.values(coverUrls).filter(v => v).length}`);
}
main();
