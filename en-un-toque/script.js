document.addEventListener('DOMContentLoaded', () => {
    // Referencias
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-dropdown');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Cambiar aspecto del Navbar al scrollear
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menú Hamburguesa Móvil
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            menuBtn.classList.remove('fa-bars');
            menuBtn.classList.add('fa-xmark');
        } else {
            menuBtn.classList.remove('fa-xmark');
            menuBtn.classList.add('fa-bars');
        }
    });

    // Cerrar menú móvil al hacer click en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('fa-xmark');
            menuBtn.classList.add('fa-bars');
        });
    });

    // Smooth scroll offset para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animaciones de entrada (Scroll Reveal) básico
    const fadeElements = document.querySelectorAll('.service-card, .review-card, .info-item, .section-header');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });
});
