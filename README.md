# Sniff

**Stop refreshing. Sniff watches web pages for you.**

Sniff is a minimal CLI tool that processes structured JSON and detects meaningful changes — starting with price tracking.

---

## ✨ Features

- Track changes in structured data
- Normalize and compare prices
- Works with single objects or arrays
- CLI-first, pipe-friendly
- Fast, minimal, no overhead

---

## 🔌 Input Pipeline

Sniff operates as part of a composable pipeline:

Tractor → Pasta → Sniff

- **Tractor** → extracts structured JSON  
- **Pasta** → cleans and normalizes  
- **Sniff** → analyzes and detects changes  

Sniff does **not depend** on other tools.  
It only expects clean JSON input.

---

## 📥 Input Requirements

Sniff expects:

- Valid JSON
- Either:
  - a single object
  - or an array of objects

Each object should contain at least:

- title
- price
- link

---

## 📄 Example Input

```json
[
  {
    "title": "A Light in the Attic",
    "price": "£51.77",
    "link": "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html"
  }
]
```

---

## ⚙️ What Sniff Does

- Parses price values → numbers
- Compares against previous state
- Outputs structured results

---

## 🚀 Usage

### 1. Pipe JSON into Sniff

```bash
echo '[{"title":"Book","price":"£51.77","link":"a"}]' \\
| node index.js
```

---

### 2. Run against a URL (Playwright)

```bash
node index.js https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html
```

---

### 3. Watch mode

```bash
node index.js https://example.com --watch 10
```

---

### 4. Only show price drops

```bash
node index.js https://example.com --drops-only
```

---

## 🔔 Notifications (Discord)

Set your webhook:

```bash
export SNIFF_WEBHOOK_URL="https://discord.com/api/webhooks/..."
```

Sniff will send notifications on changes.

---

## 🧱 Project Structure

```
.
├── core/
│   ├── browser.js
│   ├── engine.js
│   ├── extract.js
│   ├── fetch.js
│   ├── input.js
│   ├── notify.js
│   └── transform.js
│
├── utils/
│   ├── comparator.js
│   ├── parser.js
│   └── store.js
│
├── index.js
└── store.json
```

---

## 🧰 Tech Stack

- Node.js
- Playwright
- Native CLI (stdin / stdout)
- JSON-based processing

---

## 🌱 Scope (MVP)

- No UI
- No dashboards
- No scraping rules engine
- No complex configs

Sniff focuses only on **processing and detecting changes**.

---

## ⚠️ Disclaimer

Sniff assumes clean input.

Invalid or unnormalized data may lead to incorrect results.

---

## 📄 License

MIT License
