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
    const products: any[] = [];
    // Collect product cards and their URLs
    const productCards = $("article.prd._box");
    
    const productPromises = productCards.map(async (i, el) => {
        if(i ===0) console.log(el);
      const name = $(el).find(".name").text().trim();
      const price = $(el).find(".prc").text().trim();
      const image = $(el).find("img").attr("data-src") || $(el).find("img").attr("src") || "";
      const productUrl = $(el).find("a.core").attr("href");
      let category = "";
      let subcategory = "";
      if (productUrl) {
        try {
          // Ensure absolute URL
          const absUrl = productUrl.startsWith("http") ? productUrl : `https://www.jumia.co.ke${productUrl}`;
          const detailRes = await axios.get(absUrl);
          const $$ = cheerio.load(detailRes.data);
          // Breadcrumbs: .brcr a
          const breadcrumbs = $$(".brcr a").map((j, b) => $$(b).text().trim()).get();
          if (breadcrumbs.length >= 2) {
            category = breadcrumbs[1] || "";
            subcategory = breadcrumbs[2] || "";
          } else if (breadcrumbs.length === 1) {
            category = breadcrumbs[0];
          }
        } catch (err) {
          // If detail page fails, fallback to listing info
          category = $(el).attr("data-category") || "";
        }
      }
      if (name && price && image) {
        return { name, price, image, category, subcategory };
      }
      return null;
    }).get();
    const results = await Promise.all(productPromises);
    const filtered = results.filter(Boolean);
    return NextResponse.json({ products: filtered });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
