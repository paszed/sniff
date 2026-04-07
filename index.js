#!/usr/bin/env node

import { readStdin } from "./core/input.js";
import { run } from "./core/engine.js";
import { fetchPage } from "./core/fetch.js";
import { extractPrice } from "./core/extract.js";
import { toItem } from "./core/transform.js";

// CLI args
const args = process.argv.slice(2);

const options = {
  showAll: args.includes("--all"),
  dropsOnly: args.includes("--drops-only")
};

const watchIndex = args.indexOf("--watch");
const watchInterval =
  watchIndex !== -1 ? Number(args[watchIndex + 1]) : null;

async function execute() {
  const arg = args[0];

  let items;

  // 🔥 FETCH MODE (URL input)
  if (arg && arg.startsWith("http")) {
    try {
      const html = await fetchPage(arg);
      const price = extractPrice(html);

      if (!price) {
        console.error("No price found");
        process.exit(1);
      }

      items = [toItem(arg, price)];
    } catch (err) {
      console.error("Fetch failed:", err.message);
      process.exit(1);
    }
  } else {
    // 📥 STDIN MODE (pipeline)
    const input = await readStdin();
    items = Array.isArray(input) ? input : [input];
  }

  const output = run(items, options);

  console.log(JSON.stringify(output, null, 2));
}

// execution
if (watchInterval) {
  console.log(`Watching every ${watchInterval}s...\n`);

  while (true) {
    await execute();
    await new Promise((r) =>
      setTimeout(r, watchInterval * 1000)
    );
  }
} else {
  await execute();
}
