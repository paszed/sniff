"use client";

import { useState } from "react";
import theme from "../styles/theme";

export default function ProductCard({ item, onSave }) {
  const [failed, setFailed] = useState(false);

  if (!item) return null;

  const src =
    !failed && item.image
      ? item.image
      : "https://via.placeholder.com/120x120?text=Product";

  return (
    <section style={card}>
      <div style={thumb}>
        <img
          src={src}
          alt={item.title}
          style={imgStyle}
          onError={() => setFailed(true)}
        />
      </div>

      <div style={content}>
        <h3 style={title}>{item.title}</h3>
        <p style={price}>{item.price}</p>
        <p style={url}>{item.url}</p>

        <button style={button} onClick={() => onSave(item)}>
          Save to Watchlist
        </button>
      </div>
    </section>
  );
}

const card = {
  marginTop: "28px",
  display: "grid",
  gridTemplateColumns: "120px 1fr",
  gap: "20px",
  background: "#ffffff",
  borderRadius: theme.radius.lg,
  padding: "22px",
  boxShadow: theme.shadow.card,
  alignItems: "center",
};

const thumb = {
  width: "120px",
  height: "120px",
  borderRadius: "16px",
  overflow: "hidden",
  background: "#f3f4f6",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const content = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const title = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "800",
  color: "#111827",
};

const price = {
  margin: 0,
  fontSize: "34px",
  fontWeight: "900",
  color: theme.colors.accent,
};

const url = {
  margin: 0,
  color: "#6b7280",
  fontSize: "14px",
  overflowWrap: "anywhere",
};

const button = {
  marginTop: "10px",
  alignSelf: "flex-start",
  border: "none",
  background: "#111827",
  color: "#ffffff",
  padding: "12px 16px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
};
