const CACHE = 'studioweblapaz-v2'; // Actualizado a v2 para forzar la nueva versión
const ASSETS = [
  './', 
  './index.html', 
  './login.html', 
  './registro.html', 
  './admin.html', 
  './reserva.html',
  './manifest.json', 
  './assets/icon-192.png', 
  './assets/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ));
  self.clients.claim();
});

// Cache-first con red de respaldo (para que la app cargue rápido y funcione offline)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone));
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});