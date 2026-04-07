#!/usr/bin/env node

import { runCommand } from "../commands/run.js";
import { watchCommand } from "../commands/watch.js";
import { helpCommand } from "../commands/help.js";

// ---- args ----
const args = process.argv.slice(2);
const command = args[0];

// ---- routing ----
switch (command) {
  case "watch":
    watchCommand(args.slice(1));
    break;

  case "help":
  case "--help":
  case "-h":
    helpCommand();
    break;

  default:
    runCommand(args);
}
