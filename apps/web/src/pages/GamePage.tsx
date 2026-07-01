import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BetPanel,
  LiveBadge,
  SectionHeader,
  Icon,
  CATEGORY_THEME,
  characterGlyph,
  characterName,
  maxMultiplier,
  playersOnline,
  providerLabel,
  useParallax,
} from "@whycasino/ui";
import { gameBySlug, relatedGames } from "../mock/games";
import { MY_WALLET } from "../mock/wallet";
import { RECENT_WINS } from "../mock/feed";
import { GamesRail } from "../components/GamesGrid";

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 1,
        padding: "8px 13px",
        borderRadius: "var(--wc-radius)",
        background: "var(--wc-surface-solid)",
        border: "1px solid var(--wc-border)",
        minWidth: 0,
      }}
    >
      <span
        className="wc-num"
        style={{
          fontFamily: "var(--wc-font-display)",
          fontWeight: 800,
          fontSize: 16,
          color: accent ?? "var(--wc-text)",
          letterSpacing: -0.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: "var(--wc-text-mute)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function GamePage() {
  const { slug } = useParams<{ slug: string }>();
  const game = slug ? gameBySlug(slug) : undefined;
  const { ref, tilt, onMove, onLeave } = useParallax(5);

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
  const mult = maxMultiplier(game.slug);
  const players = playersOnline(game.slug);
  // vincite recenti "su questo tavolo" (mock: rietichettate al gioco)
  const gameWins = RECENT_WINS.slice(0, 6).map((w) => ({
    ...w,
    gameName: game.name,
  }));

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
        {/* Stage del gioco (cinematografico: raggi rotanti + parallax) */}
        <div>
          <div
            className="wc-3d"
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <motion.div
              animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
              transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.6 }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "var(--wc-radius-lg)",
                border: "1px solid var(--wc-border)",
                aspectRatio: "16 / 10",
                boxShadow: "var(--wc-shadow-card)",
                isolation: "isolate",
                transformStyle: "preserve-3d",
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
              {/* raggi conici rotanti */}
              <div
                aria-hidden
                className="wc-rays"
                style={
                  {
                    width: 520,
                    height: 520,
                    right: "-8%",
                    top: "46%",
                    transform: "translateY(-50%)",
                    "--wc-ray-color": `rgba(${theme.glow}, 0.45)`,
                    opacity: 0.7,
                  } as React.CSSProperties
                }
              />
              {glyph && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: "4%",
                    top: "42%",
                    fontSize: "clamp(120px, 30vw, 210px)",
                    lineHeight: 1,
                    filter: `drop-shadow(0 22px 44px rgba(${theme.glow},0.6))`,
                    transform: `translate(${tilt.px * 16}px, calc(-50% + ${tilt.py * 12}px))`,
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      animation: "wc-float 7s ease-in-out infinite",
                    }}
                  >
                    {glyph}
                  </span>
                </div>
              )}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(6,6,12,0.95) 8%, rgba(6,6,12,0.35) 44%, transparent 66%)",
                  zIndex: 3,
                }}
              />

              {game.isLive && (
                <div style={{ position: "absolute", top: 14, left: 14, zIndex: 4 }}>
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
                  zIndex: 4,
                  transform: "translateZ(30px)",
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
                    fontSize: "clamp(26px, 6vw, 42px)",
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
              </div>
            </motion.div>
          </div>

          {/* riga statistiche del gioco */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginTop: 12,
            }}
          >
            <StatPill
              label="Al tavolo"
              value={players.toLocaleString("it-IT")}
              accent="var(--wc-green)"
            />
            <StatPill label="Vincita max" value={`${mult}x`} accent="var(--wc-gold-2)" />
            <StatPill label="Studio" value={providerLabel(game.category)} accent={theme.accent} />
          </div>
        </div>

        {/* Colonna azione */}
        <aside style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <BetPanel
            balance={MY_WALLET.coins}
            multiplier={mult}
            accent={theme.accent}
            onSpin={(amount) => console.log("bet", game.slug, amount)}
          />

          {/* Feed vincite recenti su questo tavolo */}
          <div className="wc-surface" style={{ padding: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
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
                Vincite al tavolo
              </span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {gameWins.map((w, i) => (
                <div
                  key={w.id}
                  className="wc-reveal"
                  style={
                    {
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      "--i": i,
                    } as React.CSSProperties
                  }
                >
                  <span
                    aria-hidden
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      fontSize: 15,
                      background: "var(--wc-surface-solid-2)",
                      border: "1px solid var(--wc-border)",
                      flex: "0 0 auto",
                    }}
                  >
                    {w.avatar}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, flex: 1, minWidth: 0 }}>
                    {w.playerName}
                  </span>
                  <span
                    className="wc-num"
                    style={{
                      fontFamily: "var(--wc-font-display)",
                      fontWeight: 800,
                      fontSize: 13.5,
                      color: "var(--wc-gold-2)",
                    }}
                  >
                    +{w.amount.toLocaleString("it-IT")}
                  </span>
                </div>
              ))}
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
            action={
              <Link to={`/c/${game.category}`} className="wc-see-all">
                Vedi tutti
              </Link>
            }
          />
          <GamesRail games={related} />
        </>
      )}
    </>
  );
}
