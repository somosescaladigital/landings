// Product Data
const products = [
    {
        id: 1,
        name: "Mera Mera (Ace)",
        price: "$210.000",
        image: "images/mera-mera.png",
        badge: "ENVÍO GRATIS",
        link: "https://wa.me/5491100000000"
    },
    {
        id: 2,
        name: "Straw Hat Logo",
        price: "$180.000",
        image: "images/straw-hat.png",
        badge: "STOCK LIMITADO",
        link: "https://wa.me/5491167093876"
    },
    {
        id: 3,
        name: "Wanted Luffy Poster",
        price: "$250.000",
        image: "images/wanted-luffy.png",
        badge: "LANA ECO",
        link: "https://wa.me/5491167093876"
    },
    {
        id: 4,
        name: "Sabo Skull Pink",
        price: "$210.000",
        image: "images/skull-pink.png",
        badge: "MÁS VENDIDO",
        link: "https://wa.me/5491167093876"
    }
];

// Rendering Logic
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card reveal">
            <div class="p-img">
                ${p.badge ? `<span class="p-badge">${p.badge}</span>` : ''}
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="p-info">
                <h3>${p.name}</h3>
                <span class="p-price">${p.price}</span>
                <a href="${p.link}" target="_blank" class="p-action">LO QUIERO</a>
            </div>
        </div>
    `).join('');
}

// Initial Render
renderProducts();

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});
