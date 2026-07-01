import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export interface TabItem {
  to: string;
  label: string;
  icon: IconName;
  /** true se è il tab attivo */
  active?: boolean;
}

/** Bottom tab bar nativa (mobile). I link sono renderizzati dall'app tramite `renderLink`
 *  per non accoppiare il router. Safe-area inclusa, tap target ≥44px, glass. */
export function MobileTabBar({
  items,
  renderLink,
}: {
  items: TabItem[];
  renderLink: (item: TabItem, content: ReactNode) => ReactNode;
}) {
  return (
    <nav
      aria-label="Navigazione principale"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        alignItems: "stretch",
        paddingBottom: "var(--wc-safe-bottom)",
        paddingLeft: "var(--wc-safe-left)",
        paddingRight: "var(--wc-safe-right)",
        background:
          "linear-gradient(180deg, rgba(9,9,18,0.72), rgba(6,6,12,0.94))",
        borderTop: "1px solid var(--wc-border)",
        backdropFilter: "blur(18px) saturate(1.2)",
        WebkitBackdropFilter: "blur(18px) saturate(1.2)",
        boxShadow: "0 -12px 34px -22px rgba(0,0,0,0.9)",
      }}
    >
      {items.map((item) =>
        renderLink(
          item,
          <span
            className="wc-tap"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              height: 58,
              color: item.active ? "var(--wc-violet-2)" : "var(--wc-text-mute)",
              transition: "color 0.2s ease, transform 0.2s ease",
              position: "relative",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {item.active && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 6,
                  width: 26,
                  height: 3,
                  borderRadius: 3,
                  background: "var(--wc-violet-2)",
                  boxShadow: "0 0 12px rgba(178,139,255,0.8)",
                }}
              />
            )}
            <span
              aria-hidden
              style={{
                transform: item.active ? "translateY(-1px) scale(1.06)" : "none",
                transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <Icon name={item.icon} size={22} strokeWidth={item.active ? 2.3 : 2} />
            </span>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: item.active ? 700 : 600,
                letterSpacing: 0.1,
              }}
            >
              {item.label}
            </span>
          </span>,
        ),
      )}
    </nav>
  );
}
