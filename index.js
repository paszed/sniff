#!/usr/bin/env node

import { readStdin } from "./core/input.js";
import { run } from "./core/engine.js";

const args = process.argv.slice(2);

const options = {
  showAll: args.includes("--all"),
  dropsOnly: args.includes("--drops-only")
};

const watchIndex = args.indexOf("--watch");
const watchInterval =
  watchIndex !== -1 ? Number(args[watchIndex + 1]) : null;

async function execute() {
  const input = await readStdin();
  const items = Array.isArray(input) ? input : [input];

  const output = run(items, options);

  console.log(JSON.stringify(output, null, 2));
}

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
