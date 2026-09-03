import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOFXLAND | Vinilos de Segunda Mano en Medellín — Precios de Oferta",
  description:
    "Colección de vinilos LP de segunda mano a precios de oferta en Medellín. Punk, metal y rock: NOFX, Slipknot, Ghost, Rammstein, AC/DC, System of a Down y más. Recogida en Medellín o envíos a toda Colombia.",
  keywords: [
    "vinilos segunda mano Medellín",
    "vinilos Medellín",
    "discos LP Colombia",
    "comprar vinilos Colombia",
    "vinilos punk metal",
    "vinilos usados Medellín",
    "NOFX vinyl",
    "coleccion vinilos venta",
  ],
  openGraph: {
    title: "🎸 NOFXLAND — Vinilos de Segunda Mano en Medellín",
    description: "Colección de LPs a precios de oferta: NOFX, Ghost, Slipknot, Rammstein, AC/DC, System of a Down y más. Recogida en Medellín o envíos a toda Colombia. Pregunta por WhatsApp.",
    type: "website",
    locale: "es_CO",
    siteName: "NOFXLAND",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎸 NOFXLAND — Vinilos de Segunda Mano en Medellín",
    description: "LPs a precios de oferta. Punk, metal y rock. Recogida en Medellín o envíos. WhatsApp directo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-punk-black min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
