# nekobits — sito

Pagina unica, statica, in inglese per `nekobits.it`. WCAG 2.2 AA, nessuna risorsa di
terze parti, nessun cookie, nessuno script.

## Stack

Astro 7 · TypeScript strict · CSS con i token dell'identità visiva v1.0 · font
self-hosted via Fontsource (Atkinson Hyperlegible, JetBrains Mono Bold) · GitHub Pages.

## Comandi

```bash
npm install
npm run dev            # server di sviluppo
npm run check          # astro check — TypeScript + template
npm run build          # → dist/
npm run audit:a11y     # axe-core su / e 404, mobile 320px + desktop, chiaro + scuro
```

`audit:a11y` usa il Chromium di Playwright 1.62 (`npx playwright install chromium` se manca).

## Struttura

```
src/data/site.ts        testi della pagina (feature, metodo, ambiti, tecnologie)
src/components/Paw.astro simbolo inline: completo (≥ 64 px) o semplificato
src/layouts/Base.astro  head, CSP, header, footer
src/pages/index.astro   la pagina
src/styles/global.css   palette, tipografia, layout, modo scuro
public/                 favicon.svg (simbolo semplificato), apple-touch-icon.png, og.png
```

Per cambiare un testo basta `src/data/site.ts`.

## Pubblicazione

`.github/workflows/deploy.yml`: a ogni push su `main` → `npm ci`, `check`, `build`,
artifact `dist/` → GitHub Pages.

Una tantum, in GitHub:

1. Repository pubblico (Pages su repo privati richiede GitHub Pro).
2. Settings → Pages → Source: **GitHub Actions**.
3. Settings → Pages → Custom domain: `nekobits.it`. Con il deploy da Actions il file
   `CNAME` viene ignorato: il dominio si imposta solo qui.
4. Profilo → Settings → Pages → **Verified domains**: aggiungere `nekobits.it` (record
   TXT `_github-pages-challenge-neko-bits`), così nessun altro account può usarlo.
5. Dopo l'emissione del certificato: **Enforce HTTPS**.

DNS su Infomaniak (zona `nekobits.it`; i record MX restano come sono):

| Nome | Tipo | Valore |
|---|---|---|
| `@` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `@` | AAAA | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `www` | CNAME | `neko-bits.github.io.` |

## Scelte

- **Niente JavaScript, CSP restrittiva** (`default-src 'none'`, solo `'self'` per stili,
  font e immagini) in `<meta>`: GitHub Pages non permette header custom.
- **Teal marchio `#007C85` solo su testo grande** (logotipo, parole del motto): su bianco
  caldo è 4,4:1. Il testo corrente teal usa teal profondo `#006D77` (≥ 5,4:1).
- **Modo scuro su ardesia `#33424A`**, unico fondo scuro ammesso; il cuscinetto del
  simbolo diventa bianco caldo come da regole d'uso.
- **Sequenze di colore sempre dal più scuro al più chiaro**, come le dita del simbolo
  (card, timeline del metodo, chip).
- **`og.png` e `apple-touch-icon.png`** sono resi con `rsvg-convert` dal simbolo
  completo; il testo della card OG usa JetBrains Mono Bold installato sul sistema.
