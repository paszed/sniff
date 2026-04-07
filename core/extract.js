import { chromium } from "playwright";

export async function extract(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // --- basic extraction (books.toscrape compatible) ---
    const title = await page
      .$eval("h1", el => el.textContent.trim())
      .catch(() => null);

    const price = await page
      .$eval(".price_color", el => el.textContent.trim())
      .catch(() => null);

    // fallback: try meta title if h1 fails
    const fallbackTitle = await page
      .$eval("title", el => el.textContent.trim())
      .catch(() => null);

    const result = [
      {
        title: title || fallbackTitle || url,
        price,
        link: url,
      },
    ];

    await browser.close();
    return result;
  } catch (err) {
    await browser.close();
    console.error("Extraction failed:", err.message);
    return [];
  }
}
