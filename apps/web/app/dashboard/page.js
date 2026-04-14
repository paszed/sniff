import theme from "../../styles/theme";

export default function DashboardPage() {
  const stats = [
    { label: "Tracked Items", value: "12" },
    { label: "Price Drops", value: "3" },
    { label: "Saved Alerts", value: "8" },
    { label: "Last Scan", value: "2 min ago" },
  ];

  const activity = [
    {
      title: "A Light in the Attic",
      price: "£51.77",
      change: "-4%",
      status: "drop",
    },
    {
      title: "Gaming Mouse X2",
      price: "$39.99",
      change: "+2%",
      status: "up",
    },
    {
      title: "Mechanical Keyboard",
      price: "$89.00",
      change: "No change",
      status: "same",
    },
  ];

  return (
    <main style={page}>
      <div style={container}>
        <header style={header}>
          <div>
            <p style={eyebrow}>DASHBOARD</p>
            <h1 style={title}>Overview</h1>
            <p style={subtitle}>
              Monitor tracked products, recent movements, and alerts.
            </p>
          </div>

          <a href="/" style={linkBtn}>
            Back Home
          </a>
        </header>

        <section style={grid}>
          {stats.map((item) => (
            <div key={item.label} style={card}>
              <p style={cardLabel}>{item.label}</p>
              <h2 style={cardValue}>{item.value}</h2>
            </div>
          ))}
        </section>

        <section style={section}>
          <div style={sectionHead}>
            <h2 style={sectionTitle}>Recent Activity</h2>
            <span style={pill}>{activity.length} events</span>
          </div>

          <div style={list}>
            {activity.map((item) => (
              <div key={item.title} style={row}>
                <div>
                  <h3 style={rowTitle}>{item.title}</h3>
                  <p style={rowSub}>{item.price}</p>
                </div>

                <span
                  style={{
                    ...badge,
                    ...(item.status === "drop"
                      ? drop
                      : item.status === "up"
                      ? up
                      : neutral),
                  }}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: theme.colors.bg,
  padding: "40px 24px 80px",
};

const container = {
  maxWidth: theme.layout.maxWidth,
  margin: "0 auto",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  alignItems: "flex-start",
  marginBottom: "28px",
  flexWrap: "wrap",
};

const eyebrow = {
  margin: 0,
  color: theme.colors.accent,
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1.5px",
};

const title = {
  ...theme.text.hero,
  fontSize: "48px",
  margin: "10px 0 12px",
  color: theme.colors.text,
};

const subtitle = {
  ...theme.text.body,
  color: theme.colors.muted,
  margin: 0,
};

const linkBtn = {
  padding: "12px 16px",
  borderRadius: theme.radius.md,
  textDecoration: "none",
  color: "#fff",
  background: theme.colors.primary,
  fontWeight: "700",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const card = {
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.lg,
  padding: "20px",
  boxShadow: theme.shadow.card,
};

const cardLabel = {
  margin: 0,
  color: theme.colors.muted,
  fontSize: "14px",
};

const cardValue = {
  margin: "10px 0 0",
  color: theme.colors.text,
  fontSize: "34px",
};

const section = {
  marginTop: "28px",
};

const sectionHead = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "14px",
};

const sectionTitle = {
  ...theme.text.h2,
  margin: 0,
};

const pill = {
  padding: "8px 12px",
  borderRadius: theme.radius.pill,
  border: `1px solid ${theme.colors.border}`,
  color: theme.colors.muted,
};

const list = {
  display: "grid",
  gap: "14px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  padding: "18px",
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.lg,
};

const rowTitle = {
  margin: 0,
  color: theme.colors.text,
  fontSize: "18px",
};

const rowSub = {
  margin: "6px 0 0",
  color: theme.colors.muted,
  fontSize: "14px",
};

const badge = {
  padding: "8px 12px",
  borderRadius: theme.radius.pill,
  fontWeight: "700",
  fontSize: "14px",
};

const drop = {
  background: "rgba(16,185,129,0.15)",
  color: "#34d399",
};

const up = {
  background: "rgba(239,68,68,0.15)",
  color: "#f87171",
};

const neutral = {
  background: "rgba(255,255,255,0.08)",
  color: "#cbd5e1",
};
