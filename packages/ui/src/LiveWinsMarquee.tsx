export interface WinItem {
  id: string;
  playerName: string;
  avatar: string;
  gameName: string;
  gameSlug?: string;
  amount: number;
}

function WinChip({ w, onOpen }: { w: WinItem; onOpen?: (slug: string) => void }) {
  const big = w.amount >= 9000;
  return (
    <button
      onClick={() => w.gameSlug && onOpen?.(w.gameSlug)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "6px 12px 6px 6px",
        borderRadius: "var(--wc-radius-pill)",
        border: big
          ? "1px solid rgba(245,197,66,0.45)"
          : "1px solid var(--wc-border)",
        background: big
          ? "linear-gradient(180deg, rgba(245,197,66,0.14), rgba(245,197,66,0.04))"
          : "var(--wc-surface-solid)",
        cursor: w.gameSlug ? "pointer" : "default",
        color: "var(--wc-text)",
        whiteSpace: "nowrap",
        WebkitTapHighlightColor: "transparent",
        flex: "0 0 auto",
      }}
    >
      <span
        aria-hidden
        style={{
          display: "grid",
          placeItems: "center",
          width: 26,
          height: 26,
          borderRadius: "50%",
          fontSize: 15,
          background: "var(--wc-surface-solid-2)",
          border: "1px solid var(--wc-border)",
          flex: "0 0 auto",
        }}
      >
        {w.avatar}
      </span>
      <span style={{ display: "grid", gap: 0, lineHeight: 1.15, textAlign: "left" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700 }}>
          {w.playerName}
          <span style={{ color: "var(--wc-text-mute)", fontWeight: 600 }}>
            {" "}
            ha vinto su
          </span>
        </span>
        <span
          style={{
            fontSize: 10.5,
            color: "var(--wc-text-dim)",
            maxWidth: 132,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {w.gameName}
        </span>
      </span>
      <span
        className="wc-num"
        style={{
          fontFamily: "var(--wc-font-display)",
          fontWeight: 800,
          fontSize: 13.5,
          color: "var(--wc-gold-2)",
          textShadow: big ? "0 0 14px rgba(245,197,66,0.5)" : "none",
          letterSpacing: -0.2,
        }}
      >
        +{w.amount.toLocaleString("it-IT")}
      </span>
    </button>
  );
}

/** Feed orizzontale infinito di vincite recenti (marquee GPU, pause-on-hover).
 *  Pattern 21st.dev "Marquee" adattato al brand: track duplicata + translateX(-50%). */
export function LiveWinsMarquee({
  wins,
  onOpen,
  durationSec = 46,
}: {
  wins: WinItem[];
  onOpen?: (slug: string) => void;
  durationSec?: number;
}) {
  const doubled = [...wins, ...wins];
  return (
    <div
      className="wc-marquee-mask wc-rail-bleed"
      aria-label="Vincite recenti della crew"
      style={{ padding: "2px 0" }}
    >
      <div
        className="wc-marquee-track"
        style={{ ["--wc-marquee-dur" as string]: `${durationSec}s` }}
      >
        {doubled.map((w, i) => (
          <span key={`${w.id}-${i}`} aria-hidden={i >= wins.length ? true : undefined}>
            <WinChip w={w} onOpen={onOpen} />
          </span>
        ))}
      </div>
    </div>
  );
}
