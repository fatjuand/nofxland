import { NextRequest, NextResponse } from 'next/server';

// Multi-source album cover API
// Tries: 1) iTunes  2) MusicBrainz/Cover Art Archive  3) Discogs (public, no auth)
// This ensures maximum coverage for all genres including underground punk/metal

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const artist = searchParams.get('artist');

  if (!query) {
    return NextResponse.json({ url: null }, { status: 400 });
  }

  // Try iTunes first with artist-specific search
  const itunesUrl = await tryItunes(query, artist);
  if (itunesUrl) {
    return NextResponse.json({ url: itunesUrl }, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' }
    });
  }

  // Try MusicBrainz + Cover Art Archive
  const mbUrl = await tryMusicBrainz(query, artist);
  if (mbUrl) {
    return NextResponse.json({ url: mbUrl }, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' }
    });
  }

  // Try Deezer as last resort
  const deezerUrl = await tryDeezer(query, artist);
  if (deezerUrl) {
    return NextResponse.json({ url: deezerUrl }, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' }
    });
  }

  return NextResponse.json({ url: null }, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' }
  });
}

async function tryItunes(query: string, artist: string | null): Promise<string | null> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=3`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await res.json();
    if (data.results?.length) {
      // If we have an artist name, try to match it
      if (artist) {
        const artistLower = artist.toLowerCase();
        const match = data.results.find((r: { artistName?: string }) => 
          r.artistName?.toLowerCase().includes(artistLower) || artistLower.includes(r.artistName?.toLowerCase() || '')
        );
        if (match?.artworkUrl100) {
          return match.artworkUrl100.replace('100x100bb', '600x600bb');
        }
      }
      // Fallback to first result
      if (data.results[0]?.artworkUrl100) {
        return data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
      }
    }
  } catch {}
  return null;
}

async function tryMusicBrainz(query: string, artist: string | null): Promise<string | null> {
  try {
    // Use structured search for better accuracy
    let searchQuery: string;
    if (artist) {
      const albumPart = query.replace(artist, '').trim();
      searchQuery = encodeURIComponent(`artist:"${artist}" AND release:"${albumPart}"`);
    } else {
      searchQuery = encodeURIComponent(query);
    }
    
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

async function tryDeezer(query: string, artist: string | null): Promise<string | null> {
  try {
    // Use artist-specific search for Deezer
    const searchTerm = artist ? `artist:"${artist}" ${query.replace(artist, '').trim()}` : query;
    const res = await fetch(
      `https://api.deezer.com/search/album?q=${encodeURIComponent(searchTerm)}&limit=1`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await res.json();
    if (data.data?.[0]?.cover_big) {
      return data.data[0].cover_big;
    }
  } catch {}
  return null;
}
