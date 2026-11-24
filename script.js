// Menú móvil
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
toggle?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Animación al hacer scroll (Intersection Observer)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Año en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Botón "Comenzar prueba" -> lleva al registro (luego aquí pondrás tu link de Firebase Auth)
document.getElementById('startBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  // TEMPORAL: por ahora abre WhatsApp de contacto. Luego: window.location.href = 'reserva.html' o 'admin.html'
  window.open('https://wa.me/526120000000?text=Hola%20Studio%20Web%20La%20Paz,%20quiero%20la%20prueba%20gratis%20de%20la%20agenda', '_blank');
});