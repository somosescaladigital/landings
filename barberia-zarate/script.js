// Barbería Zárate - Site Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Reveal Elements on Scroll
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    // Elements to reveal
    const revealElements = document.querySelectorAll('.service-card, .review-card, .section-title, .contact-container');
    
    // Add CSS for reveal dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .service-card, .review-card, .section-title, .contact-container {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    revealElements.forEach(el => revealObserver.observe(el));

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 10%';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '1.5rem 10%';
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

});
