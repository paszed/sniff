export function handleError(err, url) {
  switch (err.message) {
    case "DNS_ERROR":
      console.error(`\n❌ Domain not found\n→ ${url}\n`);
      break;

    case "TIMEOUT":
      console.error(`\n⏱️ Request timed out\n→ ${url}\n`);
      break;

    case "NETWORK_ERROR":
      console.error(`\n🌐 Network error\n→ ${url}\n`);
      break;

    case "HTTP_ERROR":
      console.error(`\n❌ HTTP error (bad response)\n→ ${url}\n`);
      break;

    case "BROWSER_FAILED":
      console.error(`\n🧠 Browser extraction failed\n→ ${url}\n`);
      break;

    default:
      console.error(`\n❌ Unexpected error\n${err.message}\n`);
  }

  process.exit(1);
}
