export default function Watchlist({ items, onRemove }) {
  if (!items?.length) {
    return (
      <section style={section}>
        <div style={headerRow}>
          <h2 style={title}>Watchlist</h2>
          <span style={badge}>0 items</span>
        </div>

        <div style={emptyBox}>
          <p style={emptyTitle}>No tracked items yet</p>
          <p style={emptyText}>
            Add a product URL above and start tracking price changes.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={section}>
      <div style={headerRow}>
        <h2 style={title}>Watchlist</h2>
        <span style={badge}>{items.length} items</span>
      </div>

      <div style={list}>
        {items.map((item) => (
          <div key={item.id} style={card}>
            <div style={left}>
              <h3 style={itemTitle}>{item.title}</h3>
              <div style={price}>{item.price}</div>
              <p style={url}>{item.url}</p>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              style={removeBtn}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

const section = {
  marginTop: "32px",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};

const title = {
  fontSize: "38px",
  fontWeight: "800",
  margin: 0,
  color: "#ffffff",
};

const badge = {
  fontSize: "14px",
  color: "#cbd5e1",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "6px 10px",
  borderRadius: "999px",
};

const list = {
  display: "grid",
  gap: "16px",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "22px",
  borderRadius: "18px",
  background: "#ffffff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const left = {
  flex: 1,
};

const itemTitle = {
  margin: "0 0 10px",
  fontSize: "28px",
  fontWeight: "800",
  color: "#0f172a",
};

const price = {
  fontSize: "34px",
  fontWeight: "900",
  color: "#2563eb",
  marginBottom: "8px",
};

const url = {
  margin: 0,
  fontSize: "14px",
  color: "#64748b",
  wordBreak: "break-all",
};

const removeBtn = {
  border: "none",
  borderRadius: "12px",
  padding: "12px 16px",
  background: "#fee2e2",
  color: "#b91c1c",
  fontWeight: "700",
  cursor: "pointer",
};

const emptyBox = {
  padding: "28px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const emptyTitle = {
  margin: "0 0 8px",
  fontSize: "22px",
  fontWeight: "700",
  color: "#ffffff",
};

const emptyText = {
  margin: 0,
  color: "#94a3b8",
};
