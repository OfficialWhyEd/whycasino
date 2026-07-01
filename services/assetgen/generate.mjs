#!/usr/bin/env node
// WhyCasinò asset generator — Nano Banana / Gemini image models.
// Uso: node generate.mjs <model> <outfile> <promptFile|-> [refImage1 refImage2 ...]
// Legge le chiavi da ../../.env (GEMINI_API_KEY / _2 / _3) con rotazione su rate-limit.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../../.env");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);
const KEYS = [env.GEMINI_API_KEY, env.GEMINI_API_KEY_2, env.GEMINI_API_KEY_3].filter(Boolean);

const [model, outfile, promptArg, ...refs] = process.argv.slice(2);
if (!model || !outfile || !promptArg) {
  console.error("Uso: node generate.mjs <model> <outfile> <promptFile|-> [ref...]");
  process.exit(1);
}
const prompt =
  promptArg === "-"
    ? readFileSync(0, "utf8")
    : existsSync(promptArg)
      ? readFileSync(promptArg, "utf8")
      : promptArg;

function imagePart(path) {
  const b64 = readFileSync(path).toString("base64");
  const mime = path.endsWith(".png") ? "image/png" : "image/jpeg";
  return { inlineData: { mimeType: mime, data: b64 } };
}

const parts = [{ text: prompt }, ...refs.map(imagePart)];
const body = JSON.stringify({
  contents: [{ parts }],
  generationConfig: { responseModalities: ["IMAGE"] },
});

async function run() {
  let lastErr = "";
  for (const key of KEYS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (res.status === 429) {
      lastErr = "429 rate-limit";
      continue; // prova chiave successiva
    }
    const json = await res.json();
    if (!res.ok) {
      lastErr = JSON.stringify(json).slice(0, 300);
      if (res.status === 400 || res.status === 404) break;
      continue;
    }
    const partsOut = json?.candidates?.[0]?.content?.parts ?? [];
    const img = partsOut.find((p) => p.inlineData?.data);
    if (!img) {
      lastErr = "nessuna immagine in risposta: " + JSON.stringify(json).slice(0, 200);
      continue;
    }
    writeFileSync(outfile, Buffer.from(img.inlineData.data, "base64"));
    console.log("OK →", outfile);
    return;
  }
  console.error("FALLITO:", lastErr);
  process.exit(2);
}
run();
