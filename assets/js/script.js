// ===========================
// Mobile Navigation Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ===========================
// Smooth Scrolling for Anchor Links
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===========================
// Navbar Background on Scroll
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// ===========================
// Animated Counter for Metrics
// ===========================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ===========================
// Intersection Observer for Animations
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For elements with animate-on-scroll class, add animate class
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animate');
                } else {
                    // For other elements, use direct style animation
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Animate metric values (only if not already animated)
                const metricValue = entry.target.querySelector('.metric-value');
                if (metricValue && !metricValue.dataset.animated) {
                    const target = parseInt(metricValue.textContent);
                    if (!isNaN(target)) {
                        metricValue.dataset.animated = 'true';
                        metricValue.textContent = '0';
                        setTimeout(() => animateCounter(metricValue, target), 300);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .metric-card, .feature-card, .solution-card, .member-card, .link-card');
    animatedElements.forEach(el => {
        // Only set styles for elements that don't have animate-on-scroll class
        if (!el.classList.contains('animate-on-scroll')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
});

// ===========================
// Form Validation (if forms exist)
// ===========================
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// ===========================
// Utility Functions
// ===========================

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Debounce function for search/input handlers
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===========================
// Dashboard Interactions
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Park selector change handler
    const parkSelect = document.getElementById('parkSelect');
    const timeRange = document.getElementById('timeRange');
    
    if (parkSelect) {
        parkSelect.addEventListener('change', function() {
            const selectedPark = this.value;
            updateDashboardData(selectedPark, timeRange ? timeRange.value : '24h');
        });
    }
    
    if (timeRange) {
        timeRange.addEventListener('change', function() {
            const selectedRange = this.value;
            updateDashboardData(parkSelect ? parkSelect.value : 'kelvingrove', selectedRange);
        });
    }
});

// Simulate dashboard data updates
function updateDashboardData(park, timeRange) {
    // This would normally fetch real data from an API
    console.log(`Updating dashboard for ${park} with time range ${timeRange}`);
    
    // Update metric cards with simulated data
    const metricCards = document.querySelectorAll('.metric-value');
    metricCards.forEach(card => {
        const currentValue = parseInt(card.textContent);
        const newValue = Math.floor(currentValue * (0.8 + Math.random() * 0.4));
        
        // Animate to new value
        card.style.opacity = '0.5';
        setTimeout(() => {
            animateCounter(card, newValue, 1000);
            card.style.opacity = '1';
        }, 200);
    });
    
    showNotification(`Dashboard updated for ${park}`);
}

// ===========================
// Video Placeholder Interactions
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            showNotification('Video placeholder clicked - replace with actual video embed', 'info');
        });
        
        placeholder.style.cursor = 'pointer';
    });
});

// ===========================
// Export/Print Functionality
// ===========================
function printPage() {
    window.print();
}

function exportToPDF() {
    showNotification('PDF export would be implemented here', 'info');
}

// ===========================
// Accessibility Improvements
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.feature-card, .link-card, .solution-card');
    
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Add aria-labels for icon-only buttons
    const iconButtons = document.querySelectorAll('button:not([aria-label]) i');
    iconButtons.forEach(icon => {
        const button = icon.closest('button');
        if (button && !button.hasAttribute('aria-label')) {
            button.setAttribute('aria-label', 'Button');
        }
    });
});

// ===========================
// Performance Optimization
// ===========================

// Lazy load images when they're implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when images are added
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===========================
// Error Handling
// ===========================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===========================
// Analytics Placeholders
// ===========================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Analytics event:', { category, action, label });
}

// Track navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Navigation', 'Click', this.textContent.trim());
        });
    });
});

// ===========================
// Console Welcome Message
// ===========================
console.log(`
🦇 EcoNoc Glasgow Website
Built with HTML, CSS, and JavaScript
Singapore Institute of Technology - OIP Project 2025

For questions about this implementation, check the About Team page.
`);

// ===========================
// Development Helpers
// ===========================
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('🛠️ Development mode detected');
    
    // Add development helper styles
    const devStyles = document.createElement('style');
    devStyles.textContent = `
        .dev-info {
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            z-index: 10000;
        }
    `;
    document.head.appendChild(devStyles);
    
    // Show viewport info
    const devInfo = document.createElement('div');
    devInfo.className = 'dev-info';
    devInfo.textContent = `${window.innerWidth}x${window.innerHeight}`;
    document.body.appendChild(devInfo);
    
    window.addEventListener('resize', () => {
        devInfo.textContent = `${window.innerWidth}x${window.innerHeight}`;
    });
}
