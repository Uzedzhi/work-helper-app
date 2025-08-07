console.log('Wow its javascript');

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/work-helper-app/service-worker.js')
      .then(reg => console.log('✅ Service Worker зарегистрирован'))
      .catch(err => console.error('❌ Ошибка:', err));
  });

}
