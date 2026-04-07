import { parsePrice } from "../utils/parser.js";
import { loadStore, saveStore } from "../utils/store.js";
import { compare } from "../utils/comparator.js";
import { notify } from "./notify.js";

export function run(items, options) {
  const store = loadStore();
  const results = [];

  for (const item of items) {
    const id = item.link || item.title;

    const price = parsePrice(item.price);
    const previous = store[id];

    const diff = compare(price, previous);

    const result = {
      ...item,
      ...diff
    };

    store[id] = price;
    results.push(result);

    notify(result);
  }

  saveStore(store);

  if (options.showAll) return results;
  if (options.dropsOnly)
    return results.filter((r) => r.change_type === "price_drop");

  return results.filter((r) => r.changed);
}
