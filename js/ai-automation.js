document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield
    createStars();
    
    setupMobileMenu();
    window.addEventListener('scroll', handleScroll, { passive: true });
    animateAIElements();
    initAILogoInteraction(); // Initialize our new logo interaction
    initVanillaTilt();
    setActiveNavItem();
});

function initAILogoInteraction() {
    const aiCore = document.querySelector('.ai-core');
    if (!aiCore) return;

    // Just handle the hover effect for the main logo
    aiCore.addEventListener('mouseenter', () => {
        const mainLogo = document.querySelector('.core-logo.main');
        if (mainLogo) {
            mainLogo.style.transform = 'translate(-50%, -50%) scale(1.1)';
        }
    });

    aiCore.addEventListener('mouseleave', () => {
        const mainLogo = document.querySelector('.core-logo.main');
        if (mainLogo) {
            mainLogo.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
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

// Rest of your existing functions (animateAIElements, initAILogo, etc.)