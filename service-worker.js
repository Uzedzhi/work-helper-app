const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/Adobe Express - file.png',
    '/Group 29.png',
    '/script.js',
    '/images/Group 12 (2).svg',
    'work_helper.webmanifest',
    '/images/Group 30.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Работа офлайн: отвечаем из кэша
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});