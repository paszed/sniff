"use client";

export default function ProductCard({ item, onSave }) {
  if (!item) return null;

  return (
    <section style={card}>
      <h2 style={title}>{item.title}</h2>

      <div style={price}>
        {item.price ? `£${item.price}` : "--"}
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        style={link}
      >
        {item.url}
      </a>

      <button onClick={() => onSave(item)} style={button}>
        Save to Watchlist
      </button>
    </section>
  );
}

const card = {
  background: "#fff",
  borderRadius: "18px",
  padding: "28px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  marginBottom: "28px",
};

const title = {
  fontSize: "40px",
  margin: 0,
};

const price = {
  fontSize: "52px",
  fontWeight: 700,
  marginTop: "12px",
};

const link = {
  display: "block",
  marginTop: "10px",
  marginBottom: "16px",
  color: "#666",
  textDecoration: "none",
  wordBreak: "break-all",
};

const button = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "12px",
  background: "black",
  color: "white",
  cursor: "pointer",
};
