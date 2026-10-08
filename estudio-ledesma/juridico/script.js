/**
 * ESTUDIO BOUTIQUE LEDESMA & ASOCIADOS
 * script.js - JavaScript Vanilla
 * 
 * Funcionalidades:
 * 1. Menú mobile accesible (ARIA + control teclado + fuera de click)
 * 2. Elevación sutil del header al hacer scroll
 * 3. Quick Chips interactivos: al hacer clic en un motivo en el Hero,
 *    hace scroll suave al formulario, selecciona el área y redacta un borrador.
 * 4. Acordeón accesible para FAQ (con animación fluida y soporte ARIA)
 * 5. IntersectionObserver para animaciones de entrada con soporte prefers-reduced-motion
 * 6. Formulario de WhatsApp dinámico sin backend (formatea el mensaje profesionalmente)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. MENÚ MOBILE ACCESIBLE
     ========================================================================== */
  const burgerBtn = document.querySelector('.burger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (burgerBtn && navMenu) {
    const toggleMenu = () => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
      burgerBtn.setAttribute('aria-label', !isExpanded ? 'Cerrar menú' : 'Abrir menú');
      navMenu.classList.toggle('is-active');
    };

    const closeMenu = () => {
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.setAttribute('aria-label', 'Abrir menú');
      navMenu.classList.remove('is-active');
    };

    burgerBtn.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        closeMenu();
        burgerBtn.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !burgerBtn.contains(e.target) && navMenu.classList.contains('is-active')) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     2. HEADER ELEVACIÓN AL SCROLL
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ==========================================================================
     3. QUICK CHIPS INTERACTIVOS (PERSONALIZACIÓN EN 1 CLIC)
     ========================================================================== */
  const chipButtons = document.querySelectorAll('.chip-btn');
  const subjectSelect = document.getElementById('form-subject');
  const messageTextarea = document.getElementById('form-message');
  const contactSection = document.getElementById('contacto');

  if (chipButtons.length && subjectSelect) {
    chipButtons.forEach(chip => {
      chip.addEventListener('click', () => {
        chipButtons.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const value = chip.dataset.subject;
        const presetText = chip.dataset.prompt || '';

        // Seleccionar en el dropdown
        if (value) {
          for (let i = 0; i < subjectSelect.options.length; i++) {
            if (subjectSelect.options[i].value === value || subjectSelect.options[i].text.includes(value)) {
              subjectSelect.selectedIndex = i;
              break;
            }
          }
        }

        // Prellenar mensaje si está vacío o reemplazarlo
        if (messageTextarea && presetText) {
          messageTextarea.value = presetText;
        }

        // Scroll suave hacia el formulario
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const nameInput = document.getElementById('form-name');
          if (nameInput) {
            setTimeout(() => nameInput.focus(), 600);
          }
        }
      });
    });
  }

  /* ==========================================================================
     4. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
     ========================================================================== */
  const faqRows = document.querySelectorAll('.faq-row');

  faqRows.forEach(row => {
    const trigger = row.querySelector('.faq-trigger');
    const collapse = row.querySelector('.faq-collapse');

    if (!trigger || !collapse) return;

    trigger.addEventListener('click', () => {
      const isOpen = row.classList.contains('is-open');

      // Cerrar otros para elegancia visual
      faqRows.forEach(otherRow => {
        if (otherRow !== row && otherRow.classList.contains('is-open')) {
          otherRow.classList.remove('is-open');
          const otherTrigger = otherRow.querySelector('.faq-trigger');
          const otherCollapse = otherRow.querySelector('.faq-collapse');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherCollapse) otherCollapse.style.maxHeight = null;
        }
      });

      if (isOpen) {
        row.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        collapse.style.maxHeight = null;
      } else {
        row.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     5. ANIMACIONES AL SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animatedElements = document.querySelectorAll('.fade-up-element');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     6. FORMULARIO DE CONTACTO -> WHATSAPP
     ========================================================================== */
  const contactForm = document.getElementById('whatsapp-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // EDITAR: Teléfono del cliente sin signos (+54 9 11 ...)
      const whatsappNumber = contactForm.dataset.phone || '5491155550192';

      const nameInput = document.getElementById('form-name');
      const phoneInput = document.getElementById('form-phone');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Consulta general';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name) {
        alert('Por favor, ingrese su nombre y apellido para dirigirnos a usted.');
        nameInput && nameInput.focus();
        return;
      }

      let text = `Estimado Estudio Ledesma & Asociados.\n\n`;
      text += `Mi nombre es *${name}*.\n`;
      if (phone) {
        text += `• Teléfono de contacto: ${phone}\n`;
      }
      text += `• Motivo de consulta: *${subject}*\n\n`;
      text += `*Detalle:*\n${message ? message : 'Deseo coordinar una consulta profesional en el estudio.'}`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Actualizar año copyright dinámicamente si existe el elemento
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
