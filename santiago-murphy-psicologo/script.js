document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.approach-text, .approach-image, .space-features, .review-card, .contact-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(40px)';
        reveal.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
        revealObserver.observe(reveal);
    });

    // Mobile Menu
    const burger = document.querySelector('.burger');
    const navItems = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navItems.classList.toggle('active-mobile');
        burger.classList.toggle('toggle');
    });
});

// Mobile Nav Styles
const style = document.createElement('style');
style.textContent = `
    .nav-links.active-mobile {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 80px;
        right: 0;
        width: 100%;
        background: white;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .burger.toggle span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
    .burger.toggle span:nth-child(2) { opacity: 0; }
    .burger.toggle span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
`;
document.head.appendChild(style);
