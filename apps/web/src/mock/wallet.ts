import type { Wallet, Achievement } from "@whycasino/shared";

export const MY_WALLET: Wallet = { playerId: "me", coins: 12980 };

export const ACHIEVEMENTS: Achievement[] = [
  { id: "arrivato", label: "Far Orani è arrivato", description: "Primo login su WhyCasinò.", unlocked: true, reward: 1000 },
  { id: "snail-team", label: "Snail Team", description: "10 giri su Crazy Orani.", unlocked: true, reward: 2500 },
  { id: "spqr", label: "SPQR", description: "Vinci 100x in un colpo.", unlocked: true, reward: 5000 },
  { id: "missione-argiam", label: "Missione Argiam", description: "Streak di 5 vincite alla roulette.", unlocked: false, reward: 4000 },
  { id: "ricottati", label: "Ricottati", description: "Attiva il tuo primo bonus round.", unlocked: true, reward: 1500 },
  { id: "galera", label: "Galera", description: "10 perdite di fila (ironico).", unlocked: false, reward: 3000 },
  { id: "vinark", label: "VINARK!", description: "Raggiungi una mega win da 500x.", unlocked: false, reward: 10000 },
  { id: "ciurma", label: "Ciurma al completo", description: "Gioca con tutti i personaggi della crew.", unlocked: false, reward: 6000 },
];
