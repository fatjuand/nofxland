import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NOFXLAND ADMIN — Monitor de Ventas",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
