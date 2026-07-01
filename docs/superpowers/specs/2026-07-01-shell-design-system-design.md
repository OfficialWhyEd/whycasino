# WhyCasinò — Spec Sotto-progetto 1: Shell & Design System

**Data:** 2026-07-01
**Stato:** Draft in review
**Autore:** Edoardo (WhyEd) + Claude Code

---

## 0. Contesto & natura del progetto

**WhyCasinò** è un *social casino* per Edoardo e i suoi amici: **valuta esclusivamente finta** ("WhyCoins", dollari virtuali), nessun deposito né prelievo di denaro reale, nessun gioco d'azzardo con valore monetario. Ispirato a 888 / Stake / Evolution nell'estetica e nelle meccaniche, ma con contenuti, personaggi e lore **originali** basati sul gruppo di amici.

Obiettivo di lungo periodo: qualità e architettura di livello **commerciale**, pubblicabile su GitHub, potenzialmente estendibile in prodotto vero in futuro. Questa spec copre **solo il primo sotto-progetto**.

---

## 1. Architettura complessiva (contesto, non tutto in questo sub-progetto)

Monorepo **pnpm workspaces** su GitHub:

```
whycasino/
├── apps/
│   └── web/          # Frontend React (Vite) — QUESTO sotto-progetto
├── packages/
│   ├── shared/       # Tipi, regole di gioco, costanti condivise
│   └── ui/           # Design system: token + libreria componenti
├── services/
│   └── engine/       # Cloudflare Workers + Durable Objects — sotto-progetto 2 (NON ora)
└── docs/
```

- **Frontend:** React + Vite + TypeScript, deploy su **Cloudflare Pages**.
- **Backend giochi live (futuro):** **Cloudflare Workers + Durable Objects** — un DO per tavolo che tiene l'orologio e gira i round anche a zero utenti connessi, RNG server-side, WebSocket ai client, **provably-fair** (seed hashato + reveal).
- **Modello "live" scelto:** tavoli **real-time server-side** con motion-graphics di altissima qualità, sempre in funzione, architettati per accogliere in seguito **croupier AI** (Crazy Orani per primo). No video con dealer umani.
- **Parità catalogo:** copertura dell'intero lineup Evolution + slot degli studi del gruppo, ognuno ricostruito "uno per uno" e fedele nelle meccaniche (vedi `docs/lore/GAMES.md`), incl. **Ciurma 4 (PirOrani)** su meccanica Pirots 4.
- **Face consistency:** regola non negoziabile — i volti reali della crew restano identici in ogni asset (vedi `docs/lore/ASSETS.md`).
- **Asset visivi:** generati una tantum con **Gemini 2.5 Flash Image (Nano Banana)**, rifiniti e committati come file statici (non generazione a runtime).

### Roadmap sotto-progetti (ordine)
1. **Shell & Design System** ← *questa spec*
2. **Motore giochi live** (Durable Objects, Crazy Orani come primo gioco reale)
3. **Slot** (RNG per giro, provably-fair)
4. **Core/economia** (auth amici, wallet persistente, achievement server-side)
5. **Pipeline asset & lore** (generazione Gemini, personaggi)

I sotto-progetti 3-5 si intrecciano con lo shell tramite le interfacce definite in `packages/shared`.

---

## 2. Scopo di QUESTO sotto-progetto

Costruire l'**ossatura visiva completa e navigabile** del sito con **dati finti (mock)**, e un **design system riusabile** su cui innestare i sotto-progetti successivi. Nessun backend, nessuna vera logica di gioco: tutto ciò che si *vede* dev'essere di livello finale.

### In scope
- Design system completo (token + componenti) in `packages/ui`.
- Tutte le pagine principali navigabili con mock data.
- Classifiche giornaliera + settimanale (UI + mock).
- Layout responsive (desktop-first, mobile funzionante).
- Placeholder puliti per gli asset (finché la pipeline immagini non è pronta).

### Fuori scope (esplicito)
- Qualsiasi backend / WebSocket / Durable Object.
- Logica di gioco reale, RNG, provably-fair.
- Autenticazione reale e persistenza wallet.
- Generazione immagini Gemini (fase successiva).

---

## 3. Identità visiva

Direzione: **dark moderno "cripto-gaming"** con identità propria WhyCasinò.

- **Palette:** nero profondo / blu notte come base; superfici a **vetro** (glass); accenti **neon** — viola elettrico + verde acido come primari; **oro** riservato a stati premium/VIP.
- **Feel:** vivo e *bouncy* — micro-interazioni diffuse, glow, contatori animati (numeri che salgono), hover reattivi.
- **Tipografia:** display bold espansa per numeri/heading, sans leggibile per il resto.
- **Componenti:** ispirazione da **21st.dev** (magic MCP), rifiniti con le 5 skill UI obbligatorie nell'ordine della Bibbia: SkillUI → DESIGN.md → UIUXProMax → TasteSkill → Impeccable.

