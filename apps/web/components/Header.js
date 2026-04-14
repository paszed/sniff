"use client";

export default function Header({ user, onLogout }) {
  return (
    <header style={wrap}>
      <div>
        <h1 style={logo}>Sniff</h1>
        <p style={tagline}>
          Track price changes on any product page.
        </p>

        {user?.email && (
          <p style={email}>Logged in as {user.email}</p>
        )}
      </div>

      <button onClick={onLogout} style={button}>
        Logout
      </button>
    </header>
  );
}

const wrap = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "32px",
};

const logo = {
  fontSize: "72px",
  lineHeight: 1,
  margin: 0,
};

const tagline = {
  fontSize: "24px",
  color: "#555",
  marginTop: "12px",
};

const email = {
  marginTop: "10px",
  color: "#777",
};

const button = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "12px",
  background: "black",
  color: "white",
  cursor: "pointer",
};
