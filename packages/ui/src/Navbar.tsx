import type { ReactNode } from "react";
import { WalletBadge } from "./WalletBadge";

/** Top bar: brand + link desktop (children) + wallet.
 *  Su mobile i link spariscono (li gestisce la MobileTabBar); resta brand + wallet.
 *  I link sono passati dall'app per non accoppiare il router. */
export function Navbar({ coins, children }: { coins: number; children?: ReactNode }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        borderBottom: "1px solid var(--wc-border)",
        background: "rgba(6,6,12,0.7)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        paddingTop: "var(--wc-safe-top)",
      }}
    >
      <div
        className="wc-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          minHeight: 58,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <a
          href="/"
          aria-label="WhyCasinò — home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            textDecoration: "none",
            color: "var(--wc-text)",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "grid",
              placeItems: "center",
              width: 30,
              height: 30,
              borderRadius: 9,
              fontFamily: "var(--wc-font-display)",
              fontWeight: 700,
              fontSize: 16,
              color: "#0b0b12",
              background: "linear-gradient(140deg, var(--wc-violet-2), var(--wc-cyan))",
              boxShadow: "0 6px 18px -6px rgba(139,92,246,0.7)",
            }}
          >
            W
          </span>
          <span
            style={{
              fontFamily: "var(--wc-font-display)",
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: -0.6,
            }}
          >
            Why<span style={{ color: "var(--wc-violet-2)" }}>Casinò</span>
          </span>
        </a>

        <nav className="wc-topnav" style={{ gap: 4, marginLeft: 8 }}>
          {children}
        </nav>

        <div style={{ marginLeft: "auto" }}>
          <WalletBadge coins={coins} />
        </div>
      </div>
    </header>
  );
}
