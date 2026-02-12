// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Sidebar logic implementation via CSS
const toggleStyle = document.createElement('style');
toggleStyle.textContent = `
    @media (max-width: 968px) {
        .nav-links {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: white;
            padding: 100px 40px;
            box-shadow: -10px 0 30px rgba(0,0,0,0.1);
            transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
            z-index: 999;
        }
        .nav-links.active {
            right: 0;
        }
    }
`;
document.head.appendChild(toggleStyle);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navMenu.classList.remove('active');
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Reveal animations
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// Assign hidden state to elements
document.querySelectorAll('.hero-content, .mascot-hero, .exp-card, .service-box, .testimonial-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
    revealObserver.observe(el);
});

// Implementation of the reveal logic
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .is-revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .exp-card:nth-child(2) { transition-delay: 0.2s; }
    .exp-card:nth-child(3) { transition-delay: 0.4s; }
    .service-box:nth-child(2) { transition-delay: 0.1s; }
    .service-box:nth-child(3) { transition-delay: 0.2s; }
    .service-box:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(revealStyle);

// Dynamic Copyright Year
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2026', year);
}
