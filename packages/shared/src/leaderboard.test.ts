import { describe, it, expect } from "vitest";
import { sortLeaderboard, rankOf } from "./leaderboard";
import type { LeaderboardEntry } from "./types";

const p = (id: string, name: string) => ({ id, name, avatar: "" });
const entries: LeaderboardEntry[] = [
  { player: p("a", "Ann"), winnings: 100 },
  { player: p("b", "Bob"), winnings: 300 },
  { player: p("c", "Cy"), winnings: 300 },
];

describe("leaderboard", () => {
  it("sorts descending by winnings, ties by name", () => {
    const s = sortLeaderboard(entries);
    expect(s.map((e) => e.player.id)).toEqual(["b", "c", "a"]);
  });

  it("does not mutate the input array", () => {
    const before = entries.map((e) => e.player.id);
    sortLeaderboard(entries);
    expect(entries.map((e) => e.player.id)).toEqual(before);
  });

  it("returns 1-based rank", () => {
    expect(rankOf(entries, "b")).toBe(1);
    expect(rankOf(entries, "a")).toBe(3);
    expect(rankOf(entries, "zzz")).toBe(-1);
  });
});
