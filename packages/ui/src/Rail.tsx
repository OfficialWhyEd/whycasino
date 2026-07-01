import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

/** Header di sezione: icona + titolo + azione "vedi tutti". */
export function SectionHeader({
  title,
  icon,
  accent = "var(--wc-violet-2)",
  count,
  action,
}: {
  title: string;
  icon?: IconName;
  accent?: string;
  count?: number;
  action?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "26px 0 12px",
      }}
    >
      {icon && (
        <span
          aria-hidden
          style={{
            display: "grid",
            placeItems: "center",
            width: 30,
            height: 30,
            borderRadius: 9,
            color: accent,
            background: "var(--wc-surface-2)",
            border: "1px solid var(--wc-border)",
            flex: "0 0 auto",
          }}
        >
          <Icon name={icon} size={17} />
        </span>
      )}
      <h2
        style={{
          fontFamily: "var(--wc-font-display)",
          fontWeight: 700,
          fontSize: 19,
          letterSpacing: -0.4,
          margin: 0,
        }}
      >
        {title}
      </h2>
      {count != null && (
        <span
          className="wc-num"
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--wc-text-mute)",
            background: "var(--wc-surface-2)",
            border: "1px solid var(--wc-border)",
            borderRadius: "var(--wc-radius-pill)",
            padding: "2px 9px",
          }}
        >
          {count}
        </span>
      )}
      <div style={{ marginLeft: "auto" }}>{action}</div>
    </div>
  );
}

/** Rail orizzontale con scroll-snap. Su desktop mostra le stesse card senza troncare. */
export function Rail({ children }: { children: ReactNode }) {
  return (
    <div
      className="wc-rail wc-rail-bleed"
      role="list"
      aria-label="Scorri i giochi"
    >
      {children}
    </div>
  );
}
