export function extractPrice(html) {
  // target books.toscrape specifically
  const match = html.match(/class="price_color">£([\d.]+)/);

  if (match) {
    return `£${match[1]}`;
  }

  return null;
}
