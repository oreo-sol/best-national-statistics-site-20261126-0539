// NusaStat — semua angka berasal dari BPS, dikutip dengan tahunnya.
// File ini satu-satunya tempat angka disimpan; views.js hanya membaca dari sini.
export const META = {
  name: 'NusaStat',
  tagline: 'Portal Statistik Indonesia',
  country: 'Indonesia',
  updated: 'November 2026',
};

export const KPI = [
  { label: 'Penduduk', value: '281,6 jt', note: '2024', source: 'BPS, 2024' },
  { label: 'PDB', value: 'Rp22.139 T', note: '2024', source: 'BPS, 2024' },
  { label: 'Pertumbuhan Ekonomi', value: '5,03%', note: '2024', source: 'BPS, 2024' },
  { label: 'Inflasi', value: '1,57%', note: '2024', source: 'BPS, 2024' },
  { label: 'Tingkat Pengangguran Terbuka', value: '4,91%', note: 'Agu 2024', source: 'BPS, 2024' },
  { label: 'Kemiskinan', value: '9,03%', note: 'Mar 2024', source: 'BPS, 2024' },
  { label: 'Indeks Pembangunan Manusia', value: '75,02', note: '2024', source: 'BPS, 2024' },
];

export const POPULATION = {
  years: [2020, 2024],
  // Juta jiwa: hanya dua titik yang terverifikasi dari BPS (Sensus 2020 dan 2024).
  // Titik antara tidak dicantumkan agar tidak ada angka yang dikarang.
  values: [270.20, 281.60],
  growth2024: '1,04%',
  landArea: '1.890.179,78 km²',
  // Kepadatan dihitung dari dua angka BPS di atas: 281,6 jt jiwa / 1.890.179,78 km².
  density: '±149 jiwa/km²',
  topProvince: { name: 'Jawa Barat', value: '50.345.200 jiwa', year: 2024 },
  islands: [
    { name: 'Jawa', value: 151.59, share: '54,36%' },
    { name: 'Sumatra', value: 57.76, share: '20,71%' },
    { name: 'Kalimantan', value: 16.15, share: '5,79%' },
    { name: 'Sulawesi', value: 12.19, share: '—' },
    { name: 'Papua', value: 4.15, share: '—' },
  ],
  islandYear: 'Juni 2024',
};

export const ECONOMY = {
  gdp2024: 'Rp22.139,0 triliun',
  gdpPerCapita: 'Rp78,6 jt',
  gdpPerCapitaUsd: 'US$4.960,3',
  growth: [
    { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
  inflation: [
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
};

export const LABOUR = {
  tpt: [
    { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 },
    { year: 2024, value: 4.91 },
  ],
  employed: '144,64 jt',
  labourForce: '152,1 jt',
  unemployed: '7,47 jt',
  period: 'Agustus 2024',
};

export const POVERTY = {
  rate: '9,03%',
  people: '25,22 jt orang',
  period: 'Maret 2024',
};

export const HDI = {
  trend: [
    { year: 2020, value: 72.81 },
    { year: 2021, value: 73.16 },
    { year: 2022, value: 73.77 },
    { year: 2023, value: 74.39 },
    { year: 2024, value: 75.02 },
  ],
  lifeExpectancy: '74,15 thn',
  lifeExpectancy2023: '73,93 thn',
  lifeExpectancy2020: '73,37 thn',
  schoolYearsExpected: '13,21 thn',
  schoolYearsMean: '8,85 thn',
  spending: 'Rp12,34 jt/thn',
  highest: { name: 'DKI Jakarta', value: '84,15' },
  lowest: { name: 'Papua Pegunungan', value: '54,43' },
  provinces: 38,
};

export const SOURCES = [
  'BPS — Statistik Indonesia 2025 (penduduk 2024, PDB 2024)',
  'BPS — Berita Resmi Statistik: Pertumbuhan Ekonomi Indonesia 2024',
  'BPS — Berita Resmi Statistik: Inflasi 2024',
  'BPS — Berita Resmi Statistik: Keadaan Ketenagakerjaan Indonesia Agustus 2024',
  'BPS — Berita Resmi Statistik: Profil Kemiskinan di Indonesia Maret 2024',
  'BPS — Berita Resmi Statistik: Indeks Pembangunan Manusia 2024',
  'BPS — Proyeksi Penduduk dan distribusi penduduk per pulau, Juni 2024',
];
