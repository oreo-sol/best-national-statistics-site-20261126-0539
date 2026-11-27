# NusaStat — Portal Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/oreo-sol/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/oreo-sol/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat adalah situs statistik nasional untuk Indonesia: penduduk, ekonomi,
ketenagakerjaan, kemiskinan, dan pembangunan manusia — angka resmi BPS
2020–2024, disajikan dengan grafik SVG buatan tangan yang bisa dibaca sekilas,
di desktop maupun di ponsel.

## Isi situs

- **Beranda (`#/`):** 7 kartu KPI (penduduk 281,6 jt; PDB Rp22.139 T; pertumbuhan
  5,03%; inflasi 1,57%; TPT 4,91%; kemiskinan 9,03%; IPM 75,02) plus grafik
  pertumbuhan ekonomi dan tren IPM.
- **Penduduk (`#/penduduk`):** tren 2020–2024, provinsi terpadat (Jawa Barat
  50.345.200 jiwa), sebaran per pulau Juni 2024, kepadatan ±149 jiwa/km².
- **Ekonomi (`#/ekonomi`):** pertumbuhan 2021–2024, inflasi 2021–2024,
  PDB per kapita Rp78,6 jt (US$4.960,3).
- **Ketenagakerjaan (`#/kerja`):** TPT Agustus 2021–2024, bekerja 144,64 jt,
  angkatan kerja 152,1 jt, pengangguran 7,47 jt.
- **Pembangunan (`#/pembangunan`):** tren IPM 2020–2024, UHH 74,15 thn,
  HLS 13,21 thn, RLS 8,85 thn, IPM tertinggi DKI Jakarta 84,15 dan terendah
  Papua Pegunungan 54,43, plus kemiskinan Maret 2024.
- **Tentang & Sumber (`#/tentang`):** metodologi dan daftar lengkap sumber BPS.

Setiap angka dikutip beserta sumber dan tahunnya ("Sumber: BPS, 2024").
NusaStat adalah portal independen, bukan situs resmi BPS.

## Cara menjalankan

```sh
node serve.ts
# buka http://localhost:8080
```

Situs statis murni: file di `app/`, tanpa build step, tanpa permintaan jaringan,
bekerja luring. Struktur sumber (satu file, satu tugas):

- `app/index.html` — kerangka halaman, masthead, navigasi, footer
- `app/style.css` — semua gaya, termasuk layout ponsel
- `app/data.js` — semua angka BPS beserta sumbernya
- `app/charts.js` — grafik batang/garis SVG buatan tangan
- `app/views.js` — router hash dan perender tiap halaman
- `app/main.js` — boot: isi footer, render, dengarkan hashchange

## Penyerahan

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke `/output` dan menulis
`/output/dossier.json` lewat `vendor/makefun-frontend.ts`.

## Lisensi

MIT — lihat `LICENSE`.
