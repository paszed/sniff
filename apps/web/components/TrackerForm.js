"use client";

import { useState } from "react";
import theme from "../styles/theme";

export default function TrackerForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url) return;

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
      onResult(data);
      setUrl("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={form}>
      <input
        type="url"
        placeholder="Paste product URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={input}
      />

      <button type="submit" style={button}>
        {loading ? "..." : "Track"}
      </button>
    </form>
  );
}

const form = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "12px",
};

const input = {
  height: "56px",
  borderRadius: theme.radius.md,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surfaceStrong,
  color: theme.colors.text,
  padding: "0 18px",
  fontSize: "16px",
  outline: "none",
};

const button = {
  height: "56px",
  padding: "0 22px",
  border: "none",
  borderRadius: theme.radius.md,
  background: theme.colors.accent,
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};
