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
    // Example: get all page titles
    const title = $('title').text();
    // Example: get all h1 tags
    const h1s = $('h2').map((i, el) => $(el).text()).get();
    return NextResponse.json({ title, h1s });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
