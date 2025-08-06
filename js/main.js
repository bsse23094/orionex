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

// Replace the existing form submission code with this
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const spinner = document.getElementById('loadingSpinner');
    const formMessage = document.getElementById('formMessage');

    // Loading state
    submitText.textContent = 'Sending...';
    spinner.style.display = 'inline-block';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
        await fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // ensures it sends without CORS blocking
        });

        // Always treat as success if fetch() doesn't throw
        formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        form.reset();
    } catch (err) {
        // Only fires if network completely fails
        formMessage.textContent = 'Failed to send message. Please try again or email us directly.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        console.error('Form send error:', err);
    }

    // Restore button state
    submitText.textContent = 'Send Message';
    spinner.style.display = 'none';
    submitBtn.disabled = false;

    // Hide after 5s
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});
function setupRocketAnimation() {
    const rocket = document.getElementById('timelineRocket');
    const processSection = document.querySelector('.process');
    const timeline = document.querySelector('.timeline');

    if (!rocket || !processSection || !timeline) return;

    function updateRocketPosition() {
        const sectionTop = processSection.offsetTop;
        const sectionHeight = processSection.offsetHeight;
        const scrollY = window.scrollY + window.innerHeight / 2;

        const minY = sectionTop;
        const maxY = sectionTop + sectionHeight - rocket.offsetHeight;

        if (scrollY >= minY && scrollY <= maxY) {
            const offset = scrollY - sectionTop;
            rocket.style.transform = `translateY(${offset}px)`;
        } else if (scrollY < minY) {
            rocket.style.transform = `translateY(0)`;
        } else {
            rocket.style.transform = `translateY(${sectionHeight - rocket.offsetHeight}px)`;
        }
    }

    window.addEventListener('scroll', updateRocketPosition);
    window.addEventListener('resize', updateRocketPosition);
    updateRocketPosition();
}
// Add this to your existing main.js file
function setupServiceCardLinks() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h3').textContent;
            let pageUrl = '';
            
            switch(serviceTitle) {
                case 'AI & Automation':
                    pageUrl = 'ai-automation.html';
                    break;
                case 'Web Development':
                    pageUrl = 'web-development.html';
                    break;
                case 'Embedded & IoT':
                    pageUrl = 'embedded-iot.html';
                    break;
                default:
                    return;
            }
            
            window.location.href = pageUrl;
        });
    });
}

// Mobile Safari viewport adjustment
function adjustViewportForIOS() {
    const hero = document.querySelector('.service-hero');
    if (!hero) return;
    
    // First try with vh units
    hero.style.height = '100vh';
    
    // If still cropped (iOS), use window.innerHeight
    if (hero.offsetHeight > window.innerHeight) {
        hero.style.height = window.innerHeight + 'px';
    }
    
    // Add transform to force layer creation
    hero.style.transform = 'translateZ(0)';
}

// Run initially and on orientation changes
document.addEventListener('DOMContentLoaded', function() {
    adjustViewportForIOS();
    window.addEventListener('resize', adjustViewportForIOS);
    window.addEventListener('orientationchange', adjustViewportForIOS);
    
    // Delay slightly to ensure DOM is ready
    setTimeout(adjustViewportForIOS, 100);
});

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    adjustViewportForIOS();
    createStars();
    loadServices();
    setupMobileMenu();
    setupServiceCardLinks(); // Add this line
    window.addEventListener('scroll', handleScroll, { passive: true });
});