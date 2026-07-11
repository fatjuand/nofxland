#!/usr/bin/env node
/**
 * Fetches remaining covers using MusicBrainz + Cover Art Archive
 * For records that iTunes couldn't find
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

const sleep = ms => new Promise(r => setTimeout(r, ms));

// MusicBrainz search + Cover Art Archive
async function fetchFromMusicBrainz(band, album) {
  try {
    const cleanAlbum = album.replace(/[…()/.'!?,\[\]]/g, '').trim();
    const query = encodeURIComponent(`artist:"${band}" AND release:"${cleanAlbum}"`);
    const res = await fetch(
      `https://musicbrainz.org/ws/2/release/?query=${query}&limit=3&fmt=json`,
      { headers: { 'User-Agent': 'NOFXLAND/1.0 (vinyl-store)' }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    
    if (!data.releases?.length) return null;
    
    // Try each release for cover art
    for (const release of data.releases.slice(0, 3)) {
      try {
        const coverRes = await fetch(
          `https://coverartarchive.org/release/${release.id}`,
          { signal: AbortSignal.timeout(5000), redirect: 'follow' }
        );
        if (coverRes.ok) {
          const coverData = await coverRes.json();
          const img = coverData.images?.[0];
          if (img) {
            return img.thumbnails?.large || img.thumbnails?.['500'] || img.image;
          }
        }
      } catch {}
      await sleep(500);
    }
  } catch {}
  return null;
}

// Deezer search
async function fetchFromDeezer(band, album) {
  try {
    const query = `artist:"${band}" ${album.replace(/[…()/.'!?,\[\]]/g, '').trim()}`;
    const res = await fetch(
      `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}&limit=3`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.data?.length) {
      // Check artist match
      const bandLower = band.toLowerCase();
      const match = data.data.find(r => {
        const a = (r.artist?.name || '').toLowerCase();
        return a.includes(bandLower) || bandLower.includes(a);
      });
      if (match?.cover_big) return match.cover_big;
      // Fallback to first result if no match
      if (data.data[0]?.cover_big) return data.data[0].cover_big;
    }
  } catch {}
  return null;
}

async function main() {
  const missing = records.filter(r => coverUrls[r.id] === null);
  console.log(`🔄 Fetching ${missing.length} remaining covers via MusicBrainz + Deezer...\n`);
  
  let found = 0;
  for (let i = 0; i < missing.length; i++) {
    const r = missing[i];
    process.stdout.write(`[${i+1}/${missing.length}] ${r.band} — ${r.album}... `);
    
    // Try MusicBrainz first
    let url = await fetchFromMusicBrainz(r.band, r.album);
    if (url) {
      coverUrls[r.id] = url;
      found++;
      console.log('✅ (MB)');
      await sleep(1500); // MusicBrainz rate limit: 1 req/sec
      continue;
    }
    
    await sleep(1000);
    
    // Try Deezer
    url = await fetchFromDeezer(r.band, r.album);
    if (url) {
      coverUrls[r.id] = url;
      found++;
      console.log('✅ (Deezer)');
      await sleep(1000);
      continue;
    }
    
    console.log('❌');
    await sleep(1500);
  }

  writeFileSync(coverUrlsPath, JSON.stringify(coverUrls, null, 2), 'utf-8');
  const total = Object.values(coverUrls).filter(v => v !== null).length;
  const totalRecords = Object.keys(coverUrls).length;
  console.log(`\n=============================`);
  console.log(`✅ Found ${found} more covers`);
  console.log(`📊 Total: ${total}/${totalRecords} (${Math.round(total/totalRecords*100)}%)`);
  console.log(`📁 Saved to: src/data/cover-urls.json`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
