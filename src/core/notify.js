import { getConfig } from "../lib/config.js";

export async function notify(items = [], meta = {}) {
  const config = getConfig();
  const webhook = config.webhook;

  if (!webhook) {
    return;
  }

  for (const item of items) {
    const isDrop =
      Number(item.currentPrice) < Number(item.previousPrice);

    const title = isDrop ? "📉 Price Drop" : "📈 Price Increase";

    const priceLine = `${item.previousPrice} → ${item.currentPrice}`;

    const embed = {
      title,
      description: `**${item.title}**`,
      color: isDrop ? 5763719 : 15548997,
      fields: [
        {
          name: "Price",
          value: priceLine,
          inline: false
        },
        {
          name: "Source",
          value: meta.source || "unknown",
          inline: false
        }
      ],
      timestamp: new Date().toISOString()
    };

    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "Sniff",
        embeds: [embed]
      })
    });
  }
}  


