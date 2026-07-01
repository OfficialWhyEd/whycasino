import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { GameCategory } from "@whycasino/shared";
import { GAMES } from "../mock/games";
import { GamesGrid, SectionTitle } from "../components/GamesGrid";

const CATEGORIES: { key: GameCategory | "all"; label: string }[] = [
  { key: "all", label: "Tutti" },
  { key: "live", label: "Game Show" },
  { key: "roulette", label: "Roulette" },
  { key: "blackjack", label: "Blackjack" },
  { key: "baccarat", label: "Baccarat" },
  { key: "poker", label: "Poker" },
  { key: "slot", label: "Slot" },
];

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [filter, setFilter] = useState<GameCategory | "all">(
    (category as GameCategory) ?? "all",
  );

  const games = useMemo(
    () => (filter === "all" ? GAMES : GAMES.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <>
      <SectionTitle>Catalogo giochi</SectionTitle>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            style={{
              padding: "8px 14px",
              borderRadius: "var(--wc-radius-pill)",
              border: "1px solid var(--wc-surface-border)",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              color: filter === c.key ? "#0b0b12" : "var(--wc-text-dim)",
              background:
                filter === c.key
                  ? "linear-gradient(135deg, var(--wc-neon-violet-2), var(--wc-neon-green))"
                  : "var(--wc-surface)",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div style={{ color: "var(--wc-text-dim)", fontSize: 13, marginBottom: 14 }}>
        {games.length} giochi
      </div>
      <GamesGrid games={games} />
    </>
  );
}
