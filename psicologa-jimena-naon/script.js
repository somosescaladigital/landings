document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Simple reveal animation on scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
});

// CSS for reveal animations (to be added to style.css or handled here)
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links.nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 80px;
        background: white;
        width: 100%;
        padding: 2rem;
        gap: 1.5rem;
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        border-bottom: 1px solid #eee;
    }
`;
document.head.appendChild(style);
