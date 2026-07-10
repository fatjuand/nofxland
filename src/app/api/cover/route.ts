import { NextRequest, NextResponse } from 'next/server';

// Multi-source album cover API
// Tries: 1) iTunes  2) MusicBrainz/Cover Art Archive  3) Discogs (public, no auth)
// This ensures maximum coverage for all genres including underground punk/metal

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ url: null }, { status: 400 });
  }

  // Try iTunes first (fast, good for mainstream)
  const itunesUrl = await tryItunes(query);
  if (itunesUrl) {
    return NextResponse.json({ url: itunesUrl }, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' }
    });
  }

  // Try MusicBrainz + Cover Art Archive (excellent for everything including underground)
  const mbUrl = await tryMusicBrainz(query);
  if (mbUrl) {
    return NextResponse.json({ url: mbUrl }, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' }
    });
  }

  // Try Deezer as last resort (good international coverage)
  const deezerUrl = await tryDeezer(query);
  if (deezerUrl) {
    return NextResponse.json({ url: deezerUrl }, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' }
    });
  }

  return NextResponse.json({ url: null }, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' }
  });
}

async function tryItunes(query: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=1`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await res.json();
    if (data.results?.[0]?.artworkUrl100) {
      return data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
    }
  } catch {}
  return null;
}

async function tryMusicBrainz(query: string): Promise<string | null> {
  try {
    // Split query into artist and album for better search
    const parts = query.split(' ');
    const searchQuery = encodeURIComponent(query);
    
    // Search for release on MusicBrainz
    const res = await fetch(
      `https://musicbrainz.org/ws/2/release/?query=${searchQuery}&limit=1&fmt=json`,
      { 
        headers: { 'User-Agent': 'NOFXLAND/1.0 (vinyl store)' },
        signal: AbortSignal.timeout(5000)
      }
    );
    const data = await res.json();
    
    if (data.releases?.[0]?.id) {
      const releaseId = data.releases[0].id;
      // Get cover from Cover Art Archive
      const coverRes = await fetch(
        `https://coverartarchive.org/release/${releaseId}`,
        { 
          signal: AbortSignal.timeout(5000),
          redirect: 'follow'
        }
      );
      
      if (coverRes.ok) {
        const coverData = await coverRes.json();
        if (coverData.images?.[0]?.thumbnails?.large) {
          return coverData.images[0].thumbnails.large;
        }
        if (coverData.images?.[0]?.image) {
          return coverData.images[0].image;
        }
      }
    }
  } catch {}
  return null;
}

async function tryDeezer(query: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}&limit=1`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await res.json();
    if (data.data?.[0]?.cover_big) {
      return data.data[0].cover_big;
    }
  } catch {}
  return null;
}
