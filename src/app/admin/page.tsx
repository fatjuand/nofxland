'use client';

import { useState, useMemo } from 'react';
import { catalog, formatPrice, getCatalogStats } from '@/data/vinyl-catalog';
import type { VinylRecord, SaleStatus } from '@/data/vinyl-catalog';

const ADMIN_PASSWORD = 'nofxland2026'; // Simple auth — change this

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localCatalog, setLocalCatalog] = useState<VinylRecord[]>([...catalog]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | SaleStatus>('all');

  // Auth gate
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-punk-black">
        <div className="bg-punk-gray border-2 border-punk-yellow p-8 max-w-sm w-full">
          <h1 className="font-[Impact] text-punk-yellow text-3xl uppercase text-center mb-6">
            🔒 ADMIN ZONE
          </h1>
          <form onSubmit={e => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              setAuthenticated(true);
            } else {
              alert('Contraseña incorrecta, punk.');
            }
          }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña..."
              className="w-full bg-punk-dark-gray border-2 border-punk-yellow/50 text-punk-cream px-4 py-3 font-mono text-sm focus:outline-none focus:border-punk-yellow mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-punk-yellow text-punk-black font-[Impact] text-xl uppercase py-3 border-2 border-punk-black hover:bg-punk-red hover:text-white transition-colors"
            >
              ENTRAR
            </button>
          </form>
        </div>
      </main>
    );
  }

  const stats = useMemo(() => {
    const available = localCatalog.filter(v => v.status === 'available');
    const sold = localCatalog.filter(v => v.status === 'sold');
    const reserved = localCatalog.filter(v => v.status === 'reserved');
    return {
      total: localCatalog.length,
      available: available.length,
      sold: sold.length,
      reserved: reserved.length,
      availableValue: available.reduce((sum, v) => sum + v.price, 0),
      soldValue: sold.reduce((sum, v) => sum + v.price, 0),
    };
  }, [localCatalog]);

  const filtered = useMemo(() => {
    return localCatalog.filter(v => {
      if (search) {
        const q = search.toLowerCase();
        if (!v.band.toLowerCase().includes(q) && !v.album.toLowerCase().includes(q)) return false;
      }
      if (filterStatus !== 'all' && v.status !== filterStatus) return false;
      return true;
    });
  }, [localCatalog, search, filterStatus]);

  const updateStatus = (id: number, status: SaleStatus, soldTo?: string) => {
    setLocalCatalog(prev =>
      prev.map(v => v.id === id ? { ...v, status, soldTo: soldTo || v.soldTo } : v)
    );
  };

  const exportCatalog = () => {
    const data = JSON.stringify(localCatalog, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nofxland-catalog-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-punk-black p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-[Impact] text-punk-yellow text-4xl uppercase">
              NOFXLAND ADMIN
            </h1>
            <p className="font-mono text-punk-cream/50 text-xs">Monitor de ventas</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCatalog}
              className="bg-punk-gray border-2 border-punk-yellow text-punk-yellow font-mono text-xs px-4 py-2 hover:bg-punk-yellow hover:text-punk-black transition-colors"
            >
              📥 EXPORTAR JSON
            </button>
            <a
              href="/"
              className="bg-punk-gray border-2 border-punk-cream/30 text-punk-cream font-mono text-xs px-4 py-2 hover:border-punk-cream transition-colors"
            >
              ← TIENDA
            </a>
          </div>
        </div>

        {/* Stats dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-punk-gray border border-punk-yellow/30 p-4 text-center">
            <div className="font-[Impact] text-3xl text-punk-yellow">{stats.total}</div>
            <div className="font-mono text-xs text-punk-cream/50">TOTAL</div>
          </div>
          <div className="bg-punk-gray border border-punk-green/30 p-4 text-center">
            <div className="font-[Impact] text-3xl text-punk-green">{stats.available}</div>
            <div className="font-mono text-xs text-punk-cream/50">DISPONIBLES</div>
          </div>
          <div className="bg-punk-gray border border-punk-red/30 p-4 text-center">
            <div className="font-[Impact] text-3xl text-punk-red">{stats.sold}</div>
            <div className="font-mono text-xs text-punk-cream/50">VENDIDOS</div>
          </div>
          <div className="bg-punk-gray border border-punk-yellow/30 p-4 text-center">
            <div className="font-[Impact] text-2xl text-punk-yellow">{formatPrice(stats.availableValue)}</div>
            <div className="font-mono text-xs text-punk-cream/50">EN STOCK</div>
          </div>
          <div className="bg-punk-gray border border-punk-red/30 p-4 text-center">
            <div className="font-[Impact] text-2xl text-punk-green">{formatPrice(stats.soldValue)}</div>
            <div className="font-mono text-xs text-punk-cream/50">VENDIDO $</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <input
            type="text"
            placeholder="🔍 Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] bg-punk-gray border-2 border-punk-yellow/50 text-punk-cream px-4 py-2 font-mono text-sm focus:outline-none focus:border-punk-yellow"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
            className="bg-punk-gray border-2 border-punk-yellow/50 text-punk-cream px-3 py-2 font-mono text-sm"
          >
            <option value="all">Todos ({stats.total})</option>
            <option value="available">Disponibles ({stats.available})</option>
            <option value="sold">Vendidos ({stats.sold})</option>
            <option value="reserved">Reservados ({stats.reserved})</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr className="border-b-2 border-punk-yellow text-punk-yellow text-left">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">BANDA</th>
                <th className="py-2 px-3">ÁLBUM</th>
                <th className="py-2 px-3">PRECIO</th>
                <th className="py-2 px-3">ESTADO</th>
                <th className="py-2 px-3">VENDIDO A</th>
                <th className="py-2 px-3">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(record => (
                <AdminRow
                  key={record.id}
                  record={record}
                  onUpdateStatus={updateStatus}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 font-mono text-punk-cream/40">
            No hay resultados
          </div>
        )}
      </div>
    </main>
  );
}

function AdminRow({
  record,
  onUpdateStatus,
}: {
  record: VinylRecord;
  onUpdateStatus: (id: number, status: SaleStatus, soldTo?: string) => void;
}) {
  const [soldTo, setSoldTo] = useState(record.soldTo || '');
  const [editing, setEditing] = useState(false);

  const statusColors = {
    available: 'text-punk-green',
    reserved: 'text-yellow-400',
    sold: 'text-punk-red',
  };

  const handleSell = () => {
    if (!soldTo.trim()) {
      const name = prompt('¿A quién se vendió?');
      if (name) {
        setSoldTo(name);
        onUpdateStatus(record.id, 'sold', name);
      }
    } else {
      onUpdateStatus(record.id, 'sold', soldTo);
    }
    setEditing(false);
  };

  return (
    <tr className="border-b border-punk-yellow/10 hover:bg-punk-gray/50">
      <td className="py-2 px-3 text-punk-yellow/50">{record.id}</td>
      <td className="py-2 px-3 text-punk-yellow font-bold">{record.band}</td>
      <td className="py-2 px-3 text-punk-cream/80">{record.album}</td>
      <td className="py-2 px-3 text-punk-cream">{formatPrice(record.price)}</td>
      <td className={`py-2 px-3 font-bold uppercase ${statusColors[record.status]}`}>
        {record.status === 'available' && '● DISPO'}
        {record.status === 'reserved' && '◐ RESERVADO'}
        {record.status === 'sold' && '✕ VENDIDO'}
      </td>
      <td className="py-2 px-3 text-punk-cream/60">
        {editing ? (
          <input
            type="text"
            value={soldTo}
            onChange={e => setSoldTo(e.target.value)}
            placeholder="Nombre..."
            className="bg-punk-dark-gray border border-punk-yellow/50 text-punk-cream px-2 py-1 text-xs w-full"
            autoFocus
          />
        ) : (
          record.soldTo || '—'
        )}
      </td>
      <td className="py-2 px-3">
        <div className="flex gap-1">
          {record.status === 'available' && (
            <>
              <button
                onClick={() => { setEditing(true); }}
                className="bg-punk-red/20 border border-punk-red text-punk-red text-xs px-2 py-1 hover:bg-punk-red hover:text-white transition-colors"
                title="Marcar como vendido"
              >
                VENDER
              </button>
              <button
                onClick={() => onUpdateStatus(record.id, 'reserved')}
                className="bg-yellow-500/20 border border-yellow-500 text-yellow-500 text-xs px-2 py-1 hover:bg-yellow-500 hover:text-black transition-colors"
                title="Reservar"
              >
                RESERVAR
              </button>
            </>
          )}
          {record.status === 'reserved' && (
            <>
              <button
                onClick={() => { setEditing(true); }}
                className="bg-punk-red/20 border border-punk-red text-punk-red text-xs px-2 py-1 hover:bg-punk-red hover:text-white transition-colors"
              >
                VENDER
              </button>
              <button
                onClick={() => onUpdateStatus(record.id, 'available')}
                className="bg-punk-green/20 border border-punk-green text-punk-green text-xs px-2 py-1 hover:bg-punk-green hover:text-black transition-colors"
              >
                LIBERAR
              </button>
            </>
          )}
          {record.status === 'sold' && (
            <button
              onClick={() => onUpdateStatus(record.id, 'available', undefined)}
              className="bg-punk-green/20 border border-punk-green text-punk-green text-xs px-2 py-1 hover:bg-punk-green hover:text-black transition-colors"
            >
              DEVOLVER
            </button>
          )}
          {editing && (
            <button
              onClick={handleSell}
              className="bg-punk-green border border-punk-black text-punk-black text-xs px-2 py-1 font-bold"
            >
              ✓ OK
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
