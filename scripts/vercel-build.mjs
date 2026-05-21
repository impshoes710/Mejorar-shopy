/**
 * Vercel build: este repo es un tema Shopify (Liquid), no una app Astro.
 * Genera una página estática informativa para que el deploy en Vercel termine OK.
 */
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

await mkdir(publicDir, { recursive: true });

try {
  await copyFile(join(root, 'README.md'), join(publicDir, 'index.html'));
} catch {
  await writeFile(
    join(publicDir, 'index.html'),
    '<!DOCTYPE html><html lang="es"><body><h1>Tema Shopify IMP Premium</h1><p>Sube este tema en admin.shopify.com → Temas.</p></body></html>'
  );
}

console.log('Vercel build OK — tema Shopify (despliega en Shopify, no en Vercel).');
