#!/usr/bin/env node
// Genera le copertine dei giochi (gratis, Pollinations/Flux) → apps/web/public/assets/games/<slug>/cover.png
// Uso: node covers.mjs           (tutti)
//      node covers.mjs slug1 slug2   (solo alcuni)
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../../apps/web/public/assets/games");

const STYLE =
  "premium online casino game cover art, dark cinematic background, neon violet and acid-green rim lighting, luxury gold accents, dramatic studio light, ultra detailed, vertical 3:4 poster composition, no text, no watermark, no letters";

// slug → soggetto specifico (personaggio/tema dalla lore)
const GAMES = {
  "crazy-orani": "a giant glossy golden snail wearing rainbow racing goggles on a spinning neon casino money wheel",
  "crazy-orani-diretta": "a golden snail on a glowing dual casino money wheel in a bright TV game-show studio",
  "monopoli-cagliari": "a board-game city of Cagliari Sardinia at night, a dapper top-hat mascot, giant dice and gold houses",
  "big-baller-sardo": "a glowing bingo ball cage full of numbered gold balls, game-show stage",
  "funky-frank": "a 70s disco biker in a glittery motorcycle racing suit under a mirror ball, funky neon casino",
  "grand-prix-coin-flip": "two cartoon racing snails flipping a giant gold coin on a race track, neon",
  "mega-balla": "lottery bingo balls exploding outward with glowing multiplier numbers, neon",
  "cash-o-crash-argiam": "an astronaut riding a rocket rising along a glowing money graph, space, crash game",
  "caccia-tesoro-dino": "prehistoric treasure chests full of gold on a jungle map, a friendly triceratops",
  "dadi-fulminati": "three casino dice struck by electric neon lightning bolts, cosmic",
  "tempesta-argiam": "a cosmic storm roulette wheel crackling with lightning, an astronaut, deep space",
  "porta-rossa-galera": "a single mysterious glowing red door in the dark, luxury casino, dramatic",
  "pesca-abissi": "an icy deep-sea fishing hole glowing, colorful fish carrying multiplier numbers",
  "bac-bo": "casino dice baccarat in a roaring stadium, neon energy",
  "studio-cagliari": "a football derby TV studio, red versus blue playing cards, stadium lights",
  "corsa-palloncini": "colorful balloons rising and popping with multipliers in a neon sky",
  "peperoncino-epico": "fiery red chili peppers around spinning free-spin wheels, flames, epic",
  "palle-pazze": "a crazy neon plinko board with bouncing glowing balls",
  "argiam-lightning": "a roulette wheel with electric lightning striking the numbers, astronaut, space",
  "argiam-xxxtreme": "an extreme roulette wheel wrapped in double chained lightning, cosmic",
  "roulette-immersiva": "a cinematic macro close-up of a luxury roulette wheel with the ball spinning",
  "auto-roulette-orani": "an automatic golden roulette wheel with a tiny golden snail, slow motion",
  "speed-roulette": "a fast spinning roulette wheel with motion blur, neon speed",
  "doppia-pallina": "a roulette wheel with two ivory balls, gold luxury",
  "roulette-vip-faro": "a luxury gold VIP roulette table with red velvet and a lighthouse beam",
  "blackjack-infinito": "an infinite blackjack table with glowing cards fanned to the horizon, neon",
  "blackjack-argiam": "blackjack cards struck by lightning with glowing multipliers, space",
  "blackjack-ghe-go": "blackjack cards splitting apart, free bet, neon green energy",
  "blackjack-vinark": "powerful blackjack cards quadruple down with gold chips exploding",
  "blackjack-veloce": "fast-dealt blackjack cards streaking with motion, neon",
  "baccarat-argiam": "baccarat cards charged with lightning multipliers, cosmic",
  "baccarat-veloce": "fast baccarat cards in motion, neon luxury",
  "baccarat-squeeze": "a dramatic close-up of fingers squeezing and bending a baccarat card reveal",
  "drago-dino": "an epic face-off between a dragon and a triceratops, dragon-tiger playing cards",
  "baccarat-no-commissioni": "an elegant gold baccarat table with velvet, luxury",
  "holdem-spqr": "a roman imperial poker table with SPQR banners, gold chips, marble",
  "ultimate-texas-ricottati": "a texas holdem all-in moment, poker chips exploding upward, neon",
  "poker-tre-carte": "three glossy playing cards fanned out, poker, gold",
  "caribbean-stud-sardo": "a caribbean beach poker table with palm trees and glowing cards",
  "side-bet-cagliari": "glowing poker hands over a neon city skyline of Cagliari",
  "starbust-orani": "neon expanding gems and a golden snail wild symbol, cosmic slot reels",
  "dino-estrada-quest": "prehistoric jungle ruins adventure, a triceratops, a glowing golden idol",
  "dead-or-galera": "a wild-west saloon at dusk with skulls and sticky wild symbols, slot",
  "abissi-bonanza": "an underwater megaways slot with glowing deep-sea fish and sunken treasure",
  "fortuna-divina-spqr": "roman gods on olympus, lightning, a glowing gold jackpot slot",
  "libro-di-far-orani": "an ancient glowing magic tome depicting a snail, egyptian adventure slot",
  "fast-slime-rush": "a hyper-speed neon arcade slot with a fast racing snail leaving light trails",
  "dremvibe-neon": "a punk rock concert neon stage with an electric guitar, backstage energy",
  "motorfrank-turbo": "a motorcycle racing starting grid with nitro flames and casino chips",
  "ciurma-4": "four cartoon pirate creatures collecting glowing symbols on a treasure grid",
};

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(GAMES);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function gen(slug) {
  const subject = GAMES[slug];
  if (!subject) return console.error("no subject:", slug);
  const dir = resolve(OUT, slug);
  const out = resolve(dir, "cover.png");
  if (existsSync(out)) {
    console.log("skip (già fatto)", slug);
    return true;
  }
  mkdirSync(dir, { recursive: true });
  const prompt = `${subject}. ${STYLE}`;
  const url =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt) +
    `?width=768&height=1024&nologo=true&model=flux&seed=${(slug.charCodeAt(0) + slug.length) % 999}`;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) throw new Error("429");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 3000) throw new Error("too small");
      writeFileSync(out, buf);
      console.log("OK", slug, (buf.length / 1024).toFixed(0) + "kB");
      return true;
    } catch (e) {
      if (attempt === 4) {
        console.error("FAIL", slug, e.message);
        return false;
      }
      await sleep(8000 * (attempt + 1)); // backoff: 8s,16s,24s,32s
    }
  }
}

// Sequenziale con spaziatura (rispetta il rate-limit anonimo di Pollinations)
let ok = 0;
for (const s of slugs) {
  const r = await gen(s);
  if (r) ok++;
  await sleep(5000);
}
console.log("Fatto:", ok, "/", slugs.length, "coperti");
