import { getInput } from "./input.js";
import { fetchPage } from "./fetch.js";
import { extractData } from "./extract.js";
import { transformData } from "./transform.js";

export async function runEngine(source) {
  const input = await getInput(source);
  const html = await fetchPage(input);
  const raw = await extractData(html, input);
  const data = await transformData(raw);

  return data;
}
