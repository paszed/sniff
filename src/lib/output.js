export function formatOutput(data, options = {}) {
  // raw JSON (single line)
  if (options.json) {
    console.log(JSON.stringify(data));
    return;
  }

  // pretty JSON
  if (options.pretty) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  // default CLI output
  if (!Array.isArray(data)) {
    console.log("No results found");
    return;
  }

  for (const item of data) {
    const title = item.title || "Unknown";

    if (item.changed) {
      if (item.change_type === "price_increase") {
        console.log(`↑ ${title}: ${item.old_price} → ${item.new_price}`);
      } else if (item.change_type === "price_drop") {
        console.log(`↓ ${title}: ${item.old_price} → ${item.new_price}`);
      } else {
        console.log(`• ${title}: changed`);
      }
    } else {
      console.log(`• ${title}: unchanged`);
    }
  }
}
