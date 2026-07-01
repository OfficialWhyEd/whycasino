import { WalletBadge } from "@whycasino/ui";
import { ME } from "../mock/players";
import { MY_WALLET, ACHIEVEMENTS } from "../mock/wallet";
import { AchievementBadge } from "@whycasino/ui";
import { SectionTitle } from "../components/GamesGrid";

const STATS = [
  { label: "Giri totali", value: "1.284" },
  { label: "Vincita record", value: "48.000 WC" },
  { label: "Gioco preferito", value: "Crazy Orani" },
  { label: "Achievement", value: `${ACHIEVEMENTS.filter((a) => a.unlocked).length}/${ACHIEVEMENTS.length}` },
];

export function ProfilePage() {
  return (
    <>
      <div
        className="wc-surface"
        style={{ padding: 24, display: "flex", alignItems: "center", gap: 18, marginTop: 8 }}
      >
        <div style={{ fontSize: 46 }}>{ME.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--wc-font-display)", fontWeight: 800, fontSize: 26 }}>
            {ME.name}
          </div>
          <div style={{ color: "var(--wc-text-dim)", fontSize: 13 }}>Membro fondatore della crew</div>
        </div>
        <WalletBadge coins={MY_WALLET.coins} />
      </div>

      <SectionTitle>Statistiche</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="wc-surface" style={{ padding: 16 }}>
            <div style={{ color: "var(--wc-text-dim)", fontSize: 12 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--wc-font-display)", fontWeight: 800, fontSize: 22 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Achievement</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {ACHIEVEMENTS.map((a) => (
          <AchievementBadge key={a.id} achievement={a} />
        ))}
      </div>
    </>
  );
}
