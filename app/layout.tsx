import type { Metadata } from "next";
import { Cairo, Amiri, Scheherazade_New } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  weight: ['400', '500', '600', '700'],
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ["arabic"],
  variable: "--font-amiri",
});

const scheherazade = Scheherazade_New({
  weight: ['400', '700'],
  subsets: ["arabic"],
  variable: "--font-quran",
});

export const metadata: Metadata = {
  title: "منصة المنارة الإسلامية",
  description: "منصة المنارة الإسلامية للدعوة",
  icons: {
    icon: '/lighthouse.png',
    apple: '/lighthouse.png',
    shortcut: '/lighthouse.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable} ${scheherazade.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
