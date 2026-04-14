import { fetchWithBrowser } from "./browser.js";

export async function fetchPage(url, options = {}) {
  try {
    // Use browser if needed (default: true for scraping)
    if (options.browser !== false) {
      return await fetchWithBrowser(url, options.selector || "body");
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("HTTP_ERROR");
    }

    return await res.text();
  } catch (err) {
    if (err.message === "HTTP_ERROR") {
      throw err;
    }

    if (err.message.includes("fetch")) {
      throw new Error("NETWORK_ERROR");
    }

    throw new Error("FETCH_FAILED");
  }
}

