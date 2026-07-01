import type { LeaderboardEntry } from "./types";

/** Ordina discendente per vincite; a parità, ordine stabile per nome. */
export function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort(
    (x, y) =>
      y.winnings - x.winnings || x.player.name.localeCompare(y.player.name),
  );
}

/** Rank 1-based del giocatore nella classifica ordinata; -1 se assente. */
export function rankOf(entries: LeaderboardEntry[], playerId: string): number {
  const sorted = sortLeaderboard(entries);
  const i = sorted.findIndex((e) => e.player.id === playerId);
  return i === -1 ? -1 : i + 1;
}
