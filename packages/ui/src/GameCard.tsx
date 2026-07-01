import { useState } from "react";
import { motion } from "framer-motion";
import type { Game } from "@whycasino/shared";
import { LiveBadge } from "./LiveBadge";
import { CATEGORY_THEME, characterGlyph, characterName } from "./theme";

/** Cover con fallback premium a tema categoria (key-art credibile). */
function Cover({ game }: { game: Game }) {
  const [broken, setBroken] = useState(false);
  const theme = CATEGORY_THEME[game.category];
  const glyph = characterGlyph(game.character);
  // rotazione deterministica dallo slug: ogni tile ha un carattere diverso
  const rot = ((game.slug.charCodeAt(0) % 7) - 3) * 1.6;

  if (broken || !game.cover) {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* mesh di categoria su base scura */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `${theme.mesh}, linear-gradient(180deg, #12101f, #0a0912)`,
          }}
        />
        {/* grana a puntini finissima per texture */}
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
        {/* iniziale tipografica come marchio */}
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
        {/* key-art: glyph del personaggio, grande e fluttuante */}
        {glyph && (
          <div
            aria-hidden
            style={
              {
                position: "absolute",
                right: -6,
                top: "44%",
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

export function GameCard({
  game,
  onOpen,
  index = 0,
}: {
  game: Game;
  onOpen: (slug: string) => void;
  index?: number;
}) {
  const theme = CATEGORY_THEME[game.category];
  const subtitle = characterName(game.character) ?? theme.label;

  return (
    <motion.button
      onClick={() => onOpen(game.slug)}
      whileHover={{ y: -6, scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 20, mass: 0.6 }}
      className="wc-reveal"
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
        } as React.CSSProperties
      }
    >
      <Cover game={game} />

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

      {game.isLive && (
        <div style={{ position: "absolute", top: 9, left: 9 }}>
          <LiveBadge />
        </div>
      )}

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

      <div style={{ position: "absolute", left: 12, right: 12, bottom: 11 }}>
        <div
          style={{
            fontSize: 10.5,
            color: theme.accent,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.7,
            marginBottom: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subtitle}
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
