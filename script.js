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
  const firebaseConfig = { /* твои данные */ };
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  // Запрашиваем разрешение
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('🔔 Разрешение на уведомления получено');

      // Получаем токен, передавая явно регистрацию service worker
      messaging.getToken({
        vapidKey: 'BFKbU1VHHoKA2ku0v9ZcgQqo3urfAadSSTY8QAs9PcnzvjnKA6BNPiuPj8JTnCC2jRhJStLUybughDfIuQrFVfk',
        serviceWorkerRegistration: registration
      }).then((currentToken) => {
        if (currentToken) {
          console.log('🎯 Токен устройства:', currentToken);
        } else {
          console.log('⚠️ Токен не получен');
        }
      }).catch((err) => {
        console.error('❌ Ошибка получения токена:', err);
      });
    }
  });
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