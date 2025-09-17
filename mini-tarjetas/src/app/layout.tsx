import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ usamos Inter en lugar de Geist
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mapa de los Temperamentos",
  description: "Explora tu temperamento y aplica el conocimiento en tu vida diaria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
