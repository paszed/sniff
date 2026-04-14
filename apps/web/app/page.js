"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sniff-watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sniff-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  async function handleTrack() {
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setItems([]);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setItems(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function saveItem(item) {
    const exists = watchlist.find((x) => x.url === item.url);
    if (exists) return;

    setWatchlist([item, ...watchlist]);
  }

  function removeItem(url) {
    setWatchlist(watchlist.filter((item) => item.url !== url));
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        padding: "60px 20px",
        fontFamily: "sans-serif"
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "52px", marginBottom: "8px" }}>Sniff</h1>

        <p style={{ color: "#666", marginBottom: "28px" }}>
          Track price changes on any product page.
        </p>

        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL..."
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #ddd"
            }}
          />

          <button
            onClick={handleTrack}
            disabled={loading}
            style={{
              padding: "15px 22px",
              borderRadius: "12px",
              border: "none",
              background: "#111",
              color: "white",
              fontWeight: "700"
            }}
          >
            {loading ? "Loading..." : "Track"}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "#ffeaea",
              color: "#b00020",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "18px"
            }}
          >
            {error}
          </div>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
            }}
          >
            <h2>{item.title}</h2>
            <div style={{ fontSize: "38px", fontWeight: "800" }}>
              £{item.price}
            </div>

            <p style={{ color: "#666", fontSize: "14px" }}>{item.url}</p>

            <button
              onClick={() => saveItem(item)}
              style={{
                marginTop: "12px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                background: "#111",
                color: "white"
              }}
            >
              Save to Watchlist
            </button>
          </div>
        ))}

        {watchlist.length > 0 && (
          <>
            <h2 style={{ marginTop: "40px", marginBottom: "16px" }}>
              Watchlist
            </h2>

            {watchlist.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "18px",
                  borderRadius: "14px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <strong>{item.title}</strong>
                  <div>£{item.price}</div>
                </div>

                <button
                  onClick={() => removeItem(item.url)}
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#eee"
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
