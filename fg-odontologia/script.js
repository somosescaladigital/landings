// Navbar Scroll effect
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

// Mobile Menu Styles
const menuStyle = document.createElement('style');
menuStyle.textContent = `
    @media (max-width: 968px) {
        .nav-links {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 75px;
            left: -100%;
            width: 100%;
            background: white;
            padding: 40px;
            height: calc(100vh - 75px);
            transition: 0.4s ease-in-out;
            z-index: 999;
        }
        .nav-links.active {
            left: 0;
        }
    }
`;
document.head.appendChild(menuStyle);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Reveal Animation on Scroll
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.service-card, .testi-card, .feature-item, .hero-content').forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// Reveal CSS
const revealCSS = document.createElement('style');
revealCSS.textContent = `
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .active-reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealCSS);
