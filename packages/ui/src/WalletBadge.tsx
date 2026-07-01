import { JackpotTicker } from "./JackpotTicker";

/** Saldo WhyCoins con moneta lucida e contatore animato. */
export function WalletBadge({ coins }: { coins: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 12px 7px 8px",
        borderRadius: "var(--wc-radius-pill)",
        background:
          "linear-gradient(180deg, rgba(245,197,66,0.14), rgba(245,197,66,0.05))",
        border: "1px solid rgba(245,197,66,0.32)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        fontFamily: "var(--wc-font-display)",
        fontWeight: 700,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "relative",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 34% 28%, #fff2c2, var(--wc-gold) 62%, #b8860b)",
          boxShadow:
            "0 0 10px rgba(245,197,66,0.55), inset 0 -2px 3px rgba(140,90,0,0.5)",
          display: "grid",
          placeItems: "center",
          color: "#7a5200",
          fontSize: 11,
          fontWeight: 800,
        }}
      >
        W
      </span>
      <span className="wc-num" style={{ color: "var(--wc-gold-2)", fontSize: 15 }}>
        <JackpotTicker value={coins} />
      </span>
      <span
        style={{
          color: "var(--wc-text-mute)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.4,
        }}
      >
        WC
      </span>
    </span>
  );
}
