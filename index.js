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

const input = await readStdin();
const items = Array.isArray(input) ? input : [input];

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

saveStore(store);

const onlyChanges = results.filter(r => r.changed);
console.log(JSON.stringify(onlyChanges, null, 2));

