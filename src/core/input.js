export async function readStdin() {
  return new Promise((resolve) => {
    let data = "";

    process.stdin.on("data", (chunk) => {
      data += chunk;
    });

    process.stdin.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        console.error("Invalid JSON input");
        process.exit(1);
      }
    });
  });
}
