import { Link, useParams } from "react-router-dom";
import {
  BetPanel,
  LiveBadge,
  SectionHeader,
  Icon,
  CATEGORY_THEME,
  characterGlyph,
  characterName,
} from "@whycasino/ui";
import { gameBySlug, relatedGames } from "../mock/games";
import { MY_WALLET } from "../mock/wallet";
import { GamesRail } from "../components/GamesGrid";

export function GamePage() {
  const { slug } = useParams<{ slug: string }>();
  const game = slug ? gameBySlug(slug) : undefined;

  if (!game) {
    return (
      <div
        className="wc-surface"
        style={{ padding: 48, textAlign: "center", marginTop: 24 }}
      >
        <div
          style={{
            fontFamily: "var(--wc-font-display)",
            fontWeight: 800,
            fontSize: 22,
            marginBottom: 8,
          }}
        >
          Gioco non trovato
        </div>
        <Link to="/" className="wc-see-all" style={{ margin: "0 auto" }}>
          Torna alla lobby
        </Link>
      </div>
    );
  }

  const theme = CATEGORY_THEME[game.category];
  const glyph = characterGlyph(game.character);
  const character = characterName(game.character);
  const related = relatedGames(game.slug);

  return (
    <>
      <Link
        to="/"
        className="wc-tap"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 8,
          marginBottom: 12,
          padding: "6px 12px 6px 8px",
          borderRadius: "var(--wc-radius-pill)",
          background: "var(--wc-surface-2)",
          border: "1px solid var(--wc-border)",
          color: "var(--wc-text-dim)",
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        <Icon name="back" size={16} />
        Lobby
      </Link>

      <div className="wc-game-layout">
        {/* Stage del gioco */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--wc-radius-lg)",
            border: "1px solid var(--wc-border)",
            aspectRatio: "16 / 10",
            boxShadow: "var(--wc-shadow-card)",
            isolation: "isolate",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `${theme.mesh}, linear-gradient(135deg, #14101f, #08070f)`,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.07) 0.5px, transparent 0.6px)",
              backgroundSize: "8px 8px",
              opacity: 0.35,
              mixBlendMode: "overlay",
            }}
          />
          {glyph && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                right: "4%",
                top: "42%",
                transform: "translateY(-50%)",
                fontSize: "clamp(120px, 30vw, 200px)",
                lineHeight: 1,
                filter: `drop-shadow(0 22px 44px rgba(${theme.glow},0.6))`,
                animation: "wc-float 7s ease-in-out infinite",
                pointerEvents: "none",
              }}
            >
              {glyph}
            </div>
          )}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(6,6,12,0.95) 8%, rgba(6,6,12,0.35) 44%, transparent 66%)",
            }}
          />

          {game.isLive && (
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <LiveBadge />
            </div>
          )}

          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: 18,
              display: "grid",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: theme.accent,
              }}
            >
              {theme.label}
              {character ? ` · ${character}` : ""}
            </span>
            <h1
              style={{
                fontFamily: "var(--wc-font-display)",
                fontWeight: 800,
                fontSize: "clamp(26px, 6vw, 40px)",
                lineHeight: 0.98,
                letterSpacing: -1,
                margin: 0,
                maxWidth: 480,
              }}
            >
              {game.name}
            </h1>
            <p
              style={{
                color: "var(--wc-text-dim)",
                fontSize: 13.5,
                lineHeight: 1.45,
                margin: 0,
                maxWidth: 460,
              }}
            >
              {game.lore}
            </p>
            <span
              style={{
                justifySelf: "start",
                marginTop: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 11px",
                borderRadius: "var(--wc-radius-pill)",
                background: "var(--wc-surface-2)",
                border: "1px solid var(--wc-border)",
                fontSize: 11.5,
                fontWeight: 700,
                color: "var(--wc-text-mute)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: theme.accent,
                  boxShadow: `0 0 8px ${theme.accent}`,
                }}
              />
              Tavolo real-time in arrivo
            </span>
          </div>
        </div>

        {/* Colonna azione */}
        <aside style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <BetPanel
            balance={MY_WALLET.coins}
            onSpin={(amount) => console.log("bet", game.slug, amount)}
          />
          <div className="wc-surface" style={{ padding: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--wc-green)",
                  boxShadow: "0 0 8px var(--wc-green)",
                  animation: "wc-pulse-dot 1.6s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--wc-font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Attività crew
              </span>
            </div>
            <div
              style={{
                color: "var(--wc-text-dim)",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              La chat e le vincite in tempo reale della crew appariranno qui quando il
              tavolo live sarà attivo.
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <>
          <SectionHeader
            title={`Altri ${theme.label}`}
            icon="games"
            accent={theme.accent}
          />
          <GamesRail games={related} />
        </>
      )}
    </>
  );
}
