// main.js — titik masuk situs: isi footer lalu render halaman sesuai hash,
// dan render ulang setiap kali hash berubah.
import { render, fillFooter } from './views.js';

fillFooter();
render();
window.addEventListener('hashchange', render);
