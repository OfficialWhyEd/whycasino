import { JackpotTicker } from "./JackpotTicker";

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  accent: string;
  live?: boolean;
}

/** Barra statistiche di piattaforma (giocatori online, tavoli, vinto oggi).
 *  Segnale di densità/liveness da casinò vero. Numeri animati + dot live. */
export function StatStrip({ stats }: { stats: StatItem[] }) {
  return (
    <div
      className="wc-surface"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        padding: "12px 6px",
        marginTop: 12,
        borderRadius: "var(--wc-radius-lg)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            display: "grid",
            gap: 2,
            justifyItems: "center",
            textAlign: "center",
            padding: "0 8px",
            borderLeft: i === 0 ? "none" : "1px solid var(--wc-border)",
          }}
        >
          <span
            className="wc-num"
            style={{
              fontFamily: "var(--wc-font-display)",
              fontWeight: 800,
              fontSize: "clamp(17px, 4.6vw, 22px)",
              lineHeight: 1,
              color: s.accent,
              letterSpacing: -0.5,
              display: "inline-flex",
              alignItems: "baseline",
              gap: 4,
            }}
          >
            <JackpotTicker value={s.value} />
            {s.suffix && (
              <span style={{ fontSize: 11, color: "var(--wc-text-mute)" }}>
                {s.suffix}
              </span>
            )}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 10.5,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.4,
              color: "var(--wc-text-mute)",
            }}
          >
            {s.live && (
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--wc-green)",
                  boxShadow: "0 0 8px var(--wc-green)",
                  animation: "wc-pulse-dot 1.5s ease-in-out infinite",
                }}
              />
            )}
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
