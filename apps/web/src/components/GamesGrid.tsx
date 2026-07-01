import { useNavigate } from "react-router-dom";
import { GameCard } from "@whycasino/ui";
import type { Game } from "@whycasino/shared";

export function GamesGrid({ games }: { games: Game[] }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 14,
      }}
    >
      {games.map((g) => (
        <GameCard key={g.slug} game={g} onOpen={(slug) => navigate(`/game/${slug}`)} />
      ))}
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--wc-font-display)",
        fontWeight: 800,
        fontSize: 20,
        margin: "28px 0 12px",
      }}
    >
      {children}
    </h2>
  );
}
