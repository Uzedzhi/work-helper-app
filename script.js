console.log('Wow its javascript');

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });










// VAPID public key из шага 2
const publicVapidKey = 'BEmCtGNaMk_6pFhZqX_Fp9_oRDjv04edkjvCZ-XprWe4Yt0fC5Xk-e-hDba6lu2NMTpKOfxj6eDK_a7pZ51Me-Y';

// Конвертер из base64 в Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from(rawData.split('').map(char => char.charCodeAt(0)));
}

// Регистрация SW и подписка на Push
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    registerAndSubscribe().catch(console.error);
  }
});

async function registerAndSubscribe() {
  // 1) Регистрируем SW
  const swReg = await navigator.serviceWorker.register('service-worker.js');
  console.log('SW зарегистрирован:', swReg);

  // 2) Запрашиваем разрешение
  let permission = Notification.permission;
  if (permission === 'default') permission = await Notification.requestPermission();
  if (permission !== 'granted') return console.warn('Нет разрешения на уведомления');

  // 3) Подписываемся на Push
  const subscription = await swReg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Подписка:', subscription);

  // 4) Отправляем подписку на сервер
  await fetch('http://localhost:4000/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
}










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
  };