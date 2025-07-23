console.log('Wow its javascript');

document.querySelector("h1").addEventListener("click", () => {
    alert("Hi");
});
document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });