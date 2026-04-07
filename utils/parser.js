export async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";

    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (chunk) => {
      data += chunk;
    });

    process.stdin.on("end", () => {
      try {
        const parsed = JSON.parse(data.trim());
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON input"));
      }
    });

    process.stdin.on("error", reject);
  });
}
