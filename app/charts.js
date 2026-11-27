// charts.js — grafik SVG buatan tangan (tanpa pustaka). Dua fungsi saja:
// barChart untuk batang, lineChart untuk garis. Keduanya mengembalikan
// string SVG yang bisa disisipkan ke halaman.
function fmt(v) {
  return String(v).replace('.', ',');
}

function niceMax(values) {
  const m = Math.max.apply(null, values);
  if (m <= 2) return 2;
  if (m <= 6) return 6;
  if (m <= 10) return 10;
  if (m <= 50) return 50;
  if (m <= 100) return 100;
  if (m <= 200) return 200;
  return Math.ceil(m / 100) * 100;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export function barChart(points, opts) {
  const o = opts || {};
  const W = 640, H = 300, padL = 52, padB = 34, padT = 18, padR = 12;
  const max = o.max != null ? o.max : niceMax(points.map(function (p) { return p.value; }));
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const bw = innerW / points.length;
  const barW = Math.min(64, bw * 0.58);
  let s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.label || 'Grafik batang') + '">';
  for (let g = 0; g <= 4; g++) {
    const y = padT + (innerH * g) / 4;
    const v = max * (1 - g / 4);
    s += '<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '" stroke="#e7e0d2" stroke-width="1"/>';
    s += '<text x="' + (padL - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="12" fill="#57534e">' + fmt(Math.round(v * 100) / 100) + '</text>';
  }
  points.forEach(function (p, i) {
    const h = (p.value / max) * innerH;
    const x = padL + i * bw + (bw - barW) / 2;
    const y = padT + innerH - h;
    const color = o.color || '#0f766e';
    s += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW + '" height="' + h.toFixed(1) + '" rx="5" fill="' + color + '"/>';
    s += '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#1c1917">' + fmt(p.value) + '</text>';
    s += '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="12" fill="#57534e">' + esc(p.label) + '</text>';
  });
  s += '</svg>';
  return s;
}

export function lineChart(points, opts) {
  const o = opts || {};
  const W = 640, H = 300, padL = 52, padB = 34, padT = 22, padR = 16;
  const vals = points.map(function (p) { return p.value; });
  let min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
  const span = (max - min) || 1;
  min -= span * 0.25; max += span * 0.25;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  function X(i) { return padL + (innerW * i) / (points.length - 1); }
  function Y(v) { return padT + innerH - ((v - min) / (max - min)) * innerH; }
  let s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.label || 'Grafik garis') + '">';
  for (let g = 0; g <= 4; g++) {
    const y = padT + (innerH * g) / 4;
    const v = max - ((max - min) * g) / 4;
    s += '<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '" stroke="#e7e0d2" stroke-width="1"/>';
    s += '<text x="' + (padL - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="12" fill="#57534e">' + fmt(Math.round(v * 100) / 100) + '</text>';
  }
  const path = points.map(function (p, i) {
    return (i === 0 ? 'M' : 'L') + X(i).toFixed(1) + ' ' + Y(p.value).toFixed(1);
  }).join(' ');
  const color = o.color || '#b3261e';
  s += '<path d="' + path + '" fill="none" stroke="' + color + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
  points.forEach(function (p, i) {
    s += '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(p.value).toFixed(1) + '" r="5" fill="#fff" stroke="' + color + '" stroke-width="3"/>';
    const anchor = i === 0 ? 'start' : (i === points.length - 1 ? 'end' : 'middle');
    const dx = i === 0 ? 10 : (i === points.length - 1 ? -10 : 0);
    s += '<text x="' + (X(i) + dx).toFixed(1) + '" y="' + (Y(p.value) - 12).toFixed(1) + '" text-anchor="' + anchor + '" font-size="13" font-weight="700" fill="#1c1917" stroke="#fff" stroke-width="4" paint-order="stroke">' + fmt(p.value) + '</text>';
    s += '<text x="' + X(i).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="12" fill="#57534e">' + esc(p.label) + '</text>';
  });
  s += '</svg>';
  return s;
}
