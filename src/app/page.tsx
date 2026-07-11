'use client';

import { useState, useMemo } from 'react';
import { catalog, formatPrice, getBands, getCatalogStats, getGenres } from '@/data/vinyl-catalog';
import type { VinylRecord } from '@/data/vinyl-catalog';

const WHATSAPP_NUMBER = '573045606298';

function VinylCard({ record }: { record: VinylRecord }) {
  const whatsappMsg = encodeURIComponent(
    `🎸 Hey! Me interesa:\n\n*${record.band}* — ${record.album}\nPrecio: ${formatPrice(record.price)}\n\n¿Disponible?`
  );
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${record.band} ${record.album} full album`)}`;

  return (
    <div className="vinyl-card">
      {/* Band + Album + Year - clean, no photos */}
      <div className="p-4 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-fat-gold/80 font-bold uppercase tracking-wider">{record.genre}</span>
          <span className="text-[11px] text-white/30">{record.year}</span>
        </div>
        <h3 className="text-white text-lg font-bold mt-2 leading-tight">
          {record.band}
        </h3>
        <p className="text-fat-gold text-base font-bold uppercase leading-tight mt-1">
          {record.album}
        </p>
      </div>

      {/* Actions - compact */}
      <div className="p-4 pt-3 flex items-center justify-between gap-2">
        <span className="price-sticker">{formatPrice(record.price)}</span>
        <div className="flex items-center gap-2">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-fat-red transition-colors"
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
      {/* HEADER — Glitch Logo */}
      <header className="bg-fat-black py-10 px-4 text-center border-b-2 border-fat-red overflow-hidden">
        <h1 className="punk-title text-5xl md:text-7xl glitch-logo">
          NOFXLAND
        </h1>
        <p className="text-white/50 mt-3 text-base font-bold tracking-wider">
          {stats.available} DISCOS DISPONIBLES
        </p>
      </header>

      {/* FILTERS */}
      <section className="sticky top-0 z-50 bg-fat-black/95 backdrop-blur px-4 py-3 border-b border-fat-gray">
        <div className="max-w-6xl mx-auto space-y-2">
          <input
            type="text"
            placeholder="🔍 Buscar banda o álbum..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-fat-dark border border-fat-gray text-white px-4 py-3 text-base rounded focus:outline-none focus:border-fat-gold placeholder:text-white/30"
          />
          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedBand}
              onChange={e => { setSelectedBand(e.target.value); setSelectedGenre('all'); }}
              className="flex-1 min-w-[120px] bg-fat-dark border border-fat-gray text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-fat-gold"
            >
              <option value="all">Todas las bandas</option>
              {bands.map(band => (
                <option key={band} value={band}>{band}</option>
              ))}
            </select>
            <select
              value={selectedGenre}
              onChange={e => { setSelectedGenre(e.target.value); setSelectedBand('all'); }}
              className="flex-1 min-w-[120px] bg-fat-dark border border-fat-gray text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-fat-gold"
            >
              <option value="all">Todos los géneros</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-fat-dark border border-fat-gray text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-fat-gold"
            >
              <option value="band">A-Z</option>
              <option value="price-asc">$ ↑</option>
              <option value="price-desc">$ ↓</option>
            </select>
            <span className="flex items-center text-fat-gold font-bold text-sm px-2">
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
      <footer className="bg-fat-black border-t border-fat-gray py-8 px-4 text-center">
        <p className="text-white/30 text-sm">
          NOFXLAND — Medellín, Colombia
        </p>
        <p className="text-white/20 text-xs mt-2">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-fat-green hover:underline">
            WhatsApp: 304 560 6298
          </a>
        </p>
      </footer>
    </main>
  );
}
