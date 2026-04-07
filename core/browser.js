import { chromium } from "playwright";

export async function fetchWithBrowser(url, selector = "body") {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });

    await page.waitForSelector(selector, { timeout: 5000 });

    const text = await page.$eval(selector, el => el.textContent);

    return text;
  } catch (err) {
    if (err.message.includes("ERR_NAME_NOT_RESOLVED")) {
      throw new Error("DNS_ERROR");
    }

    if (err.message.includes("Timeout")) {
      throw new Error("TIMEOUT");
    }

    throw new Error("BROWSER_FAILED");
  } finally {
    await browser.close(); // ✅ ALWAYS CLOSE
  }
}
