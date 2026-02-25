document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            body.classList.toggle('mobile-nav-active');
            const icon = menuToggle.querySelector('i');
            if (body.classList.contains('mobile-nav-active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Close menu on link click
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('mobile-nav-active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
