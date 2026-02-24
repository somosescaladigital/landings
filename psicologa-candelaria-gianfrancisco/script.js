document.addEventListener('DOMContentLoaded', () => {
    // Navbar effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Reveal animations
    const revealElements = document.querySelectorAll('.hero-content, .about-text, .floral-card, .service-card, .review-box, .contact-wrap');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });
});

// Add reveal styles
const style = document.createElement('style');
style.textContent = `
    .reveal-init {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .active-reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Mobile Menu Placeholder Logic */
    .nav-menu.mobile-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 80px;
        right: 0;
        width: 100%;
        background: #faf7f2;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }
`;
document.head.appendChild(style);

// Simple Burger Logic
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-menu');
if(burger) {
    burger.addEventListener('click', () => {
        menu.classList.toggle('mobile-active');
    });
}
