'use client';

import { useState, useMemo } from 'react';
import { catalog, formatPrice, getBands, getCatalogStats } from '@/data/vinyl-catalog';
import { hasSpotifyEmbed, getSpotifyEmbedUrl } from '@/data/spotify-ids';
import type { VinylRecord } from '@/data/vinyl-catalog';

const WHATSAPP_NUMBER = '573045606298';

function SpotifyPreview({ band, album, catalogId, onClose }: { band: string; album: string; catalogId: number; onClose: () => void }) {
  const embedUrl = getSpotifyEmbedUrl(catalogId);
  
  // Clean album name for Spotify search fallback
  const cleanAlbum = album
    .replace(/[…]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[.!?]/g, '')
    .replace(/'/g, '')
    .trim();
  const searchQuery = encodeURIComponent(`${band} ${cleanAlbum}`);
  const spotifySearchLink = `https://open.spotify.com/search/${searchQuery}`;

  return (
    <div className="mt-3 border-2 border-punk-yellow/50 bg-punk-dark-gray relative">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 z-10 bg-punk-red text-white w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-punk-black hover:bg-punk-yellow hover:text-punk-black"
        aria-label="Cerrar preview"
      >
        ✕
      </button>
      
      {embedUrl ? (
        // Real Spotify embed with 30s preview!
        <>
          <iframe
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-none"
            title={`Preview: ${band} - ${album}`}
          />
          <div className="px-2 py-1 text-[10px] font-mono text-punk-cream/30 text-center">
            ▶ 30s preview — Powered by Spotify
          </div>
        </>
      ) : (
        // Fallback: link to Spotify search
        <a
          href={spotifySearchLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 hover:bg-punk-gray/50 transition-colors group"
        >
          <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-punk-cream text-xs font-mono truncate">
              Escuchar <span className="text-punk-yellow font-bold">{band}</span>
            </div>
            <div className="text-punk-cream/50 text-[10px] font-mono truncate">
              {album} — Abrir en Spotify
            </div>
          </div>
          <div className="text-punk-green text-lg group-hover:scale-110 transition-transform">
            ▶
          </div>
        </a>
      )}
    </div>
  );
}

function AlbumCover({ band, album, id }: { band: string; album: string; id: number }) {
  const [hasImage, setHasImage] = useState(true);
  const imgSrc = `/covers/${id}.jpg`;

  if (!hasImage) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-punk-dark-gray p-3 text-center">
        <div className="text-5xl mb-2">💀</div>
        <div className="text-[10px] text-punk-yellow/60 font-mono uppercase leading-tight">
          {band}
        </div>
        <div className="text-[9px] text-punk-cream/40 font-mono mt-1 leading-tight">
          {album}
        </div>
        <div className="mt-2 text-xs text-punk-yellow/30 font-mono">#{id.toString().padStart(3, '0')}</div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={`${band} - ${album}`}
      className="w-full h-full object-cover"
      onError={() => setHasImage(false)}
    />
  );
}

function WhatsAppLink({ record }: { record: VinylRecord }) {
  const message = encodeURIComponent(
    `🎸 Hey! Me interesa el vinilo:\n\n*${record.band}* — ${record.album}\nPrecio: ${formatPrice(record.price)}\n\n¿Está disponible?`
  );
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn px-3 py-2 text-xs inline-flex items-center gap-1"
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      QUIERO
    </a>
  );
}

