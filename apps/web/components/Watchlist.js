import theme from "../styles/theme";

export default function WatchList({ items, onRemove }) {
  if (!items.length) {
    return <div style={empty}>No tracked products yet.</div>;
  }

  return (
    <div style={list}>
      {items.map((item, index) => {
        const image =
          item.image ||
          "https://via.placeholder.com/96x96?text=Item";

        return (
          <article key={item.id || index} style={card}>
            <div style={left}>
              <div style={thumbWrap}>
                <img src={image} alt={item.title} style={thumb} />
              </div>

              <div style={meta}>
                <h3 style={title}>{item.title}</h3>
                <p style={price}>{item.price}</p>
                <p style={url}>{item.url}</p>
              </div>
            </div>

            <button
              style={removeBtn}
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </article>
        );
      })}
    </div>
  );
}

const list = {
  display: "grid",
  gap: "16px",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "24px",
  padding: "22px",
  borderRadius: theme.radius.lg,
  background: "#ffffff",
  boxShadow: theme.shadow.card,
};

const left = {
  display: "flex",
  gap: "18px",
  alignItems: "center",
  minWidth: 0,
  flex: 1,
};

const thumbWrap = {
  width: "96px",
  height: "96px",
  borderRadius: "18px",
  overflow: "hidden",
  background: "#f3f4f6",
  flexShrink: 0,
};

const thumb = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const meta = {
  minWidth: 0,
};

const title = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "800",
  color: "#111827",
};

const price = {
  margin: "6px 0",
  fontSize: "38px",
  fontWeight: "900",
  color: theme.colors.accent,
};

const url = {
  margin: 0,
  fontSize: "13px",
  color: "#6b7280",
  overflowWrap: "anywhere",
};

const removeBtn = {
  padding: "10px 14px",
  border: "none",
  borderRadius: "12px",
  background: "#ffe4e6",
  color: "#be123c",
  fontWeight: "700",
  cursor: "pointer",
  flexShrink: 0,
};

const empty = {
  padding: "24px",
  borderRadius: theme.radius.lg,
  background: "#ffffff",
  color: "#6b7280",
};
