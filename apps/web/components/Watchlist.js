"use client";

export default function Watchlist({ items, onRemove }) {
  if (!items?.length) return null;

  return (
    <section>
      <h2 style={heading}>Watchlist</h2>

      {items.map((item) => (
        <div key={item.url} style={row}>
          <div style={{ flex: 1 }}>
            <strong style={name}>{item.title}</strong>

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
          </div>

          <button
            onClick={() => onRemove(item.url)}
            style={button}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
}

const heading = {
  fontSize: "34px",
  marginBottom: "16px",
};

const row = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
  background: "#fff",
  padding: "18px",
  borderRadius: "14px",
  marginBottom: "12px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
};

const name = {
  display: "block",
  fontSize: "18px",
};

const price = {
  marginTop: "6px",
  fontWeight: 700,
  fontSize: "24px",
};

const link = {
  display: "block",
  marginTop: "6px",
  color: "#666",
  textDecoration: "none",
  wordBreak: "break-all",
  fontSize: "13px",
};

const button = {
  padding: "10px 14px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  background: "#f8f8f8",
  cursor: "pointer",
};
