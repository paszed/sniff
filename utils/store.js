import fs from "fs";

const FILE = "store.json";

// Load previous state
export function loadStore() {
  if (!fs.existsSync(FILE)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(FILE, "utf8");
    const data = JSON.parse(raw);

    // Ensure it's always an array
    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (err) {
    console.error("Failed to read store.json, resetting...");
    return [];
  }
}

// Save new state
export function saveStore(data) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to write store.json:", err.message);
  }
}
