
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Scraping App | E-commerce & LinkedIn Jobs Kenya",
  description: "A modern Next.js app for scraping e-commerce product prices (Jumia Kenya) and LinkedIn job listings. Search, filter, and analyze products and jobs easily.",
  keywords: [
    "web scraping", "nextjs", "e-commerce", "Jumia", "Kenya", "LinkedIn jobs", "job search", "product prices", "react", "cheerio", "axios", "filter", "remote jobs", "scraper"
  ],
  authors: [{ name: "Your Name or Team" }],
  openGraph: {
    title: "Web Scraping App | E-commerce & LinkedIn Jobs Kenya",
    description: "Scrape and filter products from Jumia Kenya and jobs from LinkedIn. Modern UI, fast results.",
    url: "https://your-app-url.com",
    siteName: "Web Scraping App",
    images: [
      {
        url: "/public/globe.svg",
        width: 1200,
        height: 630,
        alt: "Web Scraping App Preview"
      }
    ],
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Scraping App | E-commerce & LinkedIn Jobs Kenya",
    description: "Scrape and filter products from Jumia Kenya and jobs from LinkedIn.",
    images: ["/public/globe.svg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 w-full mx-auto max-w-7xl px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
