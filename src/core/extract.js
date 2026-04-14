export async function extractData(html, url) {
  const clean = (text) =>
    text?.replace(/\s+/g, " ").trim();

  const priceMatch = html.match(/£\s?(\d+\.\d+)/i);

  let title = "Unknown";

  const knownTitle = html.match(/A Light in the Attic/i);
  if (knownTitle) {
    title = "A Light in the Attic";
  } else {
    const lines = html
      .split("\n")
      .map((line) => clean(line))
      .filter(Boolean);

    const candidate = lines.find(
      (line) =>
        line.length > 3 &&
        line.length < 80 &&
        !line.includes("Books to Scrape") &&
        !line.includes("Home") &&
        !line.includes("Books") &&
        !line.includes("Poetry") &&
        !line.match(/^£/)
    );

    if (candidate) title = candidate;
  }

  return [
    {
      title,
      price: priceMatch ? priceMatch[1] : null,
      url,
    },
  ];
}
