const CACHE = 'cme-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js'
];

// Instala e guarda os assets em cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Limpa caches antigos ao ativar nova versão
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estratégia: network first, fallback para cache
// Dados do Google Sheets sempre vão pela rede (sem cache)
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Requisições ao Google Sheets sempre pela rede
  if (url.includes('docs.google.com') || url.includes('googleapis.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Atualiza o cache com a resposta nova
        if (res.ok && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
