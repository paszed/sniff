import { readStdin } from "../utils/parser.js";
import { extract } from "../core/extract.js";
import { transform } from "../core/transform.js";
import { loadStore, saveStore } from "../utils/store.js";
import { compare } from "../utils/comparator.js";
import { formatOutput } from "../utils/output.js";

export async function runCommand(args) {
  try {
    // ---- parse input ----
    const url = args.find((a) => !a.startsWith("--"));

    const flags = {
      pretty: args.includes("--pretty"),
      json: args.includes("--json"),
      dropsOnly: args.includes("--drops-only"),
    };

    let input;

    // ---- input source ----
    if (url) {
      const extracted = await extract(url);
      input = transform(extracted);
    } else {
      const stdin = await readStdin();
      input = transform(stdin);
    }

    // ---- safety ----
    if (!Array.isArray(input)) input = [];

    // ---- load previous state ----
    let prev = await loadStore();
    if (!Array.isArray(prev)) prev = [];

    // ---- compare ----
    const result = compare(prev, input);

    // ---- persist new state ----
    await saveStore(input);

    // ---- filtering ----
    let output = result;

    if (flags.dropsOnly) {
      output = output.filter(
        (item) => item.change_type === "price_drop"
      );
    }

    // ---- format + print ----
    const formatted = formatOutput(output, flags);
    console.log(formatted || "No results found");
  } catch (err) {
    console.error("Sniff failed:", err.message);
  }
}
