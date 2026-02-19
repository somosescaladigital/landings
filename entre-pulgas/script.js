document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        if (nav.classList.contains('open')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when clicking link
    const navLinks = document.querySelectorAll('.nav-links a');

    // Gallery Slider
    const track = document.querySelector('.slider-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    let autoPlayInterval;
    let slidesToShow = getSlidesToShow();

    function getSlidesToShow() {
        if (window.innerWidth > 1024) return 4;
        if (window.innerWidth > 768) return 2;
        return 1;
    }

    function renderDots() {
        dotsContainer.innerHTML = '';
        const dotCount = Math.max(0, slides.length - slidesToShow + 1);

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    window.addEventListener('resize', () => {
        slidesToShow = getSlidesToShow();
        renderDots();
        updateSlider();
    });

    renderDots();

    const updateSlider = () => {
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const moveAmount = (100 / slidesToShow);
        track.style.transform = `translateX(-${currentIndex * moveAmount}%)`;

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const nextSlide = () => {
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    };

    const prevSlide = () => {
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        if (currentIndex <= 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex--;
        }
        updateSlider();
    };

    const goToSlide = (index) => {
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        currentIndex = Math.min(index, maxIndex);
        updateSlider();
        resetAutoPlay();
    };

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });


    // Lightbox Functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('#lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    slides.forEach(slide => {
        const img = slide.querySelector('img');
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = ''; // Clear src after animation
        }, 400);
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    startAutoPlay();
});
