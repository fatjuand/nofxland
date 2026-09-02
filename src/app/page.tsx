'use client';

import { useState, useMemo } from 'react';
import { catalog, formatPrice, getBands, getCatalogStats, getGenres } from '@/data/vinyl-catalog';
import type { VinylRecord } from '@/data/vinyl-catalog';
import coverUrls from '@/data/cover-urls.json';
import ownCovers from '@/data/own-covers.json';

const WHATSAPP_NUMBER = '573045606298';

const coverUrlMap = coverUrls as Record<string, string | null>;
const ownCoverMap = ownCovers as Record<string, string>;

function AlbumCover({ record }: { record: VinylRecord }) {
  // Priority: your own photo (public/covers/{id}.jpg) > API-fetched cover > placeholder.
  // Own photos always match the exact physical record you're selling.
  const url = ownCoverMap[String(record.id)] ?? coverUrlMap[String(record.id)];

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
      <div className="p-4 pt-0">
        {/* Price row */}
        <div className="price-block">
          <div className="price-now-row">
            <span className="price-now-label">🔥 PRECIO</span>
            <span className="price-sticker">{formatPrice(record.price)}</span>
          </div>
        </div>
        {/* Buttons row */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 mt-3">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 transition-colors rounded-full px-3 py-2 flex-1 w-full"
            title="Escuchar en YouTube antes de comprar"
          >
            <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span className="text-white text-[10px] font-bold uppercase leading-none whitespace-nowrap">Escuchar</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn inline-flex items-center justify-center gap-2 flex-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
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
      // If user is typing in search, only apply text filter (ignore dropdowns)
      if (search.trim() && search.trim().toLowerCase() !== 'todas' && search.trim().toLowerCase() !== 'todos') {
        const q = search.trim().toLowerCase();
        return v.band.toLowerCase().includes(q) || v.album.toLowerCase().includes(q);
      }
      // If no search text, apply dropdown filters
      if (selectedBand !== 'all' && v.band !== selectedBand) return false;
      if (selectedGenre !== 'all' && v.genre !== selectedGenre) return false;
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
      <header className="py-4 px-4 text-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #2d1b4e 0%, #1a1028 60%, #1a1028 100%)' }}>
        {/* Diagonal punk stripes */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(127,255,0,0.3) 20px, rgba(127,255,0,0.3) 22px)' }}></div>

        {/* Skulls - more visible */}
        <div className="absolute top-2 left-2 w-8 h-8 skull-decoration opacity-70">
          <img src="/skull.svg" alt="" className="w-full h-full" style={{ filter: 'invert(1) brightness(2) drop-shadow(0 0 4px rgba(127,255,0,0.6))' }} />
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 skull-decoration opacity-70" style={{ animationDelay: '1.5s' }}>
          <img src="/skull.svg" alt="" className="w-full h-full" style={{ filter: 'invert(1) brightness(2) drop-shadow(0 0 4px rgba(127,255,0,0.6))' }} />
        </div>

        {/* Logo - compact */}
        <div className="relative z-10">
          <h1 className="glitch-logo text-4xl md:text-7xl tracking-tight" style={{ fontFamily: "'Permanent Marker', cursive" }}>
            NOFX
          </h1>
          <span className="text-nofx-pink text-lg md:text-2xl font-bold tracking-[0.4em] block" style={{ fontFamily: "'Permanent Marker', cursive" }}>
            LAND
          </span>
        </div>
        <p className="text-white/50 mt-1 text-xs tracking-wider relative z-10">
          Vinilos de segunda mano — Medellín
        </p>
        <p className="text-nofx-green font-bold text-sm relative z-10">
          {stats.available} discos
        </p>
      </header>

      {/* FILTERS */}
      <section className="sticky top-0 z-50 bg-nofx-black/95 backdrop-blur px-4 py-3 border-b border-nofx-purple/50">
        <div className="max-w-6xl mx-auto space-y-2">
          {/* Search - iOS style with clear button */}
          <div className="relative">
            <div className="flex items-center bg-white/95 rounded-2xl px-4 py-3 gap-3 shadow-lg">
              <span className="text-lg text-gray-400">🔍</span>
              <input
                type="search"
                placeholder="Buscar banda o álbum..."
                value={search}
                onChange={e => { setSearch(e.target.value); setSelectedBand('all'); setSelectedGenre('all'); }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="flex-1 bg-transparent text-black text-base outline-none placeholder:text-gray-400 min-w-0"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full flex-shrink-0 active:bg-gray-400 transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <span className="text-gray-600 text-sm font-bold">✕</span>
                </button>
              )}
            </div>
          </div>
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
