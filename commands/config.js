import { loadConfig, saveConfig } from "../utils/config.js";

export function config(args) {
  const [action, key, value] = args;

  if (action === "set") {
    const config = loadConfig();
    config[key] = value;
    saveConfig(config);
    console.log(`Saved ${key}`);
    return;
  }

  if (action === "get") {
    const config = loadConfig();
    console.log(config[key] ?? "Not set");
    return;
  }

  console.log("Usage:");
  console.log("  sniff config set webhook <url>");
  console.log("  sniff config get webhook");
}
