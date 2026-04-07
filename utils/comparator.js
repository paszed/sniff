export function compare(price, previous) {
  // first time seeing item
  if (previous == null) {
    return {
      old_price: null,
      new_price: price,
      changed: false
    };
  }

  // no change
  if (price === previous) {
    return {
      old_price: previous,
      new_price: price,
      changed: false
    };
  }

  // change detected
  return {
    old_price: previous,
    new_price: price,
    changed: true,
    change_type:
      price < previous ? "price_drop" : "price_increase"
  };
}
