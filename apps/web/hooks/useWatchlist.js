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
    const { data } = await supabase
      .from("tracked_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setWatchlist(data || []);
  }

  async function addItem(item) {
    if (!user || !item) return;

    const { data: existing } = await supabase
      .from("tracked_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("url", item.url)
      .maybeSingle();

    if (existing) {
      const oldPrice = Number(existing.price);
      const newPrice = Number(item.price);

      let status = "same";
      if (newPrice < oldPrice) status = "down";
      if (newPrice > oldPrice) status = "up";

      await supabase
        .from("tracked_items")
        .update({
          title: item.title,
          image: item.image,
          previous_price: oldPrice,
          price: newPrice,
          status,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("tracked_items").insert({
        user_id: user.id,
        title: item.title,
        url: item.url,
        image: item.image,
        price: Number(item.price),
        previous_price: Number(item.price),
        status: "same",
      });
    }

    loadItems();
  }

  async function removeItem(id) {
    await supabase.from("tracked_items").delete().eq("id", id);
    loadItems();
  }

  return {
    watchlist,
    addItem,
    removeItem,
  };
}
