/* =============================================
   WASHDOG – Landing Page JavaScript
   ============================================= */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ---- ANIMATE IN ON SCROLL ----
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-in').forEach(el => animateObserver.observe(el));

// ---- HERO COUNTER ----
function animateHeroCounter() {
  const el = document.getElementById('hero-counter');
  let count = 0;
  const target = 1200;
  const duration = 2000;
  const step = Math.ceil(target / (duration / 16));
  const interval = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count.toLocaleString('es-AR');
    if (count >= target) clearInterval(interval);
  }, 16);
}

// ---- STAT COUNTERS ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isFloat = el.dataset.target.includes('.');
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    if (isFloat) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.floor(current).toLocaleString('es-AR') + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

// Hero counter trigger
const heroSection = document.getElementById('hero');
const heroCounterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    setTimeout(animateHeroCounter, 800);
    heroCounterObserver.disconnect();
  }
}, { threshold: 0.3 });
heroCounterObserver.observe(heroSection);

// ---- CANVAS PAW PRINTS ----
const canvas = document.getElementById('paws-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const paws = [];
const PAW_COUNT = 18;

function createPaw() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 18 + 8,
    opacity: Math.random() * 0.15 + 0.05,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.01,
  };
}

for (let i = 0; i < PAW_COUNT; i++) paws.push(createPaw());

function drawPaw(x, y, size, opacity, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = '#ec4899';

  // Main pad
  ctx.beginPath();
  ctx.ellipse(0, size * 0.3, size * 0.55, size * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Toes
  const toeOffsets = [
    [-size * 0.5, -size * 0.15],
    [-size * 0.18, -size * 0.55],
    [size * 0.18, -size * 0.55],
    [size * 0.5, -size * 0.15],
  ];
  toeOffsets.forEach(([tx, ty]) => {
    ctx.beginPath();
    ctx.ellipse(tx, ty, size * 0.22, size * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function animatePaws() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paws.forEach(p => {
    drawPaw(p.x, p.y, p.size, p.opacity, p.rotation);
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotSpeed;
    if (p.x < -50) p.x = canvas.width + 50;
    if (p.x > canvas.width + 50) p.x = -50;
    if (p.y < -50) p.y = canvas.height + 50;
    if (p.y > canvas.height + 50) p.y = -50;
  });
  requestAnimationFrame(animatePaws);
}
animatePaws();

// ---- BEFORE/AFTER SLIDER ----
const sliderContainer = document.getElementById('comparison-slider');
const sliderAfter = sliderContainer.querySelector('.slider-after');
const sliderHandle = document.getElementById('slider-handle');

let isDragging = false;
let sliderPercent = 50;

function setSlider(percent) {
  sliderPercent = Math.max(2, Math.min(98, percent));
  sliderAfter.style.clipPath = `inset(0 ${100 - sliderPercent}% 0 0)`;
  sliderHandle.style.left = `${sliderPercent}%`;
}

setSlider(50);

function getPercent(e) {
  const rect = sliderContainer.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  return ((clientX - rect.left) / rect.width) * 100;
}

sliderContainer.addEventListener('mousedown', e => { isDragging = true; setSlider(getPercent(e)); });
sliderContainer.addEventListener('touchstart', e => { isDragging = true; setSlider(getPercent(e)); }, { passive: true });
window.addEventListener('mousemove', e => { if (isDragging) setSlider(getPercent(e)); });
window.addEventListener('touchmove', e => { if (isDragging) setSlider(getPercent(e)); }, { passive: true });
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('touchend', () => isDragging = false);

// Animate slider on first view
const sliderObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    let pct = 80;
    let dir = -1;
    let steps = 0;
    const intro = setInterval(() => {
      pct += dir * 1.2;
      setSlider(pct);
      steps++;
      if (pct <= 20) dir = 1;
      if (steps > 100) { clearInterval(intro); setSlider(50); }
    }, 16);
    sliderObserver.disconnect();
  }
}, { threshold: 0.5 });
sliderObserver.observe(sliderContainer);

// ---- LIGHTBOX ----
const galleryImages = [
  { src: 'img/gallery1.png', alt: 'Poodle en Washdog' },
  { src: 'img/gallery2.png', alt: 'Shih tzu en Washdog' },
  { src: 'img/gallery3.png', alt: 'Pastor alemán en Washdog' },
  { src: 'img/hero.png', alt: 'Golden retriever en Washdog' },
];
let currentPhoto = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
  currentPhoto = index;
  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function nextPhoto(e) {
  e.stopPropagation();
  currentPhoto = (currentPhoto + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentPhoto].src;
}

function prevPhoto(e) {
  e.stopPropagation();
  currentPhoto = (currentPhoto - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentPhoto].src;
}

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextPhoto(e);
  if (e.key === 'ArrowLeft') prevPhoto(e);
});

// Expose to global scope for onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.nextPhoto = nextPhoto;
window.prevPhoto = prevPhoto;

// ---- CALCULATOR ----
const PRICES = {
  bath:  { small: 4500,  medium: 7000,  large: 10000 },
  cut:   { small: 5500,  medium: 8500,  large: 12000 },
  nails: { small: 1200,  medium: 1500,  large: 2000  },
  ears:  { small: 1000,  medium: 1200,  large: 1500  },
};
const COAT_MULT = { short: 1, medium: 1.2, long: 1.5 };

