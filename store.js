import fs from "fs";

const FILE = "store.json";

export function loadStore() {
  if (!fs.existsSync(FILE)) return {};
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function saveStore(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}


