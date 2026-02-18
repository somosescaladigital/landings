document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        if (nav.classList.contains('open')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when clicking links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuIcon.classList.replace('fa-times', 'fa-bars');
        });
    });
});
