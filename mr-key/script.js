// Header Scroll Effect
const header = document.getElementById('header');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Disable scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Mascot Animation on Mouse Move (Hero)
const hero = document.querySelector('.hero');
const mascot = document.querySelector('.mascot-img');

if (hero && mascot) {
    hero.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        mascot.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        mascot.style.transform = `rotateY(0deg) rotateX(0deg)`;
        mascot.style.transition = 'all 0.5s ease';
    });
    
    hero.addEventListener('mouseenter', () => {
        mascot.style.transition = 'none';
    });
}
