import { JackpotTicker } from "./JackpotTicker";

/** Saldo WhyCoins con contatore animato. */
export function WalletBadge({ coins }: { coins: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: "var(--wc-radius-pill)",
        background: "var(--wc-surface-2)",
        border: "1px solid var(--wc-surface-border)",
        fontWeight: 800,
        fontFamily: "var(--wc-font-display)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #ffe38a, var(--wc-gold))",
          boxShadow: "0 0 10px rgba(245,197,66,0.6)",
        }}
      />
      <span style={{ color: "var(--wc-gold)" }}>
        <JackpotTicker value={coins} />
      </span>
      <span style={{ color: "var(--wc-text-dim)", fontSize: 12, fontWeight: 600 }}>
        WC
      </span>
    </span>
  );
}
