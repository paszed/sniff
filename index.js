#!/usr/bin/env node

import { readStdin } from "./utils/parser.js";
import { loadStore, saveStore } from "./utils/store.js";
import { compare } from "./utils/comparator.js";

// OPTIONAL (only used if URL)
let fetchPrice = null;
try {
  const mod = await import("./core/browser.js");
  fetchPrice = mod.fetchWithBrowser;
} catch {}

const args = process.argv.slice(2);

async function main() {
  const inputArg = args[0];

  let items = [];

  // --- CASE 1: URL ---
  if (inputArg && inputArg.startsWith("http") && fetchPrice) {
    const priceText = await fetchPrice(inputArg, ".price_color");

    if (!priceText) {
      console.error("No price found");
      process.exit(1);
    }

    items = [
      {
        title: inputArg,
        price: priceText,
        link: inputArg
      }
    ];
  }

  // --- CASE 2: STDIN ---
  else {
    const input = await readStdin();
    items = Array.isArray(input) ? input : [input];
  }

  // --- LOAD PREVIOUS STATE ---
  const prev = loadStore();

  // --- COMPARE ---
  const result = compare(prev, items);

  // --- SAVE NEW STATE ---
  saveStore(result);

  // --- OUTPUT ---
  console.log(JSON.stringify(result, null, 2));
}

main();
