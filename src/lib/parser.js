export function parse(input, url = null) {
  // ---- already structured (stdin or JSON) ----
  if (Array.isArray(input)) {
    return input.map(item => normalize(item, url));
  }

  if (typeof input === "object" && input !== null) {
    return [normalize(input, url)];
  }

  // ---- HTML string (very simple fallback parsing) ----
  if (typeof input === "string") {
    const titleMatch = input.match(/<title>(.*?)<\/title>/i);
    const priceMatch = input.match(/£\s?\d+(\.\d+)?/);

    return [
      normalize(
        {
          title: titleMatch ? titleMatch[1] : url,
          price: priceMatch ? priceMatch[0] : null,
          link: url,
        },
        url
      ),
    ];
  }

  return [];
}

// ---- normalize helper ----
function normalize(item, fallbackUrl) {
  const rawPrice = item.price || "";

  const numeric = Number(
    String(rawPrice).replace(/[^\d.]/g, "")
  );

  return {
    title: item.title || fallbackUrl || "unknown",
    price: rawPrice,
    value: isNaN(numeric) ? null : numeric,
    link: item.link || fallbackUrl || null,
  };
}
