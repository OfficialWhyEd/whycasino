import type { Game } from "@whycasino/shared";

const cover = (slug: string) => `/assets/games/${slug}/cover.png`;

type Seed = Omit<Game, "cover" | "isLive"> & { isLive?: boolean };

const seeds: Seed[] = [
  // 🎪 GAME SHOWS (live)
  { slug: "crazy-orani", name: "Crazy Orani", category: "live", character: "🐌 Far Orani", lore: "La ruota impazzita di Far Orani. Bonus: Faro Orani, Grand Prix, Fast Slime, Lumacone." },
  { slug: "crazy-orani-diretta", name: "Crazy Orani: Diretta Assurda", category: "live", character: "🐌 Far Orani", lore: "Seconda ruota, moltiplicatori doppi, studio secondario." },
  { slug: "monopoli-cagliari", name: "Monòpoli Cagliari", category: "live", character: "🎩 Zì Monòpoli", lore: "Tabellone della città della crew; Zì Monòpoli cammina tra i vicoli." },
  { slug: "big-baller-sardo", name: "Big Baller Sardo", category: "live", character: "🎩 Zì Monòpoli", lore: "Bingo + tabellone, palline estratte dallo Zì." },
  { slug: "funky-frank", name: "Funky Frank", category: "live", character: "🏍️ Frank", lore: "Disco anni '70, Frank in tuta da moto glitterata, VIP Disco bonus." },
  { slug: "grand-prix-coin-flip", name: "Grand Prix Coin Flip", category: "live", character: "🐌 Far Orani", lore: "Testa/croce tra due lumache da corsa, moltiplicatori pre-round." },
  { slug: "mega-balla", name: "Mega Balla", category: "live", character: "🎲 Crew", lore: "Bingo con moltiplicatori, palline 'PAZZESCO'." },
  { slug: "cash-o-crash-argiam", name: "Cash o Crash: Missione Argiam", category: "live", character: "🚀 Argiam", lore: "Razzo che sale, incassa prima del crash o vai in 'GALERA'." },
  { slug: "caccia-tesoro-dino", name: "Caccia al Tesoro di Dino Estrada", category: "live", character: "🦕 Dino Estrada", lore: "Mappa preistorica, scegli i forzieri, moltiplicatori nascosti." },
  { slug: "dadi-fulminati", name: "Dadi Fulminati", category: "live", character: "🚀 Argiam", lore: "Tre dadi, fulmini di Argiam sui numeri." },
  { slug: "tempesta-argiam", name: "Tempesta Argiam", category: "live", character: "🚀 Argiam", lore: "Roulette + dadi ibrido spaziale." },
  { slug: "porta-rossa-galera", name: "La Porta Rossa (GALERA)", category: "live", character: "🚪 Crew", lore: "Scegli la porta: dietro c'è vincita o 'GALERA!'." },
  { slug: "pesca-abissi", name: "Pesca negli Abissi", category: "live", character: "🐡 Pesce", lore: "Buchi nell'abisso, pesci-moltiplicatore, il Pesce boss." },
  { slug: "bac-bo-sardo", name: "Bac Bo Sardo", category: "live", character: "🎲 Crew", lore: "Dadi baccarat, tifo da stadio." },
  { slug: "studio-cagliari", name: "Studio Cagliari", category: "live", character: "⚽ Crew", lore: "Casa/Ospite a tema derby, catchphrase da curva." },
  { slug: "corsa-palloncini", name: "Corsa dei Palloncini", category: "live", character: "🐌 Far Orani", lore: "Palloncini che salgono, esplodono, incassa prima." },
  { slug: "peperoncino-epico", name: "Peperoncino Epico", category: "live", character: "🌶️ Crew", lore: "Ruote di free spin piccanti, 'VINARK!'." },
  { slug: "palle-pazze", name: "Palle Pazze", category: "live", character: "🎪 Crew", lore: "Plinko impazzito con i volti della crew." },

  // 🎡 ROULETTE
  { slug: "argiam-lightning", name: "Argiam Lightning", category: "roulette", character: "🚀 Argiam", lore: "Fulmini spaziali sui numeri, moltiplicatori 50-500x." },
  { slug: "argiam-xxxtreme", name: "Argiam XXXtreme", category: "roulette", character: "🚀 Argiam", lore: "Doppi fulmini, chain lightning cosmico." },
  { slug: "roulette-immersiva", name: "Roulette Immersiva", category: "roulette", character: "🎡 Casinò", lore: "Multi-camera cinematografica, slow-mo pallina." },
  { slug: "auto-roulette-orani", name: "Auto Roulette Orani", category: "roulette", character: "🐌 Far Orani", lore: "Ruota automatica, lenta come piace a Far Orani." },
  { slug: "speed-roulette", name: "Speed Roulette", category: "roulette", character: "🐌 Far Orani", lore: "Round rapidi (ironia: Far Orani che corre)." },
  { slug: "doppia-pallina", name: "Doppia Pallina", category: "roulette", character: "🎡 Casinò", lore: "Due palline, doppie vincite." },
  { slug: "roulette-vip-faro", name: "Roulette VIP Faro", category: "roulette", character: "🐌 Far Orani", lore: "Tavolo dorato premium, sala Faro Orani." },

  // 🃏 BLACKJACK
  { slug: "blackjack-infinito", name: "Blackjack Infinito", category: "blackjack", character: "🃏 Casinò", lore: "Posti illimitati, tutti nella stessa mano." },
  { slug: "blackjack-argiam", name: "Blackjack Argiam", category: "blackjack", character: "🚀 Argiam", lore: "Carte-fulmine con moltiplicatori." },
  { slug: "blackjack-ghe-go", name: "Blackjack GHE-GO", category: "blackjack", character: "🃏 Crew", lore: "Split/double gratis, urlo 'GHE-GO' allo split." },
  { slug: "blackjack-vinark", name: "Blackjack VINARK", category: "blackjack", character: "🃏 Crew", lore: "Double/triple/quadruple down." },
  { slug: "blackjack-veloce", name: "Blackjack Veloce", category: "blackjack", character: "🃏 Casinò", lore: "Mani rapidissime." },

  // 🀄 BACCARAT
  { slug: "baccarat-argiam", name: "Baccarat Argiam", category: "baccarat", character: "🚀 Argiam", lore: "Moltiplicatori a fulmine." },
  { slug: "baccarat-veloce", name: "Baccarat Veloce", category: "baccarat", character: "🀄 Casinò", lore: "Il più rapido." },
  { slug: "baccarat-squeeze", name: "Baccarat Squeeze", category: "baccarat", character: "🀄 Casinò", lore: "Rivelazione lenta e drammatica della carta." },
  { slug: "drago-dino", name: "Drago Dino", category: "baccarat", character: "🦕 Dino Estrada", lore: "Dino Estrada vs Drago, carta più alta vince." },
  { slug: "baccarat-no-commissioni", name: "Baccarat Senza Commissioni", category: "baccarat", character: "🀄 Casinò", lore: "Banco senza commissione." },

  // ♠️ POKER
  { slug: "holdem-spqr", name: "Hold'em SPQR", category: "poker", character: "🏛️ Crew", lore: "Poker imperiale, insegne romane." },
  { slug: "ultimate-texas-ricottati", name: "Ultimate Texas RICOTTATI", category: "poker", character: "♠️ Crew", lore: "Sfida il banco, all-in 'RICOTTATI!'." },
  { slug: "poker-tre-carte", name: "Poker a Tre Carte", category: "poker", character: "♠️ Casinò", lore: "Tre carte, giro veloce." },
  { slug: "caribbean-stud-sardo", name: "Caribbean Stud Sardo", category: "poker", character: "🌴 Crew", lore: "Stud caraibico in salsa sarda." },
  { slug: "side-bet-cagliari", name: "Side Bet Cagliari", category: "poker", character: "♠️ Crew", lore: "Punta sulle mani della città." },

  // 🎰 SLOT (isLive false)
  { slug: "starbust-orani", name: "Starbust Orani", category: "slot", character: "🐌 Far Orani", lore: "Gemme neon che si espandono, wild lumaca.", isLive: false },
  { slug: "dino-estrada-quest", name: "Dino Estrada Quest", category: "slot", character: "🦕 Dino Estrada", lore: "Rovine preistoriche, valanghe di simboli.", isLive: false },
  { slug: "dead-or-galera", name: "Dead or GALERA", category: "slot", character: "🤠 Crew", lore: "Far West, sticky wild, 'GALERA!' sui morti.", isLive: false },
  { slug: "abissi-bonanza", name: "Abissi Bonanza", category: "slot", character: "🐡 Pesce", lore: "Megaways sottomarino, moltiplicatore infinito.", isLive: false },
  { slug: "fortuna-divina-spqr", name: "Fortuna Divina SPQR", category: "slot", character: "🏛️ Crew", lore: "Dei romani, jackpot progressivi.", isLive: false },
  { slug: "libro-di-far-orani", name: "Il Libro di Far Orani", category: "slot", character: "🐌 Far Orani", lore: "Espansione simboli, tomo della lumaca.", isLive: false },
  { slug: "fast-slime-rush", name: "Fast Slime Rush", category: "slot", character: "🐌 Far Orani", lore: "Slot iper-veloce (paradosso lumaca), moltiplicatori a catena.", isLive: false },
  { slug: "dremvibe-neon", name: "DremVibe Neon", category: "slot", character: "🎸 Drem", lore: "Concerto punk di Cagliari, bonus backstage.", isLive: false },
  { slug: "motorfrank-turbo", name: "MotorFrank Turbo", category: "slot", character: "🏍️ Frank", lore: "Griglia di partenza, respin nitro.", isLive: false },
  { slug: "ciurma-4", name: "Ciurma 4 (PirOrani)", category: "slot", character: "🏴‍☠️ Crew", lore: "Griglia collection: 4 creature-ciurma coi volti della crew raccolgono simboli, sbloccano aree, feature a catena.", isLive: false },
];

export const GAMES: Game[] = seeds.map((s) => ({
  ...s,
  isLive: s.isLive ?? true,
  cover: cover(s.slug),
}));

export const gamesByCategory = (category: Game["category"]) =>
  GAMES.filter((g) => g.category === category);

export const liveGames = () => GAMES.filter((g) => g.isLive);

export const gameBySlug = (slug: string) => GAMES.find((g) => g.slug === slug);

/** Giochi correlati: stessa categoria, escluso quello corrente. */
export const relatedGames = (slug: string, limit = 8) => {
  const game = gameBySlug(slug);
  if (!game) return [];
  return GAMES.filter((g) => g.category === game.category && g.slug !== slug).slice(
    0,
    limit,
  );
};
