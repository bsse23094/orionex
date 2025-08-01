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

// Create starfield
function createStars() {
    const stars = document.getElementById('stars');
    const count = 150;
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random properties
        const size = Math.random() * 2;
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
}

// Load services
function loadServices() {
    const grid = document.querySelector('.services-grid');
    
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

// Smooth scroll
function setupScroll() {
    document.getElementById('scrollDown').addEventListener('click', () => {
        document.getElementById('services').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

// Initialize
window.addEventListener('load', () => {
    createStars();
    loadServices();
    setupScroll();
});