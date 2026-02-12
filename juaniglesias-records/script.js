// Availability Data (Easily updatable every week)
const rehearsalAvailability = [
    {
        day: "Lunes",
        slots: ["14:00 - 16:00", "16:00 - 18:00", "20:00 - 22:00"]
    },
    {
        day: "Martes",
        slots: ["10:00 - 12:00", "18:00 - 20:00"]
    },
    {
        day: "Miércoles",
        slots: ["14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00"]
    },
    {
        day: "Jueves",
        slots: ["16:00 - 18:00", "20:00 - 22:00"]
    },
    {
        day: "Viernes",
        slots: ["10:00 - 12:00", "14:00 - 16:00", "18:00 - 20:00"]
    },
    {
        day: "Sábado",
        slots: ["10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00"]
    }
];

// WhatsApp Number (Change here!)
const waNumber = "5491154100231";

// Initial Render
// Availability and Spotify sections removed by user

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Disable body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});
