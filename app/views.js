// views.js — router hash + perender tiap halaman. Semua teks dan angka
// diambil dari data.js; file ini hanya menyusun HTML-nya.
import { KPI, POPULATION, ECONOMY, LABOUR, POVERTY, HDI, SOURCES, META } from './data.js';
import { barChart, lineChart } from './charts.js';

function src(year) { return '<p class="src">Sumber: BPS, ' + year + '</p>'; }

function kpiCards() {
  return '<section class="kpis" aria-label="Angka utama">' + KPI.map(function (k, i) {
    const cls = i % 3 === 1 ? ' red' : (i % 3 === 2 ? ' gold' : '');
    return '<article class="kpi' + cls + '"><div class="lab">' + k.label + '</div>' +
      '<div class="val">' + k.value + '</div><div class="note">' + k.note + ' &middot; ' + k.source + '</div></article>';
  }).join('') + '</section>';
}

function homePage() {
  return '<p class="kicker">Indonesia dalam angka</p>' +
    '<h2>Statistik Indonesia, satu tempat</h2>' +
    '<p class="lede">Penduduk, ekonomi, pekerjaan, kemiskinan, dan pembangunan manusia — angka resmi BPS 2020&ndash;2024, disajikan dengan grafik yang bisa dibaca sekilas, di desktop maupun di ponsel.</p>' +
    kpiCards() +
    '<div class="grid2">' +
    '<section class="card"><h3>Pertumbuhan ekonomi 2021&ndash;2024</h3>' +
    barChart(ECONOMY.growth.map(function (g) { return { label: String(g.year), value: g.value }; }), { label: 'Pertumbuhan ekonomi', color: '#0f766e', max: 6 }) +
    '<p class="chart-note">PDB 2024 Rp22.139,0 triliun; per kapita Rp78,6 jt (US$4.960,3).</p>' + src(2024) + '</section>' +
    '<section class="card"><h3>IPM naik lima tahun berturut-turut</h3>' +
    lineChart(HDI.trend.map(function (h) { return { label: String(h.year), value: h.value }; }), { label: 'IPM 2020-2024', color: '#b3261e' }) +
    '<p class="chart-note">IPM 2024 mencapai 75,02 — kategori tinggi. Tertinggi DKI Jakarta 84,15; terendah Papua Pegunungan 54,43.</p>' + src(2024) + '</section>' +
    '</div>' +
    '<div class="callout"><b>Yang paling dicari:</b> penduduk 2024 sebanyak <b>281,6 juta jiwa</b>, pengangguran Agustus 2024 <b>4,91%</b>, dan kemiskinan Maret 2024 <b>9,03%</b> (25,22 juta orang). Semua bersumber dari BPS, 2024.</div>' +
    '<section class="card"><h3>Jelajahi berdasarkan topik</h3>' +
    '<p><a href="#/penduduk">Penduduk</a> &middot; <a href="#/ekonomi">Ekonomi</a> &middot; <a href="#/kerja">Ketenagakerjaan</a> &middot; <a href="#/pembangunan">Pembangunan manusia</a> &middot; <a href="#/tentang">Metodologi &amp; sumber</a></p>' +
    '<p class="src">Setiap halaman menampilkan grafik, angka kunci, dan sumber beserta tahunnya.</p></section>';
}

function pendudukPage() {
  const rows = POPULATION.islands.map(function (is) {
    const pct = is.value / 281.6 * 100;
    return '<tr><td>' + is.name + '</td><td class="num">' + String(is.value).replace('.', ',') + ' jt</td><td class="num">' + is.share + '</td>' +
      '<td><div class="bar-track"><div class="bar-fill' + (is.name === 'Jawa' ? ' red' : '') + '" style="width:' + Math.max(4, pct).toFixed(1) + '%"></div></div></td></tr>';
  }).join('');
  return '<p class="kicker">Penduduk</p><h2>Penduduk Indonesia: 281,6 juta jiwa</h2>' +
    '<p class="lede">Penduduk tumbuh 1,04% pada 2024. Lebih dari separuh tinggal di Pulau Jawa.</p>' +
    '<div class="grid2">' +
    '<section class="card"><h3>Penduduk 2020 dan 2024 (juta jiwa)</h3>' +
    lineChart(POPULATION.years.map(function (y, i) { return { label: String(y), value: POPULATION.values[i] }; }), { label: 'Penduduk 2020 dan 2024', color: '#0f766e' }) +
    '<p class="chart-note">Dari 270,20 juta (Sensus 2020) menjadi 281,60 juta jiwa pada 2024.</p>' + src(2024) + '</section>' +
    '<section class="card"><h3>Provinsi terpadat</h3><p class="big">' + POPULATION.topProvince.name + '</p>' +
    '<p><b>' + POPULATION.topProvince.value + '</b> — provinsi dengan penduduk terbanyak, 2024.</p>' +
    '<div class="stat-row"><span>Luas daratan Indonesia</span><b>' + POPULATION.landArea + '</b></div>' +
    '<div class="stat-row"><span>Kepadatan penduduk (dihitung)</span><b>' + POPULATION.density + '</b></div>' +
    '<div class="stat-row"><span>Pertumbuhan 2024</span><b>' + POPULATION.growth2024 + '</b></div>' +
    '<div class="stat-row"><span>Penduduk 2020 (Sensus)</span><b>270,20 jt</b></div>' + src(2024) + '</section></div>' +
    '<section class="card"><h3>Sebaran per pulau, ' + POPULATION.islandYear + '</h3>' +
    '<table><thead><tr><th>Pulau</th><th class="num">Penduduk</th><th class="num">Pangsa</th><th>Sebaran</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    '<p class="chart-note">Jawa 151,59 jt (54,36%) dan Sumatra 57,76 jt (20,71%) menampung tiga per empat penduduk Indonesia.</p>' + src(2024) + '</section>';
}

