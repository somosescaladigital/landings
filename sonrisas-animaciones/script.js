document.addEventListener('DOMContentLoaded', () => {
    // Pop animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .insta-item, .section-title');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // CSS for pop animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
});
