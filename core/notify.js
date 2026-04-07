export async function sendWebhook(result) {
  const url = process.env.SNIFF_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      embeds: [
        {
          title:
            result.change_type === "price_drop"
              ? "📉 Price Drop"
              : "📈 Price Increase",
          description: `**${result.title}**\n£${result.old_price} → £${result.new_price}`,
          color:
            result.change_type === "price_drop"
              ? 5763719
              : 15548997
        }
      ]
    })
  });
}

export function notify(result) {
  if (!result.changed) return;

  const msg =
    result.change_type === "price_drop"
      ? `↓ PRICE DROP: ${result.title} (£${result.old_price} → £${result.new_price})`
      : `↑ PRICE INCREASE: ${result.title} (£${result.old_price} → £${result.new_price})`;

  console.log(msg);
  sendWebhook(result);
}

