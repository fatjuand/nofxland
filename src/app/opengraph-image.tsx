import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NOFXLAND — Vinilos Punk Rock a Precio Justo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Impact, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal stripes background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #FFD700 35px, #FFD700 70px)',
          }}
        />

        {/* Main title */}
        <div
          style={{
            fontSize: 140,
            color: '#FFD700',
            textTransform: 'uppercase',
            letterSpacing: -4,
            textShadow: '6px 6px 0px #FF0033, -2px -2px 0px #FFD700',
            lineHeight: 1,
          }}
        >
          NOFXLAND
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#F5F0E8',
            fontFamily: 'Courier New, monospace',
            marginTop: 20,
            opacity: 0.8,
          }}
        >
          LPs DE SEGUNDA MANO — PRECIO JUSTO
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 40,
            fontSize: 24,
            fontFamily: 'Courier New, monospace',
          }}
        >
          <span style={{ color: '#39FF14' }}>● 150+ discos</span>
          <span style={{ color: '#FFD700' }}>★ Punk Rock</span>
          <span style={{ color: '#FF0033' }}>♫ Previews 30s</span>
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 22,
            color: '#F5F0E8',
            fontFamily: 'Courier New, monospace',
            marginTop: 30,
            opacity: 0.5,
          }}
        >
          Medellín, Colombia 🇨🇴 — WhatsApp directo
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#FFD700',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
