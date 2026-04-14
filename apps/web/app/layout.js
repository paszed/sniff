export const metadata = {
  title: "Sniff",
  description: "Track price changes"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
