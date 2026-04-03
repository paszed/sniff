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

// CLI args
const args = process.argv.slice(2);
const showAll = args.includes("--all");

// read input
const input = await readStdin();
const items = Array.isArray(input) ? input : [input];

// load state
const store = loadStore();
const results = [];

for (const item of items) {
  const id = item.link || item.title;

  const price = parsePrice(item.price);
  const previous = store[id];

  const diff = compare(price, previous);

  store[id] = price;

  results.push({
    ...item,
    ...diff
  });
}

// save state
saveStore(store);

// output control
const output = showAll ? results : results.filter(r => r.changed);

console.log(JSON.stringify(output, null, 2));

