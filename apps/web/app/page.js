export default function HomePage() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Sniff</h1>
      <p>Track price changes on any product page.</p>

      <form style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Paste product URL..."
          style={{
            padding: "12px",
            width: "320px",
            marginRight: "10px"
          }}
        />
        <button
          type="button"
          style={{
            padding: "12px 18px",
            cursor: "pointer"
          }}
        >
          Track
        </button>
      </form>
    </main>
  );
}
