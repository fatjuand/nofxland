'use client';

import { useState, useMemo } from 'react';
import { catalog, formatPrice, getBands, getCatalogStats, getGenres } from '@/data/vinyl-catalog';
import type { VinylRecord } from '@/data/vinyl-catalog';
import coverUrls from '@/data/cover-urls.json';

const WHATSAPP_NUMBER = '573045606298';

const coverUrlMap = coverUrls as Record<string, string | null>;

function AlbumCover({ record }: { record: VinylRecord }) {
  const url = coverUrlMap[String(record.id)];

  if (url) {
    return (
      <div className="aspect-square w-full overflow-hidden bg-nofx-gray">
        <img
          src={url}
          alt={`${record.band} — ${record.album}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Skull placeholder when no cover is available
  return (
    <div className="aspect-square w-full overflow-hidden bg-nofx-gray flex items-center justify-center">
      <img
        src="/skull.svg"
        alt=""
        className="w-16 h-16 opacity-20 invert"
      />
    </div>
  );
}

function VinylCard({ record }: { record: VinylRecord }) {
  const whatsappMsg = encodeURIComponent(
    `🎸 Hey! Me interesa:\n\n*${record.band}* — ${record.album}\nPrecio: ${formatPrice(record.price)}\n\n¿Disponible?`
  );
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${record.band} ${record.album} full album`)}`;

  return (
    <div className="vinyl-card">
      {/* Album Cover */}
      <AlbumCover record={record} />

      {/* Band + Album + Year */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] text-nofx-pink font-semibold uppercase tracking-wider">{record.genre}</span>
          <span className="text-[11px] text-nofx-green/40">{record.year}</span>
        </div>
        <h3 className="text-nofx-green text-base font-bold leading-tight">
          {record.band}
        </h3>
        <p className="text-white text-sm leading-tight mt-1">
          {record.album}
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2">
        <span className="price-sticker">{formatPrice(record.price)}</span>
        <div className="flex items-center gap-2">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-nofx-purple/50 rounded-full flex items-center justify-center hover:bg-nofx-green transition-colors"
            title="Escuchar"
          >
            <span className="text-white text-sm ml-0.5">▶</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            QUIERO
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedBand, setSelectedBand] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'band' | 'price-asc' | 'price-desc'>('band');

  const bands = useMemo(() => getBands(), []);
  const genres = useMemo(() => getGenres(), []);
  const stats = useMemo(() => getCatalogStats(), []);

  const filtered = useMemo(() => {
    let results = [...catalog].filter(v => {
      if (v.status === 'sold') return false;
      if (selectedBand !== 'all' && v.band !== selectedBand) return false;
      if (selectedGenre !== 'all' && v.genre !== selectedGenre) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!v.band.toLowerCase().includes(q) && !v.album.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    results.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.band.localeCompare(b.band) || a.album.localeCompare(b.album);
    });

    return results;
  }, [search, selectedBand, selectedGenre, sortBy]);

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <header className="py-10 px-4 text-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #2d1b4e 0%, #1a1028 60%, #1a1a28 100%)' }}>
        {/* Diagonal punk stripes */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(127,255,0,0.3) 20px, rgba(127,255,0,0.3) 22px)' }}></div>

        {/* Skulls */}
        <div className="absolute top-3 left-3 w-8 h-8 skull-decoration opacity-30">
          <img src="/skull.svg" alt="" className="w-full h-full invert" />
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 skull-decoration opacity-30" style={{ animationDelay: '1.5s' }}>
          <img src="/skull.svg" alt="" className="w-full h-full invert" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <h1 className="glitch-logo text-6xl md:text-8xl tracking-tight" style={{ fontFamily: "'Permanent Marker', cursive" }}>
            NOFX
          </h1>
          <span className="text-nofx-pink text-2xl md:text-3xl font-bold tracking-[0.4em] block mt-1 drop-shadow-lg" style={{ fontFamily: "'Permanent Marker', cursive" }}>
            LAND
          </span>
        </div>
        <p className="text-white/60 mt-4 text-sm tracking-wider relative z-10">
          Vinilos de segunda mano — Medellín
        </p>
        <p className="text-nofx-green font-bold mt-1 text-lg relative z-10">
          {stats.available} discos disponibles
        </p>
      </header>

      {/* FILTERS */}
      <section className="sticky top-0 z-50 bg-nofx-black/95 backdrop-blur px-4 py-3 border-b border-nofx-purple/50">
        <div className="max-w-6xl mx-auto space-y-2">
          <input
            type="text"
            placeholder="🔍 Buscar banda o álbum..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-nofx-gray border border-nofx-purple/50 text-white px-4 py-3 text-base rounded focus:outline-none focus:border-nofx-green placeholder:text-white/30"
          />
          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedBand}
              onChange={e => { setSelectedBand(e.target.value); setSelectedGenre('all'); }}
              className="flex-1 min-w-[120px] bg-nofx-gray border border-nofx-purple/50 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-nofx-green"
            >
              <option value="all">Todas las bandas</option>
              {bands.map(band => (
                <option key={band} value={band}>{band}</option>
              ))}
            </select>
            <select
              value={selectedGenre}
              onChange={e => { setSelectedGenre(e.target.value); setSelectedBand('all'); }}
              className="flex-1 min-w-[120px] bg-nofx-gray border border-nofx-purple/50 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-nofx-green"
            >
              <option value="all">Todos los géneros</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-nofx-gray border border-nofx-purple/50 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-nofx-green"
            >
              <option value="band">A-Z</option>
              <option value="price-asc">$ ↑</option>
              <option value="price-desc">$ ↓</option>
            </select>
            <span className="flex items-center text-nofx-green font-bold text-sm px-2">
              {filtered.length}
            </span>
          </div>
        </div>
      </section>

      {/* CATALOG GRID */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎸</div>
            <p className="text-white text-xl font-bold">No hay resultados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(record => (
              <VinylCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-nofx-black border-t border-nofx-purple py-8 px-4 text-center relative">
        <div className="w-8 h-8 mx-auto mb-3 skull-decoration opacity-50">
          <img src="/skull.svg" alt="" className="w-full h-full invert brightness-200 hue-rotate-[80deg]" />
        </div>
        <p className="text-nofx-green/40 text-sm">
          NOFXLAND — Medellín
        </p>
        <p className="text-nofx-pink/30 text-xs mt-2">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-nofx-pink">
            WhatsApp: 304 560 6298
          </a>
        </p>
      </footer>
    </main>
  );
}
