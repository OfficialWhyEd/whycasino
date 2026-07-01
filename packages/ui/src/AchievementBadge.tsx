import type { Achievement } from "@whycasino/shared";

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  const { unlocked, label, description, reward } = achievement;
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 14,
        borderRadius: "var(--wc-radius)",
        background: "var(--wc-surface)",
        border: "1px solid var(--wc-surface-border)",
        opacity: unlocked ? 1 : 0.55,
      }}
    >
      <div
        aria-hidden
        style={{
          width: 42,
          height: 42,
          flex: "0 0 auto",
          display: "grid",
          placeItems: "center",
          borderRadius: 12,
          fontSize: 22,
          background: unlocked
            ? "linear-gradient(135deg, var(--wc-gold), #ff9f43)"
            : "var(--wc-surface-2)",
          boxShadow: unlocked ? "0 0 16px rgba(245,197,66,0.5)" : "none",
        }}
      >
        {unlocked ? "🏆" : "🔒"}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 800 }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--wc-text-dim)" }}>{description}</div>
        <div style={{ fontSize: 12, color: "var(--wc-gold)", fontWeight: 700, marginTop: 2 }}>
          +{reward.toLocaleString("it-IT")} WC
        </div>
      </div>
    </div>
  );
}
