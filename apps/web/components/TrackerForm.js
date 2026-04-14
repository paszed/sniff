"use client";

import { useState } from "react";

export default function TrackerForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack() {
    if (!url.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      const item = data?.data?.[0] || null;

      if (item) {
        onResult(item);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      handleTrack();
    }
  }

  return (
    <div style={row}>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Paste product URL..."
        style={input}
      />

      <button onClick={handleTrack} style={button}>
        {loading ? "..." : "Track"}
      </button>
    </div>
  );
}

const row = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
};

const input = {
  flex: 1,
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "18px",
};

const button = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "12px",
  background: "black",
  color: "white",
  cursor: "pointer",
};
