// Enhanced starfield
function createStars() {
    const stars = document.getElementById('stars');
    const twinkling = document.getElementById('twinkling');
    const count = 200;
    
    // Clear existing stars
    stars.innerHTML = '';
    twinkling.innerHTML = '';
    
    // Base stars
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 5 + 3 + 's';
        const delay = Math.random() * 5 + 's';
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDuration = duration;
        star.style.animationDelay = delay;
        
        stars.appendChild(star);
    }
    
    // Twinkling stars
    for (let i = 0; i < count/2; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 2 + 1 + 's';
        const delay = Math.random() * 3 + 's';
        const opacity = Math.random() * 0.5 + 0.3;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animation = `twinkle ${duration} infinite ease-in-out ${delay}`;
        star.style.opacity = opacity;
        
        twinkling.appendChild(star);
    }
}

// Navbar Scroll Behavior
let lastScroll = 0;
const navbar = document.querySelector('nav');
const mobileMenu = document.getElementById('mobileMenu');

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    
    // Only hide/show if mobile menu isn't open
    if (!mobileMenu.classList.contains('active')) {
        if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
            navbar.classList.add('hidden');
        } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
            navbar.classList.remove('hidden');
        }
    }
    
    lastScroll = currentScroll;
}

// Mobile Menu Toggle - Improved Version
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Toggle menu when hamburger icon is clicked
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close menu when X icon is clicked
    closeMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}
// Service data
const services = [
    {
        icon: '<i class="fas fa-robot"></i>',
        title: "AI & Automation",
        description: "Custom AI agents, LLM integration, and workflow automation to transform your business processes.",
        tech: ["OpenAI", "LangChain", "Pinecone"]
    },
    {
        icon: '<i class="fas fa-globe"></i>',
        title: "Web Development",
        description: "High-performance, SEO-optimized web applications built with modern architectures.",
        tech: ["Next.js", "Golang", "Node.js"]
    },
    {
        icon: '<i class="fas fa-microchip"></i>',
        title: "Embedded & IoT",
        description: "Smart connected devices and industrial IoT solutions with real-time analytics.",
        tech: ["STM32", "ESP32", "Raspberry Pi"]
    }
];

// Load services
function loadServices() {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = ''; // Clear existing content
    
    services.forEach(service => {
        const techItems = service.tech.map(tech => 
            `<span class="tech-item">${tech}</span>`
        ).join('');
        
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon">
                ${service.icon}
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="tech-list">
                ${techItems}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    loadServices();
    setupMobileMenu();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});