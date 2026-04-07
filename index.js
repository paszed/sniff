#!/usr/bin/env node

import { parsePrice } from "./parser.js";
import { loadStore, saveStore } from "./store.js";
import { compare } from "./comparator.js";

async function readStdin() {
  return new Promise((resolve) => {
    let data = "";

    process.stdin.on("data", chunk => {
      data += chunk;
    });

    process.stdin.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        console.error("Invalid JSON input");
        process.exit(1);
      }
    });
  });
}

async function sendWebhook(message) {
  const url = process.env.SNIFF_WEBHOOK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: message })
    });
  } catch (err) {
    console.error("Webhook failed:", err.message);
  }
}

function notify(result) {
  if (!result.changed) return;

  let message;

  if (result.change_type === "price_drop") {
    message = `↓ PRICE DROP: ${result.title} (£${result.old_price} → £${result.new_price})`;
  }

  if (result.change_type === "price_increase") {
    message = `↑ PRICE INCREASE: ${result.title} (£${result.old_price} → £${result.new_price})`;
  }

  if (message) {
    console.log(message);
    sendWebhook(message);
  }
}

// CLI args
const args = process.argv.slice(2);
const showAll = args.includes("--all");
const dropsOnly = args.includes("--drops-only");

const watchIndex = args.indexOf("--watch");
const watchInterval = watchIndex !== -1 ? Number(args[watchIndex + 1]) : null;

async function run() {
  const input = await readStdin();
  const items = Array.isArray(input) ? input : [input];

  const store = loadStore();
  const results = [];

  for (const item of items) {
    const id = item.link || item.title;

    const price = parsePrice(item.price);
    const previous = store[id];

    const diff = compare(price, previous);

    const result = {
      ...item,
      ...diff
    };

    store[id] = price;
    results.push(result);

    notify(result);
  }

  saveStore(store);

  let output;

  if (showAll) {
    output = results;
  } else if (dropsOnly) {
    output = results.filter(r => r.change_type === "price_drop");
  } else {
    output = results.filter(r => r.changed);
  }

  console.log(JSON.stringify(output, null, 2));
}

// execution
if (watchInterval) {
  console.log(`Watching every ${watchInterval}s...\n`);

  while (true) {
    await run();
    await new Promise(r => setTimeout(r, watchInterval * 1000));
  }
} else {
  await run();
}
