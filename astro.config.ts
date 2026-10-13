import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nekobits.it',
  output: 'static',
  // External stylesheets only: the page ships a CSP without 'unsafe-inline'.
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