function VinylCard({ record, index }: { record: VinylRecord; index: number }) {
  const isSold = record.status === 'sold';
  const [showPreview, setShowPreview] = useState(false);
  const hasEmbed = hasSpotifyEmbed(record.id);

  return (
    <div
      className={`vinyl-card relative bg-punk-gray border-2 border-punk-yellow/30 p-4 animate-punk-in ${isSold ? 'opacity-50' : ''}`}
      style={{ animationDelay: `${Math.min(index * 30, 500)}ms` }}
    >
      {/* Sold stamp */}
      {isSold && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 z-10">
          <span className="font-[Impact] text-4xl text-punk-red border-4 border-punk-red px-4 py-1 tracking-wider">
            SOLD!
          </span>
        </div>
      )}

      {/* Cover */}
      <div className="aspect-square bg-punk-dark-gray border border-punk-yellow/20 mb-3 flex items-center justify-center overflow-hidden relative group">
        <AlbumCover band={record.band} album={record.album} id={record.id} />
        
        {/* Play preview overlay */}
        {!isSold && (
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label={`Preview ${record.band} - ${record.album}`}
          >
            <div className="w-14 h-14 rounded-full bg-punk-green flex items-center justify-center border-3 border-punk-black shadow-lg">
              {showPreview ? (
                <span className="text-punk-black font-bold text-lg">■</span>
              ) : (
                <span className="text-punk-black font-bold text-xl ml-1">▶</span>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-[Impact] text-punk-yellow text-lg uppercase leading-tight tracking-wide truncate">
          {record.band}
        </h3>
        <p className="text-punk-cream/80 text-sm font-mono truncate" title={record.album}>
          {record.album}
        </p>
      </div>

      {/* Spotify Preview */}
      {showPreview && (
        <SpotifyPreview
          band={record.band}
          album={record.album}
          catalogId={record.id}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Price + Actions */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="price-sticker text-sm">
          {formatPrice(record.price)}
        </span>
        <div className="flex items-center gap-1">
          {!isSold && (
            <>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-2 py-2 text-xs border-2 font-mono font-bold transition-colors ${
                  showPreview
                    ? 'bg-punk-green text-punk-black border-punk-green'
                    : 'bg-transparent text-punk-green border-punk-green/50 hover:border-punk-green hover:bg-punk-green/10'
                }`}
                title={hasEmbed ? "Escuchar 30s preview" : "Buscar en Spotify"}
              >
                {showPreview ? '■' : '▶'}
                {hasEmbed && !showPreview && <span className="ml-1 text-[8px]">30s</span>}
              </button>
              <WhatsAppLink record={record} />
            </>
          )}
        </div>
      </div>

      {isSold && record.soldTo && (
        <div className="mt-2 text-xs text-punk-red font-mono">
          → {record.soldTo}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedBand, setSelectedBand] = useState<string>('all');
  const [showSold, setShowSold] = useState(false);
  const [sortBy, setSortBy] = useState<'band' | 'price-asc' | 'price-desc'>('band');

  const bands = useMemo(() => getBands(), []);
  const stats = useMemo(() => getCatalogStats(), []);

  const filtered = useMemo(() => {
    let results = catalog.filter(v => {
      if (search) {
        const q = search.toLowerCase();
        if (!v.band.toLowerCase().includes(q) && !v.album.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (selectedBand !== 'all' && v.band !== selectedBand) return false;
      if (!showSold && v.status === 'sold') return false;
      return true;
    });

    results.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.band.localeCompare(b.band) || a.album.localeCompare(b.album);
    });

    return results;
  }, [search, selectedBand, showSold, sortBy]);

  return (
    <main className="min-h-screen">
      {/* HEADER — NOFXLAND */}
      <header className="border-b-4 border-punk-yellow py-8 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,215,0,0.1) 35px, rgba(255,215,0,0.1) 70px)`
          }}/>
        </div>

        <h1 className="punk-title text-5xl md:text-7xl text-punk-yellow relative">
          NOFXLAND
        </h1>
        <p className="font-mono text-punk-cream/60 mt-2 text-sm md:text-base relative">
          LPs DE SEGUNDA MANO — PRECIO JUSTO — MEDELLÍN 🇨🇴
        </p>
        <p className="font-mono text-punk-red text-xs mt-1 relative">
          &quot;Dedicated to NOFX — the greatest band that ever sucked&quot;
        </p>

        {/* Stats bar */}
        <div className="mt-6 flex justify-center gap-6 text-xs font-mono relative">
          <span className="text-punk-green">
            ● {stats.available} disponibles
          </span>
          <span className="text-punk-red">
            ● {stats.sold} vendidos
          </span>
          <span className="text-punk-yellow">
            ★ {formatPrice(stats.totalValue)} en stock
          </span>
        </div>

        {/* Spotify CTA */}
        <div className="mt-4 relative">
          <span className="inline-block bg-punk-green/10 border border-punk-green/30 text-punk-green text-xs font-mono px-3 py-1 rounded-none">
            ▶ Hover sobre cualquier disco para escuchar preview de 30s en Spotify
          </span>
        </div>
      </header>

      {/* FILTERS */}
      <section className="sticky top-0 z-50 bg-punk-black/95 backdrop-blur border-b-2 border-punk-yellow/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="🔍 Buscar banda o álbum..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-punk-gray border-2 border-punk-yellow/50 text-punk-cream px-4 py-2 font-mono text-sm focus:outline-none focus:border-punk-yellow placeholder:text-punk-cream/30"
            />
          </div>

          <select
            value={selectedBand}
            onChange={e => setSelectedBand(e.target.value)}
            className="bg-punk-gray border-2 border-punk-yellow/50 text-punk-cream px-3 py-2 font-mono text-sm focus:outline-none focus:border-punk-yellow"
          >
            <option value="all">Todas las bandas</option>
            {bands.map(band => (
              <option key={band} value={band}>{band}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-punk-gray border-2 border-punk-yellow/50 text-punk-cream px-3 py-2 font-mono text-sm focus:outline-none focus:border-punk-yellow"
          >
            <option value="band">A-Z Banda</option>
            <option value="price-asc">Precio ↑</option>
            <option value="price-desc">Precio ↓</option>
          </select>

          <label className="flex items-center gap-2 text-xs font-mono text-punk-cream/60 cursor-pointer">
            <input
              type="checkbox"
              checked={showSold}
              onChange={e => setShowSold(e.target.checked)}
              className="accent-punk-yellow"
            />
            Mostrar vendidos
          </label>

          <span className="text-xs font-mono text-punk-yellow">
            {filtered.length} discos
          </span>
        </div>
      </section>

      {/* CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💀</div>
            <p className="font-[Impact] text-punk-yellow text-2xl uppercase">Nada por acá, punk</p>
            <p className="font-mono text-punk-cream/50 text-sm mt-2">Intenta otra búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((record, i) => (
              <VinylCard key={record.id} record={record} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-punk-yellow py-8 px-4 text-center">
        <div className="font-mono text-xs text-punk-cream/40 space-y-2">
          <p>NOFXLAND — Medellín, Colombia</p>
          <p>Precios justos basados en mercado. No regalamos, no inflamos.</p>
          <p className="text-punk-yellow/60">
            &quot;It&apos;s better to regret something you have done than to regret something you haven&apos;t done&quot; — Fat Mike
          </p>
          <p className="mt-4 text-punk-red">
            ¿Hay un disco que te llamó la atención?{' '}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-punk-yellow"
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
