export type GameCategory =
  | "live"
  | "roulette"
  | "blackjack"
  | "baccarat"
  | "poker"
  | "slot";

export interface Game {
  slug: string;
  name: string;
  category: GameCategory;
  /** emoji/id personaggio, es. "🐌 Far Orani" */
  character?: string;
  lore: string;
  isLive: boolean;
  /** path in /assets/games/<slug>/cover.png (placeholder finché non generato) */
  cover: string;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
}

export interface Wallet {
  playerId: string;
  coins: number;
}

export interface LeaderboardEntry {
  player: Player;
  winnings: number;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  unlocked: boolean;
  reward: number;
}
