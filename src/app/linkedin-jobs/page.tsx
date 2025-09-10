import type { Metadata } from "next";
import LinkedInJobsClient from "./LinkedInJobsClient";

export const metadata: Metadata = {
  title: "LinkedIn Jobs Scraper | Kenya & Remote",
  description: "Find and filter LinkedIn jobs in Kenya or remote, posted in the last hour. Search by job title, company, location, and more.",
  keywords: ["LinkedIn jobs", "Kenya", "remote jobs", "job search", "scraper", "nextjs", "react"],
  openGraph: {
    title: "LinkedIn Jobs Scraper | Kenya & Remote",
    description: "Find and filter LinkedIn jobs in Kenya or remote, posted in the last hour.",
    url: "https://your-app-url.com/linkedin-jobs",
    siteName: "Web Scraping App",
    images: [
      {
        url: "/public/globe.svg",
        width: 1200,
        height: 630,
        alt: "LinkedIn Jobs Scraper Preview"
      }
    ],
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Jobs Scraper | Kenya & Remote",
    description: "Find and filter LinkedIn jobs in Kenya or remote, posted in the last hour.",
    images: ["/public/globe.svg"]
  }
};

export default function LinkedInJobs() {
  return <LinkedInJobsClient />;
}
