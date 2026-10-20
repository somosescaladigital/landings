/* ============================================
   CERRAJERÍA INTEGRAL DIEGO - script.js
   ============================================ */

/* --- Navbar scroll effect --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* --- Mobile nav toggle --- */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

/* Close menu when a link is clicked */
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

/* --- Reveal on scroll --- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* --- Animated counters --- */
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

/* --- Mascot click Easter egg --- */
const mascotHero = document.getElementById('mascot-hero');
if (mascotHero) {
    const messages = [
        '¡Hola! 🔑 ¡Llamá a Diego!',
        '¡Sin llave? ¡Diego te ayuda! 🚪',
        '¡Emergencia 24hs! 📞',
        '¡Soy Clavito, la llave mágica! ✨'
    ];
    let msgIdx = 0;

    mascotHero.style.cursor = 'pointer';
    mascotHero.addEventListener('click', () => {
        // Bounce animation
        mascotHero.style.transform = 'scale(1.12) rotate(-5deg)';
        setTimeout(() => { mascotHero.style.transform = ''; }, 300);

        // Temporary tooltip
        const tip = document.createElement('div');
        tip.textContent = messages[msgIdx % messages.length];
        msgIdx++;
        tip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(192,57,43,.92);
            color: #fff;
            padding: 14px 24px;
            border-radius: 40px;
            font-weight: 700;
            font-size: 1rem;
            z-index: 9999;
            pointer-events: none;
            box-shadow: 0 8px 32px rgba(0,0,0,.4);
            animation: fadeUp .4s ease forwards;
        `;
        document.body.appendChild(tip);
        setTimeout(() => tip.remove(), 2000);
    });
}

/* --- Smooth scroll for in-page anchors --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* --- Inject fadeUp keyframe for mascot tooltip --- */
const style = document.createElement('style');
style.textContent = `
@keyframes fadeUp {
    from { opacity: 0; transform: translate(-50%, -40%); }
    to   { opacity: 1; transform: translate(-50%, -50%); }
}`;
document.head.appendChild(style);
