import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Hang",
  description: "CLI-style portfolio"
};

const omoriFont = localFont({
  src: "../font/OMORI_GAME2.ttf",
  variable: "--font-omori",
  display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={omoriFont.variable}>
      <body>{children}</body>
    </html>
  );
}

