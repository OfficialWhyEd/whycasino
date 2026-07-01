# WhyCasinò — HANDOFF (per la prossima sessione)

**Data:** 2026-07-01 · **Repo:** github.com/OfficialWhyEd/whycasino (pubblico) · **Live:** https://whycasino.pages.dev

## ⚖️ REGOLA FERREA #1
**I VOLTI degli amici devono restare ESTREMAMENTE FEDELI** in ogni asset che li ritrae. Mai volti inventati o "somiglianti". Questa regola batte tutto il resto.
- Implicazione tecnica: la generazione *text-to-image* (Pollinations/Flux) NON garantisce volti fedeli. Per i volti serve **image-to-image dalle foto reali** in `references/images/` (gitignored). Strumento migliore per fedeltà volto: **Nano Banana / Gemini (con billing)**, oppure un img2img con le foto reali ospitate su URL pubblico temporaneo (Pollinations accetta `?image=<url>`).
- Le copertine/sfondi SENZA volto (lumache, dinosauri, roulette, slot) si fanno benissimo gratis con Pollinations.

## ✅ FATTO (live e committato)
- **Monorepo pnpm** (corepack): `apps/web` (React+Vite+TS), `packages/ui` (design system), `packages/shared` (tipi + leaderboard TDD 3/3). Build+test verdi.
- **Shell completa**: lobby, categorie, pagina gioco, classifiche giornaliera/settimanale, profilo. **50 giochi** in `apps/web/src/mock/games.ts` (parità Evolution + slot + Ciurma/Pirots).
- **Redesign premium iPhone-first** (agente designo, 2 giri): bottom tab bar glass + safe-area, hero "in vetrina" (FeaturedCarousel), **LiveWinsMarquee** (ticker vincite stile Stake), StatStrip, rail scroll-snap "hot", Segmented, parallax, Space Grotesk + Plus Jakarta Sans, key-art fallback per cover mancanti.
- **Polish impeccable**: glow di sfondo calibrato, più respiro verticale mobile.
- **Deploy** su Cloudflare Pages + push GitHub. README con screenshot + link.
- **Docs lore**: `docs/lore/LORE.md`, `GAMES.md` (catalogo), `ASSETS.md` (pipeline).
- **Pipeline asset**: `services/assetgen/generate.mjs` (Nano Banana/Gemini, rotazione 3 chiavi in `.env`) e `covers.mjs` (Pollinations gratis). Emblema/logo generato ok (Pollinations Flux): W dorato + lumaca Far Orani.

## ❌ NON FATTO / DA FARE
### Asset (priorità)
- **Generare le copertine di tutti i 50 giochi** con Pollinations (gratis): `node services/assetgen/covers.mjs` (sequenziale con backoff — Pollinations limita le richieste concorrenti/rapide, 429). Salta quelle già fatte. Poi committare `apps/web/public/assets/games/<slug>/cover.png` e deployare. Il codice le carica già via `onError` sulla GameCard.
- **Logo/emblema definitivo** + set icone (PWA), mascotte Far Orani.
- **Volti fedeli** (regola ferrea): ritratti/personaggi img2img dalle foto reali → valutare Nano Banana con billing.
- ⚠️ **Chiavi Gemini**: free tier ha quota IMMAGINI = 0 (`limit: 0`). Nano Banana richiede **billing attivo** (~$0.03/img).
- **Motori immagine GRATIS (vedi memoria `reference-image-gen-gratis`):**
  - **Pollinations.ai** (no key, Flux) — `services/assetgen/covers.mjs`. Ottimo per copertine/sfondi SENZA volto.
  - **Cloudflare Workers AI** (account Edo, free tier): `@cf/black-forest-labs/flux-2-dev` (FLUX.2, qualità top) e ⭐ `flux-2-klein` (**generazione + EDITING/img2img**). REST: `POST https://api.cloudflare.com/client/v4/accounts/23ba9989701c2051ec6b080558eb5c3c/ai/run/<model>` con token Workers AI (da creare in dashboard). → path GRATIS per i **volti fedeli** via img2img dalle foto reali, senza billing Gemini.
  - **Strategia**: Pollinations + Cloudflare in **parallelo** (velocità + mix qualità). FLUX.2 = miglior free ora.

