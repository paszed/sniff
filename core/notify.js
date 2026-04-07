import { loadConfig } from "../utils/config.js";

export async function notify(changes, meta = {}) {
  const config = loadConfig();
  const webhook = config.webhook;

  if (!webhook) {
    console.log("No webhook set — skipping notification");
    return;
  }

  for (const item of changes) {
    const isDrop = item.new_price < item.old_price;

    const embed = {
      title: isDrop ? "📉 Price Drop" : "📈 Price Increase",
      color: isDrop ? 0x22c55e : 0xef4444,
      fields: [
        {
          name: "Item",
          value: item.title,
          inline: false,
        },
        {
          name: "Price",
          value: `£${item.old_price} → £${item.new_price}`,
          inline: true,
        },
        {
          name: "Source",
          value: meta.source || item.link || "unknown",
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      });
    } catch (err) {
      console.error("Failed to send Discord notification:", err.message);
    }
  }
}
