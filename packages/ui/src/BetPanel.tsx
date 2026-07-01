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
    <div className="wc-surface" style={{ padding: 16, display: "grid", gap: 13 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            color: "var(--wc-text-dim)",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          Puntata
        </span>
        <span
          className="wc-num"
          style={{
            fontFamily: "var(--wc-font-display)",
            fontWeight: 700,
            fontSize: 22,
            color: "var(--wc-gold-2)",
          }}
        >
          {amount.toLocaleString("it-IT")} WC
        </span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          className="wc-tap"
          aria-label="Diminuisci puntata"
          onClick={() => setAmount((a) => clamp(a - 10))}
          style={stepBtn}
        >
          −
        </button>
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {STEPS.map((s) => (
            <button
              key={s}
              onClick={() => setAmount(clamp(s))}
              aria-pressed={amount === s}
              style={{ ...chip, ...(amount === s ? chipActive : null) }}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className="wc-tap"
          aria-label="Aumenta puntata"
          onClick={() => setAmount((a) => clamp(a + 10))}
          style={stepBtn}
        >
          +
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        onClick={() => onSpin(amount)}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "15px 18px",
          borderRadius: "var(--wc-radius)",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--wc-font-display)",
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: 0.2,
          color: "#0b0b12",
          background: "linear-gradient(135deg, var(--wc-violet-2), var(--wc-green))",
          boxShadow: "var(--wc-glow-violet)",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            animation: "wc-sheen 2.8s ease-in-out infinite",
          }}
        />
        <span style={{ position: "relative" }}>GHE-GO! Gira</span>
      </motion.button>

      <div
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "var(--wc-text-mute)",
          fontWeight: 600,
        }}
      >
        Saldo:{" "}
        <span className="wc-num" style={{ color: "var(--wc-text-dim)" }}>
          {balance.toLocaleString("it-IT")}
        </span>{" "}
        WhyCoins · solo dollari finti
      </div>
    </div>
  );
}

const stepBtn: React.CSSProperties = {
  width: 44,
  borderRadius: 11,
  border: "1px solid var(--wc-border)",
  background: "var(--wc-surface-2)",
  color: "var(--wc-text)",
  fontSize: 22,
  fontWeight: 700,
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
};
const chip: React.CSSProperties = {
  flex: 1,
  minHeight: 44,
  borderRadius: 11,
  border: "1px solid var(--wc-border)",
  background: "var(--wc-surface)",
  color: "var(--wc-text-dim)",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  WebkitTapHighlightColor: "transparent",
};
const chipActive: React.CSSProperties = {
  background: "rgba(139,92,246,0.24)",
  borderColor: "var(--wc-violet)",
  color: "var(--wc-text)",
  boxShadow: "inset 0 0 0 1px rgba(178,139,255,0.4)",
};
