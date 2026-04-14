export async function getInput(source) {
  if (source) {
    return source;
  }

  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString().trim();

  return text;
}
