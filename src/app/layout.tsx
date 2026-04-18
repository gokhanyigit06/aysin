import type { Metadata } from "next";
import { Inter, Bungee } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bungee = Bungee({ weight: "400", subsets: ["latin"], variable: "--font-bungee", display: "swap" });

export const metadata: Metadata = {
  title: "Aysin | Yaratıcı Stüdyo",
  description: "Güçlü markalar ve olağanüstü deneyimler yaratıyoruz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${bungee.variable} font-sans antialiased bg-white text-[#1a1a1a] flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
