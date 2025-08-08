console.log('Wow its javascript');

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });


const cur = 'online';
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {

      // Обновляем, когда устройство подключается к интернету
      if (cur === 'offline') {
        window.addEventListener('online', () => {
          console.log('📡 Устройство онлайн. Проверяем обновления...');
          registration.update();
        });
      }

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
  }