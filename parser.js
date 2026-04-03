export function parsePrice(value) {
  if (value == null) return null;

  // already a number
  if (typeof value === "number") return value;

  // extract digits (handles £, $, €, commas, etc.)
  const match = String(value).match(/[\d,.]+/);

  if (!match) return null;

  const normalized = match[0].replace(/,/g, "");

  return parseFloat(normalized);
}

