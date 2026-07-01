# WhyCasinò — Shell & Design System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Costruire la shell navigabile di WhyCasinò (lobby, categorie, pagina gioco, classifiche, profilo) con un design system riusabile e dati finti, di qualità commerciale.

**Architecture:** Monorepo pnpm. `packages/shared` definisce i tipi dominio (Game, Player, Wallet, LeaderboardEntry, Achievement). `packages/ui` è il design system (token CSS + componenti React). `apps/web` è l'app Vite che consuma mock data e monta le pagine. Nessun backend in questo sotto-progetto: le classifiche/wallet sono in-memory. Tutto è tipizzato con le stesse interfacce che il futuro motore live implementerà.

**Tech Stack:** pnpm workspaces, React 18, Vite, TypeScript (strict), React Router, Framer Motion, Vitest + Testing Library, ESLint + Prettier.

## Global Constraints

- **Valuta finta** ("WhyCoins") ovunque — mai denaro reale, mai deposito/prelievo.
- **Nomi giochi** ispirati-ma-originali, presi da `docs/lore/GAMES.md` (mai copia 1:1 Evolution).
- **Face-consistency** (asset futuri): i volti reali della crew restano identici (`docs/lore/ASSETS.md`). Non impatta questo sotto-progetto (placeholder), ma i path asset devono essere `apps/web/public/assets/games/<slug>/`.
- **Estetica:** dark-neon (nero/blu notte + neon viola-verde + oro VIP), vivo/bouncy, no aspetto "AI generico".
- **TypeScript strict** attivo. **TDD** per la logica (ordinamenti, wallet, selettori). **Commit frequenti**.
- **Foto reali** solo in `references/` (gitignored) — mai importate nel bundle.

---

## File Structure

```
whycasino/
├── package.json                      # workspace root, scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── packages/
│   ├── shared/
│   │   ├── package.json
│   │   ├── src/types.ts              # Game, Player, Wallet, LeaderboardEntry, Achievement, enums
│   │   ├── src/leaderboard.ts        # sortLeaderboard(), rankPlayers()  (logica testabile)
│   │   └── src/leaderboard.test.ts
│   └── ui/
│       ├── package.json
│       ├── DESIGN.md                 # token & regole (scritto prima del CSS)
│       ├── src/tokens.css            # CSS variables
│       ├── src/index.ts              # barrel export
│       ├── src/Navbar.tsx
│       ├── src/WalletBadge.tsx
│       ├── src/GameCard.tsx
│       ├── src/LiveBadge.tsx
│       ├── src/BetPanel.tsx
│       ├── src/Leaderboard.tsx
│       ├── src/AchievementBadge.tsx
│       └── src/JackpotTicker.tsx
└── apps/
    └── web/
        ├── package.json
        ├── index.html
        ├── vite.config.ts
        ├── src/main.tsx
        ├── src/App.tsx               # router
        ├── src/mock/games.ts         # catalogo da GAMES.md → GameCategory data
        ├── src/mock/players.ts       # crew + classifiche daily/weekly
        ├── src/mock/wallet.ts        # wallet + achievements finti
        ├── src/pages/LobbyPage.tsx
        ├── src/pages/CategoryPage.tsx
        ├── src/pages/GamePage.tsx
        ├── src/pages/LeaderboardPage.tsx
        └── src/pages/ProfilePage.tsx
```

---

### Task 1: Scaffold monorepo

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.prettierrc`, `.eslintrc.cjs`

**Interfaces:**
- Produces: workspace con packages `@whycasino/shared`, `@whycasino/ui`, e app `web`.

- [ ] **Step 1: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

- [ ] **Step 2: Create root `package.json`**

```json
{
  "name": "whycasino",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter web dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "eslint": "^9.0.0",
    "prettier": "^3.3.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 3: Create `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  }
}
```

- [ ] **Step 4: Install and verify workspace resolves**

Run: `pnpm install`
Expected: completes without error, creates `node_modules` and `pnpm-lock.yaml`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: scaffold pnpm monorepo"
```

---

### Task 2: Domain types in `packages/shared`

**Files:**
- Create: `packages/shared/package.json`, `packages/shared/src/types.ts`

**Interfaces:**
- Produces:
  - `type GameCategory = "live" | "roulette" | "blackjack" | "baccarat" | "poker" | "slot"`
  - `interface Game { slug: string; name: string; category: GameCategory; character?: string; lore: string; isLive: boolean; cover: string; }`
  - `interface Player { id: string; name: string; avatar: string; }`
  - `interface Wallet { playerId: string; coins: number; }`
  - `interface LeaderboardEntry { player: Player; winnings: number; }`
  - `interface Achievement { id: string; label: string; description: string; unlocked: boolean; reward: number; }`

