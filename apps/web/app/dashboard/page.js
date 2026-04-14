"use client";

import useAuth from "../../hooks/useAuth";
import useWatchlist from "../../hooks/useWatchList";
import theme from "../../styles/theme";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { watchlist } = useWatchlist(user);

  if (loading) {
    return <main style={loadingWrap}>Loading...</main>;
  }

  const trackedCount = watchlist.length;
  const latest = watchlist.slice(0, 5);

  return (
    <main style={page}>
      <div style={container}>
        <header style={header}>
          <div>
            <p style={eyebrow}>DASHBOARD</p>
            <h1 style={title}>Overview</h1>
            <p style={subtitle}>
              Live data from your saved tracked products.
            </p>
          </div>

          <a href="/" style={button}>
            Back Home
          </a>
        </header>

        <section style={statsGrid}>
          <div style={card}>
            <p style={label}>Tracked Items</p>
            <h2 style={value}>{trackedCount}</h2>
          </div>

          <div style={card}>
            <p style={label}>Logged In</p>
            <h2 style={smallValue}>
              {user?.email ? "Yes" : "No"}
            </h2>
          </div>

          <div style={card}>
            <p style={label}>Recent Items</p>
            <h2 style={value}>{latest.length}</h2>
          </div>
        </section>

        <section style={section}>
          <div style={sectionHead}>
            <h2 style={sectionTitle}>Tracked Products</h2>
            <span style={pill}>{trackedCount} total</span>
          </div>

          {trackedCount === 0 ? (
            <div style={empty}>
              No tracked products yet.
            </div>
          ) : (
            <div style={list}>
              {latest.map((item, index) => (
                <div key={item.id || index} style={row}>
                  <div>
                    <h3 style={rowTitle}>{item.title}</h3>
                    <p style={rowSub}>{item.url}</p>
                  </div>

                  <strong style={price}>
                    {item.price}
                  </strong>
                </div>
              ))}
            </div>
          )}
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

const loadingWrap = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: theme.colors.bg,
  color: theme.colors.text,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "28px",
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
  margin: "8px 0 12px",
  color: theme.colors.text,
};

const subtitle = {
  ...theme.text.body,
  color: theme.colors.muted,
  margin: 0,
};

const button = {
  padding: "12px 16px",
  borderRadius: theme.radius.md,
  background: theme.colors.primary,
  color: "#fff",
  textDecoration: "none",
  fontWeight: "700",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const card = {
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.lg,
  padding: "20px",
};

const label = {
  margin: 0,
  color: theme.colors.muted,
  fontSize: "14px",
};

const value = {
  margin: "10px 0 0",
  fontSize: "34px",
  color: theme.colors.text,
};

const smallValue = {
  margin: "10px 0 0",
  fontSize: "26px",
  color: theme.colors.text,
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

const empty = {
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.lg,
  padding: "24px",
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
  fontSize: "13px",
};

const price = {
  color: theme.colors.primary,
  fontSize: "22px",
};
