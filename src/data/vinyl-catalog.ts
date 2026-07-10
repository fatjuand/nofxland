export type SaleStatus = 'available' | 'reserved' | 'sold';

export type VinylRecord = {
  id: number;
  band: string;
  album: string;
  price: number; // COP
  status: SaleStatus;
  soldTo?: string;
  image?: string; // filename in /public/covers/
};

// The NOFXLAND catalog — Juan David's collection
export const catalog: VinylRecord[] = [
  { id: 1, band: 'A Killing Tradition', album: 'Free Wayne Henley', price: 100000, status: 'available' },
  { id: 2, band: 'AC/DC', album: 'For Those About to Rock', price: 150000, status: 'available' },
  { id: 3, band: 'AC/DC', album: 'Dirty Deeds Done Dirt Cheap', price: 150000, status: 'available' },
  { id: 4, band: 'AC/DC', album: 'Power Up', price: 150000, status: 'available' },
  { id: 5, band: 'AC/DC', album: 'The Razors Edge', price: 150000, status: 'available' },
  { id: 6, band: 'AC/DC', album: 'Who Made Who', price: 150000, status: 'available' },
  { id: 7, band: 'AC/DC', album: 'Stiff Upper Lip', price: 150000, status: 'available' },
  { id: 8, band: 'AC/DC', album: 'Flick of the Switch', price: 150000, status: 'available' },
  { id: 9, band: 'AC/DC', album: 'Highway to Hell', price: 150000, status: 'available' },
  { id: 10, band: 'Baby Metal', album: '10 Babymetal Budoken', price: 150000, status: 'available' },
  { id: 11, band: 'Bane', album: "Don't Wait Up", price: 150000, status: 'available' },
  { id: 12, band: 'Baroness', album: 'Purple', price: 150000, status: 'available' },
  { id: 13, band: 'Blind Melon', album: 'Soup', price: 150000, status: 'available' },
  { id: 14, band: 'Blind Pigs', album: 'Sao Paulo Chaos', price: 150000, status: 'available' },
  { id: 15, band: 'Blink 182', album: 'Enema of the State', price: 150000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 16, band: 'Blink 182', album: 'Buddha', price: 150000, status: 'available' },
  { id: 17, band: 'Blink 182', album: 'Pink', price: 150000, status: 'available' },
  { id: 18, band: 'Blitz Hits', album: 'Blitz Hits', price: 50000, status: 'available' },
  { id: 19, band: 'Brujeria', album: 'Pocho Aztlan', price: 150000, status: 'available' },
  { id: 20, band: 'Cannabis Corpse', album: 'Blunted at Birth', price: 150000, status: 'available' },
  { id: 21, band: 'Cannibal Corpse', album: 'Violence Unimagined', price: 150000, status: 'available' },
  { id: 22, band: 'Ceremony', album: 'Rohnert Park', price: 150000, status: 'available' },
  { id: 23, band: 'Ceremony', album: 'In the Spirit of the World Now', price: 150000, status: 'available' },
  { id: 24, band: 'Ceremony', album: 'The Doldrums (Friendly City)', price: 50000, status: 'available' },
  { id: 25, band: 'Chat Pile', album: "God's Country", price: 150000, status: 'available' },
  { id: 26, band: 'Cro-Mags', album: 'The Age of Quarrel', price: 150000, status: 'available' },
  { id: 27, band: 'Cryptic Slaughter', album: 'Convicted', price: 50000, status: 'available' },
  { id: 28, band: 'Death', album: '…For the Whole World to See', price: 150000, status: 'available' },
  { id: 29, band: 'Descendents', album: '9th & Walnut', price: 150000, status: 'available' },
  { id: 30, band: 'Devo', album: 'New Traditionalists', price: 150000, status: 'available' },
  { id: 31, band: 'Electric Light Orchestra', album: 'Out of the Blue', price: 150000, status: 'available' },
  { id: 32, band: 'Everything but the Girl', album: 'Walking Wounded', price: 150000, status: 'available' },
  { id: 33, band: 'Fit for an Autopsy', album: 'Oh What the Future Holds', price: 150000, status: 'available' },
  { id: 34, band: 'Fit for an Autopsy', album: 'The Sea of Tragic Beasts', price: 150000, status: 'available' },
  { id: 35, band: 'Foxygen', album: '…And Star Power', price: 150000, status: 'available' },
  { id: 37, band: 'Ghost B.C.', album: 'Infestissumam', price: 150000, status: 'available' },
  { id: 38, band: 'Ghost B.C.', album: 'Meliora', price: 150000, status: 'available' },
  { id: 39, band: 'Ghost B.C.', album: 'Popestar', price: 150000, status: 'available' },
  { id: 40, band: 'Ghost B.C.', album: 'Prequelle', price: 150000, status: 'available' },
  { id: 41, band: 'Ghost B.C.', album: 'Phantomime', price: 150000, status: 'available' },
  { id: 42, band: 'Ghost B.C.', album: 'Impera', price: 150000, status: 'available' },
  { id: 43, band: 'Ghost B.C.', album: 'Opus Eponymous', price: 150000, status: 'available' },
  { id: 44, band: 'Gojira', album: 'Magma', price: 150000, status: 'available' },
  { id: 45, band: 'Greta Van Fleet', album: 'From the Fires', price: 150000, status: 'available' },
  { id: 46, band: 'Grito', album: 'Grito', price: 100000, status: 'available' },
  { id: 47, band: 'Gustavo Cerati', album: 'Siempre Es Hoy', price: 200000, status: 'available' },
  { id: 48, band: 'Hole', album: 'Live Through This', price: 150000, status: 'available' },
  { id: 49, band: 'IDLES', album: 'Joy as an Act of Resistance', price: 150000, status: 'available' },
  { id: 50, band: 'IDLES', album: 'Ultra Mono', price: 150000, status: 'available' },
  { id: 51, band: 'IDLES', album: 'TANGK', price: 150000, status: 'available' },
  { id: 52, band: 'IRA', album: 'Disfonico', price: 100000, status: 'available' },
  { id: 53, band: 'IRA', album: 'Botas de Hierro', price: 100000, status: 'available' },
  { id: 54, band: 'IRA', album: 'Firmes', price: 100000, status: 'available' },
  { id: 55, band: 'Kansas', album: 'Masque', price: 45000, status: 'available' },
  { id: 56, band: 'Lagwagon', album: 'Blaze', price: 150000, status: 'available' },
  { id: 57, band: 'Lagwagon', album: 'Trashed', price: 150000, status: 'available' },
  { id: 58, band: 'Lagwagon', album: 'Duh', price: 150000, status: 'available' },
  { id: 59, band: 'Lagwagon', album: 'Hang', price: 150000, status: 'available' },
  { id: 61, band: 'Mac DeMarco', album: 'Salad Days 10 Years', price: 200000, status: 'available' },
  { id: 62, band: 'Madonna', album: 'Like a Prayer', price: 50000, status: 'available' },
  { id: 63, band: 'Marilyn Manson', album: 'One Assassination Under God', price: 150000, status: 'available' },
  { id: 64, band: 'Masked Intruder', album: 'MI', price: 150000, status: 'available' },
  { id: 65, band: 'Mayhem', album: 'Live in Jessheim', price: 150000, status: 'available' },
  { id: 66, band: 'Me First and the Gimme Gimmes', album: 'Have a Ball', price: 150000, status: 'available' },
  { id: 67, band: 'Me First and the Gimme Gimmes', album: 'Love Their Country', price: 150000, status: 'available' },
  { id: 68, band: 'Me First and the Gimme Gimmes', album: 'Are We Not Men? We Are Diva!', price: 150000, status: 'available' },
  { id: 69, band: 'Massive Attack', album: 'Mezzanine', price: 200000, status: 'available' },
  { id: 71, band: 'Misfits', album: 'Evilive', price: 150000, status: 'available' },
  { id: 72, band: 'Misfits', album: 'Die Die My Darling', price: 150000, status: 'available' },
  { id: 73, band: 'Mitski', album: 'The Land Is Inhospitable and So Are We', price: 150000, status: 'available' },
  { id: 74, band: 'Molchat Doma', album: 'Belaya Polosa', price: 150000, status: 'available' },
  { id: 75, band: 'Motley Crue', album: 'Dr. Feelgood', price: 100000, status: 'available' },
  { id: 76, band: 'Motorhead', album: 'Ace of Spades', price: 150000, status: 'available' },
  { id: 77, band: 'My Chemical Romance', album: 'The Black Parade', price: 150000, status: 'available' },
  { id: 78, band: 'Nation of Language', album: 'Strange Disciple', price: 150000, status: 'available' },
  { id: 79, band: 'New Kids on the Block', album: 'New Kids on the Block', price: 50000, status: 'available' },
  { id: 80, band: 'Nirvana', album: 'Incesticide', price: 150000, status: 'available' },
  { id: 81, band: 'No Pressure', album: 'No Pressure', price: 150000, status: 'available' },
  { id: 82, band: 'No Use for a Name', album: 'Making Friends', price: 150000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 83, band: 'No Use for a Name', album: 'Rarities Vol.1: The Covers', price: 150000, status: 'available' },
  { id: 84, band: 'No Use for a Name', album: 'Rarities Vol.2: The Originals', price: 150000, status: 'available' },
  { id: 85, band: 'No Use for a Name', album: 'The Feel Good Record of the Year', price: 150000, status: 'available' },
  { id: 86, band: 'No Use for a Name', album: 'Leche con Carne', price: 150000, status: 'available' },
  { id: 87, band: 'NOFX', album: 'The Decline', price: 150000, status: 'available' },
  { id: 88, band: 'NOFX', album: 'Ribbed - Live in a Dive', price: 150000, status: 'available' },
  { id: 89, band: 'NOFX', album: 'Ribbed', price: 150000, status: 'available' },
  { id: 90, band: 'NOFX', album: 'Frisbee', price: 150000, status: 'available' },
  { id: 91, band: 'NOFX', album: 'White Trash, Two Heebs and a Bean', price: 150000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 92, band: 'NOFX', album: 'I Heard They Suck Live!!', price: 150000, status: 'available' },
  { id: 93, band: 'NOFX', album: 'West Coast vs Wessex', price: 150000, status: 'available' },
  { id: 94, band: 'NOFX', album: 'Self/Entitled', price: 150000, status: 'available' },
  { id: 95, band: 'NOFX', album: 'First Ditch Effort', price: 150000, status: 'available' },
  { id: 96, band: 'NOFX', album: 'S&M Airlines', price: 150000, status: 'available' },
  { id: 97, band: 'NOFX', album: 'Maximum Rock and Roll', price: 150000, status: 'available' },
  { id: 98, band: 'NOFX', album: 'Single Album', price: 150000, status: 'available' },
  { id: 99, band: 'NOFX', album: 'Double Album', price: 150000, status: 'available' },
  { id: 100, band: 'NOFX', album: 'The Longest Line', price: 150000, status: 'available' },
  { id: 101, band: 'NOFX', album: 'Liberal Animation', price: 150000, status: 'available' },
  { id: 102, band: 'NOFX', album: 'Half Album', price: 150000, status: 'available' },
  { id: 103, band: 'NOFX', album: "Wolves in Wolves' Clothing", price: 150000, status: 'available' },
  { id: 104, band: 'NOFX', album: 'Suffer', price: 50000, status: 'available' },
  { id: 105, band: 'NOFX', album: 'Lisa and Louise', price: 50000, status: 'available' },
  { id: 106, band: 'NOFX', album: 'The P.M.R.C. Can Suck on This', price: 50000, status: 'available' },
  { id: 107, band: 'NOFX', album: 'Never Trust a Hippy', price: 100000, status: 'available' },
  { id: 108, band: 'NOFX', album: 'Hardcore 84', price: 100000, status: 'available' },
  { id: 109, band: 'NOFX', album: 'Fuck the Kids', price: 50000, status: 'available' },
  { id: 110, band: 'Oxymoron', album: "Fuck the Nineties… Here's Our Noize", price: 100000, status: 'available' },
  { id: 114, band: 'Radiohead', album: 'KID A MNESIA', price: 250000, status: 'available' },
  { id: 115, band: 'Rammstein', album: 'Herzeleid', price: 250000, status: 'available' },
  { id: 116, band: 'Rammstein', album: 'Liebe Ist Für Alle Da', price: 250000, status: 'available' },
  { id: 117, band: 'Ramones', album: 'Leave Home', price: 100000, status: 'available' },
  { id: 118, band: 'Scowl', album: 'Psychic Dance Routine', price: 150000, status: 'available' },
  { id: 119, band: 'Scowl', album: 'How Flowers Grow', price: 150000, status: 'available' },
  { id: 120, band: 'Sextile', album: 'Push', price: 150000, status: 'available' },
  { id: 121, band: 'Six Feet Under', album: 'Death Rituals', price: 150000, status: 'available' },
  { id: 122, band: 'Six Feet Under', album: 'Nightmares of the Decomposed', price: 150000, status: 'available' },
  { id: 123, band: 'Six Feet Under', album: 'Graveyard Classics II', price: 150000, status: 'available' },
  { id: 124, band: 'Slayer', album: 'Repentless (6.66 Inches)', price: 200000, status: 'available' },
  { id: 125, band: 'Slint', album: 'Tweez', price: 150000, status: 'available' },
  { id: 126, band: 'Slipknot', album: 'We Are Not Your Kind', price: 150000, status: 'available' },
  { id: 127, band: 'Slipknot', album: 'The End for Now…', price: 150000, status: 'available' },
  { id: 128, band: 'Slipknot', album: 'Vol. 3: The Subliminal Verses', price: 200000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 129, band: 'Slipknot', album: '.5: The Gray Chapter', price: 200000, status: 'available' },
  { id: 130, band: 'Slipknot', album: 'All Out Life / Unsainted', price: 50000, status: 'available' },
  { id: 131, band: 'Slipknot', album: 'Day of the Gusano - Live in Mexico', price: 350000, status: 'available' },
  { id: 132, band: 'Soda Stereo', album: 'Cancion Animal', price: 150000, status: 'available' },
  { id: 133, band: 'Soundgarden', album: 'Badmotorfinger', price: 150000, status: 'available' },
  { id: 134, band: 'Soundgarden', album: 'Black Hole Sun', price: 200000, status: 'available' },
  { id: 135, band: 'Sudden Impact', album: 'Freaked Out', price: 50000, status: 'available' },
  { id: 136, band: 'Superjoint Ritual', album: 'Caught Up in the Gears of Application', price: 150000, status: 'available' },
  { id: 137, band: 'System of a Down', album: 'Steal This Album!', price: 150000, status: 'available' },
  { id: 138, band: 'System of a Down', album: 'Toxicity', price: 150000, status: 'available' },
  { id: 140, band: 'System of a Down', album: 'Hypnotize', price: 150000, status: 'available' },
  { id: 141, band: 'System of a Down', album: 'System of a Down', price: 150000, status: 'available' },
  { id: 142, band: 'The Breeders', album: 'Title TK', price: 150000, status: 'available' },
  { id: 143, band: 'The Cure', album: 'Seventeen Seconds', price: 150000, status: 'available' },
  { id: 145, band: 'The Dickies', album: 'Live When They Were Five - City Gardens 1982', price: 150000, status: 'available' },
  { id: 146, band: 'The Reflektors', album: 'The Reflektors', price: 100000, status: 'available' },
  { id: 147, band: 'The Smile', album: 'Cutouts', price: 150000, status: 'available' },
  { id: 148, band: 'The Smile', album: 'Wall of Eyes', price: 150000, status: 'available' },
  { id: 149, band: 'Todos Tus Muertos', album: 'Dale Aborigen', price: 200000, status: 'available' },
  { id: 150, band: 'Tomb Mold', album: 'Manor of Infinite Forms', price: 150000, status: 'available' },
  { id: 151, band: 'Tyler the Creator', album: 'Goblin', price: 150000, status: 'available' },
  { id: 152, band: 'Type O Negative', album: 'The Origin of the Feces', price: 150000, status: 'available' },
  { id: 153, band: 'Type O Negative', album: 'Life Is Killing Me (20th Anniversary)', price: 300000, status: 'available' },
  { id: 154, band: 'Type O Negative', album: 'Dead Again', price: 200000, status: 'available' },
  { id: 155, band: 'Type O Negative', album: 'Bloody Kisses', price: 150000, status: 'available' },
  { id: 156, band: 'Weezer', album: 'Red Album', price: 150000, status: 'available' },
  { id: 158, band: 'Zulu', album: 'A New Tomorrow', price: 50000, status: 'available' },
];

// Helper to format COP price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price);
}

// Get all unique bands sorted
export function getBands(): string[] {
  return [...new Set(catalog.map(v => v.band))].sort();
}

// Stats
export function getCatalogStats() {
  const available = catalog.filter(v => v.status === 'available');
  const sold = catalog.filter(v => v.status === 'sold');
  const totalValue = available.reduce((sum, v) => sum + v.price, 0);
  const soldValue = sold.reduce((sum, v) => sum + v.price, 0);
  return {
    total: catalog.length,
    available: available.length,
    sold: sold.length,
    totalValue,
    soldValue,
  };
}

// Get price ranges for filter
export function getPriceRanges() {
  return [
    { label: '$50k', min: 0, max: 50000 },
    { label: '$100k', min: 50001, max: 100000 },
    { label: '$150k', min: 100001, max: 150000 },
    { label: '$200k+', min: 150001, max: Infinity },
  ];
}
