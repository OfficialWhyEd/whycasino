import { useState } from "react";
import { motion } from "framer-motion";
import type { Game } from "@whycasino/shared";
import { LiveBadge } from "./LiveBadge";
import {
  CATEGORY_THEME,
  characterGlyph,
  characterName,
  isHot,
  maxMultiplier,
  playersOnline,
} from "./theme";

/** Cover con fallback premium a tema categoria (key-art credibile). */
function Cover({ game }: { game: Game }) {
  const [broken, setBroken] = useState(false);
  const theme = CATEGORY_THEME[game.category];
  const glyph = characterGlyph(game.character);
  const rot = ((game.slug.charCodeAt(0) % 7) - 3) * 1.6;

  if (broken || !game.cover) {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `${theme.mesh}, linear-gradient(180deg, #12101f, #0a0912)`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 0.5px, transparent 0.6px)",
            backgroundSize: "7px 7px",
            opacity: 0.5,
            mixBlendMode: "overlay",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 12,
            top: 6,
            fontFamily: "var(--wc-font-display)",
            fontWeight: 700,
            fontSize: 74,
            lineHeight: 1,
            color: "rgba(255,255,255,0.1)",
            letterSpacing: -3,
          }}
        >
          {game.name.charAt(0)}
        </div>
        {glyph && (
          <div
            aria-hidden
            style={
              {
                position: "absolute",
                right: -6,
                top: "42%",
                transform: "translateY(-50%)",
                fontSize: 92,
                lineHeight: 1,
                filter: `drop-shadow(0 12px 26px rgba(${theme.glow},0.6))`,
                "--wc-rot": `${rot}deg`,
                animation: "wc-float 6s ease-in-out infinite",
              } as React.CSSProperties
            }
          >
            {glyph}
          </div>
        )}
      </div>
    );
  }
  return (
    <img
      src={game.cover}
      alt={game.name}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}

function PlayGlyph() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
    </svg>
  );
}

/** Pill piccola riutilizzabile sopra la cover. */
function Tag({
  children,
  bg,
  border,
  color,
}: {
  children: React.ReactNode;
  bg: string;
  border: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 7px",
        borderRadius: "var(--wc-radius-pill)",
        background: bg,
        border: `1px solid ${border}`,
        color,
        fontSize: 9.5,
        fontWeight: 800,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      {children}
    </span>
  );
}

export function GameCard({
  game,
  onOpen,
  index = 0,
  rank,
}: {
  game: Game;
  onOpen: (slug: string) => void;
  index?: number;
  /** Se presente, mostra un numerale ghost di classifica (rail "hot"). */
  rank?: number;
}) {
  const theme = CATEGORY_THEME[game.category];
  const subtitle = characterName(game.character) ?? theme.label;
  const hot = isHot(game.slug) && !game.isLive;
  const players = playersOnline(game.slug);
  const mult = maxMultiplier(game.slug);

  return (
    <motion.button
      onClick={() => onOpen(game.slug)}
      whileHover={{ y: -8, scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 20, mass: 0.6 }}
      className="wc-reveal wc-gamecard"
      aria-label={`${game.name} — ${theme.label}`}
      style={
        {
          position: "relative",
          textAlign: "left",
          padding: 0,
          border: "1px solid var(--wc-border)",
          borderRadius: "var(--wc-radius)",
          overflow: "hidden",
          background: "var(--wc-surface-solid)",
          cursor: "pointer",
          color: "var(--wc-text)",
          aspectRatio: "3 / 4",
          width: "100%",
          boxShadow: "var(--wc-shadow-card)",
          willChange: "transform",
          WebkitTapHighlightColor: "transparent",
          "--i": index,
          "--acc": theme.accent,
          "--glow": theme.glow,
        } as React.CSSProperties
      }
    >
      <div className="wc-gc-art">
        <Cover game={game} />
      </div>

      {/* sheen diagonale in loop lentissimo */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "45%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
          animation: "wc-sheen 5.5s ease-in-out infinite",
          animationDelay: `${(index % 5) * 0.7}s`,
          pointerEvents: "none",
        }}
      />

      {/* numerale ghost di classifica (rail hot) */}
      {rank != null && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 6,
            bottom: 44,
            fontFamily: "var(--wc-font-display)",
            fontWeight: 800,
            fontSize: 76,
            lineHeight: 0.8,
            color: "rgba(255,255,255,0.16)",
            textShadow: `0 2px 18px rgba(${theme.glow},0.5)`,
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          {rank}
        </span>
      )}

      {/* top row: LIVE/HOT a sx, giocatori a dx */}
      <div
        style={{
          position: "absolute",
          top: 9,
          left: 9,
          right: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 4,
        }}
      >
        {game.isLive ? (
          <LiveBadge />
        ) : hot ? (
          <Tag
            bg="rgba(245,197,66,0.18)"
            border="rgba(245,197,66,0.5)"
            color="var(--wc-gold-2)"
          >
            🔥 Hot
          </Tag>
        ) : (
          <span />
        )}
        <Tag
          bg="rgba(8,8,16,0.5)"
          border="var(--wc-border)"
          color="var(--wc-text-dim)"
        >
          <span
            aria-hidden
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--wc-green)",
              boxShadow: "0 0 6px var(--wc-green)",
              animation: "wc-pulse-dot 1.6s ease-in-out infinite",
            }}
          />
          <span className="wc-num">{players.toLocaleString("it-IT")}</span>
        </Tag>
      </div>

      {/* play button reveal in hover */}
      <span aria-hidden className="wc-gc-play">
        <PlayGlyph />
      </span>

      {/* ring accent in hover */}
      <span aria-hidden className="wc-gc-glow" />

      {/* scrim per leggibilità */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(6,6,12,0.94) 14%, rgba(6,6,12,0.35) 46%, transparent 62%)",
        }}
      />

      <div
        className="wc-gc-meta"
        style={{ position: "absolute", left: 12, right: 12, bottom: 11, zIndex: 4 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontSize: 10.5,
              color: theme.accent,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.7,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: "0 1 auto",
            }}
          >
            {subtitle}
          </span>
          <span
            className="wc-num"
            style={{
              flex: "0 0 auto",
              fontSize: 9.5,
              fontWeight: 800,
              color: "var(--wc-gold-2)",
              background: "rgba(245,197,66,0.12)",
              border: "1px solid rgba(245,197,66,0.3)",
              borderRadius: "var(--wc-radius-pill)",
              padding: "1px 6px",
              letterSpacing: 0.2,
            }}
          >
            {mult}x
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--wc-font-display)",
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1.15,
            letterSpacing: -0.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {game.name}
        </div>
      </div>
    </motion.button>
  );
}
