import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  const { url } = await request.json();
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const jobs: any[] = [];
    // LinkedIn job card selectors (may need adjustment if LinkedIn changes their HTML)
    $(".jobs-search__results-list li").each((i, el) => {
      const title = $(el).find(".base-search-card__title").text().trim();
      const company = $(el).find(".base-search-card__subtitle").text().trim();
      const location = $(el).find(".job-search-card__location").text().trim();
      const url = $(el).find("a.base-card__full-link").attr("href") || "";
      const description = $(el).find(".job-search-card__snippet").text().trim();
      if (title && company && url) {
        jobs.push({ title, company, location, url, description });
      }
    });
    return NextResponse.json({ jobs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
