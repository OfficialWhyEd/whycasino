import { Link, useNavigate } from "react-router-dom";
import {
  FeaturedCarousel,
  StatStrip,
  LiveWinsMarquee,
  SectionHeader,
  CATEGORY_THEME,
  type IconName,
} from "@whycasino/ui";
import type { GameCategory } from "@whycasino/shared";
import { GAMES, gamesByCategory, gameBySlug, liveGames } from "../mock/games";
import { RECENT_WINS, LIVE_STATS, CREW_JACKPOT } from "../mock/feed";
import { GamesGrid, GamesRail } from "../components/GamesGrid";

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

/** Giochi in vetrina per l'hero (uno per varietà cromatica). */
const FEATURED_SLUGS = ["crazy-orani", "argiam-lightning", "abissi-bonanza", "monopoli-cagliari"];

export function LobbyPage() {
  const navigate = useNavigate();
  const featured = FEATURED_SLUGS.map((s) => gameBySlug(s)).filter(
    (g): g is NonNullable<typeof g> => Boolean(g),
  );
  const live = liveGames().slice(0, 10);

  return (
    <>
      <FeaturedCarousel
        games={featured.length ? featured : GAMES}
        jackpot={CREW_JACKPOT}
        onOpen={(slug) => navigate(`/game/${slug}`)}
      />

      <StatStrip stats={LIVE_STATS} />

      <div style={{ marginTop: 18 }}>
        <LiveWinsMarquee
          wins={RECENT_WINS}
          onOpen={(slug) => navigate(`/game/${slug}`)}
        />
      </div>

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
      <GamesRail games={live} ranked />

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

      <div style={{ marginTop: 30 }}>
        <SectionHeader title="Tutti i giochi" icon="games" count={GAMES.length} />
        <GamesGrid games={GAMES} />
      </div>
    </>
  );
}
