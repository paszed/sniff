import fs from "fs";

const FILE = "store.json";

export function loadStore() {
  try {
    const data = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function saveStore(store) {
  fs.writeFileSync(FILE, JSON.stringify(store, null, 2));
}
