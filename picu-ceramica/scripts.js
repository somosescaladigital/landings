

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



// Product Carousel Logic
const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Render Images in Carousel
function renderGallery() {
    if (!track) return;
    
    track.innerHTML = galleryImages.map(img => `
        <li class="carousel-slide">
            <div class="item-inner" style="background-image: url('${img.src}');" data-src="${img.src}"></div>
        </li>
    `).join('');
}

// Initial Render
renderGallery();

if (track) {
    let currentPosition = 0;

    const moveCarousel = (direction) => {
        const slides = track.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;
        
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

// Modal Logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.modal-close');

// Event Delegation for Modal
if (track) {
    track.addEventListener('click', (e) => {
        const slide = e.target.closest('.carousel-slide');
        if (slide) {
            const inner = slide.querySelector('.item-inner');
            const imgSrc = inner.getAttribute('data-src');
            
            modal.classList.add('active');
            modalImg.src = imgSrc;
        }
    });
}

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
