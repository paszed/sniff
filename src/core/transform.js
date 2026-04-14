export function transform(data) {
  // ---- safety ----
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const rawPrice = item.price || "";

    // ---- normalize price (e.g. "£51.77" → 51.77) ----
    const numericPrice = parseFloat(
      rawPrice.replace(/[^0-9.]/g, "")
    );

    return {
      title: item.title || "unknown",
      price: rawPrice,
      value: isNaN(numericPrice) ? null : numericPrice,
      link: item.link || null,
    };
  });
}