- [ ] **Step 1: Create `packages/shared/package.json`**

```json
{
  "name": "@whycasino/shared",
  "version": "0.0.0",
  "type": "module",
  "main": "src/index.ts",
  "scripts": { "build": "tsc -p tsconfig.json", "test": "vitest run" }
}
```

- [ ] **Step 2: Create `packages/shared/src/types.ts`**

```ts
export type GameCategory =
  | "live" | "roulette" | "blackjack" | "baccarat" | "poker" | "slot";

export interface Game {
  slug: string;
  name: string;
  category: GameCategory;
  character?: string; // emoji/id personaggio, es. "🐌 Far Orani"
  lore: string;
  isLive: boolean;
  cover: string; // path in /assets/games/<slug>/cover.png (placeholder finché non generato)
}

export interface Player { id: string; name: string; avatar: string; }
export interface Wallet { playerId: string; coins: number; }
export interface LeaderboardEntry { player: Player; winnings: number; }
export interface Achievement {
  id: string; label: string; description: string; unlocked: boolean; reward: number;
}
```

- [ ] **Step 3: Create `packages/shared/src/index.ts`**

```ts
export * from "./types";
export * from "./leaderboard";
```

- [ ] **Step 4: Commit**

```bash
git add packages/shared && git commit -m "feat(shared): domain types"
```

---

### Task 3: Leaderboard logic (TDD)

**Files:**
- Create: `packages/shared/src/leaderboard.ts`, `packages/shared/src/leaderboard.test.ts`

**Interfaces:**
- Consumes: `Player`, `LeaderboardEntry` from Task 2.
- Produces:
  - `sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[]` — discendente per `winnings`, stabile per nome a parità.
  - `rankOf(entries: LeaderboardEntry[], playerId: string): number` — rank 1-based, `-1` se assente.

- [ ] **Step 1: Write the failing test**

```ts
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
  it("returns 1-based rank", () => {
    expect(rankOf(entries, "b")).toBe(1);
    expect(rankOf(entries, "a")).toBe(3);
    expect(rankOf(entries, "zzz")).toBe(-1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @whycasino/shared test`
Expected: FAIL — "sortLeaderboard is not a function".

- [ ] **Step 3: Write minimal implementation**

```ts
import type { LeaderboardEntry } from "./types";

export function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort(
    (x, y) =>
      y.winnings - x.winnings || x.player.name.localeCompare(y.player.name),
  );
}

export function rankOf(entries: LeaderboardEntry[], playerId: string): number {
  const sorted = sortLeaderboard(entries);
  const i = sorted.findIndex((e) => e.player.id === playerId);
  return i === -1 ? -1 : i + 1;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter @whycasino/shared test`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add packages/shared && git commit -m "feat(shared): leaderboard sort + rank (TDD)"
