import { fetchPage } from "./fetch.js";
import { fetchWithBrowser } from "./browser.js";
import { notify } from "./notify.js";

import { parse } from "../lib/parser.js";
import { compare } from "../lib/comparator.js";
import { loadStore, saveStore } from "../lib/store.js";
import { formatOutput } from "../lib/output.js";

async function readStdin() {
  if (process.stdin.isTTY) return null;

  return new Promise((resolve, reject) => {
    let data = "";

    process.stdin.setEncoding("utf8");

    process.stdin.on("data", chunk => {
      data += chunk;
    });

    process.stdin.on("end", () => {
      resolve(data.trim());
    });

    process.stdin.on("error", reject);
  });
}

export async function runEngine(args = []) {
  let inputData;
  let url = null;

  try {
    const stdin = await readStdin();

    if (stdin) {
      try {
        inputData = JSON.parse(stdin);
      } catch {
        console.error("Sniff failed: Invalid JSON input");
        return;
      }
    } else {
      url = args[0];

      if (!url) {
        console.log("Usage: sniff <url> OR pipe JSON");
        return;
      }

      let html;

      try {
        html = await fetchPage(url);
      } catch {
        html = await fetchWithBrowser(url, "body");
      }

      inputData = parse(html, url);
    }

    const items = Array.isArray(inputData)
      ? inputData
      : [inputData];

    if (!items.length) {
      console.log("No results found");
      return;
    }

    const previous = loadStore();
    const results = compare(previous, items);

    saveStore(items);

    console.log(formatOutput(results));

    const changed = results.filter(item => item.changed);

    if (changed.length > 0) {
      await notify(changed, { source: url });
    }

    return results;
  } catch (err) {
    console.error("Sniff failed:", err.message);
  }
}
