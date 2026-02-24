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
    const revealItems = document.querySelectorAll('.hero-text, .art-card, .approach-card, .review-card, .contact-card');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealItems.forEach(item => {
        item.classList.add('reveal-base');
        revealObserver.observe(item);
    });

    // Add dynamic styles for reveals
    const style = document.createElement('style');
    style.textContent = `
        .reveal-base {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger effect for cards */
        .approach-card:nth-child(2) { transition-delay: 0.2s; }
        .approach-card:nth-child(3) { transition-delay: 0.4s; }
        
        .review-card:nth-child(2) { transition-delay: 0.2s; }
        .review-card:nth-child(3) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
});
