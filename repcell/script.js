document.addEventListener('DOMContentLoaded', () => {
    // Menú Móvil
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-dropdown');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const bars = menuBtn.children;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        
        // Animación simple de hamburguesa a 'X'
        if (mobileMenu.classList.contains('open')) {
            bars[0].style.transform = 'translateY(7px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Scroll Suave para anclajes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 70; // var(--nav-height)
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal (Animación elegante de aparición)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Lanzar validación en load para los elementos que ya están en viewport (Ej. el hero o botones)
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
