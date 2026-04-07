import { chromium } from "playwright";

export async function fetchWithBrowser(url, selector) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  // wait for selector to appear
  await page.waitForSelector(selector, { timeout: 5000 });

  const text = await page.$eval(selector, el => el.textContent);

  await browser.close();

  return text;
}
