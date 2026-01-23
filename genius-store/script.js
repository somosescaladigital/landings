// Product Data
const products = [
    {
        id: 1,
        name: "Batería de Aluminio Hudson (5 Piezas)",
        category: "bazar",
        price: "$92.000",
        image: "images/cookware.png",
        description: "Set premium de cocina Hudson. Aluminio de alta calidad con 3 capas de antiadherente y mangos símil madera. Incluye cacerola, sartén y jarro.",
        badge: "Premium"
    },
    {
        id: 2,
        name: "Rebanador de Huevos Hudson",
        category: "bazar",
        price: "$20.000",
        image: "images/slicer.png",
        description: "Utensilio esencial de cocina. Diseño liviano, duradero y muy fácil de usar para cortes perfectos.",
        badge: "Novedad"
    },
    {
        id: 3,
        name: "Termo Black Edition con Manija",
        category: "bazar",
        price: "$40.000",
        image: "images/thermo.png",
        description: "Termo de acero inoxidable con diseño robusto, manija rebatible y gran capacidad de conservación térmica.",
        badge: "Más Vendido"
    },
    {
        id: 4,
        name: "Parlante Mobile Speaker RGB",
        category: "electronica",
        price: "$70.000",
        image: "images/speaker.png",
        description: "Sistema de sonido con luces LED dinámicas. Batería de 1500mAh, conexión Bluetooth y gran potencia de sonido.",
        badge: "Oferta"
    },
    {
        id: 5,
        name: "Aro de Luz RGB + Trípode Profesional",
        category: "gadgets",
        price: "$30.000",
        image: "images/ringlight.png",
        description: "Ideal para creadores de contenido. Múltiples colores RGB, control de intensidad y trípode ajustable incluido.",
        badge: "Top Ventas"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('header');
const modal = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');

// Global Function to handle categories clicks from the categories section
window.scrollToProducts = (category) => {
    document.getElementById('products').scrollIntoView();
    renderProducts(category);
    // Update filter buttons
    filterBtns.forEach(btn => {
        if(btn.dataset.filter === category) btn.classList.add('active');
        else btn.classList.remove('active');
    });
};

// Render Products
function renderProducts(filter = 'all') {
    if (!productsGrid) return;

    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card reveal">
            <div class="product-img">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="product-btn" onclick="openProductModal(${product.id})">Ver Detalles</button>
            </div>
        </div>
    `).join('');

    // Trigger reveal for new elements
    setTimeout(() => {
        const reveals = productsGrid.querySelectorAll('.reveal');
        reveals.forEach(el => el.classList.add('active'));
    }, 100);
}

// Modal Logic
window.openProductModal = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDesc').textContent = product.description;
    
    // WhatsApp prefilled message
    const message = `¡Hola Genius Store! 👋 Vi este producto en su web y me interesa: ${product.name} (${product.price})`;
    const waUrl = `https://wa.me/5491131563172/?text=${encodeURIComponent(message)}`;
    document.getElementById('waOrderBtn').href = waUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scrolling
};

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Category Cards listeners
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const cat = card.dataset.category;
        window.scrollToProducts(cat);
    });
});

// Filter Handlers
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

// Mobile Menu
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Header Scroll Effect
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

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Initial Render
renderProducts();
