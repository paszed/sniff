export default function ProductCard({ item, onSave }) {
  if (!item) return null;

  return (
    <section style={wrap}>
      <div style={card}>
        <div style={content}>
          <p style={eyebrow}>TRACKED RESULT</p>

          <h2 style={title}>{item.title}</h2>

          <div style={price}>{item.price}</div>

          <p style={url}>{item.url}</p>
        </div>

        <div style={actions}>
          <button
            onClick={() => onSave(item)}
            style={button}
          >
            Save to Watchlist
          </button>
        </div>
      </div>
    </section>
  );
}

const wrap = {
  marginTop: "28px",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "24px",
  padding: "28px",
  borderRadius: "24px",
  background: "#ffffff",
  boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
};

const content = {
  flex: 1,
};

const eyebrow = {
  margin: "0 0 10px",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "0.12em",
  color: "#2563eb",
};

const title = {
  margin: "0 0 12px",
  fontSize: "42px",
  lineHeight: "1.1",
  fontWeight: "900",
  color: "#0f172a",
};

const price = {
  fontSize: "54px",
  fontWeight: "900",
  color: "#2563eb",
  marginBottom: "12px",
};

const url = {
  margin: 0,
  fontSize: "14px",
  color: "#64748b",
  wordBreak: "break-all",
};

const actions = {
  display: "flex",
  alignItems: "center",
};

const button = {
  border: "none",
  borderRadius: "14px",
  padding: "14px 18px",
  background: "#2563eb",
  color: "#ffffff",
  fontWeight: "800",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
