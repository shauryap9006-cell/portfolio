import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Shaurya Singh ✌️",
  description: "An AI-focused developer and creative coder building cool stuff.",
  keywords: "Shaurya Singh, AI Developer, Full Stack Developer, React, Three.js, Creative Developer, Web Development, Python, TypeScript, Portfolio",
  authors: [{ name: "Shaurya Singh" }],
  creator: "Shaurya Singh",
  publisher: "Shaurya Singh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Shaurya Singh - AI Developer",
    description: "AI-focused developer and creative coder building cool stuff.",
    url: "https://shauryap9006-cell.github.io",
    siteName: "Shaurya Singh's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Singh - AI Developer",
    description: "AI-focused developer and creative coder building cool stuff.",
  },
  verification: {},
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'} />
    </html>
  );
}
