/**
 * LUCAS ACOSTA PAISAJISMO — script.js
 */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. NAV SCROLL */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

  /* 2. MENÚ MOBILE */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose= document.getElementById('mobile-close');
  const openMenu  = () => { mobileMenu?.classList.add('open');    hamburger?.classList.add('active');    hamburger?.setAttribute('aria-expanded','true');  document.body.style.overflow='hidden'; };
  const closeMenu = () => { mobileMenu?.classList.remove('open'); hamburger?.classList.remove('active'); hamburger?.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };
  hamburger?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* 3. SCROLL REVEAL */
  const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else revealEls.forEach(el => el.classList.add('visible'));

  /* 4. FORMULARIO WHATSAPP */
  const form = document.getElementById('form-presupuesto');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre   = document.getElementById('f-nombre')?.value.trim()   || '';
    const tel      = document.getElementById('f-telefono')?.value.trim() || '';
    const servicio = document.getElementById('f-servicio')?.value        || '';
    const zona     = document.getElementById('f-zona')?.value.trim()     || '';
    const mensaje  = document.getElementById('f-mensaje')?.value.trim()  || '';

    if (!nombre) { alert('Por favor ingresá tu nombre.'); document.getElementById('f-nombre')?.focus(); return; }

    const lines = [
      `Hola Lucas! Quisiera pedir un presupuesto 🌿`,
      ``,
      `*Nombre:* ${nombre}`,
      tel      ? `*Teléfono:* ${tel}`     : null,
      servicio ? `*Servicio:* ${servicio}` : null,
      zona     ? `*Zona/barrio:* ${zona}` : null,
      mensaje  ? `*Detalle:* ${mensaje}`  : null,
    ].filter(l => l !== null);

    window.open(`https://wa.me/5491154983091?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });

  /* 5. SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    });
  });
});
