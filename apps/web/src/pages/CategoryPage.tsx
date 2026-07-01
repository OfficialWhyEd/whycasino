import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Segmented, CATEGORY_THEME, type SegmentOption } from "@whycasino/ui";
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
  const band =
    filter === "all"
      ? {
          title: "Tutto il catalogo",
          accent: "var(--wc-violet-2)",
          glow: "139,92,246",
          mesh:
            "radial-gradient(120% 130% at 82% 8%, rgba(139,92,246,0.5), transparent 56%), radial-gradient(130% 130% at 8% 94%, rgba(53,230,255,0.32), transparent 58%)",
          sub: "50 giochi della crew, dal vivo e in solitaria",
        }
      : {
          title: CATEGORY_THEME[filter].label,
          accent: CATEGORY_THEME[filter].accent,
          glow: CATEGORY_THEME[filter].glow,
          mesh: CATEGORY_THEME[filter].mesh,
          sub: `Tutti i tavoli e le partite ${CATEGORY_THEME[filter].label}`,
        };

  return (
    <>
      {/* Hero band a tema categoria */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          marginTop: 10,
          padding: "22px 20px",
          borderRadius: "var(--wc-radius-xl)",
          border: "1px solid var(--wc-border)",
          background: `${band.mesh}, linear-gradient(135deg, #14101f, #08070f)`,
          isolation: "isolate",
          boxShadow: "var(--wc-shadow-2)",
        }}
      >
        <div
          aria-hidden
          className="wc-rays"
          style={
            {
              width: 320,
              height: 320,
              right: "-10%",
              top: "50%",
              transform: "translateY(-50%)",
              "--wc-ray-color": `rgba(${band.glow}, 0.4)`,
              opacity: 0.6,
              zIndex: 0,
            } as React.CSSProperties
          }
        />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gap: 6 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: band.accent,
            }}
          >
            Catalogo · {games.length} giochi
          </span>
          <h1
            style={{
              fontFamily: "var(--wc-font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 7vw, 40px)",
              lineHeight: 0.98,
              letterSpacing: -1,
              margin: 0,
            }}
          >
            {band.title}
          </h1>
          <p style={{ color: "var(--wc-text-dim)", fontSize: 13.5, margin: 0, maxWidth: 440 }}>
            {band.sub}
          </p>
        </div>
      </section>

      <div className="wc-rail-bleed" style={{ margin: "18px 0" }}>
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