let selectedSize = 'small';
let selectedCoat = 'short';

function calcPrice() {
  const bath = document.getElementById('chk-bath').checked;
  const cut  = document.getElementById('chk-cut').checked;
  const nails = document.getElementById('chk-nails').checked;
  const ears = document.getElementById('chk-ears').checked;

  let total = 0;
  if (bath)  total += PRICES.bath[selectedSize];
  if (cut)   total += PRICES.cut[selectedSize] * COAT_MULT[selectedCoat];
  if (nails) total += PRICES.nails[selectedSize];
  if (ears)  total += PRICES.ears[selectedSize];

  const el = document.getElementById('result-price');
  const formatted = '$' + Math.round(total).toLocaleString('es-AR');

  // Animate price change
  el.style.transform = 'scale(0.9)';
  el.style.opacity = '0.5';
  setTimeout(() => {
    el.textContent = total === 0 ? '$0' : formatted;
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
    el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  }, 150);

  // Update WhatsApp message
  const waBtn = document.getElementById('calc-wa-btn');
  const sizeLabel = { small: 'pequeño', medium: 'mediano', large: 'grande' }[selectedSize];
  const coatLabel = { short: 'pelo corto', medium: 'pelo mediano', long: 'pelo largo/rizado' }[selectedCoat];
  const services = [];
  if (bath) services.push('Baño & Secado');
  if (cut) services.push('Corte de pelo');
  if (nails) services.push('Corte de uñas');
  if (ears) services.push('Limpieza de oídos');

  const msg = services.length > 0
    ? `Hola! Calculé un presupuesto para mi perro (${sizeLabel}, ${coatLabel}) para: ${services.join(', ')}. ¿Pueden confirmarme el precio? 🐾`
    : `Hola! Quiero consultar precios para mi mascota 🐾`;

  waBtn.href = `https://wa.me/5491130738423?text=${encodeURIComponent(msg)}`;
}

// Size buttons
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
    calcPrice();
  });
});

// Coat buttons
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedCoat = btn.dataset.coat;
    calcPrice();
  });
});

// Checkboxes
['chk-bath', 'chk-cut', 'chk-nails', 'chk-ears'].forEach(id => {
  document.getElementById(id).addEventListener('change', calcPrice);
});

// Init price
calcPrice();

// ---- REVIEWS CAROUSEL ----
const reviews = document.querySelectorAll('.review-card');
let currentReview = 0;
let reviewTimer;

const dotsContainer = document.getElementById('rev-dots');
reviews.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'rev-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToReview(i));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.rev-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentReview);
  });
}

function goToReview(index) {
  reviews[currentReview].classList.remove('active');
  currentReview = (index + reviews.length) % reviews.length;
  reviews[currentReview].classList.add('active');
  updateDots();
  resetTimer();
}

function nextReview() { goToReview(currentReview + 1); }
function prevReview() { goToReview(currentReview - 1); }

function resetTimer() {
  clearInterval(reviewTimer);
  reviewTimer = setInterval(() => goToReview(currentReview + 1), 5000);
}

resetTimer();

window.nextReview = nextReview;
window.prevReview = prevReview;

// ---- SERVICE CARDS STAGGER ANIMATION ----
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  serviceObserver.observe(card);
});

// ---- CONTACT ITEMS ANIMATION ----
const contactItems = document.querySelectorAll('.contact-item');
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, i * 100);
      contactObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

contactItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  contactObserver.observe(item);
});

// ---- SMOOTH HOVER ON TURNO OPTS ----
document.querySelectorAll('.turno-opt').forEach(opt => {
  opt.addEventListener('mouseenter', () => {
    opt.style.paddingLeft = '28px';
  });
  opt.addEventListener('mouseleave', () => {
    opt.style.paddingLeft = '20px';
  });
});

// ---- OPENING HOURS (dynamic today notice) ----
function updateScheduleNote() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 6=Sat
  const hour = now.getHours();
  const note = document.querySelector('.schedule-note');
  if (!note) return;

  if (day === 0) {
    note.textContent = '🔴 Hoy estamos cerrados (domingo)';
    note.style.color = '#ef4444';
  } else if (day === 6) {
    if (hour < 9) {
      note.textContent = '🟡 Hoy abrimos a las 9:00 hs (sábado)';
      note.style.color = '#fbbf24';
    } else if (hour < 14) {
      note.textContent = '🟢 ¡Estamos abiertos ahora! Hasta las 14:00 hs';
      note.style.color = '#22c55e';
    } else {
      note.textContent = '🔴 Hoy cerramos a las 14:00 hs (sábado)';
      note.style.color = '#ef4444';
    }
  } else {
    if (hour < 9) {
      note.textContent = '🟡 Hoy abrimos a las 9:00 hs';
      note.style.color = '#fbbf24';
    } else if (hour < 18) {
      note.textContent = '🟢 ¡Estamos abiertos ahora! Hasta las 18:00 hs';
      note.style.color = '#22c55e';
    } else {
      note.textContent = '🔴 Hoy cerramos a las 18:00 hs · Mañana abrimos a las 9:00';
      note.style.color = '#ef4444';
    }
  }
}
updateScheduleNote();
