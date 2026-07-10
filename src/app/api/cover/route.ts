import { NextRequest, NextResponse } from 'next/server';

// API Route that proxies iTunes Search to avoid CORS issues
// Usage: /api/cover?q=AC/DC+Highway+to+Hell
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ url: null }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=1`,
      { next: { revalidate: 86400 } } // Cache for 24h
    );
    const data = await res.json();

    if (data.results && data.results.length > 0 && data.results[0].artworkUrl100) {
      const artworkUrl = data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
      return NextResponse.json({ url: artworkUrl });
    }

    return NextResponse.json({ url: null });
  } catch {
    return NextResponse.json({ url: null }, { status: 500 });
  }
}
