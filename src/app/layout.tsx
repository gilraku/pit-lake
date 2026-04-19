import type { Metadata } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PIT Lake Score",
  description: "Alat penilaian keberlanjutan danau pit untuk tambang batubara Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-theme="light"
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}
      style={{ height: '100%' }}
    >
      <body style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>
        <Sidebar className="app-sidebar" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
