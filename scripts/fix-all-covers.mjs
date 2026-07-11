#!/usr/bin/env node
/**
 * Re-fetches ALL covers using MusicBrainz (most accurate, no auth needed)
 * Strategy: search by artist:"X" AND release:"Y" for exact match
 * Then get cover from Cover Art Archive
 * For ones MB doesn't find, try iTunes with strict artist match
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const coverUrlsPath = resolve(ROOT, 'src/data/cover-urls.json');
let coverUrls = {};

// Parse catalog
const catalogPath = resolve(ROOT, 'src/data/vinyl-catalog.ts');
const content = readFileSync(catalogPath, 'utf-8');
const records = [];
const regex = /\{\s*id:\s*(\d+)\s*,\s*band:\s*'([^']+)'\s*,\s*album:\s*'([^']+)'/g;
let m;
while ((m = regex.exec(content)) !== null) {
  records.push({ id: parseInt(m[1]), band: m[2], album: m[3] });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchMB(band, album) {
  const cleanAlbum = album.replace(/[…()/.'!?,\[\]]/g, '').trim();
  const query = encodeURIComponent(`artist:"${band}" AND release:"${cleanAlbum}"`);
  try {
    const res = await fetch(
      `https://musicbrainz.org/ws/2/release/?query=${query}&limit=3&fmt=json`,
      { headers: { 'User-Agent': 'NOFXLAND/1.0 (nofxland.vercel.app)' }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.releases?.length) return null;
    
    for (const release of data.releases.slice(0, 2)) {
      try {
        const coverRes = await fetch(
          `https://coverartarchive.org/release/${release.id}`,
          { signal: AbortSignal.timeout(5000), redirect: 'follow' }
        );
        if (coverRes.ok) {
          const coverData = await coverRes.json();
          const img = coverData.images?.[0];
          if (img) return img.thumbnails?.large || img.thumbnails?.['500'] || img.image;
        }
      } catch {}
      await sleep(300);
    }
  } catch {}
  return null;
}

async function fetchItunes(band, album) {
  const cleanAlbum = album.replace(/[…()/.'!?,\[\]]/g, '').trim();
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(`${band} ${cleanAlbum}`)}&media=music&entity=album&limit=5`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.results?.length) return null;
    const bandLower = band.toLowerCase().replace(/[.]/g, '');
    const match = data.results.find(r => {
      const a = (r.artistName || '').toLowerCase().replace(/[.]/g, '');
      return a.includes(bandLower) || bandLower.includes(a);
    });
    if (match?.artworkUrl100) return match.artworkUrl100.replace('100x100bb', '600x600bb');
  } catch {}
  return null;
}

async function fetchDeezer(band, album) {
  const cleanAlbum = album.replace(/[…()/.'!?,\[\]]/g, '').trim();
  try {
    const res = await fetch(
      `https://api.deezer.com/search/album?q=artist:"${band}" ${cleanAlbum}&limit=3`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.data?.length) return null;
    const bandLower = band.toLowerCase();
    const match = data.data.find(r => {
      const a = (r.artist?.name || '').toLowerCase();
      return a.includes(bandLower) || bandLower.includes(a);
    });
    if (match?.cover_big) return match.cover_big;
  } catch {}
  return null;
}

async function main() {
  console.log('🎵 NOFXLAND — Full Cover Verification (MB → iTunes → Deezer)');
  console.log('=============================================================\n');
  console.log(`📀 ${records.length} records to verify\n`);
  
  let found = 0;
  
  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    process.stdout.write(`[${i+1}/${records.length}] ${r.band} — ${r.album}... `);
    
    // Try MusicBrainz first (most accurate)
    let url = await fetchMB(r.band, r.album);
    if (url) { coverUrls[r.id] = url; found++; console.log('✅ MB'); await sleep(1200); continue; }
    
    await sleep(500);
    
    // Try iTunes
    url = await fetchItunes(r.band, r.album);
    if (url) { coverUrls[r.id] = url; found++; console.log('✅ iTunes'); await sleep(800); continue; }
    
    await sleep(500);
    
    // Try Deezer
    url = await fetchDeezer(r.band, r.album);
    if (url) { coverUrls[r.id] = url; found++; console.log('✅ Deezer'); await sleep(800); continue; }
    
    coverUrls[r.id] = null;
    console.log('❌');
    await sleep(1200);
  }
  
  writeFileSync(coverUrlsPath, JSON.stringify(coverUrls, null, 2), 'utf-8');
  console.log(`\n=============================================================`);
  console.log(`✅ Found: ${found}/${records.length} (${Math.round(found/records.length*100)}%)`);
  console.log(`📁 Saved to: src/data/cover-urls.json`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
