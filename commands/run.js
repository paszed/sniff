import { fetchPage } from "../core/fetch.js";
import { fetchWithBrowser } from "../core/browser.js";
import { parse } from "../utils/parser.js";
import { loadStore, saveStore } from "../utils/store.js";
import { compare } from "../utils/comparator.js";
import { formatOutput } from "../utils/output.js";
import { notify } from "../core/notify.js";

// ---- helper: read stdin ----
async function readStdin() {
  if (process.stdin.isTTY) return null;

  return new Promise((resolve, reject) => {
    let data = "";

    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (chunk) => {
      data += chunk;
    });

    process.stdin.on("end", () => {
      resolve(data.trim());
    });

    process.stdin.on("error", reject);
  });
}

// ---- main ----
export async function run(args) {
  let inputData;
  let url = null;

  try {
    // 1️⃣ Try stdin first
    const stdin = await readStdin();

    if (stdin) {
      try {
        inputData = JSON.parse(stdin);
      } catch {
        console.error("Sniff failed: Invalid JSON input");
        return;
      }
    } else {
      // 2️⃣ URL mode
      url = args[0];

      if (!url) {
        console.log("Usage: sniff <url> OR pipe JSON");
        return;
      }

      let html;

      try {
        html = await fetchPage(url);
      } catch {
        // fallback to browser
        html = await fetchWithBrowser(url, "body");
      }

      inputData = parse(html, url);
    }

    // 3️⃣ normalize to array
    const items = Array.isArray(inputData)
      ? inputData
      : [inputData];

    if (!items.length) {
      console.log("No results found");
      return;
    }

    // 4️⃣ load previous state
    const previous = loadStore();

    // 5️⃣ compare
    const results = compare(previous, items);

    // 6️⃣ save new state
    saveStore(items);

    // 7️⃣ output (always)
    console.log(formatOutput(results));

    // 8️⃣ notify (ONLY if changed)
    const changed = results.filter((r) => r.changed);

    if (changed.length) {
      await notify(changed, { source: url });
    }

    return results;

  } catch (err) {
    console.error("Sniff failed:", err.message);
  }
}
