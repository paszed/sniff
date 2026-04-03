#!/usr/bin/env node

import { parsePrice } from "./parser.js";

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

// normalize to array
const items = Array.isArray(input) ? input : [input];

// parse prices
const result = items.map(item => ({
  ...item,
  price: parsePrice(item.price)
}));

// output
console.log(JSON.stringify(result, null, 2));

