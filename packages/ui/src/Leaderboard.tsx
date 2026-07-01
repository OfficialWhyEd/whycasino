import { sortLeaderboard, type LeaderboardEntry } from "@whycasino/shared";

const PODIUM = ["var(--wc-gold)", "#c9d3e0", "#cd7f45"];

export function Leaderboard({
  entries,
  variant,
}: {
  entries: LeaderboardEntry[];
  variant: "daily" | "weekly";
}) {
  const sorted = sortLeaderboard(entries);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "end", justifyContent: "center" }}>
        {[1, 0, 2].map((idx) => {
          const e = top[idx];
          if (!e) return null;
          const heights = [96, 128, 78];
          return (
            <div key={e.player.id} style={{ textAlign: "center", width: 96 }}>
              <div style={{ fontSize: 28 }}>{e.player.avatar || "👤"}</div>
              <div style={{ fontWeight: 800, fontSize: 13, whiteSpace: "nowrap" }}>
                {e.player.name}
              </div>
              <div style={{ color: "var(--wc-gold)", fontWeight: 700, fontSize: 12 }}>
                {e.winnings.toLocaleString("it-IT")} WC
              </div>
              <div
                style={{
                  marginTop: 6,
                  height: heights[idx],
                  borderRadius: "10px 10px 0 0",
                  background: `linear-gradient(to top, transparent, ${PODIUM[idx]})`,
                  opacity: 0.85,
                  display: "grid",
                  placeItems: "start center",
                  paddingTop: 6,
                  fontWeight: 800,
                  color: "#0b0b12",
                }}
              >
                {idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      <div className="wc-surface" style={{ overflow: "hidden" }}>
        {rest.map((e, i) => (
          <div
            key={e.player.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 16px",
              borderTop: "1px solid var(--wc-surface-border)",
            }}
          >
            <span style={{ width: 24, color: "var(--wc-text-dim)", fontWeight: 700 }}>
              {i + 4}
            </span>
            <span style={{ fontSize: 18 }}>{e.player.avatar || "👤"}</span>
            <span style={{ fontWeight: 600, flex: 1 }}>{e.player.name}</span>
            <span style={{ color: "var(--wc-gold)", fontWeight: 700 }}>
              {e.winnings.toLocaleString("it-IT")} WC
            </span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", color: "var(--wc-text-dim)", fontSize: 12 }}>
        Classifica {variant === "daily" ? "giornaliera" : "settimanale"} · si azzera a fine{" "}
        {variant === "daily" ? "giornata" : "settimana"}
      </div>
    </div>
  );
}
