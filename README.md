# Sniff



**Stop refreshing. Sniff watches web pages for you.**



Sniff is a minimal CLI tool that processes structured JSON and detects meaningful changes — starting with price tracking.






## ✨ Features



- Track changes in structured data

- Normalize and compare prices

- Works with single objects or arrays

- CLI-first, pipe-friendly

- Fast, minimal, no overhead\






## 🔌 Input Pipeline



Sniff operates as part of a composable pipeline:



Tractor → Pasta → Sniff



- **Tractor** → extracts structured JSON

- **Pasta** → cleans and normalizes

- **Sniff** → analyzes and detects changes



Sniff does **not depend** on other tools.

It only expects clean JSON input.






## 📥 Input Requirements



Sniff expects:



- Valid JSON

- Either:

- array of objects

- or single object

- No duplicates

- No empty values

- Clean, normalized strings






## 📄 Example Input



```json

[

{

“title”: “A Light in the Attic”,

“price”: “£51.77”,

“link”: “…”

}

]

```






## ⚙️ What Sniff Does



- Parses price values → numbers

- Compares against previous state (next step)

- Outputs structured results






## 🚀 Usage



```bash

echo ‘[{“title”:“Book”,“price”:“£51.77”}]’ | sniff

```



or in a pipeline:



```bash

tractor generate URL –preview | pasta | sniff

```






## 🧱 Tech Stack



- Node.js

- Native CLI (stdin / stdout)

- JSON-based processing






## 🧪 Scope (MVP)



- No UI

- No dashboards

- No scraping

- No complex rules



Sniff focuses only on **processing and detecting change**.






## ⚠️ Disclaimer



Sniff assumes clean input.

Invalid or unnormalized data may lead to incorrect results.\






## 📄 License



MIT License
📄 License

MIT License
