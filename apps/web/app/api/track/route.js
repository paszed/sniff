import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

function fixImage(src, pageUrl) {
  if (!src) return null;

  const clean = src.trim().replace(/^(\.\.\/)+/, "/");

  try {
    return new URL(clean, pageUrl).href;
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const title =
      $("h1").first().text().trim() ||
      "Untitled Product";

    let price =
      $(".price_color").first().text().trim() ||
      $(".price").first().text().trim() ||
      "£51.77";

    // TEST MODE: force changed price
    price = "£41.77";

    const rawImage =
      $(".item.active img").attr("src") ||
      $(".thumbnail img").attr("src") ||
      $("img").first().attr("src");

    const image = fixImage(rawImage, url);

    return NextResponse.json({
      title,
      price,
      url,
      image,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to scrape product" },
      { status: 500 }
    );
  }
}
