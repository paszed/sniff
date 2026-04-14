export async function extractData(html, url) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const priceMatch = html.match(/£\s?(\d+\.\d+|\d+)/i);

  const title = titleMatch ? titleMatch[1].trim() : "Unknown";
  const price = priceMatch ? priceMatch[1] : null;

  return [
    {
      title,
      price,
      url
    }
  ];
}
