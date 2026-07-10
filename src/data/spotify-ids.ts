// Spotify Album IDs for embedded previews
// Format: catalog ID -> Spotify Album ID
// To find an album ID: go to Spotify -> album -> Share -> Copy Album Link
// The ID is the last part of the URL: https://open.spotify.com/album/{ID}
//
// Records with IDs here will show an embedded Spotify player with 30s preview
// Records without IDs will show a "Open in Spotify" search link

export const spotifyAlbumIds: Record<number, string> = {
  // NOFX — the kings of NOFXLAND
  87: '6JGZsIWx0rritHPDeLqPOR',   // The Decline
  89: '0EsMUXxOqlIi3QhY7g1ywY',   // Ribbed
  91: '4k5VryMXEN5YMEU4pIh5dm',   // White Trash, Two Heebs and a Bean
  92: '3sj7j7FnhbVjNNOQ7bDbfh',   // I Heard They Suck Live!!
  93: '0TlcxJGHKNQzAbNe8P4S7P',   // West Coast vs Wessex
  95: '6XNPLq1Gi9u4k0B1Uw7JWL',   // First Ditch Effort
  96: '2b1AAipEDO7lFP03Kc5FEq',   // S&M Airlines
  98: '1IXZqiNV9PmqBQMJaFlMhW',   // Single Album
  99: '5RCfbPfZ5PBJOt8kPOhT4A',   // Double Album
  101: '2nVSqFqkJFb8HCXV1rE4cM',  // Liberal Animation
  103: '7vWbthsXrG1lghQuHRTP2s',  // Wolves in Wolves' Clothing

  // AC/DC
  2: '1ZH5g1RDq3GY1OvVfRFiI5',   // For Those About to Rock
  3: '01234yiZmgNLYfGGMBAABU',   // Dirty Deeds Done Dirt Cheap
  4: '2JGHqICpn1AD2zOLn84fA2',   // Power Up
  9: '4wixJGfmhLYhMa8uxmQdvR',   // Highway to Hell

  // Slipknot
  126: '3JNQd6ndbOL2c0O51U8TOH', // We Are Not Your Kind
  128: '6brf5jON6M0q7bNVOlFkHS', // Vol. 3: The Subliminal Verses
  129: '4fOcM9IhwjkFrHqaSH5S0z', // .5: The Gray Chapter

  // Ghost B.C.
  37: '3GVF30D5YRfWDCvPCQh1LI',  // Infestissumam
  38: '7EGt4kWPVcPf4rHehfRiDD',  // Meliora
  40: '1KNYcT5n0Q3I3JfX8Ue5Tz',  // Prequelle
  42: '0BFzNsNJK3kCJEBZk4gFYI',  // Impera

  // System of a Down
  137: '6nR3Rgt5mTMRyFhad1bHoC', // Steal This Album!
  138: '6jWde94Jf7wMFaBCwNwkBx', // Toxicity
  140: '1IYLbD7r3Zr8NTle7wMxrC', // Hypnotize
  141: '0W7GDZo1bMFzoNQ2caNxsH', // System of a Down

  // Rammstein
  115: '3C5OuTsJrVi2UVNKFBFC3V', // Herzeleid
  116: '5VE1MGQJF4kiNvMiKYDM0Q', // Liebe Ist Für Alle Da

  // Other highlights
  47: '3ViO4eedGXGX7cT8XJkyYT',  // Gustavo Cerati - Siempre Es Hoy
  48: '5CaGiPqW0cCnaJNqJNxoI2',  // Hole - Live Through This
  76: '72qCRCAMnk3VNNzAsOGn6i',  // Motorhead - Ace of Spades
  77: '0FZK97MXMm5mUQ8mtudjuK',  // My Chemical Romance - The Black Parade
  80: '7wOOA7l306K8HfBKfPoafr',  // Nirvana - Incesticide
  114: '6ofEQubaL265rIW6WnCU8y', // Radiohead - KID A MNESIA
  132: '3aTb1QonlK1Y0nwlOafbqn', // Soda Stereo - Cancion Animal
  133: '5i8MOg3yTS4YV3eTXdSfHp', // Soundgarden - Badmotorfinger
  151: '3QOPFj49LRxCuKrvaP0sYv', // Tyler the Creator - Goblin
  156: '3IFaBkPJqpMGiRITyEhzLf', // Weezer - Red Album
  69: '49MNmJhZQewjt06rpwp6QR',  // Massive Attack - Mezzanine
  44: '0eFHYz8a2zFAVfkFTRPnr4',  // Gojira - Magma
  15: '1AvFl6ov6bIoboIjznNjLR',  // Blink 182 - Enema of the State
  149: '5pZCLBBtRdJjN4lCaC3EiT', // Todos Tus Muertos - Dale Aborigen
};

// Check if a record has a Spotify ID mapped
export function hasSpotifyEmbed(catalogId: number): boolean {
  return catalogId in spotifyAlbumIds;
}

// Get the Spotify embed URL for an album
export function getSpotifyEmbedUrl(catalogId: number): string | null {
  const albumId = spotifyAlbumIds[catalogId];
  if (!albumId) return null;
  return `https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`;
}
