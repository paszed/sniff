#!/usr/bin/env node

import { run } from "../commands/run.js";
import { watch } from "../commands/watch.js";
import { help } from "../commands/help.js";
import { config } from "../commands/config.js";

// ---- args ----
const args = process.argv.slice(2);
const command = args[0];

// ---- main ----
async function main() {
  try {
    switch (command) {

	case "config":
  	config(args.slice(1));
  	break;	    
      case "watch":
        if (!args[1]) {
          console.error("Error: Missing URL for watch command");
          process.exit(1);
        }
        await watch(args.slice(1));
        break;

      case "help":
      case "--help":
      case "-h":
        help();
        break;

      default:
        await run(args);
    }
  } catch (err) {
    console.error("Sniff failed:", err.message || err);
    process.exit(1);
  }
}

main();
