Sniff

Stop refreshing. Sniff watches web pages for you.

Sniff is a minimal tool that monitors web pages for changes—starting with price tracking—and notifies you when something important happens.

⸻

✨ What it does
	•	Track a single URL
	•	Detect price changes
	•	Check pages automatically
	•	Send notifications when something changes

⸻

🚀 How it works
	1.	Paste a product URL
	2.	Sniff fetches the page and extracts the price
	3.	The price is stored and monitored over time
	4.	When the price changes, you get notified

⸻

🧱 Tech Stack
	•	Node.js
	•	Playwright
	•	SQLite
	•	Simple scheduler (cron)
	•	Email API (Resend / SendGrid)

⸻

📦 Installation

git clone https://github.com/your-username/sniff.git
cd sniff
npm install

⸻

⚙️ Environment Variables

Create a .env file:

DATABASE_URL=sqlite.db
EMAIL_API_KEY=your_api_key
FROM_EMAIL=your@email.com

⸻

▶️ Run locally

npm run dev

⸻

🧪 Scope

Sniff is intentionally simple:
	•	No accounts
	•	No dashboards
	•	No complex scraping logic

The goal is to ship fast and validate real usage before expanding.

⸻

⚠️ Disclaimer

Sniff depends on third-party websites. Changes in page structure may break price detection.

⸻

📄 License

MIT License
