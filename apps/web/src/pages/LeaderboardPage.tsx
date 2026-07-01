import { useState } from "react";
import { Leaderboard } from "@whycasino/ui";
import { DAILY, WEEKLY } from "../mock/players";
import { SectionTitle } from "../components/GamesGrid";

export function LeaderboardPage() {
  const [tab, setTab] = useState<"daily" | "weekly">("daily");
  return (
    <>
      <SectionTitle>🏆 Classifiche della crew</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["daily", "weekly"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 18px",
              borderRadius: "var(--wc-radius-pill)",
              border: "1px solid var(--wc-surface-border)",
              cursor: "pointer",
              fontWeight: 800,
              color: tab === t ? "#0b0b12" : "var(--wc-text-dim)",
              background:
                tab === t
                  ? "linear-gradient(135deg, var(--wc-gold), #ff9f43)"
                  : "var(--wc-surface)",
            }}
          >
            {t === "daily" ? "Giornaliera" : "Settimanale"}
          </button>
        ))}
      </div>
      <Leaderboard entries={tab === "daily" ? DAILY : WEEKLY} variant={tab} />
    </>
  );
}
