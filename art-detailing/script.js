// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Modal Gallery Logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.modal-close');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        modal.style.display = "flex";
        modalImg.src = imgSrc;
        document.body.style.overflow = "hidden"; // Prevent scroll
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Mobile Menu (Simple toggle)
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}