Deliverable: un file `DESIGN.md` in `packages/ui` che fissa token, scale e regole prima di scrivere CSS/JSX.

---

## 4. Pagine (MVP shell)

| Pagina | Contenuto |
|---|---|
| **Lobby / Home** | Hero con jackpot vivo animato; carosello "Live ora" (giochi che *sembrano* girare); griglie "Slot", "Live Casino", "Popolari"; barra wallet in alto. |
| **Categoria** | Griglia filtrabile (slot / live / ruote) con copertine e `LiveBadge`. |
| **Pagina gioco** | Contenitore gioco (placeholder), `BetPanel`, pannello attività/chat laterale (placeholder). |
| **Classifiche** | Tab Giornaliera / Settimanale; podio animato; tabella con la crew. |
| **Profilo** | Wallet (WhyCoins), achievement sbloccati, statistiche. |

Navigazione: `Navbar` persistente + routing client (React Router).

---

## 5. Design system (`packages/ui`) — il cuore riusabile

**Token** (CSS variables): colori, spazi, raggi, ombre/glow, tipografia, durate animazioni.

**Componenti** (tipizzati, storybook-ready in senso lato):
- `Navbar` — nav + wallet + avatar
- `WalletBadge` — saldo WhyCoins con contatore animato
- `GameCard` — copertina, titolo, categoria, `LiveBadge`, hover bouncy
- `LiveBadge` — indicatore "in diretta" pulsante
- `BetPanel` — input puntata, +/- , pulsante scommetti (solo UI)
- `Leaderboard` — podio + tabella, variante daily/weekly
- `AchievementBadge` — stato locked/unlocked
- `JackpotTicker` — numero grande animato

Tutti i tipi dei dati (Game, Player, LeaderboardEntry, Achievement, Wallet) vivono in `packages/shared` e sono la **stessa interfaccia** che il motore live (sotto-progetto 2) implementerà.

---

## 6. Dati finti (mock)

Modulo `apps/web/src/mock/` — alimentato dalla lore in [`docs/lore/LORE.md`](../../lore/LORE.md) e dal catalogo [`docs/lore/GAMES.md`](../../lore/GAMES.md):
- **Giochi** con nomi/lore della crew: *Crazy Orani* (Far Orani 🐌, gioco-bandiera), *Argiam Lightning* (astronauta 🚀), *MotorFrank Wheel* (Frank 🏍️), *Dino Estrada* (triceratopo 🦕), *Abissi Bonanza* (pesce 🐡), *SPQR: Porte di Roma*, *DremVibe Neon*, *Fast Slime Rush* — nomi "ispirati ma originali".
- **Catchphrase** del gruppo per i win call-out: PAZZESCO!, VINARK!, RICOTTATI!, GALERA!, GHE-GO!, SPQR.
- Reference visive (foto/video amici) in `references/` — **solo locale, gitignored**, usate poi come base per la generazione asset Gemini.
- **Classifiche** finte (daily/weekly) con la crew.
- **Wallet** finto e **achievement** finti.

I mock rispettano gli stessi tipi di `packages/shared`, così sostituirli con dati reali sarà uno swap di data-source.

---

## 7. Stack tecnico

- **Monorepo:** pnpm workspaces.
- **Frontend:** React 18 + Vite + TypeScript.
- **Routing:** React Router.
- **Styling:** CSS variables + (Tailwind opzionale, deciso in fase di plan).
- **Animazioni:** Framer Motion (bouncy/vivo).
- **Componenti/ispirazione:** 21st.dev via magic MCP.
- **Deploy:** Cloudflare Pages.
- **Lint/format:** ESLint + Prettier + TypeScript strict.

---

## 8. Criteri di successo

1. `pnpm dev` avvia il sito; tutte le pagine sono navigabili con mock.
2. Design system in `packages/ui` con `DESIGN.md`, token e almeno gli 8 componenti sopra.
3. Estetica dark-neon coerente, vivo/bouncy, di livello "commerciale" — non aspetto "AI generico".
4. Responsive: desktop impeccabile, mobile usabile.
5. Tipi condivisi in `packages/shared` pronti per il motore live.
6. Repo pulito, committato, pronto per push su GitHub.
7. Placeholder asset ordinati, sostituibili dalla pipeline Gemini senza refactor.

---

## 9. Rischi / questioni aperte

- **Chiave Gemini:** non ancora disponibile a Claude (scansione automatica bloccata dal sistema di sicurezza). Sblocco tramite path esplicito / paste / permission. Non blocca questo sotto-progetto.
- **Nomi giochi:** devono restare "ispirati ma originali" per evitare problemi di marchio in ottica commerciale futura.
- **Scala mobile:** il layout casino è denso; il mobile va progettato con cura (non solo shrink).
