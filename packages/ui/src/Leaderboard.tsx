import { sortLeaderboard, type LeaderboardEntry } from "@whycasino/shared";

const PODIUM = [
  { ring: "var(--wc-gold)", h: 132, glow: "245,197,66" },
  { ring: "#cfd6e3", h: 100, glow: "207,214,227" },
  { ring: "#d38a4e", h: 80, glow: "211,138,78" },
];

function Crown({ color }: { color: string }) {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ filter: `drop-shadow(0 3px 8px rgba(245,197,66,0.7))` }}
    >
      <path
        d="M3 8.5l3.4 3.2L12 5l5.6 6.7L21 8.5 19.4 18H4.6L3 8.5Z"
        fill={color}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="4.4" r="1.5" fill={color} />
    </svg>
  );
}

function Sparkles() {
  const spots = [
    { top: -6, left: "18%", d: 0 },
    { top: 8, left: "84%", d: 0.6 },
    { top: 34, left: "6%", d: 1.1 },
    { top: 20, left: "96%", d: 1.6 },
  ];
  return (
    <>
      {spots.map((s, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: 8,
            height: 8,
            background:
              "conic-gradient(from 0deg, transparent, var(--wc-gold-2), transparent 60%)",
            borderRadius: 2,
            animation: `wc-sparkle 2.4s ease-in-out ${s.d}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

function Avatar({ glyph, size, ring }: { glyph: string; size: number; ring?: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "grid",
        placeItems: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        fontSize: size * 0.52,
        background: "var(--wc-surface-solid-2)",
        border: ring ? `2px solid ${ring}` : "1px solid var(--wc-border)",
        boxShadow: ring ? `0 0 16px -4px ${ring}` : "none",
        flex: "0 0 auto",
      }}
    >
      {glyph}
    </span>
  );
}

export function Leaderboard({
  entries,
  variant,
  meId = "me",
}: {
  entries: LeaderboardEntry[];
  variant: "daily" | "weekly";
  meId?: string;
}) {
  const sorted = sortLeaderboard(entries);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Podio teatrale: raggi dietro il #1, corona, barre che crescono, scintille */}
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: 10,
          alignItems: "end",
          justifyContent: "center",
          paddingTop: 34,
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        {/* raggi dorati dietro al centro */}
        <div
          aria-hidden
          className="wc-rays"
          style={
            {
              width: 340,
              height: 340,
              left: "50%",
              top: -6,
              transform: "translateX(-50%)",
              "--wc-ray-color": "rgba(245,197,66,0.4)",
              opacity: 0.7,
              zIndex: 0,
            } as React.CSSProperties
          }
        />
        {[1, 0, 2].map((idx) => {
          const e = top[idx];
          if (!e) return null;
          const p = PODIUM[idx];
          const isMe = e.player.id === meId;
          const isFirst = idx === 0;
          return (
            <div
              key={e.player.id}
              className="wc-reveal"
              style={
                {
                  position: "relative",
                  textAlign: "center",
                  width: 104,
                  zIndex: 1,
                  "--i": idx,
                } as React.CSSProperties
              }
            >
              {isFirst && <Sparkles />}
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 6,
                  position: "relative",
                }}
              >
                {isFirst && (
                  <span
                    style={{
                      position: "absolute",
                      top: -22,
                      animation: "wc-float 4s ease-in-out infinite",
                    }}
                  >
                    <Crown color="var(--wc-gold-2)" />
                  </span>
                )}
                <Avatar glyph={e.player.avatar || "🎭"} size={isFirst ? 60 : 46} ring={p.ring} />
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: isMe ? "var(--wc-violet-2)" : "var(--wc-text)",
                }}
              >
                {e.player.name}
              </div>
              <div
                className="wc-num"
                style={{ color: "var(--wc-gold-2)", fontWeight: 700, fontSize: 12 }}
              >
                {e.winnings.toLocaleString("it-IT")} WC
              </div>
              <div
                style={{
                  marginTop: 7,
                  height: p.h,
                  borderRadius: "12px 12px 0 0",
                  background: `linear-gradient(to top, rgba(${p.glow},0.05), rgba(${p.glow},0.5))`,
                  border: `1px solid rgba(${p.glow},0.4)`,
                  borderBottom: "none",
                  display: "grid",
                  placeItems: "start center",
                  paddingTop: 8,
                  fontFamily: "var(--wc-font-display)",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#0b0b12",
                  transformOrigin: "bottom",
                  animation: `wc-bar-rise 0.75s cubic-bezier(0.16,1,0.3,1) ${idx * 0.09}s both`,
                  boxShadow: isFirst
                    ? "0 0 40px -10px rgba(245,197,66,0.6)"
                    : "none",
                }}
              >
                <span
                  style={{
                    color: p.ring,
                    textShadow: `0 0 12px rgba(${p.glow},0.7)`,
                  }}
                >
                  {idx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resto della classifica */}
      <div className="wc-surface" style={{ overflow: "hidden" }}>
        {rest.map((e, i) => {
          const isMe = e.player.id === meId;
          return (
            <div
              key={e.player.id}
              className="wc-reveal"
              style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  borderTop: "1px solid var(--wc-border)",
                  background: isMe ? "rgba(139,92,246,0.12)" : "transparent",
                  "--i": i,
                } as React.CSSProperties
              }
            >
              <span
                className="wc-num"
                style={{
                  width: 22,
                  textAlign: "center",
                  color: "var(--wc-text-mute)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {i + 4}
              </span>
              <Avatar glyph={e.player.avatar || "🎭"} size={32} />
              <span
                style={{
                  fontWeight: 600,
                  flex: 1,
                  color: isMe ? "var(--wc-violet-2)" : "var(--wc-text)",
                }}
              >
                {e.player.name}
                {isMe && (
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#0b0b12",
                      background: "var(--wc-violet-2)",
                      borderRadius: "var(--wc-radius-pill)",
                      padding: "1px 7px",
                    }}
                  >
                    TU
                  </span>
                )}
              </span>
              <span
                className="wc-num"
                style={{ color: "var(--wc-gold-2)", fontWeight: 700, fontSize: 14 }}
              >
                {e.winnings.toLocaleString("it-IT")} WC
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", color: "var(--wc-text-mute)", fontSize: 12 }}>
        Classifica {variant === "daily" ? "giornaliera" : "settimanale"} · si azzera a fine{" "}
        {variant === "daily" ? "giornata" : "settimana"}
      </div>
    </div>
  );
}
