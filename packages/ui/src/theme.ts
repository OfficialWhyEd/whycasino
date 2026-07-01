import type { GameCategory } from "@whycasino/shared";

/** Tema visivo per categoria: rende le cover fallback delle key-art credibili.
 *  Ogni categoria ha un accento + mesh gradient dedicato (mai il solito viola→blu). */
export interface CategoryTheme {
  label: string;
  /** accento principale della categoria */
  accent: string;
  /** colore secondario del mesh */
  accent2: string;
  /** gradient mesh di sfondo per la cover fallback */
  mesh: string;
  /** ombra/alone tintato verso l'accento (rgba, senza wrapper) */
  glow: string;
}

export const CATEGORY_THEME: Record<GameCategory, CategoryTheme> = {
  live: {
    label: "Game Show",
    accent: "#c164ff",
    accent2: "#ff5cc8",
    mesh: "radial-gradient(120% 120% at 78% 8%, rgba(255,92,200,0.55), transparent 55%), radial-gradient(120% 130% at 12% 92%, rgba(139,92,246,0.6), transparent 58%)",
    glow: "193,100,255",
  },
  roulette: {
    label: "Roulette",
    accent: "#ff5c72",
    accent2: "#ffb23e",
    mesh: "radial-gradient(120% 120% at 80% 6%, rgba(255,178,62,0.5), transparent 52%), radial-gradient(130% 130% at 8% 96%, rgba(226,42,74,0.62), transparent 56%)",
    glow: "255,92,114",
  },
  blackjack: {
    label: "Blackjack",
    accent: "#39e6a0",
    accent2: "#1f9d6b",
    mesh: "radial-gradient(120% 120% at 82% 8%, rgba(57,230,160,0.42), transparent 52%), radial-gradient(130% 130% at 10% 94%, rgba(9,84,58,0.85), transparent 55%)",
    glow: "57,230,160",
  },
  baccarat: {
    label: "Baccarat",
    accent: "#f5c542",
    accent2: "#ff9f43",
    mesh: "radial-gradient(120% 120% at 80% 6%, rgba(255,224,138,0.5), transparent 50%), radial-gradient(130% 130% at 10% 96%, rgba(180,120,20,0.6), transparent 56%)",
    glow: "245,197,66",
  },
  poker: {
    label: "Poker",
    accent: "#5b8bff",
    accent2: "#8b5cf6",
    mesh: "radial-gradient(120% 120% at 80% 8%, rgba(91,139,255,0.5), transparent 54%), radial-gradient(130% 130% at 10% 94%, rgba(58,42,140,0.72), transparent 58%)",
    glow: "91,139,255",
  },
  slot: {
    label: "Slot",
    accent: "#35e6ff",
    accent2: "#8b5cf6",
    mesh: "radial-gradient(120% 120% at 80% 6%, rgba(53,230,255,0.42), transparent 52%), radial-gradient(130% 130% at 12% 96%, rgba(139,92,246,0.58), transparent 58%)",
    glow: "53,230,255",
  },
};

/** Estrae l'emoji "key-art" dal campo character ("🐌 Far Orani" → "🐌"). */
export function characterGlyph(character?: string): string | null {
  if (!character) return null;
  const m = character.match(
    /(\p{Extended_Pictographic}(‍\p{Extended_Pictographic})*)/u,
  );
  return m ? m[0] : null;
}

/** Nome del personaggio senza emoji ("🐌 Far Orani" → "Far Orani"). */
export function characterName(character?: string): string | null {
  if (!character) return null;
  return character.replace(/\p{Extended_Pictographic}|‍|️/gu, "").trim() || null;
}

/* ------------------------------------------------------------------ *
 *  Segnali di "casinò vivo": derivati deterministici dallo slug.
 *  Servono a rendere ogni card ricca e credibile (giocatori al tavolo,
 *  moltiplicatore massimo, hot) senza dati reali — stabili tra i render.
 * ------------------------------------------------------------------ */
function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295; // 0..1
}

/** Numero di giocatori "al tavolo" (deterministico, 40–2600). */
export function playersOnline(slug: string): number {
  const r = hashSlug(slug + "p");
  return Math.round((40 + r * 2560) / 4) * 4;
}

/** Moltiplicatore max mostrato sulla card (deterministico, 20–1000x). */
export function maxMultiplier(slug: string): number {
  const r = hashSlug(slug + "x");
  const steps = [20, 50, 100, 200, 250, 500, 1000];
  return steps[Math.floor(r * steps.length)];
}

/** True per ~1 card su 4 → tag "HOT" oro parsimonioso. */
export function isHot(slug: string): boolean {
  return hashSlug(slug + "h") > 0.74;
}

/** Etichetta "studio/provider" a tema crew per categoria (micro-label editoriale). */
export function providerLabel(category: GameCategory): string {
  const map: Record<GameCategory, string> = {
    live: "Crew Live Studios",
    roulette: "Argiam Gaming",
    blackjack: "Feltro Sardo",
    baccarat: "Faro Orani VIP",
    poker: "SPQR Poker Room",
    slot: "Nano Banana Slots",
  };
  return map[category];
}
