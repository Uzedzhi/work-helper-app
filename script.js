console.log('Wow its javascript');

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });

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
