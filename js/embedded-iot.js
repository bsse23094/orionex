document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield
    createStars();
    
    // Setup mobile menu
    initVanillaTilt();

    setActiveNavItem();
    // Hero section IoT animation
    const iotDevice = document.querySelector('.iot-device');
    const sensorNodes = document.querySelectorAll('.sensor-node');
    const dataConnection = document.querySelector('.data-connection');
    const networkCloud = document.querySelector('.network-cloud');
    
    // Animate sensor nodes
    sensorNodes.forEach(node => {
        setInterval(() => {
            const intensity = Math.random() * 0.5 + 0.3;
            node.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px rgba(0, 209, 255, ${intensity})`;
        }, 1500);
    });
    
    // Animate data connection
    setTimeout(() => {
        dataConnection.style.height = '150px';
        dataConnection.style.transform = 'translate(-50%, -50%) rotate(45deg)';
        dataConnection.style.opacity = '0.7';
        dataConnection.style.transition = 'all 2s ease-in-out';
    }, 500);
    
    // Animate network cloud
    setInterval(() => {
        networkCloud.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
    }, 2000);
    
    // Initialize VanillaTilt
    const initTilt = () => {
        try {
            // Feature cards
            VanillaTilt.init(document.querySelectorAll(".feature-card"), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                perspective: 1000,
                scale: 1.05
            });
            
            // Tech cards
            VanillaTilt.init(document.querySelectorAll(".tech-card"), {
                max: 10,
                speed: 300,
                glare: true,
                "max-glare": 0.1,
                perspective: 1000,
                scale: 1.03
            });
        } catch (e) {
            console.log("VanillaTilt error: ", e);
        }
    };
    
    // Initialize with delay
    setTimeout(initTilt, 300);
    
    // CTA section network animation
    const centralHub = document.querySelector('.central-hub');
    const devices = document.querySelectorAll('.connected-device');
    const connectionLines = document.querySelectorAll('.connection-line');
    
    // Animate central hub
    if (centralHub) {
        setInterval(() => {
            centralHub.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px rgba(0, 209, 255, ${Math.random() * 0.5 + 0.3})`;
        }, 1000);
    }
    
    // Animate connected devices
    devices.forEach(device => {
        setInterval(() => {
            device.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px rgba(138, 43, 226, ${Math.random() * 0.5 + 0.3})`;
        }, 1500);
    });
    
    // Animate connection lines
    setTimeout(() => {
        connectionLines.forEach(line => {
            const length = Math.sqrt(
                Math.pow(line.getBoundingClientRect().right - line.getBoundingClientRect().left, 2) +
                Math.pow(line.getBoundingClientRect().bottom - line.getBoundingClientRect().top, 2)
            );
            line.style.width = `${length}px`;
            line.style.transition = 'width 1.5s ease-in-out';
        });
    }, 500);
    
    // Hide header on scroll down
    let lastScroll = 0;
    const header = document.querySelector('nav');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('nav-hidden');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('nav-hidden')) {
                // Scroll down
                header.classList.add('nav-hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('nav-hidden')) {
                // Scroll up
                header.classList.remove('nav-hidden');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Preload images for better performance
    const preloadImages = () => {
        const images = [
            'images/iot-device.png',
            'images/iot-network.png',
            'images/logo_1.png'
        ];
        
        images.forEach(imgSrc => {
            const img = new Image();
            img.src = imgSrc;
        });
    };
    
    preloadImages();
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle && mobileMenu && closeMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Starfield initialization
function createStars() {
    const stars = document.getElementById('stars');
    const twinkling = document.getElementById('twinkling');
    
    if (stars && twinkling) {
        // Create stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 2 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDelay = `${Math.random() * 5}s`;
            stars.appendChild(star);
        }
        
        // Create twinkling stars
        for (let i = 0; i < 50; i++) {
            const twinkle = document.createElement('div');
            twinkle.className = 'twinkle';
            twinkle.style.top = `${Math.random() * 100}%`;
            twinkle.style.left = `${Math.random() * 100}%`;
            twinkle.style.width = `${Math.random() * 3 + 1}px`;
            twinkle.style.height = twinkle.style.width;
            twinkle.style.animationDelay = `${Math.random() * 5}s`;
            twinkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            twinkling.appendChild(twinkle);
        }
    }
}


function initVanillaTilt() {
    document.querySelectorAll('.capability-card').forEach(card => {
        VanillaTilt.init(card, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.2,
        });
    });
}

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}