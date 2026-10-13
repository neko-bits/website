#!/usr/bin/env node
/**
 * Runs axe-core (WCAG 2.0/2.1/2.2 A + AA) over the built pages at a phone and a
 * desktop viewport, in both colour schemes. Exits non-zero on any violation.
 *
 *   npm run build && npm run audit:a11y
 */
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const AXE_SOURCE = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const ROOT = resolve(import.meta.dirname, '..');
const PORT = Number(process.env.AUDIT_PORT ?? 4399);
const BASE = `http://127.0.0.1:${PORT}`;
const PATHS = ['/', '/404.html'];
const VIEWPORTS = [
  ['mobile', { width: 320, height: 800 }],
  ['desktop', { width: 1280, height: 900 }],
];
const SCHEMES = ['light', 'dark'];

// Own process group: astro preview forks a child that a plain kill() leaves running.
const server = spawn(
  resolve(ROOT, 'node_modules/.bin/astro'),
  ['preview', '--host', '127.0.0.1', '--port', String(PORT), '--ignore-lock'],
  { cwd: ROOT, stdio: 'ignore', detached: true },
);

const waitForServer = async () => {
  for (let i = 0; i < 100; i += 1) {
    try {
      await fetch(BASE);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  throw new Error('preview server did not start');
};

let failures = 0;
try {
  await waitForServer();
  const browser = await chromium.launch();
  for (const [name, viewport] of VIEWPORTS) {
    for (const colorScheme of SCHEMES) {
      const page = await browser.newPage({ viewport, colorScheme });
      // addInitScript, not addScriptTag: the page ships a CSP without 'unsafe-inline'.
      await page.addInitScript({ content: AXE_SOURCE });
      for (const path of PATHS) {
        await page.goto(`${BASE}${path}`, { waitUntil: 'load' });
        const { violations } = await page.evaluate(() =>
          axe.run(document, {
            runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
          }),
        );
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        const label = `${name}/${colorScheme} ${path}`;
        if (violations.length === 0 && !overflow) {
          console.log(`  ok   ${label}`);
          continue;
        }
        failures += violations.length + Number(overflow);
        console.log(`  FAIL ${label}`);
        if (overflow) console.log('       horizontal scroll at this width');
        for (const v of violations) {
          console.log(`       [${v.impact}] ${v.id}: ${v.help}`);
          for (const node of v.nodes.slice(0, 3)) console.log(`         ${node.target.join(' ')}`);
        }
      }
      await page.close();
    }
  }
  await browser.close();
} finally {
  process.kill(-server.pid);
}

console.log(failures === 0 ? '\nNo violations.' : `\n${failures} violation(s).`);
process.exit(failures === 0 ? 0 : 1);
