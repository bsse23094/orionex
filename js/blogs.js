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

// Swipe gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    if (window.innerWidth >= 768) return;
    
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 50; // minimum swipe distance
    
    if (touchStartX - touchEndX > threshold) {
        // Swipe left - next post
        const currentPost = document.querySelector('.blog-post.highlighted') || 
                          document.querySelector('.blog-post:first-child');
        const nextPost = currentPost.nextElementSibling;
        if (nextPost && nextPost.classList.contains('blog-post')) {
            nextPost.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            nextPost.classList.add('highlighted');
            currentPost.classList.remove('highlighted');
        }
    } else if (touchEndX - touchStartX > threshold) {
        // Swipe right - previous post
        const currentPost = document.querySelector('.blog-post.highlighted') || 
                          document.querySelector('.blog-post:first-child');
        const prevPost = currentPost.previousElementSibling;
        if (prevPost && prevPost.classList.contains('blog-post')) {
            prevPost.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            prevPost.classList.add('highlighted');
            currentPost.classList.remove('highlighted');
        }
    }
}

// Add event listeners for touch devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.classList.add('back-to-top');
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Enhanced Search Functionality
const searchInput = document.getElementById('blogSearch');
const searchButton = document.getElementById('searchButton');
const blogPosts = document.querySelectorAll('.blog-post');

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    let resultsCount = 0;
    
    // Remove previous highlights
    document.querySelectorAll('mark').forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
    });
    
    if (query === '') {
        // Show all posts if search is empty
        blogPosts.forEach(post => {
            post.style.display = 'block';
            post.style.animation = 'none';
        });
        document.querySelector('.search-results-message')?.remove();
        return;
    }
    
    blogPosts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const fullContent = post.querySelector('.post-full-content').textContent.toLowerCase();
        
        if (title.includes(query) || excerpt.includes(query) || fullContent.includes(query)) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.5s ease-out';
            highlightText(post, query);
            resultsCount++;
            
            // Auto-expand posts with search results on mobile
            if (window.innerWidth < 768 && !post.classList.contains('expanded')) {
                post.classList.add('expanded');
                const fullContent = post.querySelector('.post-full-content');
                fullContent.style.maxHeight = fullContent.scrollHeight + 'px';
            }
        } else {
            post.style.display = 'none';
        }
    });
    
    // Show results count
    let resultsMessage = document.querySelector('.search-results-message');
    if (!resultsMessage) {
        resultsMessage = document.createElement('div');
        resultsMessage.className = 'search-results-message';
        searchInput.parentNode.appendChild(resultsMessage);
    }
    
    if (resultsCount > 0) {
        resultsMessage.textContent = `Found ${resultsCount} ${resultsCount === 1 ? 'result' : 'results'}`;
        resultsMessage.style.color = 'var(--electric-blue)';
    } else {
        resultsMessage.textContent = 'No results found';
        resultsMessage.style.color = 'var(--metallic)';
    }
    
    resultsMessage.style.display = 'block';
}

function highlightText(element, query) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    
    nodes.forEach(node => {
        if (node.parentNode.nodeName === 'MARK') return;
        
        const text = node.nodeValue;
        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const newText = text.replace(regex, match => `<mark>${match}</mark>`);
        
        if (newText !== text) {
            const span = document.createElement('span');
            span.innerHTML = newText;
            node.parentNode.replaceChild(span, node);
        }
    });
}

// Event listeners for search
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('input', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Add focus effect
searchInput.addEventListener('focus', () => {
    searchInput.parentElement.style.boxShadow = '0 0 15px rgba(0, 209, 255, 0.3)';
});

searchInput.addEventListener('blur', () => {
    searchInput.parentElement.style.boxShadow = 'none';
});