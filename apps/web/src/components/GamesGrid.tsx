import { useNavigate } from "react-router-dom";
import { GameCard, Rail } from "@whycasino/ui";
import type { Game } from "@whycasino/shared";

/** Griglia giochi completa (pagine catalogo). Mobile-first: 2 col → auto. */
export function GamesGrid({ games }: { games: Game[] }) {
  const navigate = useNavigate();
  return (
    <div className="wc-grid-games">
      {games.map((g, i) => (
        <GameCard
          key={g.slug}
          game={g}
          index={i}
          onOpen={(slug) => navigate(`/game/${slug}`)}
        />
      ))}
    </div>
  );
}

/** Rail orizzontale di giochi (lobby). Snap-scroll su mobile.
 *  `ranked` mostra il numerale di classifica (rail "più caldi"). */
export function GamesRail({ games, ranked }: { games: Game[]; ranked?: boolean }) {
  const navigate = useNavigate();
  return (
    <Rail>
      {games.map((g, i) => (
        <GameCard
          key={g.slug}
          game={g}
          index={i}
          rank={ranked ? i + 1 : undefined}
          onOpen={(slug) => navigate(`/game/${slug}`)}
        />
      ))}
    </Rail>
  );
}

/** Empty state condiviso. */
export function EmptyGames({ label }: { label: string }) {
  return (
    <div
      className="wc-surface"
      style={{
        padding: "40px 24px",
        textAlign: "center",
        color: "var(--wc-text-dim)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--wc-font-display)",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--wc-text)",
          marginBottom: 6,
        }}
      >
        Nessun gioco qui… ancora
      </div>
      {label}
    </div>
  );
}
