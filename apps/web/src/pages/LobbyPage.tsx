import { JackpotTicker } from "@whycasino/ui";
import { GAMES, gamesByCategory, liveGames } from "../mock/games";
import { GamesGrid, SectionTitle } from "../components/GamesGrid";

function Hero() {
  return (
    <section
      className="wc-surface"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "36px 28px",
        marginTop: 8,
        background:
          "linear-gradient(120deg, rgba(139,92,246,0.25), rgba(124,255,107,0.08)), var(--wc-surface)",
      }}
    >
      <div style={{ fontSize: 13, color: "var(--wc-neon-green)", fontWeight: 700, letterSpacing: 1 }}>
        JACKPOT DELLA CREW
      </div>
      <div
        style={{
          fontFamily: "var(--wc-font-display)",
          fontWeight: 800,
          fontSize: 52,
          lineHeight: 1,
          color: "var(--wc-gold)",
          textShadow: "0 0 30px rgba(245,197,66,0.4)",
        }}
      >
        <JackpotTicker value={2481930} /> WC
      </div>
      <p style={{ color: "var(--wc-text-dim)", maxWidth: 460, marginTop: 10 }}>
        Benvenuto a WhyCasinò. Gira Crazy Orani, sfida la ruota di Far Orani e scala le
        classifiche della crew. Solo dollari finti, gloria vera.
      </p>
    </section>
  );
}

export function LobbyPage() {
  return (
    <>
      <Hero />
      <SectionTitle>🔴 Live ora</SectionTitle>
      <GamesGrid games={liveGames().slice(0, 12)} />
      <SectionTitle>🎪 Game Show</SectionTitle>
      <GamesGrid games={gamesByCategory("live")} />
      <SectionTitle>🎰 Slot</SectionTitle>
      <GamesGrid games={gamesByCategory("slot")} />
      <SectionTitle>🎲 Tutti i giochi ({GAMES.length})</SectionTitle>
      <GamesGrid games={GAMES} />
    </>
  );
}
