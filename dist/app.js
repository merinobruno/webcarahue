'use strict';

const channels = {
  atencion: { url: 'https://wa.link/c05m4i', description: 'Para consultas generales, productos y orientación.' },
  ortopedia: { url: 'https://wa.link/c05m4i', description: 'Atención al cliente te orientará con tu consulta de ortopedia.' },
  cirugia: { url: 'https://wa.link/rtgh5n', description: 'Continuá con el canal específico del área de cirugía.' },
  audifonos: { url: 'https://wa.link/v8d94i', description: 'Continuá con el canal específico del área de audífonos.' },
  estetica: { url: 'https://wa.link/c05m4i', description: 'Atención al cliente te orientará con tu consulta de estética.' },
  deportes: { url: 'https://wa.link/c05m4i', description: 'Consultá por productos deportivos y disponibilidad actual.' },
  alquileres: { url: 'https://wa.link/pnnjna', description: 'Consultá opciones, plazos y condiciones de alquiler.' },
  clientes: { url: 'https://wa.link/8pdguh', description: 'Accedé al canal oficial para clientes de Carahue.' }
};

const areas = {
  ortopedia: { title: 'Ortopedia', number: '01', symbol: '◌', description: 'Acompañar tu movimiento, todos los días.', subtitle: 'Encontrá orientación para tu consulta.', body: 'Contactate con atención al cliente para conocer las opciones de ortopedia de Carahue y consultar disponibilidad.', items: ['Contanos qué producto o solución estás buscando.', 'Consultá modelos, medidas y condiciones antes de elegir.', 'Si necesitás un alquiler, también tenemos un canal específico.'] },
  cirugia: { title: 'Cirugía', number: '02', symbol: '＋', description: 'Un canal específico para las consultas del área quirúrgica.', subtitle: 'La consulta, con el área indicada.', body: 'Carahue dispone de un contacto dedicado a cirugía. Comunicá tu consulta al equipo a través de su canal oficial.', items: ['Consultas sobre productos médicos del área.', 'Información de disponibilidad y condiciones.', 'Comunicación directa con el contacto de cirugía.'] },
  audifonos: { title: 'Audífonos', number: '03', symbol: '◖))', description: 'Más cerca de lo que querés escuchar.', subtitle: 'Conversemos sobre tu consulta.', body: 'Accedé al canal de audífonos de Carahue para conocer las opciones y recibir información del área.', items: ['Consultá por las opciones de audífonos.', 'Solicitá información sobre la atención disponible.', 'Coordiná los próximos pasos con el equipo.'] },
  estetica: { title: 'Estética', number: '04', symbol: '✧', description: 'Un espacio para tus consultas de estética.', subtitle: 'Conocé nuestra línea.', body: 'Consultá a atención al cliente por las opciones del área de estética. El equipo podrá orientarte sobre los productos y su disponibilidad.', items: ['Información sobre la línea de estética.', 'Consultas de productos y disponibilidad.', 'Orientación para contactar al área correspondiente.'] },
  deportes: { title: 'Deportes', number: '05', symbol: '↝', description: 'Elementos para acompañar tu actividad y mantenerte en movimiento.', subtitle: 'Explorá nuestras líneas deportivas.', body: 'En nuestras comunicaciones compartimos estas líneas de productos. Consultá modelos, medidas, precios y disponibilidad actual con el equipo.', items: ['Pelotas de esferodinamia.', 'Mancuernas, pesas rusas y trampolines.', 'Bandas y tubos elásticos.', 'Camisetas térmicas y medias running de compresión.'] },
  alquileres: { title: 'Alquileres', number: '06', symbol: '↺', description: 'Consultá alternativas según lo que necesitás.', subtitle: 'Un canal directo para alquileres.', body: 'Contanos qué estás buscando y durante cuánto tiempo. El área de alquileres te informará las opciones y condiciones disponibles.', items: ['Disponibilidad del producto que necesitás.', 'Plazos, requisitos y condiciones.', 'Coordinación de los próximos pasos con el área.'] }
};

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); } });

