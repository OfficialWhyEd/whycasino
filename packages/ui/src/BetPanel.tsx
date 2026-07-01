import { useState } from "react";
import { motion } from "framer-motion";

const STEPS = [10, 50, 100, 500];

/** Pannello scommessa (solo UI in questo sotto-progetto). */
export function BetPanel({
  balance,
  onSpin,
}: {
  balance: number;
  onSpin: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(50);
  const clamp = (n: number) => Math.max(10, Math.min(balance, n));

  return (
    <div className="wc-surface" style={{ padding: 18, display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ color: "var(--wc-text-dim)", fontSize: 13 }}>Puntata</span>
        <span style={{ fontFamily: "var(--wc-font-display)", fontWeight: 800, fontSize: 22 }}>
          {amount.toLocaleString("it-IT")} WC
        </span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setAmount((a) => clamp(a - 10))} style={stepBtn}>
          −
        </button>
        <div style={{ display: "flex", gap: 8, flex: 1 }}>
          {STEPS.map((s) => (
            <button
              key={s}
              onClick={() => setAmount(clamp(s))}
              style={{ ...chip, ...(amount === s ? chipActive : null) }}
            >
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => setAmount((a) => clamp(a + 10))} style={stepBtn}>
          +
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSpin(amount)}
        style={{
          padding: "14px 18px",
          borderRadius: "var(--wc-radius)",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--wc-font-display)",
          fontWeight: 800,
          fontSize: 16,
          color: "#0b0b12",
          background: "linear-gradient(135deg, var(--wc-neon-violet-2), var(--wc-neon-green))",
          boxShadow: "var(--wc-glow)",
        }}
      >
        GHE-GO! Gira
      </motion.button>
    </div>
  );
}

const stepBtn: React.CSSProperties = {
  width: 42,
  borderRadius: 10,
  border: "1px solid var(--wc-surface-border)",
  background: "var(--wc-surface-2)",
  color: "var(--wc-text)",
  fontSize: 20,
  cursor: "pointer",
};
const chip: React.CSSProperties = {
  flex: 1,
  padding: "8px 0",
  borderRadius: 10,
  border: "1px solid var(--wc-surface-border)",
  background: "var(--wc-surface)",
  color: "var(--wc-text-dim)",
  fontWeight: 700,
  cursor: "pointer",
};
const chipActive: React.CSSProperties = {
  background: "rgba(139,92,246,0.25)",
  borderColor: "var(--wc-neon-violet)",
  color: "var(--wc-text)",
};
