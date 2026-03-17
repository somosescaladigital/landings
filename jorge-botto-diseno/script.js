document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Staggered reveal for children if applicable
                if (entry.target.classList.contains('services-grid') || entry.target.classList.contains('reviews-grid')) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Sticky Header
    const updateHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        // For Jorge Botto we'll keep it simple for now as requested, 
        // but can be expanded to a full menu later if needed.
        header.classList.toggle('nav-open');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
