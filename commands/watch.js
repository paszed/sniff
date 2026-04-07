import { run } from "./run.js";

export async function watch(args) {
  // ---- parse interval ----
  const index = args.indexOf("--interval");

  const interval =
    index !== -1 && args[index + 1]
      ? Number(args[index + 1])
      : 10;

  const finalInterval =
    !isNaN(interval) && interval > 0 ? interval : 10;

  const url = args[0];

  if (!url) {
    console.error("Error: No URL provided for watch");
    return;
  }

  console.log(`Watching ${url}`);
  console.log(`Interval: ${finalInterval}s\n`);

  // ---- first run ----
  await run([url]);

  // ---- loop ----
  setInterval(() => {
    run([url]).catch(err => {
      console.error("Watch error:", err.message);
    });
  }, finalInterval * 1000);
}
