import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOFXLAND | Vinilos Punk Rock — Medellín",
  description:
    "150+ vinilos punk rock a precio justo. NOFX, Slipknot, Ghost, Rammstein, AC/DC y más. Escucha previews. Envío en Medellín. WhatsApp directo.",
  keywords: [
    "vinilos punk rock",
    "NOFX vinyl",
    "discos LP Colombia",
    "punk rock records Medellín",
    "Fat Wreck Chords",
    "Epitaph Records",
    "vinyl collection",
    "vinilos segunda mano",
  ],
  openGraph: {
    title: "🎸 NOFXLAND — Vinilos Punk Rock a Precio Justo",
    description: "150+ LPs de segunda mano: NOFX, Ghost, Slipknot, Rammstein, AC/DC y más. Escucha previews de 30s. Medellín, Colombia.",
    type: "website",
    locale: "es_CO",
    siteName: "NOFXLAND",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎸 NOFXLAND — Vinilos Punk Rock",
    description: "150+ LPs punk rock a precio justo. Medellín, Colombia.",
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
          href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Permanent+Marker&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-punk-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
