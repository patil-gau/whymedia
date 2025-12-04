tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#FF3333',
                dark: '#0A0A0A',
            }
        }
    }
}
// Loading Screen - Reduced time for faster initial load
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    // Reduced from 800ms to 300ms for faster perceived load time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 300);
});

// Also hide loading screen if DOM is already loaded (faster)
if (document.readyState === 'complete') {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 300);
    }
}

// Custom Cursor with Trail Effect
const cursor = document.getElementById('cursor');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
let trailElements = [];
const maxTrails = 25;
let lastTrailTime = 0;
const trailInterval = 20; // Create trail every 20ms for smoother effect
let isAnimating = false;

// Initialize cursor position
cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

// Smooth cursor movement with better easing
function animateCursor() {
    if (!isAnimating) {
        isAnimating = true;
    }
    
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Use dynamic easing based on distance for smoother movement
    const speed = Math.min(0.2, Math.max(0.08, distance * 0.001));
    
    cursorX += dx * speed;
    cursorY += dy * speed;
    
    // Use transform for better performance
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    
    // Create trail at cursor position (not mouse position) for smooth following
    const now = performance.now();
    if (now - lastTrailTime >= trailInterval) {
        createTrail(cursorX, cursorY);
        lastTrailTime = now;
    }
    
    requestAnimationFrame(animateCursor);
}

// Function to create trail element
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    // Store trail element
    trailElements.push(trail);
    
    // Limit number of trails
    if (trailElements.length > maxTrails) {
        const oldTrail = trailElements.shift();
        if (oldTrail && oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
        }
    }
    
    // Remove trail after animation
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
        const index = trailElements.indexOf(trail);
        if (index > -1) {
            trailElements.splice(index, 1);
        }
    }, 1000);
}

// Start animation loop
animateCursor();

// Mouse move handler - only update target position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Hide cursor on mouse leave
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('translate-x-full');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });
});

// Red Underline Animation Trigger
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const underlineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.red-underline, .highlight-bluff').forEach(el => {
    underlineObserver.observe(el);
});

// Scroll Animation Observer
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    scrollObserver.observe(el);
});

// Studio Items Scroll Animation
document.querySelectorAll('.studio-item').forEach(el => {
    scrollObserver.observe(el);
});

// Freeze Counter Animation
const freezeCounter = document.getElementById('freeze-counter');
if (freezeCounter) {
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        freezeCounter.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

// Counter Animation
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Progress Line Animation
const progressLine = document.getElementById('progressLine');
const processSection = document.getElementById('process');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                progressLine.style.width = '100%';
            }, 200);
        }
    });
}, observerOptions);

if (processSection) {
    progressObserver.observe(processSection);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // If href is just "#", prevent default and don't scroll
        if (href === '#') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Work Section Interactive Functionality
const workCategories = document.querySelectorAll('.work-category');
const workVideoItems = document.querySelectorAll('.work-video-item');
const workVideoScrollArea = document.getElementById('workVideoScrollArea');
const workVideoDotsContainer = document.querySelector('.work-video-dots');

let currentCategory = 'podcasts';
let currentVideoIndex = 0;
let categoryVideos = [];
let scrollTimeout = null;
let isScrolling = false;

// Initialize work section
function initWorkSection() {
    // Update video items for current category
    updateCategoryVideos();
    
    // Generate navigation dots
    updateNavigationDots();
    
    // Show first video
    showVideo(0);
    
    // Add category click handlers
    workCategories.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.dataset.category;
            if (selectedCategory !== currentCategory) {
                switchCategory(selectedCategory);
            }
        });
    });
    
    // Add scroll handler for video navigation - DISABLED to prevent scroll hijacking
    // Users can use the navigation dots or arrow keys when focused on video
    if (workVideoScrollArea) {
        // Removed wheel event listener that was hijacking page scroll
        // workVideoScrollArea.addEventListener('wheel', handleVideoScroll, { passive: false });
        
        // Touch support for mobile
        let touchStartY = 0;
        let isTouchOnVideo = false;
        
        workVideoScrollArea.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            isTouchOnVideo = true;
        }, { passive: true });
        
        workVideoScrollArea.addEventListener('touchmove', (e) => {
            if (!isTouchOnVideo) return;
            
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            
            if (Math.abs(deltaY) > 50) { // Threshold for swipe
                if (deltaY > 0) {
                    nextVideo();
                } else {
                    previousVideo();
                }
                touchStartY = touchEndY;
            }
        }, { passive: true });
        
        workVideoScrollArea.addEventListener('touchend', () => {
            isTouchOnVideo = false;
        }, { passive: true });
    }
}

