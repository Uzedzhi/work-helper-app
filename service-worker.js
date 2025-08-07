const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/work-helper-app/index.html',
    '/work-helper-app/styles.css',
    '/work-helper-app/Adobe Express - file.png',
    '/work-helper-app/Group 29.png',
    '/work-helper-app/script.js',
    '/work-helper-app/images/Group 12 (2).svg',
    '/work-helper-app/work_helper.webmanifest',
    '/work-helper-app/images/Group 30.svg'
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