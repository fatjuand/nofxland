import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOFXLAND | Vinilos de Segunda Mano — Medellín",
  description:
    "150+ LPs de segunda mano. NOFX, Slipknot, Ghost, Rammstein, AC/DC, System of a Down y más. Envíos a toda Colombia y el mundo.",
  keywords: [
    "vinilos segunda mano",
    "discos LP Colombia",
    "punk rock records",
    "vinyl collection Medellín",
    "NOFX vinyl",
    "metal vinyl",
  ],
  openGraph: {
    title: "🎸 NOFXLAND — Vinilos de Segunda Mano",
    description: "150+ LPs: NOFX, Ghost, Slipknot, Rammstein, AC/DC y más. Medellín, Colombia. Envíos worldwide.",
    type: "website",
    locale: "es_CO",
    siteName: "NOFXLAND",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎸 NOFXLAND — Vinilos de Segunda Mano",
    description: "150+ LPs de segunda mano. Medellín, Colombia.",
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
      </body>
    </html>
  );
}
