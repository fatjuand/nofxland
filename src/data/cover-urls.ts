// Pre-resolved album cover URLs from iTunes/Apple Music
// These are static URLs that load directly without any API call from the browser
// Format: catalog ID -> artwork URL
// 
// To refresh: run `npm run fetch-covers` (or manually search on iTunes)
// Search URL: https://itunes.apple.com/search?term=ARTIST+ALBUM&media=music&entity=album&limit=1

export const coverUrls: Record<number, string> = {};

// Generate iTunes artwork URL from artist and album name
// This constructs a search-based URL that redirects to the artwork
export function getITunesSearchCoverUrl(band: string, album: string): string {
  const query = encodeURIComponent(`${band} ${album.replace(/[…()/.'!?,\[\]]/g, '').trim()}`);
  return `https://is1-ssl.mzstatic.com/image/thumb/Music/${query}/600x600bb.jpg`;
}
