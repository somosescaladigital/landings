/**
 * ODONTOLOGÍA VIRREYES — script.js
 * Funciones: menú mobile, FAQ acordeón, animaciones scroll, form WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAV SCROLL ─────────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 2. MENÚ MOBILE ────────────────────────────────────────────────────── */
  const hamburger      = document.getElementById('hamburger');
  const mobileMenu     = document.getElementById('mobile-menu');
  const mobileClose    = document.getElementById('mobile-close');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  function openMenu() {
    mobileMenu?.classList.add('open');
    mobileMenu?.setAttribute('aria-hidden', 'false');
    hamburger?.classList.add('active');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (mobileMenu?.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger?.addEventListener('click', toggleMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileBackdrop?.addEventListener('click', closeMenu);

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ── 3. FAQ ACORDEÓN ───────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Cerrar todos
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-item__btn').setAttribute('aria-expanded', 'false');
      });

      // Abrir el clickeado si estaba cerrado
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── 4. SCROLL ANIMATIONS ──────────────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback para navegadores antiguos
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ── 5. FORMULARIO WHATSAPP ────────────────────────────────────────────── */
  const form      = document.getElementById('form-turno');
  const PHONE_WA  = '5491136072062'; // <!-- EDITAR: número de WhatsApp sin + ni espacios -->

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = document.getElementById('f-nombre')?.value.trim()   || '';
    const telefono = document.getElementById('f-telefono')?.value.trim() || '';
    const servicio = document.getElementById('f-servicio')?.value        || '';
    const mensaje  = document.getElementById('f-mensaje')?.value.trim()  || '';

    if (!nombre) {
      alert('Por favor ingresá tu nombre.');
      document.getElementById('f-nombre')?.focus();
      return;
    }

    const lines = [
      `Hola! Quisiera pedir un turno en Odontología Virreyes 🦷`,
      ``,
      `*Nombre:* ${nombre}`,
      telefono ? `*Teléfono:* ${telefono}` : null,
      servicio ? `*Consulta:* ${servicio}` : null,
      mensaje  ? `*Detalle:* ${mensaje}`   : null,
    ].filter(l => l !== null);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${PHONE_WA}?text=${text}`, '_blank', 'noopener');
  });

  /* ── 6. SMOOTH SCROLL PARA ANCHORS ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // alto del nav
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
