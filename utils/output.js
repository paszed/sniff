export function formatOutput(data, flags = {}) {
  // ---- safety ----
  if (!Array.isArray(data) || data.length === 0) {
    return "No results found";
  }

  // ---- raw JSON ----
  if (flags.json) {
    return JSON.stringify(data);
  }

  // ---- pretty JSON ----
  if (flags.pretty) {
    return JSON.stringify(data, null, 2);
  }

  // ---- default CLI output ----
  return data
    .map((item) => {
      const title = item.title || "unknown";

      const oldPrice =
        item.old_price !== undefined && item.old_price !== null
          ? item.old_price
          : "-";

      const newPrice =
        item.new_price !== undefined && item.new_price !== null
          ? item.new_price
          : "-";

      // unchanged
      if (!item.changed) {
        return `• ${title}: unchanged`;
      }

      // price drop
      if (item.change_type === "price_drop") {
        return `↓ ${title}: ${oldPrice} → ${newPrice}`;
      }

      // price increase
      if (item.change_type === "price_increase") {
        return `↑ ${title}: ${oldPrice} → ${newPrice}`;
      }

      // fallback
      return `• ${title}: changed`;
    })
    .join("\n");
}
