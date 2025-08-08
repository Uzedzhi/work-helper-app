console.log('Wow its javascript');

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });










// VAPID public key из шага 2
const publicVapidKey = 'BEmCtGNaMk_6pFhZqX_Fp9_oRDjv04edkjvCZ-XprWe4Yt0fC5Xk-e-hDba6lu2NMTpKOfxj6eDK_a7pZ51Me-Y';
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

async function initPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push не поддерживается этим браузером');
    return;
  }

  // 1) Ждём готовности SW
  const swReg = await navigator.serviceWorker.register('service-worker.js');
  console.log('[SW] Зарегистрирован:', swReg);

  // 2) Запрашиваем разрешение
  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }
  if (permission !== 'granted') {
    console.warn('[Push] Разрешение не получено:', permission);
    return;
  }

  // 3) Проверяем существующую подписку
  let subscription = await swReg.pushManager.getSubscription();
  if (subscription) {
    // подпись с другим ключом — нужно отписаться
    const oldKey = subscription.options.applicationServerKey;
    console.log('[Push] Старая подписка обнаружена, отписываемся:', oldKey);
    const successful = await subscription.unsubscribe();
    console.log('[Push] Успешно отписались:', successful);
    subscription = null;
  }

  // 4) Создаём новую подписку
  subscription = await swReg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
  });
  console.log('[Push] Новая подписка:', subscription);

  // 5) Отправляем subscription на ваш сервер
  await fetch('/api/save-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
  console.log('[Push] Подписка отправлена на сервер');
}

// Запускаем
initPush().catch(err => console.error('[Push] Ошибка в initPush:', err));









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