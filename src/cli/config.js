import { getConfig, saveConfig } from "../lib/config.js";

export async function config(args = []) {
  const action = args[0];
  const key = args[1];
  const value = args[2];

  if (action === "set") {
    if (!key || !value) {
      console.log("Usage: sniff config set <key> <value>");
      return;
    }

    const current = getConfig();
    current[key] = value;

    saveConfig(current);

    console.log(`Saved ${key}`);
    return;
  }

  if (action === "get") {
    if (!key) {
      console.log("Usage: sniff config get <key>");
      return;
    }

    const current = getConfig();
    console.log(current[key] || "");
    return;
  }

  console.log(`
sniff config set webhook <url>
sniff config get webhook
`);
}
