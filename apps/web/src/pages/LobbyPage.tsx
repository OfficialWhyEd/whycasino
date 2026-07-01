import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  JackpotTicker,
  LiveBadge,
  SectionHeader,
  CATEGORY_THEME,
  characterGlyph,
  characterName,
  type IconName,
} from "@whycasino/ui";
import type { GameCategory } from "@whycasino/shared";
import { GAMES, gamesByCategory, gameBySlug, liveGames } from "../mock/games";
import { GamesGrid, GamesRail } from "../components/GamesGrid";

/* ---- Hero: un gioco in spotlight, layout asimmetrico (mai titolone centrato) ---- */
function FeaturedHero() {
  const game = gameBySlug("crazy-orani") ?? GAMES[0];
  const theme = CATEGORY_THEME[game.category];
  const glyph = characterGlyph(game.character);
  const character = characterName(game.character);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--wc-radius-xl)",
        border: "1px solid var(--wc-border)",
        marginTop: 10,
        minHeight: 232,
        boxShadow: "var(--wc-shadow-2)",
        isolation: "isolate",
      }}
    >
      {/* mesh di categoria + base scura */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `${theme.mesh}, linear-gradient(135deg, #14101f, #08070f)`,
          zIndex: 0,
        }}
      />
      {/* grana finissima */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 0.5px, transparent 0.6px)",
          backgroundSize: "7px 7px",
          opacity: 0.4,
          mixBlendMode: "overlay",
          zIndex: 1,
        }}
      />
      {/* key-art fluttuante */}
      {glyph && (
        <div
          aria-hidden
          className="wc-hero-glyph"
          style={{
            position: "absolute",
            right: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 220,
            lineHeight: 1,
            filter: `drop-shadow(0 24px 48px rgba(${theme.glow},0.55))`,
            zIndex: 2,
            animation: "wc-float 7s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          {glyph}
        </div>
      )}
      {/* scrim leggibilità (sinistra → destra) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(6,6,12,0.92) 30%, rgba(6,6,12,0.55) 58%, transparent 82%)",
          zIndex: 3,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 4,
          padding: "24px 22px 22px",
          maxWidth: 560,
          display: "grid",
          gap: 12,
          minHeight: 232,
          alignContent: "end",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LiveBadge />
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            {theme.label} · in vetrina
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--wc-font-display)",
            fontWeight: 800,
            fontSize: "clamp(30px, 8vw, 46px)",
            lineHeight: 0.98,
            letterSpacing: -1.2,
            margin: 0,
          }}
        >
          {game.name}
        </h1>

        <p
          style={{
            color: "var(--wc-text-dim)",
            fontSize: 14,
            lineHeight: 1.45,
            margin: 0,
            maxWidth: 400,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {character ? `Con ${character}. ` : ""}
          {game.lore}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            marginTop: 2,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Link
              to={`/game/${game.slug}`}
              className="wc-tap"
              style={{
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 22px",
                borderRadius: "var(--wc-radius-pill)",
                textDecoration: "none",
                fontFamily: "var(--wc-font-display)",
                fontWeight: 700,
                fontSize: 15,
                color: "#0b0b12",
                background: "linear-gradient(135deg, var(--wc-violet-2), var(--wc-green))",
                boxShadow: "var(--wc-glow-violet)",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                  animation: "wc-sheen 3s ease-in-out infinite",
                }}
              />
              <span style={{ position: "relative" }}>Gioca ora</span>
            </Link>
          </motion.div>

          <div style={{ display: "grid", gap: 1 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--wc-text-mute)",
              }}
            >
              Jackpot crew
            </span>
            <span
              className="wc-num"
              style={{
                fontFamily: "var(--wc-font-display)",
                fontWeight: 800,
                fontSize: 22,
                lineHeight: 1,
                color: "var(--wc-gold-2)",
                textShadow: "0 0 22px rgba(245,197,66,0.35)",
              }}
            >
              <JackpotTicker value={2481930} />{" "}
              <span style={{ fontSize: 12, color: "var(--wc-gold)" }}>WC</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Quick-nav categorie: chip a scorrimento orizzontale (feel app) ---- */
const CATEGORY_NAV: { key: GameCategory; to: string }[] = [
  { key: "live", to: "/c/live" },
  { key: "slot", to: "/c/slot" },
  { key: "roulette", to: "/c/roulette" },
  { key: "blackjack", to: "/c/blackjack" },
  { key: "baccarat", to: "/c/baccarat" },
  { key: "poker", to: "/c/poker" },
];

function CategoryNav() {
  return (
    <div className="wc-chips wc-rail-bleed" style={{ margin: "18px 0 2px" }}>
      {CATEGORY_NAV.map(({ key, to }) => {
        const theme = CATEGORY_THEME[key];
        return (
          <Link
            key={key}
            to={to}
            className="wc-tap"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 15px",
              borderRadius: "var(--wc-radius-pill)",
              textDecoration: "none",
              background: "var(--wc-surface-solid)",
              border: "1px solid var(--wc-border)",
              color: "var(--wc-text)",
              fontWeight: 700,
              fontSize: 13.5,
              whiteSpace: "nowrap",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: theme.accent,
                boxShadow: `0 0 10px ${theme.accent}`,
                flex: "0 0 auto",
              }}
            />
            {theme.label}
          </Link>
        );
      })}
    </div>
  );
}

const RAILS: { title: string; icon: IconName; category: GameCategory }[] = [
  { title: "Game Show dal vivo", icon: "live", category: "live" },
  { title: "Slot della crew", icon: "bolt", category: "slot" },
  { title: "Roulette", icon: "star", category: "roulette" },
];

export function LobbyPage() {
  const live = liveGames().slice(0, 10);

  return (
    <>
      <FeaturedHero />
      <CategoryNav />

      <SectionHeader
        title="In diretta ora"
        icon="flame"
        accent="var(--wc-danger)"
        count={liveGames().length}
        action={
          <Link to="/c/live" className="wc-see-all">
            Vedi tutti
          </Link>
        }
      />
      <GamesRail games={live} />

      {RAILS.map((r) => (
        <div key={r.category}>
          <SectionHeader
            title={r.title}
            icon={r.icon}
            accent={CATEGORY_THEME[r.category].accent}
            action={
              <Link to={`/c/${r.category}`} className="wc-see-all">
                Vedi tutti
              </Link>
            }
          />
          <GamesRail games={gamesByCategory(r.category)} />
        </div>
      ))}

      <SectionHeader title="Tutti i giochi" icon="games" count={GAMES.length} />
      <GamesGrid games={GAMES} />
    </>
  );
}
