import { useState } from "react";
import { motion } from "framer-motion";
import type { Game } from "@whycasino/shared";
import { LiveBadge } from "./LiveBadge";

const CATEGORY_LABEL: Record<Game["category"], string> = {
  live: "Game Show",
  roulette: "Roulette",
  blackjack: "Blackjack",
  baccarat: "Baccarat",
  poker: "Poker",
  slot: "Slot",
};

/** Cover con fallback gradiente neon + iniziale del gioco. */
function Cover({ game }: { game: Game }) {
  const [broken, setBroken] = useState(false);
  if (broken || !game.cover) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(124,255,107,0.35))",
          color: "#0b0b12",
          fontFamily: "var(--wc-font-display)",
          fontWeight: 800,
          fontSize: 52,
        }}
      >
        {game.name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={game.cover}
      alt={game.name}
      onError={() => setBroken(true)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

export function GameCard({
  game,
  onOpen,
}: {
  game: Game;
  onOpen: (slug: string) => void;
}) {
  return (
    <motion.button
      onClick={() => onOpen(game.slug)}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      style={{
        position: "relative",
        textAlign: "left",
        padding: 0,
        border: "1px solid var(--wc-surface-border)",
        borderRadius: "var(--wc-radius)",
        overflow: "hidden",
        background: "var(--wc-surface)",
        cursor: "pointer",
        color: "var(--wc-text)",
        aspectRatio: "3 / 4",
      }}
    >
      <Cover game={game} />
      {game.isLive && (
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <LiveBadge />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(5,5,10,0.92) 12%, transparent 55%)",
        }}
      />
      <div style={{ position: "absolute", left: 12, right: 12, bottom: 10 }}>
        <div style={{ fontSize: 11, color: "var(--wc-neon-violet-2)", fontWeight: 700 }}>
          {game.character ?? CATEGORY_LABEL[game.category]}
        </div>
        <div style={{ fontFamily: "var(--wc-font-display)", fontWeight: 800, fontSize: 16 }}>
          {game.name}
        </div>
      </div>
    </motion.button>
  );
}
