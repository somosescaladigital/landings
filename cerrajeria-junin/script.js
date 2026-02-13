// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation
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

// Side menu logic via Dynamic CSS
const menuStyle = document.createElement('style');
menuStyle.textContent = `
    @media (max-width: 968px) {
        .nav-links {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            background: #1a2a40;
            padding: 40px;
            height: calc(100vh - 70px);
            transition: 0.4s ease-in-out;
            z-index: 999;
        }
        .nav-links.active {
            left: 0;
        }
        .nav-links li {
            width: 100%;
            text-align: center;
            margin-bottom: 20px;
        }
        .nav-links a {
            font-size: 1.5rem !important;
        }
    }
`;
document.head.appendChild(menuStyle);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll Reveal Observer
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Reveal CSS
const revealCSS = document.createElement('style');
revealCSS.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    .service-card:nth-child(2) { transition-delay: 0.1s; }
    .service-card:nth-child(3) { transition-delay: 0.2s; }
    .service-card:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(revealCSS);
