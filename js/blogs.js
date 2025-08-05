document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Category filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter posts
            blogPosts.forEach(post => {
                if (category === 'all') {
                    post.style.display = 'block';
                } else {
                    const postCategories = post.getAttribute('data-categories').split(',');
                    if (postCategories.includes(category)) {
                        post.style.display = 'block';
                        // Scroll to the first visible post
                        if (window.innerWidth < 768) {
                            post.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    } else {
                        post.style.display = 'none';
                    }
                }
            });
        });
    });

    // Post navigation
    const postLinks = document.querySelectorAll('.post-link');
    postLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.getAttribute('href').substring(1);
            const targetPost = document.getElementById(postId);
            
            if (targetPost) {
                // Remove active class from all post links
                postLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to post
                targetPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Highlight animation
                targetPost.style.animation = 'none';
                void targetPost.offsetWidth; // Trigger reflow
                targetPost.style.animation = 'highlightPost 1.5s ease-out';
                
                // Expand the post automatically on mobile
                if (window.innerWidth < 768) {
                    const fullContent = targetPost.querySelector('.post-full-content');
                    const button = targetPost.querySelector('.read-more');
                    if (!targetPost.classList.contains('expanded')) {
                        targetPost.classList.add('expanded');
                        button.textContent = 'Show Less';
                        fullContent.style.maxHeight = fullContent.scrollHeight + 'px';
                    }
                }
            }
        });
    });

    // Read more/less functionality - improved version
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const post = this.closest('.blog-post');
            const fullContent = post.querySelector('.post-full-content');
            
            if (post.classList.contains('expanded')) {
                post.classList.remove('expanded');
                this.textContent = 'Read Full Article';
                fullContent.style.maxHeight = '0';
            } else {
                post.classList.add('expanded');
                this.textContent = 'Show Less';
                fullContent.style.maxHeight = fullContent.scrollHeight + 'px';
                
                // Scroll to the expanded content on mobile
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        });
    });

    // Initialize all posts to collapsed state
    blogPosts.forEach(post => {
        const fullContent = post.querySelector('.post-full-content');
        fullContent.style.maxHeight = '0';
    });

    // Add highlight animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlightPost {
            0% { background-color: rgba(0, 209, 255, 0); }
            20% { background-color: rgba(0, 209, 255, 0.1); }
            100% { background-color: rgba(0, 209, 255, 0); }
        }
    `;
    document.head.appendChild(style);

    // Navbar scroll behavior
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else if (currentScroll < lastScroll) {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'blog.html') {
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'blog.html') {
                link.classList.add('active');
            }
        });
    }
});