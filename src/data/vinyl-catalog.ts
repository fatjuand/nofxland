export type SaleStatus = 'available' | 'reserved' | 'sold';

export type VinylRecord = {
  id: number;
  band: string;
  album: string;
  year: number;
  genre: string;
  hook: string; // One-liner selling phrase in Spanish that makes people want to listen
  price: number; // COP — final sale price
  status: SaleStatus;
  soldTo?: string;
  listenUrl?: string; // Optional curated link for the "Escuchar" button (overrides YouTube search)
};

// The NOFXLAND catalog — Juan David's collection
// Prices are the final sale prices in COP.
export const catalog: VinylRecord[] = [
  { id: 1, band: 'A Killing Tradition', album: 'Free Wayne Henley', year: 2006, genre: 'Hardcore Punk', hook: 'Hardcore texano crudo y sin filtros', price: 50000, status: 'available' },
  { id: 2, band: 'AC/DC', album: 'For Those About to Rock', year: 1981, genre: 'Hard Rock', hook: 'El cañonazo que abre todos los conciertos', price: 75000, status: 'available' },
  { id: 3, band: 'AC/DC', album: 'Dirty Deeds Done Dirt Cheap', year: 1976, genre: 'Hard Rock', hook: 'Rock sucio hecho a precio de ganga', price: 75000, status: 'available' },
  { id: 4, band: 'AC/DC', album: 'Power Up', year: 2020, genre: 'Hard Rock', hook: 'Angus Young demostrando que nunca se retira', price: 75000, status: 'available' },
  { id: 5, band: 'AC/DC', album: 'The Razors Edge', year: 1990, genre: 'Hard Rock', hook: 'Thunderstruck: el riff que todos conocen', price: 75000, status: 'available' },
  { id: 6, band: 'AC/DC', album: 'Who Made Who', year: 1986, genre: 'Hard Rock', hook: 'Soundtrack que Stephen King eligió', price: 75000, status: 'available' },
  { id: 7, band: 'AC/DC', album: 'Stiff Upper Lip', year: 2000, genre: 'Hard Rock', hook: 'Blues rock con actitud de los hermanos Young', price: 75000, status: 'available' },
  { id: 8, band: 'AC/DC', album: 'Flick of the Switch', year: 1983, genre: 'Hard Rock', hook: 'AC/DC en modo crudo y autoproducido', price: 75000, status: 'available' },
  { id: 9, band: 'AC/DC', album: 'Highway to Hell', year: 1979, genre: 'Hard Rock', hook: 'El último disco con Bon Scott, puro fuego', price: 75000, status: 'available' },
  { id: 10, band: 'Baby Metal', album: '10 Babymetal Budoken', year: 2021, genre: 'Heavy Metal', hook: 'J-pop meets metal extremo en vivo', price: 75000, status: 'available' },
  { id: 11, band: 'Bane', album: "Don't Wait Up", year: 2014, genre: 'Hardcore Punk', hook: 'El adiós perfecto del hardcore positivo', price: 75000, status: 'available' },
  { id: 12, band: 'Baroness', album: 'Purple', year: 2015, genre: 'Sludge Metal', hook: 'Metal progresivo con alma sureña', price: 75000, status: 'available' },
  { id: 13, band: 'Blind Melon', album: 'Soup', year: 1995, genre: 'Alternative Rock', hook: 'El disco más oscuro del rock alternativo 90s', price: 75000, status: 'available' },
  { id: 14, band: 'Blind Pigs', album: 'Sao Paulo Chaos', year: 2005, genre: 'Hardcore Punk', hook: 'Hardcore brasileño directo de São Paulo', price: 75000, status: 'available' },
  { id: 15, band: 'Blink 182', album: 'Enema of the State', year: 1999, genre: 'Pop Punk', hook: 'El disco que definió el pop punk de los 2000', price: 75000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 16, band: 'Blink 182', album: 'Buddha', year: 1993, genre: 'Pop Punk', hook: 'Blink antes de ser famosos, punk de garaje', price: 75000, status: 'available' },
  { id: 17, band: 'Blink 182', album: 'Pink', year: 1999, genre: 'Pop Punk', hook: 'Edición especial en vinilo rosado', price: 75000, status: 'available' },
  { id: 18, band: 'Blitz Hits', album: 'Blitz Hits', year: 1984, genre: 'Punk Rock', hook: 'Compilado esencial del punk brasileño', price: 25000, status: 'available' },
  { id: 19, band: 'Brujeria', album: 'Pocho Aztlan', year: 2016, genre: 'Death Metal', hook: 'Grindcore narco cantado en español', price: 75000, status: 'available' },
  { id: 20, band: 'Cannabis Corpse', album: 'Blunted at Birth', year: 2006, genre: 'Death Metal', hook: 'Death metal + marihuana = parodia brutal', price: 75000, status: 'available' },
  { id: 21, band: 'Cannibal Corpse', album: 'Violence Unimagined', year: 2021, genre: 'Death Metal', hook: 'Brutalidad técnica en su máxima expresión', price: 75000, status: 'available' },
  { id: 22, band: 'Ceremony', album: 'Rohnert Park', year: 2010, genre: 'Hardcore Punk', hook: 'Hardcore veloz que no te deja respirar', price: 75000, status: 'available' },
  { id: 23, band: 'Ceremony', album: 'In the Spirit of the World Now', year: 2019, genre: 'Post-Punk', hook: 'Evolución post-punk con ADN hardcore', price: 75000, status: 'available' },
  { id: 24, band: 'Ceremony', album: 'The Doldrums (Friendly City)', year: 2012, genre: 'Post-Punk', hook: 'Punk reinventado con melancolía', price: 25000, status: 'available' },
  { id: 25, band: 'Chat Pile', album: "God's Country", year: 2022, genre: 'Sludge Metal', hook: 'Noise rock que suena a pesadilla americana', price: 75000, status: 'available' },
  { id: 26, band: 'Cro-Mags', album: 'The Age of Quarrel', year: 1986, genre: 'Hardcore Punk', hook: 'La biblia del crossover thrash/hardcore', price: 75000, status: 'available' },
  { id: 27, band: 'Cryptic Slaughter', album: 'Convicted', year: 1986, genre: 'Thrash Metal', hook: 'Crossover thrash ultraveloz de los 80s', price: 25000, status: 'available' },
  { id: 28, band: 'Death', album: '…For the Whole World to See', year: 1971, genre: 'Punk Rock', hook: 'Proto-punk de Detroit antes que los Ramones', price: 75000, status: 'available' },
  { id: 29, band: 'Descendents', album: '9th & Walnut', year: 2021, genre: 'Punk Rock', hook: 'Demos perdidos de los padres del pop punk', price: 75000, status: 'available' },
  { id: 30, band: 'Devo', album: 'New Traditionalists', year: 1981, genre: 'New Wave', hook: 'Synth-punk robótico y adelantado a su época', price: 75000, status: 'available' },
  { id: 31, band: 'Electric Light Orchestra', album: 'Out of the Blue', year: 1977, genre: 'Progressive Rock', hook: 'Doble LP de sinfonías pop perfectas', price: 75000, status: 'available' },
  { id: 32, band: 'Everything but the Girl', album: 'Walking Wounded', year: 1996, genre: 'Electronic', hook: 'Trip-hop elegante con voz etérea', price: 75000, status: 'available' },
  { id: 33, band: 'Fit for an Autopsy', album: 'Oh What the Future Holds', year: 2022, genre: 'Death Metal', hook: 'Deathcore técnico y aplastante', price: 75000, status: 'available' },
  { id: 34, band: 'Fit for an Autopsy', album: 'The Sea of Tragic Beasts', year: 2019, genre: 'Death Metal', hook: 'Deathcore melódico con peso emocional', price: 75000, status: 'available' },
  { id: 35, band: 'Foxygen', album: '…And Star Power', year: 2014, genre: 'Indie Rock', hook: 'Caos psicodélico en doble LP', price: 75000, status: 'available' },
  { id: 37, band: 'Ghost B.C.', album: 'Infestissumam', year: 2013, genre: 'Heavy Metal', hook: 'Misas negras con melodías pop perfectas', price: 75000, status: 'available' },
  { id: 38, band: 'Ghost B.C.', album: 'Meliora', year: 2015, genre: 'Heavy Metal', hook: 'El disco donde Ghost conquistó el mundo', price: 75000, status: 'available' },
  { id: 39, band: 'Ghost B.C.', album: 'Popestar', year: 2016, genre: 'Heavy Metal', hook: 'Covers y originales del Papa Emeritus', price: 75000, status: 'available' },
  { id: 40, band: 'Ghost B.C.', album: 'Prequelle', year: 2018, genre: 'Heavy Metal', hook: 'Arena rock satánico con gancho pop', price: 75000, status: 'available' },
  { id: 41, band: 'Ghost B.C.', album: 'Phantomime', year: 2023, genre: 'Heavy Metal', hook: 'EP de covers oscuros reimaginados', price: 75000, status: 'available' },
  { id: 42, band: 'Ghost B.C.', album: 'Impera', year: 2022, genre: 'Heavy Metal', hook: 'Metal teatral con riffs de estadio', price: 75000, status: 'available' },
  { id: 43, band: 'Ghost B.C.', album: 'Opus Eponymous', year: 2010, genre: 'Heavy Metal', hook: 'El debut que inició el culto a Ghost', price: 75000, status: 'available' },
  { id: 44, band: 'Gojira', album: 'Magma', year: 2016, genre: 'Death Metal', hook: 'Metal progresivo francés con peso emocional', price: 75000, status: 'available' },
  { id: 45, band: 'Greta Van Fleet', album: 'From the Fires', year: 2017, genre: 'Hard Rock', hook: 'Zeppelin renacido para una nueva era', price: 75000, status: 'available' },
  { id: 46, band: 'Grito', album: 'Grito', year: 2000, genre: 'Hardcore Punk', hook: 'Hardcore colombiano furioso y visceral', price: 50000, status: 'available' },
  { id: 47, band: 'Gustavo Cerati', album: 'Siempre Es Hoy', year: 2002, genre: 'Alternative Rock', hook: 'Electrónica y rock argentino en su punto', price: 100000, status: 'sold' },
  { id: 48, band: 'Hole', album: 'Live Through This', year: 1994, genre: 'Grunge', hook: 'Rabia femenina que definió los 90s', price: 75000, status: 'available' },
  { id: 49, band: 'IDLES', album: 'Joy as an Act of Resistance', year: 2018, genre: 'Post-Punk', hook: 'Punk político con corazón enorme', price: 75000, status: 'available' },
  { id: 50, band: 'IDLES', album: 'Ultra Mono', year: 2020, genre: 'Post-Punk', hook: 'Brutalismo sonoro hecho himno', price: 75000, status: 'available' },
  { id: 51, band: 'IDLES', album: 'TANGK', year: 2024, genre: 'Post-Punk', hook: 'IDLES en modo vulnerable y expansivo', price: 75000, status: 'available' },
  { id: 52, band: 'IRA', album: 'Disfonico', year: 2004, genre: 'Punk Rock', hook: 'Punk colombiano con actitud Oi!', price: 50000, status: 'available' },
  { id: 53, band: 'IRA', album: 'Botas de Hierro', year: 2001, genre: 'Punk Rock', hook: 'Street punk hecho en Medellín', price: 50000, status: 'available' },
  { id: 54, band: 'IRA', album: 'Firmes', year: 2008, genre: 'Punk Rock', hook: 'Punk obrero colombiano, firme y directo', price: 50000, status: 'available' },
  { id: 55, band: 'Kansas', album: 'Masque', year: 1975, genre: 'Progressive Rock', hook: 'Rock progresivo americano pre-Dust in the Wind', price: 22500, status: 'available' },
  { id: 56, band: 'Lagwagon', album: 'Blaze', year: 2003, genre: 'Punk Rock', hook: 'Skate punk melódico de Fat Wreck', price: 75000, status: 'available' },
  { id: 57, band: 'Lagwagon', album: 'Trashed', year: 1994, genre: 'Punk Rock', hook: 'Velocidad y melodía del skate punk 90s', price: 75000, status: 'available' },
  { id: 58, band: 'Lagwagon', album: 'Duh', year: 1992, genre: 'Punk Rock', hook: 'El debut que fundó el sonido Fat Wreck', price: 75000, status: 'available' },
  { id: 59, band: 'Lagwagon', album: 'Hang', year: 2014, genre: 'Punk Rock', hook: 'Joey Cape maduro y emotivo como nunca', price: 75000, status: 'available' },
  { id: 61, band: 'Mac DeMarco', album: 'Salad Days 10 Years', year: 2014, genre: 'Indie Rock', hook: 'Slacker rock que define una generación', price: 100000, status: 'available' },
  { id: 62, band: 'Madonna', album: 'Like a Prayer', year: 1989, genre: 'Pop', hook: 'Pop provocador que escandalizó al Vaticano', price: 25000, status: 'available' },
  { id: 63, band: 'Marilyn Manson', album: 'One Assassination Under God', year: 2024, genre: 'Industrial Metal', hook: 'El regreso más oscuro del Anticristo', price: 75000, status: 'available' },
  { id: 64, band: 'Masked Intruder', album: 'MI', year: 2012, genre: 'Pop Punk', hook: 'Pop punk criminal absurdamente pegajoso', price: 75000, status: 'available' },
  { id: 65, band: 'Mayhem', album: 'Live in Jessheim', year: 2022, genre: 'Black Metal', hook: 'Black metal noruego en vivo y letal', price: 75000, status: 'available' },
  { id: 66, band: 'Me First and the Gimme Gimmes', album: 'Have a Ball', year: 2006, genre: 'Punk Rock', hook: 'Covers punk de clásicos hechos para el pogo', price: 75000, status: 'available' },
  { id: 67, band: 'Me First and the Gimme Gimmes', album: 'Love Their Country', year: 2006, genre: 'Punk Rock', hook: 'Country destruido y reconstruido en punk', price: 75000, status: 'available' },
  { id: 68, band: 'Me First and the Gimme Gimmes', album: 'Are We Not Men? We Are Diva!', year: 2014, genre: 'Punk Rock', hook: 'Divas del pop hechas punk a toda velocidad', price: 75000, status: 'available' },
  { id: 69, band: 'Massive Attack', album: 'Mezzanine', year: 1998, genre: 'Electronic', hook: 'Trip-hop oscuro que inventó una atmósfera', price: 100000, status: 'available' },
  { id: 71, band: 'Misfits', album: 'Evilive', year: 1982, genre: 'Horror Punk', hook: 'Danzig en vivo con furia primitiva', price: 75000, status: 'available' },
  { id: 72, band: 'Misfits', album: 'Die Die My Darling', year: 1984, genre: 'Horror Punk', hook: 'El último EP con Danzig, puro clásico', price: 75000, status: 'available' },
  { id: 73, band: 'Mitski', album: 'The Land Is Inhospitable and So Are We', year: 2023, genre: 'Indie Rock', hook: 'Folk orquestal desgarrador y hermoso', price: 75000, status: 'available' },
  { id: 74, band: 'Molchat Doma', album: 'Belaya Polosa', year: 2024, genre: 'Post-Punk', hook: 'Post-punk soviético oscuro y adictivo', price: 75000, status: 'available' },
  { id: 75, band: 'Motley Crue', album: 'Dr. Feelgood', year: 1989, genre: 'Hard Rock', hook: 'Glam metal en su punto más comercial', price: 50000, status: 'available' },
  { id: 76, band: 'Motorhead', album: 'Ace of Spades', year: 1980, genre: 'Heavy Metal', hook: 'El riff más rápido del rock and roll', price: 75000, status: 'available' },
  { id: 77, band: 'My Chemical Romance', album: 'The Black Parade', year: 2006, genre: 'Alternative Rock', hook: 'Ópera punk que marcó una generación', price: 75000, status: 'sold' },
  { id: 78, band: 'Nation of Language', album: 'Strange Disciple', year: 2021, genre: 'Post-Punk', hook: 'Synth-wave moderno con alma post-punk', price: 75000, status: 'available' },
  { id: 79, band: 'New Kids on the Block', album: 'New Kids on the Block', year: 1986, genre: 'Pop', hook: 'Nostalgia ochentera pura y sin vergüenza', price: 25000, status: 'available' },
  { id: 80, band: 'Nirvana', album: 'Incesticide', year: 1992, genre: 'Grunge', hook: 'B-sides y rarezas del rey del grunge', price: 75000, status: 'available' },
  { id: 81, band: 'No Pressure', album: 'No Pressure', year: 2021, genre: 'Hardcore Punk', hook: 'Hardcore melódico rápido del nuevo school', price: 75000, status: 'available' },
  { id: 82, band: 'No Use for a Name', album: 'Making Friends', year: 1997, genre: 'Punk Rock', hook: 'Skate punk emotivo de Fat Wreck perfecto', price: 75000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 83, band: 'No Use for a Name', album: 'Rarities Vol.1: The Covers', year: 2018, genre: 'Punk Rock', hook: 'Tony Slay versionando clásicos con corazón', price: 75000, status: 'available' },
  { id: 84, band: 'No Use for a Name', album: 'Rarities Vol.2: The Originals', year: 2018, genre: 'Punk Rock', hook: 'Demos y rarezas inéditas de Tony Sly', price: 75000, status: 'available' },
  { id: 85, band: 'No Use for a Name', album: 'The Feel Good Record of the Year', year: 2008, genre: 'Punk Rock', hook: 'El último gran disco de Tony Sly', price: 75000, status: 'sold' },
  { id: 86, band: 'No Use for a Name', album: 'Leche con Carne', year: 1995, genre: 'Punk Rock', hook: 'Punk melódico californiano en su mejor forma', price: 75000, status: 'sold' },
  { id: 87, band: 'NOFX', album: 'The Decline', year: 1999, genre: 'Punk Rock', hook: '18 minutos de punk perfecto en una canción', price: 75000, status: 'available' },
  { id: 88, band: 'NOFX', album: 'Ribbed - Live in a Dive', year: 2018, genre: 'Punk Rock', hook: 'Ribbed tocado en vivo como Dios manda', price: 75000, status: 'available' },
  { id: 89, band: 'NOFX', album: 'Ribbed', year: 1991, genre: 'Punk Rock', hook: 'El salto al skate punk técnico de NOFX', price: 75000, status: 'available' },
  { id: 90, band: 'NOFX', album: 'Frisbee', year: 2009, genre: 'Punk Rock', hook: 'NOFX experimental y subestimado', price: 75000, status: 'available' },
  { id: 91, band: 'NOFX', album: 'White Trash, Two Heebs and a Bean', year: 1992, genre: 'Punk Rock', hook: 'Punk multicultural con humor negro brutal', price: 75000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 92, band: 'NOFX', album: 'I Heard They Suck Live!!', year: 1995, genre: 'Punk Rock', hook: 'En vivo caótico y gloriosamente desafinado', price: 75000, status: 'available' },
  { id: 93, band: 'NOFX', album: 'West Coast vs Wessex', year: 2020, genre: 'Punk Rock', hook: 'NOFX + The Damned en un split legendario', price: 75000, status: 'available' },
  { id: 94, band: 'NOFX', album: 'Self/Entitled', year: 2012, genre: 'Punk Rock', hook: 'Fat Mike maduro y todavía irreverente', price: 75000, status: 'available' },
  { id: 95, band: 'NOFX', album: 'First Ditch Effort', year: 2016, genre: 'Punk Rock', hook: 'NOFX confesional y sorprendentemente serio', price: 75000, status: 'available' },
  { id: 96, band: 'NOFX', album: 'S&M Airlines', year: 1989, genre: 'Punk Rock', hook: 'Punk veloz pre-fama de Fat Wreck', price: 75000, status: 'available' },
  { id: 97, band: 'NOFX', album: 'Maximum Rock and Roll', year: 2018, genre: 'Punk Rock', hook: 'Punk rock de estadio por los anti-estadio', price: 75000, status: 'available' },
  { id: 98, band: 'NOFX', album: 'Single Album', year: 2021, genre: 'Punk Rock', hook: 'El penúltimo acto de la mejor banda punk', price: 75000, status: 'available' },
  { id: 99, band: 'NOFX', album: 'Double Album', year: 2022, genre: 'Punk Rock', hook: 'Doble LP de despedida antes del final', price: 75000, status: 'available' },
  { id: 100, band: 'NOFX', album: 'The Longest Line', year: 1992, genre: 'Punk Rock', hook: 'EP clásico con Linoleum original', price: 75000, status: 'available' },
  { id: 101, band: 'NOFX', album: 'Liberal Animation', year: 1988, genre: 'Punk Rock', hook: 'El debut crudo donde todo empezó', price: 75000, status: 'available' },
  { id: 102, band: 'NOFX', album: 'Half Album', year: 2024, genre: 'Punk Rock', hook: 'Las últimas grabaciones de NOFX', price: 75000, status: 'available' },
  { id: 103, band: 'NOFX', album: "Wolves in Wolves' Clothing", year: 2006, genre: 'Punk Rock', hook: 'NOFX político y furioso post-Bush', price: 75000, status: 'available' },
  { id: 104, band: 'NOFX', album: 'Surfer', year: 2008, genre: 'Punk Rock', hook: 'EP de NOFX veloz y directo, puro Fat Wreck', price: 25000, status: 'available' },
  { id: 105, band: 'NOFX', album: 'Liza and Louise', year: 1990, genre: 'Punk Rock', hook: 'EP temprano con punk rápido y sucio', price: 25000, status: 'available' },
  { id: 106, band: 'NOFX', album: 'The P.M.R.C. Can Suck on This', year: 1989, genre: 'Punk Rock', hook: 'Contra la censura: punk en 7 pulgadas', price: 25000, status: 'available' },
  { id: 107, band: 'NOFX', album: 'Never Trust a Hippy', year: 2006, genre: 'Punk Rock', hook: 'EP punk con la acidez clásica de Fat Mike', price: 50000, status: 'available' },
  { id: 108, band: 'NOFX', album: 'Hardcore 84', year: 2024, genre: 'Hardcore Punk', hook: 'NOFX volviendo al hardcore de sus inicios', price: 50000, status: 'available' },
  { id: 109, band: 'NOFX', album: 'Fuck the Kids', year: 1996, genre: 'Punk Rock', hook: '7" donde Fat Mike odia a los niños', price: 25000, status: 'available' },
  { id: 110, band: 'Oxymoron', album: "Fuck the Nineties… Here's Our Noize", year: 1996, genre: 'Punk Rock', hook: 'Street punk alemán crudo y ruidoso', price: 50000, status: 'sold' },
  { id: 114, band: 'Radiohead', album: 'KID A MNESIA', year: 2000, genre: 'Alternative Rock', hook: 'Kid A + Amnesiac: la revolución completa', price: 125000, status: 'available' },
  { id: 115, band: 'Rammstein', album: 'Herzeleid', year: 1995, genre: 'Industrial Metal', hook: 'El debut industrial que asustó a Alemania', price: 125000, status: 'available' },
  { id: 116, band: 'Rammstein', album: 'Liebe Ist Für Alle Da', year: 2009, genre: 'Industrial Metal', hook: 'Metal industrial pesado y provocador', price: 125000, status: 'available' },
  { id: 117, band: 'Ramones', album: 'Leave Home', year: 1977, genre: 'Punk Rock', hook: 'Segundo disco de los inventores del punk', price: 50000, status: 'sold' },
  { id: 118, band: 'Scowl', album: 'Psychic Dance Routine', year: 2021, genre: 'Hardcore Punk', hook: 'Hardcore furioso en menos de 15 minutos', price: 75000, status: 'available' },
  { id: 119, band: 'Scowl', album: 'How Flowers Grow', year: 2023, genre: 'Hardcore Punk', hook: 'Hardcore con alma pop y energía femenina', price: 75000, status: 'available' },
  { id: 120, band: 'Sextile', album: 'Push', year: 2020, genre: 'Post-Punk', hook: 'Electro-punk oscuro de Los Ángeles', price: 75000, status: 'available' },
  { id: 121, band: 'Six Feet Under', album: 'Death Rituals', year: 2008, genre: 'Death Metal', hook: 'Death metal groove pesado y directo', price: 75000, status: 'available' },
  { id: 122, band: 'Six Feet Under', album: 'Nightmares of the Decomposed', year: 2020, genre: 'Death Metal', hook: 'Chris Barnes en modo muerte total', price: 75000, status: 'available' },
  { id: 123, band: 'Six Feet Under', album: 'Graveyard Classics III', year: 2010, genre: 'Death Metal', hook: 'Covers de rock hechos death metal', price: 75000, status: 'available' },
  { id: 124, band: 'Slayer', album: 'Repentless (6.66 Inches)', year: 2015, genre: 'Thrash Metal', hook: 'Slayer en vinilo de 6.66 pulgadas', price: 100000, status: 'available' },
  { id: 125, band: 'Slint', album: 'Tweez', year: 1989, genre: 'Post-Rock', hook: 'El inicio del post-rock en Louisville', price: 75000, status: 'available' },
  { id: 126, band: 'Slipknot', album: 'We Are Not Your Kind', year: 2019, genre: 'Nu Metal', hook: 'Slipknot maduro, pesado y experimental', price: 75000, status: 'available' },
  { id: 127, band: 'Slipknot', album: 'The End for Now…', year: 2022, genre: 'Nu Metal', hook: 'El cierre de una era para los nueve', price: 75000, status: 'available' },
  { id: 128, band: 'Slipknot', album: 'Vol. 3: The Subliminal Verses', year: 2004, genre: 'Nu Metal', hook: 'Slipknot melódico sin perder brutalidad', price: 100000, status: 'sold', soldTo: 'Santi NOFX' },
  { id: 129, band: 'Slipknot', album: '.5: The Gray Chapter', year: 2014, genre: 'Nu Metal', hook: 'Duelo convertido en rabia pura', price: 100000, status: 'available' },
  { id: 130, band: 'Slipknot', album: 'All Out Life / Unsainted', year: 2019, genre: 'Nu Metal', hook: 'Singles pesados en 7 pulgadas', price: 25000, status: 'available' },
  { id: 131, band: 'Slipknot', album: 'Day of the Gusano - Live in Mexico', year: 2017, genre: 'Nu Metal', hook: 'Slipknot en vivo en México, energía brutal', price: 175000, status: 'available' },
  { id: 132, band: 'Soda Stereo', album: 'Cancion Animal', year: 1990, genre: 'Alternative Rock', hook: 'El disco perfecto del rock en español', price: 75000, status: 'available' },
  { id: 133, band: 'Soundgarden', album: 'Badmotorfinger', year: 1991, genre: 'Grunge', hook: 'Grunge pesado con riffs imposibles', price: 75000, status: 'available' },
  { id: 134, band: 'Soundgarden', album: 'Superunknown', year: 1994, genre: 'Grunge', hook: 'La obra maestra del grunge: Black Hole Sun y más', price: 100000, status: 'available' },
  { id: 135, band: 'Sudden Impact', album: 'Freaked Out', year: 1984, genre: 'Punk Rock', hook: 'Punk californiano old school veloz', price: 25000, status: 'available' },
  { id: 136, band: 'Superjoint Ritual', album: 'Caught Up in the Gears of Application', year: 2016, genre: 'Sludge Metal', hook: 'Phil Anselmo en modo sludge violento', price: 75000, status: 'available' },
  { id: 137, band: 'System of a Down', album: 'Steal This Album!', year: 2002, genre: 'Nu Metal', hook: 'B-sides que son mejores que muchos discos', price: 75000, status: 'available' },
  { id: 138, band: 'System of a Down', album: 'Toxicity', year: 2001, genre: 'Nu Metal', hook: 'Metal armenio que redefinió el nu metal', price: 75000, status: 'available' },
  { id: 140, band: 'System of a Down', album: 'Hypnotize', year: 2005, genre: 'Nu Metal', hook: 'Segunda parte del dúo perfecto de SOAD', price: 75000, status: 'available' },
  { id: 141, band: 'System of a Down', album: 'System of a Down', year: 1998, genre: 'Nu Metal', hook: 'El debut caótico que rompió las reglas', price: 75000, status: 'available' },
  { id: 142, band: 'The Breeders', album: 'Title TK', year: 2002, genre: 'Alternative Rock', hook: 'Indie rock lo-fi de las hermanas Deal', price: 75000, status: 'available' },
  { id: 143, band: 'The Cure', album: 'Seventeen Seconds', year: 1980, genre: 'Post-Punk', hook: 'Post-punk atmosférico antes del gótico', price: 75000, status: 'available' },
  { id: 145, band: 'The Dickies', album: 'Live When They Were Five - City Gardens 1982', year: 1982, genre: 'Punk Rock', hook: 'Punk cómico y veloz en vivo en los 80s', price: 75000, status: 'available' },
  { id: 146, band: 'The Reflektors', album: 'The Reflektors', year: 2013, genre: 'Indie Rock', hook: 'Arcade Fire en modo disco-punk bailable', price: 50000, status: 'available' },
  { id: 147, band: 'The Smile', album: 'Cutouts', year: 2024, genre: 'Alternative Rock', hook: 'Thom Yorke y Jonny en modo libre', price: 75000, status: 'available' },
  { id: 148, band: 'The Smile', album: 'Wall of Eyes', year: 2024, genre: 'Alternative Rock', hook: 'Post-Radiohead elegante y minimalista', price: 75000, status: 'available' },
  { id: 149, band: 'Todos Tus Muertos', album: 'Dale Aborigen', year: 1994, genre: 'Punk Rock', hook: 'Punk argentino con reggae y raíces', price: 100000, status: 'available' },
  { id: 150, band: 'Tomb Mold', album: 'Manor of Infinite Forms', year: 2018, genre: 'Death Metal', hook: 'Death metal cavernoso y aplastante', price: 75000, status: 'available' },
  { id: 151, band: 'Tyler the Creator', album: 'Goblin', year: 2011, genre: 'Hip-Hop', hook: 'Rap oscuro y perturbador de Odd Future', price: 75000, status: 'available' },
  { id: 152, band: 'Type O Negative', album: 'The Origin of the Feces', year: 1992, genre: 'Gothic Metal', hook: 'Metal gótico con humor negro extremo', price: 75000, status: 'available' },
  { id: 153, band: 'Type O Negative', album: 'Life Is Killing Me (20th Anniversary)', year: 2003, genre: 'Gothic Metal', hook: 'Doom romántico edición aniversario', price: 150000, status: 'available' },
  { id: 154, band: 'Type O Negative', album: 'Dead Again', year: 2007, genre: 'Gothic Metal', hook: 'El último rugido de Peter Steele', price: 100000, status: 'available' },
  { id: 155, band: 'Type O Negative', album: 'Bloody Kisses', year: 1993, genre: 'Gothic Metal', hook: 'Doom gótico sensual y aplastante', price: 75000, status: 'available' },
  { id: 156, band: 'Weezer', album: 'Red Album', year: 2008, genre: 'Alternative Rock', hook: 'Weezer experimental con Pork and Beans', price: 75000, status: 'available' },
  { id: 158, band: 'Zulu', album: 'A New Tomorrow', year: 2023, genre: 'Hardcore Punk', hook: 'Power violence con alma Black Power', price: 25000, status: 'available' },
];

// Helper to format COP price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getBands(): string[] {
  const bands = [...new Set(catalog.map(r => r.band))];
  return bands.sort();
}

export function getGenres(): string[] {
  const genres = [...new Set(catalog.map(r => r.genre))];
  return genres.sort();
}

export function getCatalogStats() {
  const available = catalog.filter(r => r.status === 'available');
  const sold = catalog.filter(r => r.status === 'sold');
  const reserved = catalog.filter(r => r.status === 'reserved');
  const totalValue = available.reduce((sum, r) => sum + r.price, 0);
  return {
    total: catalog.length,
    available: available.length,
    sold: sold.length,
    reserved: reserved.length,
    totalValue,
  };
}

export function getPriceRanges() {
  return [
    { label: 'Hasta $25.000', min: 0, max: 25000 },
    { label: '$25.000 - $50.000', min: 25000, max: 50000 },
    { label: '$50.000 - $75.000', min: 50000, max: 75000 },
    { label: 'Más de $75.000', min: 75000, max: Infinity },
  ];
}
