export function compare(currentPrice, previousPrice) {
  if (previousPrice == null) {
    return {
      old_price: null,
      new_price: currentPrice,
      changed: false
    };
  }

  return {
    old_price: previousPrice,
    new_price: currentPrice,
    changed: currentPrice !== previousPrice
  };
}
