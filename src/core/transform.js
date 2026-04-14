export async function transformData(items) {
  return items.map((item) => ({
    title: item.title || "Unknown",
    price: item.price || null,
    url: item.url || null
  }));
}
