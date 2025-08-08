console.log('Wow its javascript');

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });


const cur = 'online';
const registration = await navigator.serviceWorker.getRegistration();
if (registration) {
  registration.addEventListener("updatefound", () => {
    console.log("Service Worker update found!");
    window.location.reload();
  });
}