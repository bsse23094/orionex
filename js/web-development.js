document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
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