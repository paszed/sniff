import { run } from "../cli/run.js";
import { watch } from "../cli/watch.js";
import { help } from "../cli/help.js";
import { config } from "../cli/config.js";

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  try {
    switch (command) {
      case "watch":
        await watch(args.slice(1));
        break;

      case "config":
        await config(args.slice(1));
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
