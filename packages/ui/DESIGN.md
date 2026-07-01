# WhyCasinò — Design System

Estetica: **dark-neon cripto-gaming**, vivo e bouncy, qualità commerciale. Fonte art direction: `docs/lore/ASSETS.md`.

## Palette (token in `tokens.css`)
- Base: `--wc-bg #07070d` (nero-blu notte), superfici a vetro `--wc-surface` con bordo sottile.
- Neon primari: viola `--wc-neon-violet #8b5cf6`, verde `--wc-neon-green #7CFF6B`.
- Oro VIP (parsimonia): `--wc-gold #F5C542`.
- Testo: `--wc-text #EDEDF5`, dim `--wc-text-dim`.

## Spacing scale
4 · 8 · 12 · 16 · 24 · 32 · 48 (`--wc-space-1..8`).

## Tipografia
- Display bold (numeri, heading): peso 800, tracking stretto.
- Sans leggibile per il corpo. Numeri sempre tabellari dove animati.

## Motion (Framer Motion)
- Hover card: `y:-6, scale:1.03`, spring bouncy (stiffness ~320, damping ~18).
- Contatori: easing cubic-out ~600ms (`JackpotTicker`).
- LiveBadge: pulse infinito su opacity/scale.

## Regole (anti-pattern — vietati)
- ❌ sfondi chiari/cream, ❌ emoji illustrative come grafica, ❌ pattern da web-app generica.
- ✅ dark cinematic, glow neon, vetro, oro solo per VIP/jackpot.
- Cover mancanti → fallback gradiente neon con iniziale del gioco (mai box grigio vuoto).

## Componenti
`Navbar` · `WalletBadge` · `GameCard` · `LiveBadge` · `BetPanel` · `Leaderboard` · `AchievementBadge` · `JackpotTicker`.
