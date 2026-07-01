import { CREW } from "./players";
import { GAMES } from "./games";

export interface WinEvent {
  id: string;
  playerName: string;
  avatar: string;
  gameName: string;
  gameSlug: string;
  amount: number;
}

/** Feed di vincite recenti (mock deterministico): l'anima "viva" del casinò.
 *  Combina crew + giochi in eventi plausibili per il marquee. */
export const RECENT_WINS: WinEvent[] = Array.from({ length: 22 }, (_, i) => {
  const player = CREW[(i * 3 + 1) % CREW.length];
  const game = GAMES[(i * 7 + 3) % GAMES.length];
  // importi credibili: qualche jackpot grosso sparso
  const base = [120, 340, 780, 1250, 2400, 4800, 9600, 24800][i % 8];
  const amount = base + ((i * 137) % 90) * 10;
  return {
    id: `win-${i}`,
    playerName: player.name,
    avatar: player.avatar,
    gameName: game.name,
    gameSlug: game.slug,
    amount,
  };
});

export interface LiveStat {
  label: string;
  value: number;
  suffix?: string;
  accent: string;
  /** true → mostra il dot pulsante "live" */
  live?: boolean;
}

/** Statistiche di piattaforma per la stat-strip sotto l'hero. */
export const LIVE_STATS: LiveStat[] = [
  { label: "Giocatori online", value: 4820, accent: "var(--wc-green)", live: true },
  { label: "Tavoli live", value: 37, accent: "var(--wc-violet-2)" },
  { label: "Vinto oggi", value: 8412600, suffix: "WC", accent: "var(--wc-gold-2)" },
];

/** Jackpot crew globale mostrato nell'hero. */
export const CREW_JACKPOT = 2481930;
