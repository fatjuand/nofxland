#!/usr/bin/env node
/**
 * Verifies and fixes album covers using Discogs API (most accurate for vinyl)
 * Discogs has every release with correct artwork
 * 
 * Uses Discogs public API (no auth needed for search, 25 req/min rate limit)
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

// Discogs search - returns the cover_image URL for the first matching release
async function searchDiscogs(band, album) {
  const cleanAlbum = album.replace(/[…()/.'!?,\[\]]/g, '').trim();
  const query = `${band} ${cleanAlbum}`;
  const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&per_page=5`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'NOFXLAND/1.0 +https://nofxland.vercel.app'
      },
      signal: AbortSignal.timeout(8000)
    });
    
    if (!res.ok) {
      if (res.status === 429) console.log('  ⚠️ Rate limited');
      return null;
    }
    
    const data = await res.json();
    if (!data.results?.length) return null;
    
    // Find best match - check if artist matches
    const bandLower = band.toLowerCase();
    for (const result of data.results) {
      const title = (result.title || '').toLowerCase();
      // Discogs format: "Artist - Album"
      if (title.includes(bandLower) || (result.artist && result.artist.toLowerCase().includes(bandLower))) {
        if (result.cover_image && !result.cover_image.includes('spacer.gif')) {
          return result.cover_image;
        }
      }
    }
    
    // Fallback to first result if it has a cover
    if (data.results[0]?.cover_image && !data.results[0].cover_image.includes('spacer.gif')) {
      return data.results[0].cover_image;
    }
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }
  return null;
}

async function main() {
  console.log('🔍 NOFXLAND Cover Verification via Discogs');
  console.log('==========================================\n');
  
  // Re-verify ALL records (not just nulls) to fix incorrect ones
  const toVerify = records.filter(r => r.id in coverUrls);
  console.log(`📀 Verifying ${toVerify.length} records via Discogs...\n`);
  
  let updated = 0;
  let verified = 0;
  
  for (let i = 0; i < toVerify.length; i++) {
    const r = toVerify[i];
    process.stdout.write(`[${i+1}/${toVerify.length}] ${r.band} — ${r.album}... `);
    
    const discogsUrl = await searchDiscogs(r.band, r.album);
    
    if (discogsUrl) {
      if (coverUrls[r.id] !== discogsUrl) {
        coverUrls[r.id] = discogsUrl;
        updated++;
        console.log('🔄 UPDATED');
      } else {
        verified++;
        console.log('✅');
      }
    } else {
      console.log('⏭️ kept existing');
    }
    
    // Discogs rate limit: 25 requests per minute = 2.4s between requests
    await sleep(2500);
  }
  
  writeFileSync(coverUrlsPath, JSON.stringify(coverUrls, null, 2), 'utf-8');
  const total = Object.values(coverUrls).filter(v => v !== null).length;
  console.log(`\n==========================================`);
  console.log(`🔄 Updated: ${updated}`);
  console.log(`✅ Verified: ${verified}`);
  console.log(`📊 Total covers: ${total}/${toVerify.length}`);
  console.log(`📁 Saved to: src/data/cover-urls.json`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
