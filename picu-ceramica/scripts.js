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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
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
        const slideWidth = track.querySelector('.carousel-slide').offsetWidth + 20; // width + gap
        const visibleWidth = track.parentElement.offsetWidth;
        const totalSlides = track.children.length;
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
}

