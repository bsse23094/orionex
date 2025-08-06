document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield
    createStars();
    
    function adjustViewportForIOS() {
    const hero = document.querySelector('.service-hero');
    if (!hero) return;
    
    // First try with vh units
    hero.style.height = '100vh';
    
    // If iOS, use more reliable units
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        hero.style.height = '100%';
        hero.style.minHeight = '100%';
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
    }
    
    // Add transform to force layer creation
    hero.style.transform = 'translateZ(0)';
}

// Run on load and orientation change
window.addEventListener('load', adjustViewportForIOS);
window.addEventListener('resize', adjustViewportForIOS);
window.addEventListener('orientationchange', adjustViewportForIOS);


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