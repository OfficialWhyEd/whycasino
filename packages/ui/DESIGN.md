# WhyCasinò — Design System

Estetica: **dark-neon premium casino**, vivo e bouncy, qualità commerciale da vero
casinò live (riferimenti: Stake, 888, Evolution). Fonte art direction: `docs/lore/ASSETS.md`.

## Filosofia (sintesi dai top del settore)
- **Content-first darkness** (modello Spotify/Stake): l'interfaccia sparisce nel buio,
  le *cover dei giochi brillano*. Le superfici sono charcoal quasi-neri, l'unico colore
  vero arriva dalle key-art dei giochi e dagli accenti funzionali.
- **Accento funzionale, mai decorativo**: il viola neon e il verde segnalano azione /
  stato / live. Niente gradienti buttati a caso: il gradiente è riservato al CTA
  principale e alle key-art fallback.
- **Rail orizzontali** = pattern portante della lobby (come ogni casino/streaming reale),
  con snap-scroll su mobile. Le griglie complete solo nelle pagine catalogo.
- **Imagery does the heavy lifting**: la card è quasi tutta cover; il testo è compresso
  in uno slot editoriale in basso su scrim.

## Palette (token in `tokens.css`)
- Base near-black blu-notte: `--wc-bg #06060e`, elevazioni `--wc-bg-2/3`.
- Superfici a vetro `--wc-surface*` + charcoal solido `--wc-surface-solid` (card mobile).
- Neon identità: viola `--wc-violet #8b5cf6` (primario/azione), verde `--wc-green #7cff6b`
  (live/positivo), ciano `--wc-cyan` (accento freddo).
- Oro VIP (parsimonia estrema): `--wc-gold #f5c542` solo per WhyCoins / jackpot / podio.
- Danger `--wc-danger` per LIVE e stati negativi.
- Testo: `--wc-text #f2f2fa`, `--wc-text-dim`, `--wc-text-mute` (3 livelli via opacità).

## Tema per categoria (`categoryTheme`)
Ogni categoria ha un accento + mesh gradient dedicato, così le cover fallback sembrano
key-art vere: live=magenta/viola, roulette=rosso/oro, blackjack=verde feltro,
baccarat=oro/ambra, poker=indaco reale, slot=ciano/viola neon.

## Spacing scale (8px grid)
4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 (`--wc-space-*`). Tutto multiplo di 4/8.

## Tipografia (4+ livelli)
- Display: **Space Grotesk** 700/800, tracking negativo (heading, numeri, brand).
- Body/UI: **Plus Jakarta Sans** 400/500/600 — premium SaaS, ottimo sui numeri.
- Numeri animati sempre `tabular-nums`.
- Scala: display-xl 40/48, h2 20/22, h3 16, body 14/15, caption 12, micro 11 (uppercase +tracking).

## Motion (Framer Motion + CSS hardware-accelerated)
- Solo `transform`/`opacity` (60fps, no layout thrash).
- Hover card: `y:-6, scale:1.03`, spring bouncy (stiffness ~320, damping ~20).
- Micro-motion perpetuo: shimmer sul CTA, pulse sul LIVE, glow-breathe sul jackpot,
  float lento sulle key-art. Sempre dietro `prefers-reduced-motion: reduce`.
- Ticker numerici: cubic-out ~600ms (`JackpotTicker`).

## Mobile-first (iPhone, priorità massima)
- Vero mobile-first da 320px, non shrink del desktop.
- **Bottom tab bar** sticky con icone SVG (Lobby, Live, Giochi, Classifica, Profilo),
  `env(safe-area-inset-bottom)`, tap target ≥44px, glass + blur.
- Top bar compatta: brand + wallet. Niente link desktop schiacciati.
- Rail categorie = scroll orizzontale con `scroll-snap` e `-webkit-overflow-scrolling`.
- Safe-area insets ovunque (notch/home indicator). `min-height: 100dvh`, mai `100vh`.
- Griglia giochi: 2 col a 375px → auto-fill crescente su desktop.

## Regole (anti-pattern — vietati)
- ❌ sfondi chiari/cream · ❌ emoji come icone di sistema (SVG!) · ❌ pattern da web-app
  generica · ❌ gradiente viola→blu decorativo · ❌ card dentro card dentro card ·
  ❌ hero centrato titolone+CTA · ❌ navbar desktop schiacciata su mobile.
- ✅ dark cinematic, glow neon funzionale, vetro, oro solo VIP/jackpot, key-art che brillano.
- Cover mancanti → **fallback premium** a tema categoria (mesh + key-art emoji + scrim),
  mai box grigio vuoto. Il codice accetta l'asset vero futuro a
  `/assets/games/<slug>/cover.png` (onError → fallback).

## Componenti
`Navbar` · `MobileTabBar` · `WalletBadge` · `GameCard` · `LiveBadge` · `BetPanel` ·
`Leaderboard` · `AchievementBadge` · `JackpotTicker` · `Rail`/`SectionHeader` ·
`Segmented` (control con pill scorrevole, tab filtri/classifiche) · `Icon`.

## Pagine (apps/web)
- **Lobby**: hero asimmetrico con gioco in vetrina (mesh categoria + key-art fluttuante +
  jackpot ticker + CTA), quick-nav categorie a chip, rail tematici (`GamesRail`), griglia
  catalogo. Mai hero centrato.
- **Game**: stage 16/10 a tema categoria (mesh + glyph + scrim + pill "real-time in arrivo"),
  `BetPanel` + attività crew a lato, rail "Altri <categoria>" correlati.
- **Category**: `SectionHeader` + `Segmented` filtri + griglia con empty state.
- **Leaderboard**: `Segmented` giornaliera/settimanale + podio + lista.
- **Profile**: header a fascia con avatar in ring, stat con accenti, achievement.
