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

      <TrackerForm onResult={setItem} />

      <ProductCard item={item} onSave={addItem} />

      <Watchlist
        items={watchlist}
        onRemove={removeItem}
      />
    </main>
  );
}

const wrap = {
  maxWidth: "920px",
  margin: "0 auto",
  padding: "60px 24px",
};
