"use client";

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useWatchlist from "../hooks/useWatchlist";

import Header from "../components/Header";
import TrackerForm from "../components/TrackerForm";
import ProductCard from "../components/ProductCard";
import Watchlist from "../components/Watchlist";

export default function HomePage() {
  const { user, loading, logout } = useAuth();
  const { watchlist, addItem, removeItem } = useWatchlist(user);

  const [item, setItem] = useState(null);

  if (loading) {
    return <main style={{ padding: 40 }}>Loading...</main>;
  }

  return (
    <main style={wrap}>
      <Header user={user} onLogout={logout} />

      <section style={hero}>
        <p style={eyebrow}>PRICE TRACKER</p>

        <h1 style={heroTitle}>
          Track prices automatically
        </h1>

        <p style={heroText}>
          Paste any product URL and monitor price changes instantly.
        </p>

        <TrackerForm onResult={setItem} />
      </section>

      <ProductCard item={item} onSave={addItem} />

      <Watchlist
        items={watchlist}
        onRemove={removeItem}
      />
    </main>
  );
}

const wrap = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "48px 24px 80px",
};

const hero = {
  marginTop: "32px",
  padding: "28px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
};

const eyebrow = {
  margin: 0,
  fontSize: "13px",
  fontWeight: "800",
  letterSpacing: "0.12em",
  color: "#4f7cff",
};

const heroTitle = {
  margin: "12px 0 10px",
  fontSize: "64px",
  lineHeight: "1",
  fontWeight: "900",
  color: "#ffffff",
};

const heroText = {
  margin: "0 0 28px",
  fontSize: "22px",
  color: "#cbd5e1",
};
