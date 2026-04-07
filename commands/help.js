export function helpCommand() {
  console.log(`
Sniff — Track changes in structured data

Usage:
  sniff <url>
  sniff watch <url> --interval 10

Options:
  --pretty        Pretty JSON output
  --json          Raw JSON output
  --drops-only    Show only price drops

Examples:
  sniff https://example.com
  sniff watch https://example.com --interval 5
  echo '[{"price":"£30"}]' | sniff
`);
}
