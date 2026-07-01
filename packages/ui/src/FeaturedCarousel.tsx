import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Game } from "@whycasino/shared";
import { CATEGORY_THEME, characterGlyph, characterName } from "./theme";
import { LiveBadge } from "./LiveBadge";
import { JackpotTicker } from "./JackpotTicker";
import { useParallax } from "./useParallax";

/** Hero cinematografico: gioco in vetrina che ruota, raggi conici rotanti,
 *  parallax 3D (desktop), mega-jackpot. Layout asimmetrico (mai centrato). */
export function FeaturedCarousel({
  games,
  jackpot,
  onOpen,
}: {
  games: Game[];
  jackpot: number;
  onOpen: (slug: string) => void;
}) {
  const list = games.slice(0, 4);
  const [i, setI] = useState(0);
  const { ref, tilt, onMove, onLeave } = useParallax(6);

  useEffect(() => {
    if (list.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % list.length), 6000);
    return () => clearInterval(id);
  }, [list.length]);

  const game = list[i] ?? list[0];
  if (!game) return null;
  const theme = CATEGORY_THEME[game.category];
  const glyph = characterGlyph(game.character);
  const character = characterName(game.character);

  return (
    <div className="wc-3d" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.section
        className="wc-hero"
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.6 }}
        style={{
          marginTop: 10,
          minHeight: 300,
          transformStyle: "preserve-3d",
        }}
      >
        {/* background mesh per categoria — crossfade tra i giochi */}
        <AnimatePresence>
          <motion.div
            key={game.slug}
            aria-hidden
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              background: `${theme.mesh}, linear-gradient(135deg, #14101f, #08070f)`,
              zIndex: 0,
            }}
          />
        </AnimatePresence>

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

        {/* raggi conici rotanti dietro la key-art (luce da ruota di casinò) */}
        <div
          aria-hidden
          className="wc-rays"
          style={
            {
              width: 560,
              height: 560,
              right: "-14%",
              top: "50%",
              transform: `translateY(-50%) translateX(${tilt.px * -6}px)`,
              "--wc-ray-color": `rgba(${theme.glow}, 0.5)`,
              opacity: 0.7,
              zIndex: 1,
            } as React.CSSProperties
          }
        />
        <div
          aria-hidden
          className="wc-rays"
          style={
            {
              width: 380,
              height: 380,
              right: "-4%",
              top: "50%",
              transform: "translateY(-50%)",
              "--wc-ray-color": "rgba(255,255,255,0.12)",
              animationDuration: "26s",
              animationDirection: "reverse",
              opacity: 0.6,
              zIndex: 1,
            } as React.CSSProperties
          }
        />

        {/* key-art fluttuante (parallax) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={game.slug + "-art"}
            aria-hidden
            className="wc-hero-glyph"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              right: "-1%",
              top: "50%",
              fontSize: 230,
              lineHeight: 1,
              filter: `drop-shadow(0 26px 52px rgba(${theme.glow},0.6))`,
              zIndex: 2,
              transform: `translate(${tilt.px * 14}px, calc(-50% + ${tilt.py * 10}px))`,
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
          </motion.div>
        </AnimatePresence>

        {/* scrim leggibilità */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(6,6,12,0.94) 26%, rgba(6,6,12,0.55) 56%, transparent 84%)",
            zIndex: 3,
          }}
        />

        {/* contenuto */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            padding: "24px 22px 20px",
            maxWidth: 580,
            display: "grid",
            gap: 11,
            minHeight: 300,
            alignContent: "end",
            transform: "translateZ(40px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {game.isLive && <LiveBadge />}
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

          <AnimatePresence mode="wait">
            <motion.h1
              key={game.slug + "-t"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--wc-font-display)",
                fontWeight: 800,
                fontSize: "clamp(32px, 8.5vw, 52px)",
                lineHeight: 0.96,
                letterSpacing: -1.4,
                margin: 0,
              }}
            >
              {game.name}
            </motion.h1>
          </AnimatePresence>

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
              gap: 16,
              flexWrap: "wrap",
              marginTop: 3,
            }}
          >
            <motion.button
              onClick={() => onOpen(game.slug)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="wc-tap"
              style={{
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 24px",
                border: "none",
                borderRadius: "var(--wc-radius-pill)",
                cursor: "pointer",
                fontFamily: "var(--wc-font-display)",
                fontWeight: 700,
                fontSize: 15.5,
                color: "#0b0b12",
                background: "linear-gradient(135deg, var(--wc-violet-2), var(--wc-green))",
                boxShadow: "var(--wc-glow-violet)",
                WebkitTapHighlightColor: "transparent",
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
              <svg width={17} height={17} viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
              </svg>
              <span style={{ position: "relative" }}>Gioca ora</span>
            </motion.button>

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
                  position: "relative",
                  overflow: "hidden",
                  fontFamily: "var(--wc-font-display)",
                  fontWeight: 800,
                  fontSize: 24,
                  lineHeight: 1,
                  color: "var(--wc-gold-2)",
                  textShadow: "0 0 22px rgba(245,197,66,0.4)",
                }}
              >
                <JackpotTicker value={jackpot} />{" "}
                <span style={{ fontSize: 12, color: "var(--wc-gold)" }}>WC</span>
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "35%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    animation: "wc-shine 4.5s ease-in-out infinite",
                    mixBlendMode: "overlay",
                  }}
                />
              </span>
            </div>
          </div>
        </div>

        {/* dots di navigazione */}
        {list.length > 1 && (
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              display: "flex",
              gap: 6,
              zIndex: 5,
            }}
          >
            {list.map((g, idx) => (
              <button
                key={g.slug}
                aria-label={`Vetrina ${idx + 1}`}
                onClick={() => setI(idx)}
                style={{
                  width: idx === i ? 22 : 8,
                  height: 8,
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background:
                    idx === i ? theme.accent : "rgba(255,255,255,0.28)",
                  boxShadow: idx === i ? `0 0 10px ${theme.accent}` : "none",
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}
