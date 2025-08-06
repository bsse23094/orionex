document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality

    function setCustomVhUnit() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh * 100}px`);
}

window.addEventListener('resize', setCustomVhUnit);
window.addEventListener('load', setCustomVhUnit);


     document.addEventListener('DOMContentLoaded', function() {
    // Enhanced iOS viewport adjustment
    function adjustViewportForIOS() {
    const hero = document.querySelector('.service-hero');
    const navbar = document.querySelector('nav');
    if (!hero || !navbar) return;

    const navbarHeight = navbar.offsetHeight;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Update custom CSS variable for vh units
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh * 100}px`);

    if (isIOS) {
        const safeTop = window.visualViewport?.offsetTop || 0;
        hero.style.paddingTop = `calc(${navbarHeight}px + ${safeTop}px + env(safe-area-inset-top))`;
        hero.style.minHeight = `calc(100vh - ${navbarHeight}px - ${safeTop}px)`;
    } else {
        hero.style.paddingTop = `${navbarHeight}px`;
        hero.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }
}
    // Run on load and orientation change
    window.addEventListener('load', adjustViewportForIOS);
    window.addEventListener('resize', adjustViewportForIOS);
    window.addEventListener('orientationchange', adjustViewportForIOS);
    
    // Detect touch devices and disable hover effects
    function detectTouchDevice() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.add('no-touch-device');
        }
    }
    
    detectTouchDevice();

    // Rest of your existing JavaScript...
    let lastScroll = 0;
    const navbar = document.querySelector('nav');
    const scrollThreshold = 5;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('nav-hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > navbar.offsetHeight) {
            if (currentScroll - lastScroll > scrollThreshold) {
                navbar.classList.add('nav-hidden');
            }
        } else if (currentScroll < lastScroll) {
            if (lastScroll - currentScroll > scrollThreshold) {
                navbar.classList.remove('nav-hidden');
            }
        }
        
        lastScroll = currentScroll;
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Rest of your existing tab, case study, and tech item code...
});

    // Set active nav item
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavItem();


    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Case study card animations
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s ease';
            this.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });
    
    // Animate tech items on scroll
    const techItems = document.querySelectorAll('.tech-item');
    
    function animateTechItems() {
        techItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    // Set initial state
    techItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', animateTechItems);
    window.addEventListener('scroll', animateTechItems);
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize VanillaTilt for feature cards
    VanillaTilt.init(document.querySelectorAll(".feature-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
    
    // Initialize VanillaTilt for tech items
    VanillaTilt.init(document.querySelectorAll(".tech-item"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
    
    // Make sure you have the VanillaTilt script included in your head
});