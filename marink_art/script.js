// Mobile Menu
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Sparkles Animation for the Hero Image
function createSparkle() {
    const container = document.querySelector('.sparkles-container');
    if (!container) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random position within the container
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    sparkle.style.left = x + '%';
    sparkle.style.top = y + '%';
    
    // Random size
    const size = Math.random() * 4 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    container.appendChild(sparkle);
    
    // Remove after animation finishes
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Add sparkle CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .sparkle {
        position: absolute;
        background-color: #d4af37;
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 10px #d4af37;
        animation: sparkle-anim 2s ease-in-out forwards;
    }
    @keyframes sparkle-anim {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Periodically create sparkles
setInterval(createSparkle, 300);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(252, 249, 245, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        header.style.backgroundColor = 'rgba(252, 249, 245, 0.9)';
        header.style.boxShadow = 'none';
    }
});
