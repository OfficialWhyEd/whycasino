import type { Achievement } from "@whycasino/shared";
import { Icon } from "./Icon";

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  const { unlocked, label, description, reward } = achievement;
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 14,
        borderRadius: "var(--wc-radius)",
        background: unlocked ? "var(--wc-surface-2)" : "var(--wc-surface)",
        border: unlocked
          ? "1px solid rgba(245,197,66,0.3)"
          : "1px solid var(--wc-border)",
        opacity: unlocked ? 1 : 0.62,
      }}
    >
      <div
        aria-hidden
        style={{
          width: 44,
          height: 44,
          flex: "0 0 auto",
          display: "grid",
          placeItems: "center",
          borderRadius: 12,
          color: unlocked ? "#5a3d00" : "var(--wc-text-mute)",
          background: unlocked
            ? "radial-gradient(circle at 35% 28%, var(--wc-gold-2), var(--wc-gold) 65%, #c8901f)"
            : "var(--wc-surface-solid-2)",
          boxShadow: unlocked ? "0 0 16px -4px rgba(245,197,66,0.6)" : "none",
        }}
      >
        <Icon name={unlocked ? "trophy" : "lock"} size={22} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontFamily: "var(--wc-font-display)" }}>
          {label}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--wc-text-dim)", lineHeight: 1.35 }}>
          {description}
        </div>
        <div
          className="wc-num"
          style={{
            fontSize: 12,
            color: "var(--wc-gold-2)",
            fontWeight: 700,
            marginTop: 3,
          }}
        >
          +{reward.toLocaleString("it-IT")} WC
        </div>
      </div>
    </div>
  );
}
