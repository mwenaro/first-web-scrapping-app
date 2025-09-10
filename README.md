# First Web Scraping App

A Next.js web application for scraping and filtering laptop prices from Jumia Kenya and job listings from LinkedIn. Includes advanced filtering, beautiful UI, and dynamic meta data for each page.

## Features

- **Jumia Laptops Scraper**: Scrape laptop prices, images, categories, and subcategories from Jumia Kenya.
- **LinkedIn Jobs Scraper**: Find and filter jobs in Kenya or remote, with time filters (1hr, 6hr, 12hr, 24hr, week, month), company, location, and application mode.
- **Advanced Filtering**: Filter by category, subcategory, company, location, and more.
- **Modern UI**: Responsive design, hover effects, and easy navigation.
- **Meta Data**: Each page has its own meta data for SEO and sharing.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/laptops` — Laptops scraping page and API
- `src/app/linkedin-jobs` — LinkedIn jobs page and API
- `src/app/components` — Header, Footer, and shared UI
- `public/` — Static assets and icons

## Technologies Used

- Next.js (App Router)
- React
- Axios & Cheerio (for scraping)
- Tailwind CSS (for styling)

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.

## License

MIT