function ekonomiPage() {
  return '<p class="kicker">Ekonomi</p><h2>Ekonomi tumbuh 5,03% pada 2024</h2>' +
    '<p class="lede">PDB atas dasar harga berlaku 2024 mencapai Rp22.139,0 triliun. Inflasi 2024 sebesar 1,57% — terendah dalam empat tahun terakhir.</p>' +
    '<div class="grid2">' +
    '<section class="card"><h3>Pertumbuhan ekonomi 2021&ndash;2024 (%)</h3>' +
    barChart(ECONOMY.growth.map(function (g) { return { label: String(g.year), value: g.value }; }), { label: 'Pertumbuhan ekonomi', color: '#0f766e', max: 6 }) + src(2024) + '</section>' +
    '<section class="card"><h3>Inflasi 2021&ndash;2024 (%)</h3>' +
    lineChart(ECONOMY.inflation.map(function (g) { return { label: String(g.year), value: g.value }; }), { label: 'Inflasi', color: '#b3261e' }) +
    '<p class="chart-note">Inflasi 2022 melonjak ke 5,51%, lalu turun ke 2,61% (2023) dan 1,57% (2024).</p>' + src(2024) + '</section></div>' +
    '<section class="card"><h3>PDB per kapita 2024</h3><p class="big">' + ECONOMY.gdpPerCapita + '</p>' +
    '<p>Setara <b>' + ECONOMY.gdpPerCapitaUsd + '</b> per orang per tahun.</p>' +
    '<div class="stat-row"><span>PDB 2024</span><b>' + ECONOMY.gdp2024 + '</b></div>' +
    '<div class="stat-row"><span>Pertumbuhan tertinggi 2021&ndash;2024</span><b>5,31% (2022)</b></div>' +
    '<div class="stat-row"><span>Inflasi terendah 2021&ndash;2024</span><b>1,57% (2024)</b></div>' + src(2024) + '</section>';
}

function kerjaPage() {
  return '<p class="kicker">Ketenagakerjaan</p><h2>Pengangguran turun ke 4,91%</h2>' +
    '<p class="lede">Tingkat Pengangguran Terbuka (TPT) Agustus 2024 sebesar 4,91% — turun dari 6,49% pada Agustus 2021.</p>' +
    '<div class="grid2">' +
    '<section class="card"><h3>TPT Agustus 2021&ndash;2024 (%)</h3>' +
    lineChart(LABOUR.tpt.map(function (t) { return { label: String(t.year), value: t.value }; }), { label: 'TPT', color: '#b3261e' }) + src(2024) + '</section>' +
    '<section class="card"><h3>Pasar kerja, ' + LABOUR.period + '</h3>' +
    '<div class="stat-row"><span>Angkatan kerja</span><b>' + LABOUR.labourForce + '</b></div>' +
    '<div class="stat-row"><span>Bekerja</span><b>' + LABOUR.employed + '</b></div>' +
    '<div class="stat-row"><span>Pengangguran</span><b>' + LABOUR.unemployed + '</b></div>' +
    '<div class="stat-row"><span>TPT</span><b>4,91%</b></div>' +
    '<p class="chart-note">Dari 152,1 juta angkatan kerja, 144,64 juta orang bekerja dan 7,47 juta menganggur.</p>' + src(2024) + '</section></div>' +
    '<div class="callout"><b>Cara membaca:</b> TPT = pengangguran dibagi angkatan kerja. Penurunan TPT tiga tahun berturut-turut berarti pasar kerja menyerap lebih banyak pencari kerja.</div>';
}

