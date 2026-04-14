import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "sniff.config.json");

function ensureFile() {
  const dir = path.dirname(CONFIG_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({}, null, 2));
  }
}

export function getConfig() {
  ensureFile();

  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveConfig(config = {}) {
  ensureFile();

  fs.writeFileSync(
    CONFIG_PATH,
    JSON.stringify(config, null, 2)
  );
}
