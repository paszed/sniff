"use client";

import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleTrack() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Sniff</h1>
      <p>Track price changes on any product page.</p>

      <div style={{ marginTop: "20px" }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste product URL..."
          style={{
            padding: "12px",
            width: "320px",
            marginRight: "10px"
          }}
        />

        <button
          onClick={handleTrack}
          disabled={loading}
          style={{
            padding: "12px 18px",
            cursor: "pointer"
          }}
        >
          {loading ? "Loading..." : "Track"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}

      {result && (
        <pre
          style={{
            marginTop: "20px",
            background: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
            overflow: "auto"
          }}
        >
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
