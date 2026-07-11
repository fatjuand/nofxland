#!/usr/bin/env node

/**
 * fetch-covers.mjs
 * Fetches album cover artwork URLs from iTunes API for the NOFXLAND vinyl catalog.
 * 
 * Usage: node scripts/fetch-covers.mjs
 * 
 * - Parses src/data/vinyl-catalog.ts to extract records
 * - Searches iTunes for each record (skipping sold ones)
 * - Saves matched artwork URLs (600x600) to src/data/cover-urls.json
 * - Waits 500ms between requests to avoid rate limiting
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- Parse the TypeScript catalog file ---

function parseCatalog() {
  const filePath = resolve(ROOT, 'src/data/vinyl-catalog.ts');
  const content = readFileSync(filePath, 'utf-8');

  // Extract array entries using regex — each record is an object literal in the array
  const records = [];
  const objectRegex = /\{\s*id:\s*(\d+)\s*,\s*band:\s*'([^']+)'\s*,\s*album:\s*'([^']+)'[^}]*status:\s*'([^']+)'/g;

  let match;
  while ((match = objectRegex.exec(content)) !== null) {
    records.push({
      id: parseInt(match[1], 10),
      band: match[2],
      album: match[3],
      status: match[4],
    });
  }

  return records;
}

// --- Artist matching logic ---

function artistMatches(itunesArtist, catalogBand) {
  const a = itunesArtist.toLowerCase().trim();
  const b = catalogBand.toLowerCase().trim();

  // Exact match
  if (a === b) return true;

  // One contains the other (handles "Ghost B.C." vs "Ghost", etc.)
  if (a.includes(b) || b.includes(a)) return true;

  return false;
}

// --- Fetch cover from iTunes ---

async function fetchCover(band, album) {
  const searchTerm = `${band} ${album}`;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=music&entity=album&limit=5`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`    ⚠️  HTTP ${response.status} for "${searchTerm}"`);
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    // Find the first result where artist name closely matches
    const matched = data.results.find(result => artistMatches(result.artistName, band));

    if (!matched) {
      return null;
    }

    // Replace 100x100bb with 600x600bb for higher resolution
    const artworkUrl = matched.artworkUrl100
      ? matched.artworkUrl100.replace('100x100bb', '600x600bb')
      : null;

    return artworkUrl;
  } catch (error) {
    console.log(`    ❌ Error fetching "${searchTerm}": ${error.message}`);
    return null;
  }
}

// --- Delay helper ---

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Main ---

async function main() {
  console.log('🎵 NOFXLAND Cover Art Fetcher');
  console.log('=============================\n');

  const records = parseCatalog();
  console.log(`📀 Found ${records.length} records in catalog\n`);

  // Filter out sold records
  const toFetch = records.filter(r => r.status !== 'sold');
  const skipped = records.filter(r => r.status === 'sold');

  if (skipped.length > 0) {
    console.log(`⏭️  Skipping ${skipped.length} sold records\n`);
  }

  const coverUrls = {};
  let found = 0;
  let notFound = 0;

  for (let i = 0; i < toFetch.length; i++) {
    const record = toFetch[i];
    const progress = `[${i + 1}/${toFetch.length}]`;

    process.stdout.write(`${progress} ${record.band} — ${record.album}... `);

    const url = await fetchCover(record.band, record.album);

    if (url) {
      coverUrls[record.id] = url;
      found++;
      console.log('✅');
    } else {
      coverUrls[record.id] = null;
      notFound++;
      console.log('❌');
    }

    // Wait 1500ms between requests to avoid rate limiting
    if (i < toFetch.length - 1) {
      await sleep(1500);
    }
  }

  // Save results
  const outputPath = resolve(ROOT, 'src/data/cover-urls.json');
  writeFileSync(outputPath, JSON.stringify(coverUrls, null, 2), 'utf-8');

  console.log('\n=============================');
  console.log(`✅ Found: ${found}`);
  console.log(`❌ Not found: ${notFound}`);
  console.log(`📁 Saved to: src/data/cover-urls.json`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
