import { Metadata } from "next";
import LaptopsClient from "./LaptopsClient";

export const metadata: Metadata = {
  title: "Jumia Kenya Laptop Price Scraper",
  description: "Scrape and filter laptop prices, images, and categories from Jumia Kenya. Find the best deals and compare products easily.",
  keywords: ["Jumia", "Kenya", "laptops", "price scraper", "e-commerce", "nextjs", "react", "web scraping"],
  openGraph: {
    title: "Jumia Kenya Laptop Price Scraper",
    description: "Scrape and filter laptop prices, images, and categories from Jumia Kenya.",
    url: "https://your-app-url.com/laptops",
    siteName: "Web Scraping App",
    images: [
      {
        url: "/public/globe.svg",
        width: 1200,
        height: 630,
        alt: "Laptop Price Scraper Preview"
      }
    ],
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Jumia Kenya Laptop Price Scraper",
    description: "Scrape and filter laptop prices, images, and categories from Jumia Kenya.",
    images: ["/public/globe.svg"]
  }
};

export default function Laptops() {
  return <LaptopsClient />;
}
   