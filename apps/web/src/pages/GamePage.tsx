import { Link, useParams } from "react-router-dom";
import { BetPanel } from "@whycasino/ui";
import { gameBySlug } from "../mock/games";
import { MY_WALLET } from "../mock/wallet";

export function GamePage() {
  const { slug } = useParams<{ slug: string }>();
  const game = slug ? gameBySlug(slug) : undefined;

  if (!game) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>Gioco non trovato.</p>
        <Link to="/" style={{ color: "var(--wc-neon-violet-2)" }}>
          ← Torna alla lobby
        </Link>
      </div>
    );
  }

  return (
    <div className="wc-game-layout">
      <div>
        <div
          className="wc-surface"
          style={{
            aspectRatio: "16 / 9",
            display: "grid",
            placeItems: "center",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(124,255,107,0.12)), var(--wc-surface)",
          }}
        >
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 13, color: "var(--wc-neon-green)", fontWeight: 700 }}>
              {game.character}
            </div>
            <div
              style={{
                fontFamily: "var(--wc-font-display)",
                fontWeight: 800,
                fontSize: 40,
              }}
            >
              {game.name}
            </div>
            <div style={{ color: "var(--wc-text-dim)", marginTop: 8, maxWidth: 520 }}>
              {game.lore}
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: "var(--wc-text-dim)" }}>
              🎬 Tavolo live in arrivo — motore real-time (sotto-progetto 2)
            </div>
          </div>
        </div>
      </div>

      <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
        <BetPanel
          balance={MY_WALLET.coins}
          onSpin={(amount) => console.log("bet", game.slug, amount)}
        />
        <div className="wc-surface" style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Attività</div>
          <div style={{ color: "var(--wc-text-dim)", fontSize: 13 }}>
            La chat e le vincite in tempo reale della crew appariranno qui.
          </div>
        </div>
      </aside>
    </div>
  );
}
