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
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


// ===== Добавляем обработчики Push =====
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'icons/Icon-App-60x60@3x.png',
    data: { url: data.url }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});