### Feature non ancora costruite
- **PWA "Aggiungi alla schermata Home"**: manifest + service worker + icona → installabile come app. Pop-up-tutorial (dopo la presentazione + ogni tot) che mostra Share → "Aggiungi alla schermata Home" (immagine di riferimento: screenshot Share sheet iOS con Stake). iOS = tutorial manuale; Android/desktop = `beforeinstallprompt`. Rilevare `display-mode: standalone` per non mostrarlo a chi ce l'ha.
- **Video intro** per alcuni giochi (MotorFrank, People Podcast Slot): `/assets/games/<slug>/intro.mp4`, montati dai video in `references/videos/`. Campo dati futuro `intro?: string`.

### FASE 2 — Social + Economia (nuova sessione)
**Social** (parte importante ma non il fulcro):
- Profilo per ognuno con **immagine profilo + copertina modificabili**.
- **Storie** (stile IG), **post** (condividere vincite), sezione dedicata per ciascuna.
- **Real-time**: vedere a che gioco sta giocando uno (se sta giocando).
- Achievement sul profilo; **ranking per quanto vinci** (migliore/peggiore di chi gioca ora).
- Gli achievement RESTANO anche se perdi valuta.

**Auth/Utenti:**
- **Registrazione APERTA A TUTTI** (pubblica): chiunque si iscrive, sceglie il proprio username. NON invite-only. Ognuno ha il suo wallet WhyCoins.

**Economia** (fondamentale, realistica e competitiva come i veri casino):
- Progettare **RTP** e banco studiando come fa Stake (come i giochi sono impostati per certi valori, tutto il flusso).
- **REGOLA anti-zero**: nessuno resta mai a 0 → **giri gratuiti** che regalano spin, **ruota bonus giornaliera**, ricariche/bonus intelligenti.
- Fonti monete/premi: **achievement** (danno monete + sblocchi), **codici promozionali** creati da Edo (serve pannello **admin** per generarli), giri gratuiti, ruota giornaliera.

### Personaggi/lore — note confermate
- 🏍️🚀 **Frank = Argiam** = la STESSA persona (moto/patatine + astronauta).
- 🦕 **Dino Estrada = Antho** (Anthony Estrada), triceratopo con la sua faccia.
- 🐌 Far Orani (lumaca/faro, gioco-bandiera Crazy Orani), 🐡 pesce abissi, 🎸 Drem.
- Catchphrase: SPQR, PAZZESCO!, VINARK!, RICOTTATI!, GALERA!, GHE-GO!.
- **Ogni gioco conta uguale** (nessuno "minore") e **ognuno ha la sua micro-lore** dentro un unico universo assurdo e coeso.

## 🧭 Principi di lavoro (regole di Edo)
- **MAI ricominciare da zero**: costruire sempre incrementale sopra ciò che funziona, deployare sul lavoro esistente.
- **Loop di miglioramento onesto**: voto/critica sincera con taste-skill → azione con impeccable → itera.
- **21st.dev = primo posto** per componenti/design/interazioni (magic MCP), prima di costruire da zero.
- 5 skill UI in ordine intelligente (SkillUI → awesome-design-md → ui-ux-pro-max → taste-skill → impeccable).

## 🚀 Comandi utili
```bash
pnpm install && pnpm dev              # sviluppo
pnpm --filter web build && pnpm -r test
# deploy: pnpm --filter web build && npx wrangler pages deploy apps/web/dist --project-name whycasino --branch main
# covers gratis: node services/assetgen/covers.mjs   (sequenziale, backoff 429)
```
