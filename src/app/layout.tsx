import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ============================================
// REPLACE THIS WITH YOUR ADSENSE PUBLISHER ID
// Get it from: https://adsense.google.com
// ============================================
const ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Intellure — Free Online Tools",
    template: "%s | Intellure",
  },
  description:
    "Free online tools: word counter, JSON formatter, calculators, image tools, SEO tools, and more. Fast, private, no signup required.",
  metadataBase: new URL("https://intellure.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intellure.co",
    siteName: "Intellure",
    title: "Intellure — Free Online Tools",
    description:
      "Free online tools: word counter, JSON formatter, calculators, image tools, SEO tools, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellure — Free Online Tools",
    description:
      "Free online tools: word counter, JSON formatter, calculators, image tools, SEO tools, and more.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {!ADSENSE_PUB_ID.includes("XXXX") && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
