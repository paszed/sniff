"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useWatchlist(user) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    loadItems();
  }, [user]);

  async function loadItems() {
    const { data, error } = await supabase
      .from("tracked_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setWatchlist(data);
    }
  }

  async function addItem(item) {
    if (!user || !item) return;

    const { error } = await supabase.from("tracked_items").insert({
      user_id: user.id,
      title: item.title,
      url: item.url,
      price: item.price,
    });

    if (!error) {
      loadItems();
    }
  }

  async function removeItem(id) {
    const { error } = await supabase
      .from("tracked_items")
      .delete()
      .eq("id", id);

    if (!error) {
      loadItems();
    }
  }

  return {
    watchlist,
    addItem,
    removeItem,
  };
}
