# WhyCasinò — Pipeline Asset (Nano Banana / Gemini 2.5 Flash Image)

> Le foto/video reali in `references/` sono la **base facciale/di stile**. Da lì **rigeneriamo tutto**
> con Nano Banana per avere ogni asset perfetto e coerente. Nessuna foto reale viene pubblicata.

## Cosa serve PER OGNI gioco
1. **Logo** del gioco (trasparente, PNG) — stile neon/premium coerente col brand.
2. **Copertina / thumbnail** (verticale + quadrata) per la lobby.
3. **Sfondo di gioco** (16:9, alta risoluzione) — l'ambiente del tavolo/slot.
4. **Art del personaggio** collegato (Far Orani lumaca, Argiam astronauta, ecc.).
5. **Simboli/icone** per le slot (wild, scatter, bonus).

## Asset globali
- Logo **WhyCasinò** (principale + monocromo + favicon).
- Mascotte principale (Far Orani) in pose multiple.
- Set icone catchphrase (PAZZESCO!, VINARK!, GALERA!, GHE-GO!, SPQR, RICOTTATI!).
- Texture/sfondi UI (vetro, neon, oro VIP).

## Art direction unica (coerenza)
- Palette: nero/blu notte + neon viola-verde + oro VIP.
- Stile: 3D cinematografico + tocchi cartoon per i personaggi; illuminazione drammatica, glow.
- Ogni personaggio mantiene tratti riconoscibili dai reference.

## Flusso tecnico
1. **Prompt library** — un prompt curato per asset, versionato in `docs/lore/prompts/`.
2. **Reference conditioning** — passiamo l'immagine reference + prompt a Nano Banana (image-to-image).
3. **Generazione batch** — script (`services/assetgen/`) che legge una manifest `assets.json`
   (gioco → lista asset → prompt → reference) e produce i file.
4. **Rifinitura & commit** — output in `apps/web/public/assets/games/<slug>/`, committati (solo generati, no foto reali).
5. **Placeholder → reale** — la shell usa placeholder finché l'asset reale non è pronto; sostituzione senza refactor (stesso path/nome).

## Requisiti
- **Chiave Gemini** (Google AI Studio) — da fornire/sbloccare. Modello: `gemini-2.5-flash-image` (Nano Banana).
- Rispetto rate limit free tier → generazione in batch schedulati, non a runtime.

## Stato
- [ ] Chiave Gemini disponibile a Claude
- [ ] Prompt library iniziale
- [ ] Script assetgen
- [ ] Manifest `assets.json` per i primi giochi
- [ ] Logo WhyCasinò + mascotte Far Orani
