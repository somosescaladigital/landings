/**
 * CONSULTORIO ODONTOLÓGICO SF — script.js
 * Nav scroll · Mobile menu · FAQ · Scroll reveal · Counters · WhatsApp form
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAV SCROLL ─────────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── 2. MENÚ MOBILE ────────────────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose= document.getElementById('mobile-close');

  const openMenu  = () => { mobileMenu?.classList.add('open');    hamburger?.classList.add('active');    hamburger?.setAttribute('aria-expanded','true');  document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobileMenu?.classList.remove('open'); hamburger?.classList.remove('active'); hamburger?.setAttribute('aria-expanded','false'); document.body.style.overflow = ''; };

  hamburger?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ── 3. FAQ ACORDEÓN ───────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-item__btn')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ── 4. SCROLL REVEAL ──────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 5. CONTADORES ANIMADOS ────────────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    counters.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const start = performance.now();
      const step = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    });
    countersStarted = true;
  }

  if ('IntersectionObserver' in window && counters.length) {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      const statsObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
      }, { threshold: 0.4 });
      statsObs.observe(statsSection);
    }
  }

  /* ── 6. FORMULARIO WHATSAPP ────────────────────────────────────────────── */
  const form     = document.getElementById('form-turno');
  const WA_PHONE = '549XXXXXXXXXX'; // <!-- EDITAR: número WhatsApp sin + ni espacios -->

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre   = document.getElementById('f-nombre')?.value.trim()   || '';
    const tel      = document.getElementById('f-telefono')?.value.trim() || '';
    const servicio = document.getElementById('f-servicio')?.value        || '';
    const mensaje  = document.getElementById('f-mensaje')?.value.trim()  || '';

    if (!nombre) { alert('Por favor ingresá tu nombre.'); document.getElementById('f-nombre')?.focus(); return; }

    const lines = [
      `Hola! Quisiera pedir un turno en Consultorio Odontológico SF 🦷`,
      ``,
      `*Nombre:* ${nombre}`,
      tel      ? `*Teléfono:* ${tel}`         : null,
      servicio ? `*Tratamiento:* ${servicio}` : null,
      mensaje  ? `*Detalle:* ${mensaje}`      : null,
    ].filter(l => l !== null);

    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });

  /* ── 7. SMOOTH SCROLL ──────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

});
