import theme from "../styles/theme";

export const metadata = {
  title: "Sniff",
  description: "Track prices automatically",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={body}>
        <div style={bgGlowOne} />
        <div style={bgGlowTwo} />

        <div style={shell}>
          {children}
        </div>
      </body>
    </html>
  );
}

const body = {
  margin: 0,
  padding: 0,
  background: theme.colors.bg,
  color: theme.colors.text,
  fontFamily:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  minHeight: "100vh",
  position: "relative",
  overflowX: "hidden",
};

const shell = {
  position: "relative",
  zIndex: 2,
};

const bgGlowOne = {
  position: "fixed",
  top: "-120px",
  left: "-120px",
  width: "420px",
  height: "420px",
  borderRadius: "50%",
  background: "rgba(79,140,255,0.18)",
  filter: "blur(120px)",
  zIndex: 0,
};

const bgGlowTwo = {
  position: "fixed",
  bottom: "-180px",
  right: "-140px",
  width: "520px",
  height: "520px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.06)",
  filter: "blur(140px)",
  zIndex: 0,
};