function updateCategoryVideos() {
    categoryVideos = Array.from(workVideoItems).filter(item => 
        item.dataset.category === currentCategory
    );
}

function updateNavigationDots() {
    if (!workVideoDotsContainer) return;
    
    workVideoDotsContainer.innerHTML = '';
    
    categoryVideos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `work-video-dot ${index === currentVideoIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => showVideo(index));
        workVideoDotsContainer.appendChild(dot);
    });
}

function switchCategory(newCategory) {
    currentCategory = newCategory;
    currentVideoIndex = 0;
    
    // Update active category
    workCategories.forEach(cat => {
        if (cat.dataset.category === newCategory) {
            cat.classList.add('active');
        } else {
            cat.classList.remove('active');
        }
    });
    
    // Update videos
    updateCategoryVideos();
    updateNavigationDots();
    showVideo(0);
}

function showVideo(index) {
    if (index < 0 || index >= categoryVideos.length) return;
    
    currentVideoIndex = index;
    
    // Hide all videos
    workVideoItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected video
    if (categoryVideos[index]) {
        categoryVideos[index].classList.add('active');
    }
    
    // Update dots
    const dots = workVideoDotsContainer.querySelectorAll('.work-video-dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextVideo() {
    if (isScrolling) return;
    isScrolling = true;
    
    const nextIndex = (currentVideoIndex + 1) % categoryVideos.length;
    showVideo(nextIndex);
    
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

function previousVideo() {
    if (isScrolling) return;
    isScrolling = true;
    
    const prevIndex = (currentVideoIndex - 1 + categoryVideos.length) % categoryVideos.length;
    showVideo(prevIndex);
    
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

function handleVideoScroll(e) {
    // Only prevent default if we're actually going to handle the scroll
    // Check if the scroll area is in view and mouse is over it
    if (!workVideoScrollArea || isScrolling) {
        return; // Let normal scroll happen
    }
    
    const rect = workVideoScrollArea.getBoundingClientRect();
    const mouseY = e.clientY || (e.touches && e.touches[0]?.clientY);
    
    // Check if mouse is actually over the video area (more precise check)
    const isMouseOverArea = mouseY >= rect.top && mouseY <= rect.bottom;
    
    // Only handle if mouse is directly over the video container
    if (!isMouseOverArea) {
        return; // Let normal page scroll happen
    }
    
    // Check if we're near the edges - allow normal scroll to continue to next section
    const distanceFromTop = mouseY - rect.top;
    const distanceFromBottom = rect.bottom - mouseY;
    const edgeThreshold = 100; // pixels
    
    // If we're at first video and scrolling up, or last video and scrolling down, allow page scroll
    if ((currentVideoIndex === 0 && e.deltaY < 0 && distanceFromTop < edgeThreshold) ||
        (currentVideoIndex === categoryVideos.length - 1 && e.deltaY > 0 && distanceFromBottom < edgeThreshold)) {
        return; // Let normal page scroll happen
    }
    
    // Only prevent default if we're going to handle it
    e.preventDefault();
    e.stopPropagation();
    
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        const delta = Math.sign(e.deltaY);
        
        if (delta > 0) {
            nextVideo();
        } else if (delta < 0) {
            previousVideo();
        }
    }, 50);
}

// Keyboard navigation - DISABLED to prevent scroll hijacking
// The arrow keys were interfering with normal page scrolling
// Users can navigate videos using the navigation dots or category buttons
/*
document.addEventListener('keydown', (e) => {
    if (!workVideoScrollArea) return;
    
    const workSection = document.getElementById('work');
    if (!workSection) return;
    
    const rect = workSection.getBoundingClientRect();
    const workVideoRect = workVideoScrollArea.getBoundingClientRect();
    
    // Only handle keyboard if work section is visible AND user is focused on it
    // Check if the video area is actually in the viewport center
    const isInViewportCenter = workVideoRect.top < window.innerHeight / 2 && 
                               workVideoRect.bottom > window.innerHeight / 2;
    
    // Only intercept arrow keys if we're truly focused on the video section
    if (isInViewportCenter && (e.key === 'ArrowDown' || e.key === 'ArrowRight' || 
        e.key === 'ArrowUp' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextVideo();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            previousVideo();
        }
    }
});
*/

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkSection);
    document.addEventListener('DOMContentLoaded', initSignpostServices);
    document.addEventListener('DOMContentLoaded', initEcosystemDiagram);
} else {
    initWorkSection();
    initSignpostServices();
    initEcosystemDiagram();
}

// Signpost Services Section Interactive Functionality
function initSignpostServices() {
    const servicePlates = document.querySelectorAll('.service-plate');
    const serviceContents = document.querySelectorAll('.service-content');
    
    if (servicePlates.length === 0 || serviceContents.length === 0) return;
    
    servicePlates.forEach(plate => {
        plate.addEventListener('click', function() {
            const service = this.dataset.service;
            
            // Add rotation animation
            this.classList.add('rotating');
            setTimeout(() => {
                this.classList.remove('rotating');
            }, 500);
            
            // Remove active class from all plates
            servicePlates.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked plate
            this.classList.add('active');
            
            // Update content on left side
            serviceContents.forEach(content => {
                if (content.dataset.service === service) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
        
        // Add hover effect sound/feedback (optional)
        plate.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.02) translateX(5px)';
            }
        });
        
        plate.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

// Ecosystem Diagram Animation
function initEcosystemDiagram() {
    const ecosystemDiagram = document.getElementById('ecosystemDiagram');
    
    if (!ecosystemDiagram) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ecosystemDiagram.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(ecosystemDiagram);
    
    // Enhanced hover effects for connecting lines
    const nodes = document.querySelectorAll('.eco-node');
    const lines = document.querySelectorAll('.connection-line');
    
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            lines[index]?.classList.add('active-line');
        });
        
        node.addEventListener('mouseleave', function() {
            lines[index]?.classList.remove('active-line');
        });
    });
}

// Studio Masonry Animation
function initStudioMasonry() {
    const masonryItems = document.querySelectorAll('.studio-masonry-item');
    
    if (masonryItems.length === 0) return;
    
    const masonryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                masonryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    masonryItems.forEach(item => {
        masonryObserver.observe(item);
    });
}

// Initialize studio masonry on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudioMasonry);
} else {
    initStudioMasonry();
}

// Scroll Word-by-Word Animation for Results Section
function initScrollWordAnimation() {
    const resultsSection = document.getElementById('results-section');
    const scrollWords = resultsSection?.querySelectorAll('.scroll-word');
    
    console.log('Initializing scroll word animation...');
    console.log('Results section:', resultsSection);
    console.log('Scroll words found:', scrollWords?.length);
    
    if (!resultsSection || !scrollWords || scrollWords.length === 0) {
        console.log('Missing elements for scroll word animation');
        return;
    }
    
    const totalWords = scrollWords.length;
    
    console.log('Total words to animate:', totalWords);
    
    // Calculate scroll progress through the section
    function updateScrollWords() {
        const rect = resultsSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Start animating when section is in middle of viewport
        // Progress from 0 to 1 as section moves through viewport
        let progress = 0;
        
        if (rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3) {
            // Calculate progress based on how far into the viewport the section is
            const sectionMidpoint = rect.top + rect.height / 2;
            const viewportMidpoint = viewportHeight / 2;
            const distanceFromCenter = viewportMidpoint - sectionMidpoint;
            const maxDistance = viewportHeight * 0.4;
            
            progress = Math.max(0, Math.min(1, (maxDistance + distanceFromCenter) / (maxDistance * 2)));
        } else if (rect.top < viewportHeight * 0.3) {
            progress = 1;
        }
        
        // Calculate how many words should be active based on scroll progress
        const activeWordCount = Math.floor(progress * (totalWords + 1));
        
        // Activate words one by one
        scrollWords.forEach((word, index) => {
            if (index < activeWordCount) {
                word.classList.add('active');
            } else {
                word.classList.remove('active');
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollWords();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    updateScrollWords();
    
    console.log('Scroll word animation initialized successfully');
}

// Initialize scroll word animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollWordAnimation);
} else {
    initScrollWordAnimation();
}

