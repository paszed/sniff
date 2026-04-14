import { run } from "./run.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function watch(args = []) {
  const url = args[0];

  if (!url) {
    console.error("Missing URL for watch command");
    process.exit(1);
  }

  let interval = 10;

  const idx = args.indexOf("--interval");
  if (idx !== -1 && args[idx + 1]) {
    interval = Number(args[idx + 1]);
  }

  console.log(`Watching ${url} every ${interval}s`);

  while (true) {
    try {
      await run([url]);
    } catch (err) {
      console.error("Watch error:", err.message);
    }

    await sleep(interval * 1000);
  }
}
