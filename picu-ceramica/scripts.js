// Basic scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetHost = this.getAttribute('href');
        if (targetHost === '#') return;
        
        const target = document.querySelector(targetHost);
        if (target) {
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Product Carousel Logic
const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (track) {
    let currentPosition = 0;

    const moveCarousel = (direction) => {
        const slides = track.querySelectorAll('.carousel-slide');
        const slideWidth = slides[0].offsetWidth + 20; // width + gap
        const visibleWidth = track.parentElement.offsetWidth;
        const totalSlides = slides.length;
        const maxScroll = Math.max(0, (totalSlides * slideWidth) - visibleWidth - 20);

        if (direction === 'next') {
            currentPosition -= slideWidth;
            if (Math.abs(currentPosition) > maxScroll) currentPosition = 0; // Loop to start
        } else {
            currentPosition += slideWidth;
            if (currentPosition > 0) currentPosition = -maxScroll; // Loop to end
        }

        track.style.transform = `translateX(${currentPosition}px)`;
    };

    nextBtn.addEventListener('click', () => moveCarousel('next'));
    prevBtn.addEventListener('click', () => moveCarousel('prev'));
    
    // Auto-adjust on resize
    window.addEventListener('resize', () => {
        currentPosition = 0;
        track.style.transform = `translateX(0px)`;
    });
}

// Modal Logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.modal-close');
const carouselSlides = document.querySelectorAll('.carousel-slide');

carouselSlides.forEach(slide => {
    slide.addEventListener('click', function() {
        const bgImg = this.querySelector('.item-inner').style.backgroundImage;
        const imgSrc = bgImg.replace('url("', '').replace('")', '').replace("url('", "").replace("')", "");
        
        modal.classList.add('active');
        modalImg.src = imgSrc;
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});
