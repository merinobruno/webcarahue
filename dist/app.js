'use strict';

const channels = {
  atencion: { url: 'https://wa.link/c05m4i', description: 'Para consultas generales, productos y orientación.' },
  ortopedia: { url: 'https://wa.link/c05m4i', description: 'Atención al cliente te orientará con tu consulta de ortopedia.' },
  cirugia: { url: 'https://wa.link/rtgh5n', description: 'Continuá con el canal específico del área de cirugía.' },
  audifonos: { url: 'https://wa.link/v8d94i', description: 'Continuá con el canal específico del área de audiología.' },
  estetica: { url: 'https://wa.link/c05m4i', description: 'Atención al cliente te orientará con tu consulta de estética.' },
  deportes: { url: 'https://wa.link/c05m4i', description: 'Consultá por productos deportivos y disponibilidad actual.' },
  alquileres: { url: 'https://wa.link/pnnjna', description: 'Consultá opciones, plazos y condiciones de alquiler.' },
  clientes: { url: 'https://wa.link/8pdguh', description: 'Accedé al canal oficial para clientes de Carahue.' }
};

const areas = {
  audiologia: { title: 'Audiología', symbol: '◖))', body: 'Somos representantes exclusivos de Phonak, la marca líder a nivel mundial en soluciones auditivas, y te acompañamos a elegir la opción adecuada para vos.', items: ['Audífonos: Encontrá el audífono que mejor se adapta a tu audición y a tu día a día, con la tecnología y el respaldo de Phonak.', 'Accesorios y conectividad: Conectá tus audífonos a la TV, al celular o a micrófonos remotos para escuchar mejor en casa, en reuniones o en el aula.', 'Mantenimiento y repuestos: Nuestro servicio de posventa te acompaña con reparaciones, ajustes y consultas, para que tus audífonos rindan siempre al máximo.', 'Atención personalizada: Cada consulta es individual: nos tomamos el tiempo de conocerte, escucharte y acompañarte en cada paso del camino.'] },
  cirugia: { title: 'Cirugías', symbol: '＋', body: 'Contactate directamente con nuestro equipo para consultas sobre productos del área de cirugías.', items: ['Consultá por el producto que necesitás.', 'Conocé las opciones y su disponibilidad.', 'Coordiná los próximos pasos con el área.'] },
  estetica: { title: 'Estética', symbol: '✧', body: 'Conocé nuestras líneas de estética y consultá las opciones disponibles con el equipo.', items: ['BIND: fajas, tops y prendas postquirúrgicas.', 'Prótesis mamarias Silimed.', 'Consultá modelos, talles y disponibilidad.'] },
  rehabilitacion: { title: 'Rehabilitación', symbol: '↺', body: 'Alquiler y venta de productos para acompañar tu rehabilitación.', items: ['Walkers.', 'Cabestrillos.', 'Sillas de ruedas.', 'Consultá disponibilidad y condiciones de alquiler o venta.'] },
  deportes: { title: 'Deporte', symbol: '↝', body: 'Productos para acompañar tu actividad. Consultá modelos, precios y disponibilidad actual con el equipo.', items: ['Cintas Spider Tech.', 'Gel frío / calor.', 'Vendas.'] }
};
const routeAliases = { audifonos: 'audiologia', ortopedia: 'rehabilitacion', alquileres: 'rehabilitacion' };
channels.audiologia = { ...channels.audifonos, description: 'Contactate directamente con nuestra área de audiología.' };
channels.rehabilitacion = { ...channels.atencion, description: 'Consultá por venta de productos de rehabilitación. Para alquileres, elegí el canal de Alquileres.' };

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); } });

const contactArea = document.querySelector('#contact-area');
const products = [
  { name: 'Cintas Spider Tech', category: 'cuidado', symbol: '✳' },
  { name: 'Gel frío / calor', category: 'cuidado', symbol: '◐' },
  { name: 'Vendas', category: 'cuidado', symbol: '≋' },
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
    const title = document.createElement('h3'); title.textContent = product.name;
    const link = document.createElement('a'); link.className = 'text-link'; link.href = channels.deportes.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Consultar ↗'; link.setAttribute('aria-label', `Consultar disponibilidad de ${product.name} por WhatsApp`);
    article.append(symbol, title, link); return article;
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
  const requestedKey = location.hash.startsWith('#area/') ? location.hash.slice(6) : null;
  const key = routeAliases[requestedKey] || requestedKey;
  const area = Object.hasOwn(areas, key) ? areas[key] : null;
  const home = document.querySelector('#home-view');
  const detail = document.querySelector('#detail-view');
  home.hidden = Boolean(area);
  detail.hidden = !area;
  document.querySelector('#product-catalog').hidden = key !== 'deportes';
  document.querySelector('.detail-layout').classList.toggle('catalog-route', key === 'deportes');
  document.querySelector('.detail-side').hidden = key === 'deportes';
  document.querySelector('#detail-description').hidden = false;
  document.querySelector('#audiology-content').hidden = key !== 'audiologia';
  document.querySelector('#rehabilitation-rental').hidden = key !== 'rehabilitacion';
  resetProducts();
  document.title = area ? `${area.title} · Carahue` : 'Carahue · Cerca de tu bienestar';
  if (area) {
    document.querySelector('#detail-title').textContent = area.title;
    document.querySelector('#detail-description').textContent = area.body;
    document.querySelector('#detail-symbol').textContent = area.symbol;
    const list = document.querySelector('#detail-items');
    list.replaceChildren(...area.items.map(item => { const li = document.createElement('li'); li.textContent = item; return li; }));
    document.querySelector('#detail-contact').href = channels[key].url;
    document.querySelector('#detail-contact').textContent = key === 'audiologia' ? 'WhatsApp de Audiología ↗' : key === 'rehabilitacion' ? 'Consultar por venta ↗' : 'Consultar por WhatsApp ↗';
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
setChannel(contactArea.value);
window.addEventListener('hashchange', renderRoute);
renderRoute();
document.querySelector('#year').textContent = new Date().getFullYear();