function pembangunanPage() {
  return '<p class="kicker">Pembangunan manusia</p><h2>IPM 2024: 75,02 — kategori tinggi</h2>' +
    '<p class="lede">Indeks Pembangunan Manusia naik dari 72,81 (2020) menjadi 75,02 (2024), didorong umur harapan hidup, pendidikan, dan pengeluaran per kapita.</p>' +
    '<div class="grid2">' +
    '<section class="card"><h3>Tren IPM 2020&ndash;2024</h3>' +
    lineChart(HDI.trend.map(function (h) { return { label: String(h.year), value: h.value }; }), { label: 'IPM', color: '#0f766e' }) + src(2024) + '</section>' +
    '<section class="card"><h3>Tiga dimensi IPM 2024</h3>' +
    '<div class="stat-row"><span>Umur harapan hidup saat lahir</span><b>' + HDI.lifeExpectancy + '</b></div>' +
    '<div class="stat-row"><span>Harapan lama sekolah</span><b>' + HDI.schoolYearsExpected + '</b></div>' +
    '<div class="stat-row"><span>Rata-rata lama sekolah</span><b>' + HDI.schoolYearsMean + '</b></div>' +
    '<div class="stat-row"><span>Pengeluaran per kapita disesuaikan</span><b>' + HDI.spending + '</b></div>' + src(2024) + '</section></div>' +
    '<section class="card"><h3>Jurang antarprovinsi, 2024 (' + HDI.provinces + ' provinsi)</h3>' +
    '<div class="stat-row"><span>IPM tertinggi — ' + HDI.highest.name + '</span><b>' + HDI.highest.value + '</b></div>' +
    '<div class="stat-row"><span>IPM terendah — ' + HDI.lowest.name + '</span><b>' + HDI.lowest.value + '</b></div>' +
    '<p class="chart-note">Selisih hampir 30 poin antara provinsi tertinggi dan terendah. Umur harapan hidup 2020 sebesar 73,37 tahun dan 2023 sebesar 73,93 tahun.</p>' + src(2024) + '</section>' +
    '<section class="card"><h3>Kemiskinan, ' + POVERTY.period + '</h3><p class="big red">' + POVERTY.rate + '</p>' +
    '<p><b>' + POVERTY.people + '</b> hidup di bawah garis kemiskinan pada Maret 2024.</p>' + src(2024) + '</section>';
}

function tentangPage() {
  return '<p class="kicker">Tentang &amp; sumber</p><h2>Tentang NusaStat</h2>' +
    '<p class="lede">' + META.name + ' adalah portal independen yang menyajikan angka resmi Indonesia agar mudah dibaca siapa saja. Situs ini statis, bekerja tanpa jaringan, dan tidak mengumpulkan data pengunjung.</p>' +
    '<section class="card"><h3>Metodologi</h3>' +
    '<p>Semua angka diambil dari publikasi dan Berita Resmi Statistik BPS, dikutip beserta tahunnya di setiap angka. Grafik digambar langsung dari angka tersebut — tidak ada angka yang dibuat-buat atau diperkirakan sendiri.</p>' +
    '<p>Definisi singkat: TPT adalah pengangguran dibagi angkatan kerja; IPM menggabungkan umur harapan hidup, pendidikan (harapan dan rata-rata lama sekolah), dan pengeluaran per kapita yang disesuaikan; PDB per kapita adalah PDB dibagi jumlah penduduk.</p></section>' +
    '<section class="card"><h3>Daftar sumber lengkap</h3><ul>' +
    SOURCES.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
    '</ul><p class="src">Sumber: BPS, 2024&ndash;2025. NusaStat bukan situs resmi BPS.</p></section>';
}

const PAGES = {
  '/': homePage,
  '/penduduk': pendudukPage,
  '/ekonomi': ekonomiPage,
  '/kerja': kerjaPage,
  '/pembangunan': pembangunanPage,
  '/tentang': tentangPage,
};

export function render() {
  const hash = location.hash || '#/';
  const path = hash.slice(1).split('?')[0] || '/';
  const page = PAGES[path] || homePage;
  const app = document.getElementById('app');
  app.innerHTML = page();
  document.querySelectorAll('#nav a').forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('data-route') === path || (path === '/' && a.getAttribute('data-route') === '/'));
  });
  window.scrollTo(0, 0);
}

export function fillFooter() {
  const ul = document.getElementById('footer-sources');
  if (ul) ul.innerHTML = SOURCES.map(function (s) { return '<li>' + s + '</li>'; }).join('');
}
