import { WalletBadge, AchievementBadge, SectionHeader } from "@whycasino/ui";
import { ME } from "../mock/players";
import { MY_WALLET, ACHIEVEMENTS } from "../mock/wallet";

const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length;

const LEVEL = 7;
const XP_NOW = 6820;
const XP_NEXT = 10000;
const XP_PCT = Math.round((XP_NOW / XP_NEXT) * 100);

const STATS = [
  { label: "Giri totali", value: "1.284", accent: "var(--wc-cyan)" },
  { label: "Vincita record", value: "48.000", suffix: "WC", accent: "var(--wc-gold-2)" },
  { label: "Gioco preferito", value: "Crazy Orani", accent: "var(--wc-violet-2)" },
  { label: "Achievement", value: `${unlocked}/${ACHIEVEMENTS.length}`, accent: "var(--wc-green)" },
];

export function ProfilePage() {
  return (
    <>
      {/* Header profilo: avatar in ring + wallet, layout a fascia */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          marginTop: 10,
          padding: "22px 20px",
          borderRadius: "var(--wc-radius-xl)",
          border: "1px solid var(--wc-border)",
          background:
            "radial-gradient(120% 140% at 100% 0%, rgba(139,92,246,0.22), transparent 55%), var(--wc-surface-solid)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          aria-hidden
          style={{
            display: "grid",
            placeItems: "center",
            width: 66,
            height: 66,
            flex: "0 0 auto",
            borderRadius: "50%",
            fontSize: 34,
            background: "var(--wc-surface-solid-2)",
            border: "2px solid var(--wc-violet-2)",
            boxShadow: "0 0 22px -4px rgba(178,139,255,0.7)",
          }}
        >
          {ME.avatar}
        </span>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--wc-font-display)",
                fontWeight: 800,
                fontSize: 26,
                letterSpacing: -0.6,
                lineHeight: 1.05,
              }}
            >
              {ME.name}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 9px",
                borderRadius: "var(--wc-radius-pill)",
                background: "rgba(245,197,66,0.14)",
                border: "1px solid rgba(245,197,66,0.34)",
                color: "var(--wc-gold-2)",
                fontFamily: "var(--wc-font-display)",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: 0.4,
                textTransform: "uppercase",
              }}
            >
              ★ Livello {LEVEL}
            </span>
          </div>
          <div style={{ color: "var(--wc-text-dim)", fontSize: 13, margin: "3px 0 9px" }}>
            Membro fondatore della crew
          </div>
          {/* barra XP verso il livello successivo */}
          <div
            style={{
              position: "relative",
              height: 8,
              borderRadius: "var(--wc-radius-pill)",
              background: "var(--wc-surface-solid-2)",
              border: "1px solid var(--wc-border)",
              overflow: "hidden",
              maxWidth: 320,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${XP_PCT}%`,
                borderRadius: "var(--wc-radius-pill)",
                background: "linear-gradient(90deg, var(--wc-violet-2), var(--wc-green))",
                boxShadow: "0 0 14px -2px rgba(178,139,255,0.7)",
              }}
            />
          </div>
          <div
            className="wc-num"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--wc-text-mute)",
              marginTop: 5,
            }}
          >
            {XP_NOW.toLocaleString("it-IT")} / {XP_NEXT.toLocaleString("it-IT")} XP · al Livello{" "}
            {LEVEL + 1}
          </div>
        </div>
        <WalletBadge coins={MY_WALLET.coins} />
      </section>

      <SectionHeader title="Statistiche" icon="bolt" accent="var(--wc-cyan)" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="wc-surface wc-reveal"
            style={{ padding: 16, "--i": i } as React.CSSProperties}
          >
            <div
              style={{
                color: "var(--wc-text-mute)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              {s.label}
            </div>
            <div
              className="wc-num"
              style={{
                fontFamily: "var(--wc-font-display)",
                fontWeight: 800,
                fontSize: 22,
                marginTop: 4,
                color: s.accent,
                letterSpacing: -0.4,
              }}
            >
              {s.value}
              {s.suffix && (
                <span style={{ fontSize: 12, color: "var(--wc-text-mute)" }}> {s.suffix}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <SectionHeader
        title="Achievement"
        icon="trophy"
        accent="var(--wc-gold)"
        count={ACHIEVEMENTS.length}
      />
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
