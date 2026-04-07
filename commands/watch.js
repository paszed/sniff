import { runCommand } from "./run.js";

export function watchCommand(args) {
  // ---- parse interval ----
  const index = args.indexOf("--interval");
  const interval =
    index !== -1 && args[index + 1]
      ? Number(args[index + 1])
      : 10;

  if (isNaN(interval) || interval <= 0) {
    console.log("Invalid interval. Using default: 10s");
  }

  const finalInterval =
    !isNaN(interval) && interval > 0 ? interval : 10;

  console.log(`Watching every ${finalInterval}s...\n`);

  // ---- first run immediately ----
  runCommand(args).catch((err) => {
    console.error("Run failed:", err.message);
  });

  // ---- loop ----
  setInterval(() => {
    runCommand(args).catch((err) => {
      console.error("Run failed:", err.message);
    });
  }, finalInterval * 1000);
}
