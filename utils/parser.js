export function parsePrice(price) {
  // already a number
  if (typeof price === "number") {
    return price;
  }

  // handle strings like "£51.77", "$10", "EUR 99.99"
  const cleaned = String(price)
    .replace(",", ".")        // handle comma decimals
    .replace(/[^\d.]/g, "");  // remove currency + text

  const value = Number(cleaned);

  if (isNaN(value)) {
    return null;
  }

  return value;
}
