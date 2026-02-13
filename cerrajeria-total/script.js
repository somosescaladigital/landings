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
            top: 75px;
            left: -100%;
            width: 100%;
            background: rgba(0,0,0,0.95);
            padding: 50px 20px;
            height: calc(100vh - 75px);
            transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            z-index: 999;
            backdrop-filter: blur(15px);
        }
        .nav-links.active {
            left: 0;
        }
        .nav-links li {
            margin-bottom: 30px;
        }
        .nav-links a {
            font-size: 1.8rem !important;
            font-weight: 800;
        }
    }
`;
document.head.appendChild(menuStyle);

// Smooth Scroll with Header Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Close menu if open
                navMenu.classList.remove('active');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }

                const headerOffset = 90;
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

// Scroll Reveal with Intersection Observer
const revealOptions = {
    threshold: 0.1,
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

// Form and Buttons Interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});