```

---

### Task 4: Design tokens + DESIGN.md

**Files:**
- Create: `packages/ui/package.json`, `packages/ui/DESIGN.md`, `packages/ui/src/tokens.css`

**Interfaces:**
- Produces: CSS variables consumate da tutti i componenti (`--wc-bg`, `--wc-neon-violet`, `--wc-neon-green`, `--wc-gold`, `--wc-space-*`, `--wc-radius-*`, `--wc-glow`).

- [ ] **Step 1: Write `packages/ui/DESIGN.md`** (token, scale, regole) — includere palette, spacing scale (4/8/12/16/24/32/48), tipografia (display bold per numeri, sans per testo), regole motion (bouncy, spring), anti-pattern (no cream bg, no emoji illustrative). Fonte estetica: `docs/lore/ASSETS.md` art direction.

- [ ] **Step 2: Create `packages/ui/src/tokens.css`**

```css
:root {
  --wc-bg: #07070d;
  --wc-surface: rgba(255,255,255,0.04);
  --wc-surface-border: rgba(255,255,255,0.08);
  --wc-neon-violet: #8b5cf6;
  --wc-neon-green: #7CFF6B;
  --wc-gold: #F5C542;
  --wc-text: #EDEDF5;
  --wc-text-dim: #9a9ab0;
  --wc-space-1: 4px; --wc-space-2: 8px; --wc-space-3: 12px;
  --wc-space-4: 16px; --wc-space-6: 24px; --wc-space-8: 32px;
  --wc-radius: 14px; --wc-radius-lg: 22px;
  --wc-glow: 0 0 24px rgba(139,92,246,0.45);
}
```

- [ ] **Step 3: Create `packages/ui/package.json`**

```json
{
  "name": "@whycasino/ui",
  "version": "0.0.0",
  "type": "module",
  "main": "src/index.ts",
  "peerDependencies": { "react": "^18", "framer-motion": "^11" },
  "dependencies": { "@whycasino/shared": "workspace:*" }
}
```

- [ ] **Step 4: Commit**

```bash
git add packages/ui && git commit -m "feat(ui): design tokens + DESIGN.md"
```

---

### Task 5: Core presentational components

**Files:**
- Create: `packages/ui/src/LiveBadge.tsx`, `WalletBadge.tsx`, `JackpotTicker.tsx`, `GameCard.tsx`, `AchievementBadge.tsx`, `src/index.ts`

**Interfaces:**
- Consumes: `Game`, `Achievement` from shared; `tokens.css`.
- Produces (props):
  - `LiveBadge()` — pill "LIVE" pulsante.
  - `WalletBadge({ coins }: { coins: number })` — usa `JackpotTicker` per animare.
  - `JackpotTicker({ value }: { value: number })` — conteggio animato (Framer Motion `animate`).
  - `GameCard({ game, onOpen }: { game: Game; onOpen: (slug: string) => void })` — cover, titolo, `LiveBadge` se `isLive`, hover bouncy.
  - `AchievementBadge({ achievement }: { achievement: Achievement })`.

- [ ] **Step 1: Write `JackpotTicker.tsx`** (animatore numerico riusabile)

```tsx
import { useEffect, useRef, useState } from "react";
export function JackpotTicker({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current, delta = value - start, t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 600);
      setDisplay(Math.round(start + delta * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    from.current = value;
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{display.toLocaleString("it-IT")}</span>;
}
```

- [ ] **Step 2: Write `LiveBadge.tsx`, `WalletBadge.tsx`, `GameCard.tsx`, `AchievementBadge.tsx`** seguendo i token. `GameCard` usa `motion.button` con `whileHover={{ y: -6, scale: 1.03 }}` e glow. Cover via `<img src={game.cover} onError>` con fallback placeholder gradiente.

- [ ] **Step 3: Write barrel `src/index.ts`**

```ts
import "./tokens.css";
export * from "./LiveBadge";
export * from "./WalletBadge";
export * from "./JackpotTicker";
export * from "./GameCard";
export * from "./AchievementBadge";
export * from "./Navbar";
export * from "./BetPanel";
export * from "./Leaderboard";
```

- [ ] **Step 4: Commit**

```bash
git add packages/ui && git commit -m "feat(ui): core components (GameCard, WalletBadge, ticker, badges)"
```

---

### Task 6: Layout components (Navbar, BetPanel, Leaderboard)

**Files:**
- Create: `packages/ui/src/Navbar.tsx`, `BetPanel.tsx`, `Leaderboard.tsx`

**Interfaces:**
- Consumes: `LeaderboardEntry`, `sortLeaderboard`, `rankOf` from shared.
- Produces:
  - `Navbar({ coins, links }: { coins: number; links: { label: string; to: string }[] })`
  - `BetPanel({ balance, onSpin }: { balance: number; onSpin: (amount: number) => void })` — input +/- puntata (solo UI).
  - `Leaderboard({ entries, variant }: { entries: LeaderboardEntry[]; variant: "daily" | "weekly" })` — usa `sortLeaderboard`, podio top-3 + tabella.

- [ ] **Step 1: Write the three components** usando i token. `Leaderboard` ordina con `sortLeaderboard(entries)` e mostra podio (oro/argento/bronzo) animato.

- [ ] **Step 2: Commit**

```bash
git add packages/ui && git commit -m "feat(ui): Navbar, BetPanel, Leaderboard"
```

---

### Task 7: Mock data (catalogo da GAMES.md)

**Files:**
- Create: `apps/web/src/mock/games.ts`, `apps/web/src/mock/players.ts`, `apps/web/src/mock/wallet.ts`

**Interfaces:**
- Consumes: `Game`, `Player`, `LeaderboardEntry`, `Wallet`, `Achievement` from shared.
- Produces:
  - `GAMES: Game[]` — TUTTI i giochi di `docs/lore/GAMES.md` (≥50), con `slug`, `name`, `category`, `character`, `lore`, `isLive` (true per live/roulette/blackjack/baccarat/poker; false per slot), `cover: "/assets/games/<slug>/cover.png"`.
  - `CREW: Player[]`, `DAILY: LeaderboardEntry[]`, `WEEKLY: LeaderboardEntry[]`.
  - `MY_WALLET: Wallet`, `ACHIEVEMENTS: Achievement[]`.

- [ ] **Step 1: Write `games.ts`** trascrivendo il catalogo da `docs/lore/GAMES.md` (nome, categoria, personaggio, micro-lore). Esempio prime righe:

```ts
import type { Game } from "@whycasino/shared";
export const GAMES: Game[] = [
  { slug: "crazy-orani", name: "Crazy Orani", category: "live", character: "🐌 Far Orani",
    lore: "La ruota impazzita di Far Orani. Bonus: Faro Orani, Grand Prix, Fast Slime, Lumacone.",
    isLive: true, cover: "/assets/games/crazy-orani/cover.png" },
  { slug: "argiam-lightning", name: "Argiam Lightning", category: "roulette", character: "🚀 Argiam",
    lore: "Fulmini spaziali sui numeri, moltiplicatori 50-500x.",
    isLive: true, cover: "/assets/games/argiam-lightning/cover.png" },
  // ... resto del catalogo GAMES.md (≥50)
];
```

- [ ] **Step 2: Write `players.ts` e `wallet.ts`** con la crew, classifiche daily/weekly, wallet e achievement (nomi da `docs/lore/GAMES.md` sezione achievement).

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/mock && git commit -m "feat(web): mock catalogo giochi + crew + wallet"
```

---

### Task 8: Vite app + routing shell

**Files:**
- Create: `apps/web/package.json`, `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`

**Interfaces:**
- Consumes: pagine da Task 9, `Navbar` da ui, `MY_WALLET` da mock.
- Produces: app avviabile con `pnpm dev`, routing `/`, `/c/:category`, `/game/:slug`, `/leaderboard`, `/profile`.

- [ ] **Step 1: Create `apps/web/package.json`** con dipendenze react, react-dom, react-router-dom, framer-motion, `@whycasino/ui`, `@whycasino/shared` (workspace:*), vite, @vitejs/plugin-react.

- [ ] **Step 2: Create `vite.config.ts`, `index.html`, `src/main.tsx`.**

- [ ] **Step 3: Create `src/App.tsx`** con `<BrowserRouter>`, `<Navbar coins={MY_WALLET.coins} links={...}/>` e `<Routes>` verso le 5 pagine.

- [ ] **Step 4: Run dev server and verify it boots**

Run: `pnpm dev`
Expected: Vite serve su localhost, la Navbar è visibile senza errori console.

- [ ] **Step 5: Commit**

```bash
git add apps/web && git commit -m "feat(web): vite app + routing + navbar"
```

---

### Task 9: Pages

**Files:**
- Create: `apps/web/src/pages/{Lobby,Category,Game,Leaderboard,Profile}Page.tsx`

**Interfaces:**
- Consumes: `GAMES`, `DAILY`, `WEEKLY`, `MY_WALLET`, `ACHIEVEMENTS` from mock; ui components.
- Produces: le 5 viste montate dal router.

- [ ] **Step 1: `LobbyPage`** — hero con `JackpotTicker`, carosello "Live ora" (`GAMES.filter(g => g.isLive)`), griglie per categoria via `GameCard`.
- [ ] **Step 2: `CategoryPage`** — legge `useParams().category`, filtra `GAMES`, griglia filtrabile.
- [ ] **Step 3: `GamePage`** — legge `slug`, mostra cover/lore + `BetPanel` (solo UI) + pannello attività placeholder.
- [ ] **Step 4: `LeaderboardPage`** — tab Daily/Weekly con componente `Leaderboard`.
- [ ] **Step 5: `ProfilePage`** — `WalletBadge`, griglia `AchievementBadge`, statistiche finte.
- [ ] **Step 6: Verify navigation** — cliccando una `GameCard` si arriva a `/game/:slug`; tutte le pagine navigano senza errori.
- [ ] **Step 7: Commit**

```bash
git add apps/web/src/pages && git commit -m "feat(web): lobby, category, game, leaderboard, profile pages"
```

---

### Task 10: Responsive + polish pass

**Files:**
- Modify: componenti ui + pagine (media query, grid responsive).

- [ ] **Step 1: Add responsive grids** (auto-fill minmax) e Navbar mobile.
- [ ] **Step 2: Verify** su viewport 375px e 1440px: nessun overflow, testo leggibile, tap target ≥44px.
- [ ] **Step 3: Run build**

Run: `pnpm build`
Expected: build di tutti i package/app senza errori TS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(web): responsive + polish shell"
```

---

## Placeholder assets

Finché la pipeline Nano Banana non gira, ogni `GameCard` mostra un fallback gradiente neon con
iniziale del gioco (via `onError` sull'`<img>`). I path reali `/assets/games/<slug>/cover.png`
verranno riempiti dallo script assetgen (sotto-progetto asset) senza modifiche al codice shell.

## Definition of Done

- `pnpm dev` avvia; 5 pagine navigabili con l'intero catalogo (≥50 giochi) da mock.
- `pnpm test` verde (leaderboard). `pnpm build` verde. `pnpm lint` pulito.
- Design system in `packages/ui` con `DESIGN.md` + 8 componenti + tokens.
- Estetica dark-neon coerente, responsive 375–1440px.
- Tipi condivisi in `packages/shared` pronti per il motore live.
