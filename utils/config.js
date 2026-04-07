import fs from "fs";
import path from "path";

const CONFIG_PATH = path.resolve(process.cwd(), "sniff.config.json");

// ---- load ----
export function loadConfig() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return {};
    }

    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load config:", err.message);
    return {};
  }
}

// ---- save ----
export function saveConfig(config) {
  try {
    fs.writeFileSync(
      CONFIG_PATH,
      JSON.stringify(config, null, 2)
    );
  } catch (err) {
    console.error("Failed to save config:", err.message);
  }
}
