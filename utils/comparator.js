export function compare(prev = [], current = []) {
  const prevMap = new Map();

  // index previous items by link
  for (const item of prev) {
    prevMap.set(item.link, parsePrice(item.price));
  }

  const result = [];

  for (const item of current) {
    const oldPrice = prevMap.get(item.link) ?? null;
    const newPrice = parsePrice(item.price);

    const changed =
      oldPrice !== null && oldPrice !== newPrice;

    let changeType = null;

    if (changed) {
      if (newPrice < oldPrice) changeType = "price_drop";
      if (newPrice > oldPrice) changeType = "price_increase";
    }

    result.push({
      ...item,
      old_price: oldPrice,
      new_price: newPrice,
      changed,
      change_type: changeType
    });
  }

  return result;
}

function parsePrice(price) {
  if (!price) return null;

  return Number(
    price.replace(/[^\d.]/g, "")
  );
}
