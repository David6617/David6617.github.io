import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

function getMetadataBase() {
  return new URL("https://davidhang.ca");
}

export const metadata: Metadata = {
  title: "David's Website!",
  description: "David Hang's Personal Website!",
  metadataBase: getMetadataBase(),
  icons: {
    icon: "/Tux/Tux_Normal.gif"
  },
  openGraph: {
    title: "David's Website!",
    description: "David Hang's Personal Website!",
    images: [
      {
        url: "/Tux/Tux_Normal.gif",
        alt: "Tux (Normal)"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "David's Website!",
    description: "David Hang's Personal Website!",
    images: ["/Tux/Tux_Normal.gif"]
  }
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

