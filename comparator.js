export function compare(current, previous) {
  if (previous == null) {
    return {
      old_price: null,
      new_price: current,
      changed: false,
      change_type: "new"
    };
  }

  if (current === previous) {
    return {
      old_price: previous,
      new_price: current,
      changed: false,
      change_type: "no_change"
    };
  }

  if (current < previous) {
    return {
      old_price: previous,
      new_price: current,
      changed: true,
      change_type: "price_drop"
    };
  }

  return {
    old_price: previous,
    new_price: current,
    changed: true,
    change_type: "price_increase"
  };
}
