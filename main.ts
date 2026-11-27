// NusaStat — program penyerahan (Node 22, pustaka standar saja).
// Menyalin app/ dan screenshots/ dari samping file ini ke /output
// (atau ke MAKEFUN_OUTPUT_DIR di luar grader), lalu menulis
// /output/dossier.json lewat pustaka make.fun yang divendor.
// Jalankan: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Salinan dilakukan apa adanya dari samping file ini, tanpa perubahan isi,
// sehingga dua kali jalan menghasilkan byte yang sama di /output.
mkdirSync(outDir, { recursive: true });
cpSync(join(here, 'app'), join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
console.log('NusaStat handed in to ' + outDir);
