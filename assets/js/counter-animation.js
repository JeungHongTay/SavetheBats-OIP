/**
 * Counter Animation for Design Journey Metrics
 * Animates numbers counting up when they come into view
 */

class CounterAnimation {
    constructor() {
        this.counters = [];
        this.observer = null;
        this.init();
    }

    init() {
        // Find all metric numbers
        const metricNumbers = document.querySelectorAll('.metric-number');
        
        metricNumbers.forEach((element, index) => {
            // Store original text and create counter object
            const originalText = element.textContent;
            const targetValue = this.parseNumber(originalText);
            
            this.counters.push({
                element: element,
                targetValue: targetValue,
                originalText: originalText,
                hasAnimated: false
            });
            
            // Set initial value to 0
            element.textContent = '0';
        });

        // Set up Intersection Observer
        this.setupObserver();
    }

    parseNumber(text) {
        // Handle numbers like "15+" by extracting the numeric part
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    setupObserver() {
        const options = {
            threshold: 0.5, // Trigger when 50% of element is visible
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const metricsSection = entry.target;
                    const metricsBanner = metricsSection.querySelector('.metrics-banner');
                    
                    // Add entrance animation to banner
                    if (metricsBanner) {
                        metricsBanner.style.opacity = '0';
                        metricsBanner.style.transform = 'translateY(30px)';
                        
                        // Animate banner entrance
                        setTimeout(() => {
                            metricsBanner.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                            metricsBanner.style.opacity = '1';
                            metricsBanner.style.transform = 'translateY(0)';
                        }, 100);
                    }
                    
                    // Start counter animation after banner entrance
                    setTimeout(() => {
                        this.startAnimation();
                    }, 300);
                    
                    this.observer.unobserve(metricsSection);
                }
            });
        }, options);

        // Observe both the design journey metrics section and hero metrics
        const metricsSection = document.querySelector('.project-metrics-section');
        const heroMetrics = document.querySelector('.hero-metrics');
        
        if (metricsSection) {
            this.observer.observe(metricsSection);
        }
        
        if (heroMetrics) {
            // For hero section, use different options (trigger earlier)
            const heroOptions = {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            };
            
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const heroMetricsSection = entry.target;
                        const metricsBanner = heroMetricsSection.querySelector('.metrics-banner');
                        
                        // Add entrance animation to banner
                        if (metricsBanner) {
                            metricsBanner.style.opacity = '0';
                            metricsBanner.style.transform = 'translateY(30px)';
                            
                            // Animate banner entrance
                            setTimeout(() => {
                                metricsBanner.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                                metricsBanner.style.opacity = '1';
                                metricsBanner.style.transform = 'translateY(0)';
                            }, 100);
                        }
                        
                        // Start counter animation after banner entrance
                        setTimeout(() => {
                            this.startAnimation();
                        }, 300);
                        
                        heroObserver.unobserve(heroMetricsSection);
                    }
                });
            }, heroOptions);
            
            heroObserver.observe(heroMetrics);
        }
    }

    startAnimation() {
        this.counters.forEach((counter, index) => {
            if (!counter.hasAnimated) {
                // Add staggered delay for each counter
                setTimeout(() => {
                    this.animateCounter(counter);
                }, index * 200); // 200ms delay between each counter
            }
        });
    }

    animateCounter(counter) {
        const { element, targetValue, originalText } = counter;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;

        // Add animation class for additional effects
        element.classList.add('counting');

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Use easeOutQuart easing for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
            
            // Update the display text
            if (originalText.includes('+')) {
                element.textContent = currentValue + '+';
            } else {
                element.textContent = currentValue.toString();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                element.textContent = originalText;
                element.classList.remove('counting');
                element.classList.add('animation-complete');
                counter.hasAnimated = true;
            }
        };

        requestAnimationFrame(animate);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CounterAnimation();
});

// Also initialize if script loads after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CounterAnimation();
    });
} else {
    new CounterAnimation();
}
