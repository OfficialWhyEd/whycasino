import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Segmented,
  SectionHeader,
  CATEGORY_THEME,
  type SegmentOption,
} from "@whycasino/ui";
import type { GameCategory } from "@whycasino/shared";
import { GAMES } from "../mock/games";
import { GamesGrid, EmptyGames } from "../components/GamesGrid";

type Filter = GameCategory | "all";

const OPTIONS: SegmentOption<Filter>[] = [
  { key: "all", label: "Tutti" },
  { key: "live", label: "Game Show", accent: CATEGORY_THEME.live.accent },
  { key: "slot", label: "Slot", accent: CATEGORY_THEME.slot.accent },
  { key: "roulette", label: "Roulette", accent: CATEGORY_THEME.roulette.accent },
  { key: "blackjack", label: "Blackjack", accent: CATEGORY_THEME.blackjack.accent },
  { key: "baccarat", label: "Baccarat", accent: CATEGORY_THEME.baccarat.accent },
  { key: "poker", label: "Poker", accent: CATEGORY_THEME.poker.accent },
];

const VALID = new Set<Filter>(OPTIONS.map((o) => o.key));

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const initial = (category && VALID.has(category as Filter) ? category : "all") as Filter;
  const [filter, setFilter] = useState<Filter>(initial);

  // se cambio rotta (es. dalla tab bar) sincronizzo il filtro
  useEffect(() => {
    setFilter(category && VALID.has(category as Filter) ? (category as Filter) : "all");
  }, [category]);

  const games = useMemo(
    () => (filter === "all" ? GAMES : GAMES.filter((g) => g.category === filter)),
    [filter],
  );

  const label = filter === "all" ? "il catalogo" : CATEGORY_THEME[filter].label;

  return (
    <>
      <SectionHeader title="Catalogo" icon="games" count={games.length} />
      <div className="wc-rail-bleed" style={{ marginBottom: 18 }}>
        <Segmented id="cat" options={OPTIONS} value={filter} onChange={setFilter} />
      </div>

      {games.length ? (
        <GamesGrid games={games} />
      ) : (
        <EmptyGames label={`Nessun gioco in ${label}.`} />
      )}
    </>
  );
}
