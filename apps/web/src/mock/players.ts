import type { Player, LeaderboardEntry } from "@whycasino/shared";

export const ME: Player = { id: "me", name: "WhyEd", avatar: "🕶️" };

export const CREW: Player[] = [
  ME,
  { id: "far-orani", name: "Far Orani", avatar: "🐌" },
  { id: "frank", name: "Frank", avatar: "🏍️" },
  { id: "argiam", name: "Argiam", avatar: "🚀" },
  { id: "dino", name: "Dino Estrada", avatar: "🦕" },
  { id: "drem", name: "Drem", avatar: "🎸" },
  { id: "gimmi", name: "Gimmi", avatar: "🎮" },
  { id: "tony", name: "Tonyde", avatar: "🐡" },
];

const entry = (id: string, winnings: number): LeaderboardEntry => {
  const player = CREW.find((p) => p.id === id) ?? ME;
  return { player, winnings };
};

export const DAILY: LeaderboardEntry[] = [
  entry("far-orani", 18400),
  entry("argiam", 15230),
  entry("me", 12980),
  entry("frank", 9600),
  entry("dino", 8110),
  entry("drem", 6400),
  entry("tony", 4200),
  entry("gimmi", 2750),
];

export const WEEKLY: LeaderboardEntry[] = [
  entry("argiam", 142300),
  entry("me", 131540),
  entry("frank", 128900),
  entry("far-orani", 96700),
  entry("dino", 74200),
  entry("gimmi", 58300),
  entry("drem", 51100),
  entry("tony", 39800),
];
