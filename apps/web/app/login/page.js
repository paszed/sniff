"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) setMsg(error.message);
      else setMsg("Account created. Check your email.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setMsg(error.message);
      else router.push("/");
    }

    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 420, margin: "80px auto", padding: 24 }}>
      <h1 style={{ fontSize: 48, fontWeight: 700 }}>Login</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={button} disabled={loading}>
          {loading
            ? "Loading..."
            : mode === "signup"
            ? "Create Account"
            : "Login"}
        </button>
      </form>

      <button
        onClick={() =>
          setMode(mode === "login" ? "signup" : "login")
        }
        style={{ marginTop: 12 }}
      >
        {mode === "login"
          ? "Need an account? Sign up"
          : "Already have an account? Login"}
      </button>

      {msg && <p style={{ marginTop: 16 }}>{msg}</p>}
    </main>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const button = {
  width: "100%",
  padding: "12px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