const contactArea = document.querySelector('#contact-area');
const products = [
  { name: 'Pelotas de esferodinamia', category: 'entrenamiento', symbol: '◯', description: 'Una línea para sumar movimiento a tu actividad.' },
  { name: 'Mancuernas y pesas rusas', category: 'entrenamiento', symbol: '↔', description: 'Consultá las opciones para tu entrenamiento.' },
  { name: 'Bandas y tubos elásticos', category: 'entrenamiento', symbol: '∞', description: 'Elementos para acompañar tus ejercicios.' },
  { name: 'Trampolines', category: 'entrenamiento', symbol: '↟', description: 'Consultá modelos y disponibilidad.' },
  { name: 'Camisetas térmicas', category: 'indumentaria', symbol: '⌁', description: 'Consultá talles y opciones de manga larga.' },
  { name: 'Medias running de compresión', category: 'indumentaria', symbol: '↝', description: 'Conocé las opciones de nuestra línea deportiva.' }
];
const productSearch = document.querySelector('#product-search');
const productFilters = document.querySelector('.catalog-filters');
let selectedCategory = 'todos';
function normalized(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); }
function renderProducts() {
  const query = normalized(productSearch.value);
  const visible = products.filter(product => (selectedCategory === 'todos' || product.category === selectedCategory) && normalized(product.name).includes(query));
  const cards = visible.map(product => {
    const article = document.createElement('article'); article.className = 'product-card';
    const symbol = document.createElement('span'); symbol.className = 'product-symbol'; symbol.setAttribute('aria-hidden', 'true'); symbol.textContent = product.symbol;
    const category = document.createElement('p'); category.className = 'eyebrow'; category.textContent = product.category === 'entrenamiento' ? 'ENTRENAMIENTO' : 'INDUMENTARIA';
    const title = document.createElement('h3'); title.textContent = product.name;
    const description = document.createElement('p'); description.textContent = product.description;
    const link = document.createElement('a'); link.className = 'text-link'; link.href = channels.deportes.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Consultar disponibilidad ↗'; link.setAttribute('aria-label', `Consultar disponibilidad de ${product.name} por WhatsApp`);
    article.append(symbol, category, title, description, link); return article;
  });
  document.querySelector('#product-grid').replaceChildren(...cards);
  document.querySelector('#product-empty').hidden = visible.length > 0;
  document.querySelector('#product-count').textContent = `${visible.length} ${visible.length === 1 ? 'línea encontrada' : 'líneas encontradas'}`;
  productFilters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === selectedCategory)));
}
function resetProducts() { productSearch.value = ''; selectedCategory = 'todos'; renderProducts(); }
productSearch.addEventListener('input', renderProducts);
productFilters.addEventListener('click', event => { const button = event.target.closest('button[data-category]'); if (button) { selectedCategory = button.dataset.category; renderProducts(); } });
document.querySelector('#clear-products').addEventListener('click', () => { resetProducts(); productSearch.focus(); });
function setChannel(key) {
  const channel = channels[key] || channels.atencion;
  contactArea.value = Object.hasOwn(channels, key) ? key : 'atencion';
  document.querySelector('#contact-link').href = channel.url;
  document.querySelector('#contact-description').textContent = channel.description;
}
contactArea.addEventListener('change', () => setChannel(contactArea.value));

function renderRoute() {
  closeMenu();
  const key = location.hash.startsWith('#area/') ? location.hash.slice(6) : null;
  const area = Object.hasOwn(areas, key) ? areas[key] : null;
  const home = document.querySelector('#home-view');
  const detail = document.querySelector('#detail-view');
  home.hidden = Boolean(area);
  detail.hidden = !area;
  document.querySelector('#product-catalog').hidden = key !== 'deportes';
  resetProducts();
  document.title = area ? `${area.title} · Carahue` : 'Carahue · Cerca de tu bienestar';
  if (area) {
    document.querySelector('#detail-eyebrow').textContent = `${area.number} / NUESTRAS ESPECIALIDADES`;
    document.querySelector('#detail-title').textContent = area.title;
    document.querySelector('#detail-description').textContent = area.description;
    document.querySelector('#detail-symbol').textContent = area.symbol;
    document.querySelector('#detail-subtitle').textContent = area.subtitle;
    document.querySelector('#detail-body').textContent = area.body;
    const list = document.querySelector('#detail-items');
    list.replaceChildren(...area.items.map(item => { const li = document.createElement('li'); li.textContent = item; return li; }));
    document.querySelector('#detail-contact').href = channels[key].url;
    setChannel(key);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('#detail-title').focus({ preventScroll: true });
  } else if (key !== null) {
    history.replaceState(null, '', '#especialidades');
    document.querySelector('#especialidades').scrollIntoView();
  } else if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
}
window.addEventListener('hashchange', renderRoute);
renderRoute();
document.querySelector('#year').textContent = new Date().getFullYear();
