console.log('Wow its javascript');

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });

const swPath = '/work-helper-app/firebase-messaging-sw.js'; // относительный путь

navigator.serviceWorker.register(swPath).then((registration) => {
  console.log('✅ Firebase SW зарегистрирован');

  // Инициализация Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDI8ufxr-uyh2BEEM3CqtxivtGtW6yONe0",
    authDomain: "work-helper-app.firebaseapp.com",
    projectId: "work-helper-app",
    storageBucket: "work-helper-app.firebasestorage.app",
    messagingSenderId: "17581970290",
    appId: "1:17581970290:web:aea03338ced9c76c6743eb",
    measurementId: "G-1F10L84NKD"
  };
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/work-helper-app/service-worker.js').then(registration => {
      console.log('✅ Service Worker зарегистрирован');

      // Обновляем, когда устройство подключается к интернету
      window.addEventListener('online', () => {
        console.log('📡 Устройство онлайн. Проверяем обновления...');
        registration.update();
      });

      // Если найдена новая версия:
      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('🆕 Доступно обновление');

              // Покажем диалог (можно заменить на auto reload)
              window.location.reload();
            }
          }
        };
      };
    });
  });
}