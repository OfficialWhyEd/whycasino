import type { ReactNode } from "react";
import { WalletBadge } from "./WalletBadge";

/** Barra superiore: brand + link (children) + wallet.
 *  I link sono passati dall'app (es. React Router NavLink) per non accoppiare il router. */
export function Navbar({ coins, children }: { coins: number; children?: ReactNode }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "12px 24px",
        background: "rgba(7,7,13,0.72)",
        borderBottom: "1px solid var(--wc-surface-border)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--wc-font-display)",
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: -0.5,
        }}
      >
        Why<span style={{ color: "var(--wc-neon-violet-2)" }}>Casinò</span>
      </div>
      <nav style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{children}</nav>
      <div style={{ marginLeft: "auto" }}>
        <WalletBadge coins={coins} />
      </div>
    </header>
  );
}
