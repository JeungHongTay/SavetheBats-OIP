// ===========================
// Smooth Slideshow JavaScript
// Track-based sliding system for buttery smooth transitions
// ===========================

class SmoothSlideshow {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 8;
        this.isTransitioning = false;
        this.isFullscreen = false;
        
        this.slidesTrack = document.getElementById('slidesTrack');
        this.slideWidth = 100 / this.totalSlides; // 12.5% for each slide
        
        this.init();
    }
    
    init() {
        if (!this.slidesTrack) {
            console.log('❌ Slides track not found');
            return;
        }
        
        this.bindEvents();
        this.updateSlideCounter();
        this.preloadImages();
        this.setInitialPosition();
        
        console.log('✅ Smooth slideshow initialized');
    }
    
    setInitialPosition() {
        // Start at slide 1 (no transform needed)
        this.slidesTrack.style.transform = 'translateX(0%)';
    }
    
    bindEvents() {
        // Navigation arrows
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Slide indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const slideNum = parseInt(e.target.getAttribute('data-slide'));
                this.goToSlide(slideNum);
            });
        });
        
        // Control buttons
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Fullscreen change events
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this.handleFullscreenChange());
        
        // Prevent transition during window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        const nextSlideNum = this.currentSlide >= this.totalSlides ? 1 : this.currentSlide + 1;
        this.goToSlide(nextSlideNum);
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        
        const prevSlideNum = this.currentSlide <= 1 ? this.totalSlides : this.currentSlide - 1;
        this.goToSlide(prevSlideNum);
    }
    
    goToSlide(slideNum) {
        if (this.isTransitioning || slideNum === this.currentSlide || slideNum < 1 || slideNum > this.totalSlides) {
            return;
        }
        
        console.log(`🎯 Going to slide ${slideNum} from slide ${this.currentSlide}`);
        
        this.isTransitioning = true;
        
        // Calculate the transform value
        // Slide 1 = 0%, Slide 2 = -12.5%, Slide 3 = -25%, etc.
        const translateX = -(slideNum - 1) * this.slideWidth;
        
        // Apply the smooth transform
        this.slidesTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.updateIndicators(slideNum);
        
        // Update current slide
        this.currentSlide = slideNum;
        this.updateSlideCounter();
        
        // Reset transitioning flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
            console.log(`✅ Transition to slide ${slideNum} completed`);
        }, 800); // Match CSS transition duration
    }
    
    updateIndicators(activeSlide) {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index + 1 === activeSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    updateSlideCounter() {
        const currentSlideEl = document.getElementById('current-slide');
        const totalSlidesEl = document.getElementById('total-slides');
        
        if (currentSlideEl) currentSlideEl.textContent = this.currentSlide;
        if (totalSlidesEl) totalSlidesEl.textContent = this.totalSlides;
    }
    
    
    toggleFullscreen() {
        const container = document.querySelector('.slideshow-container');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const icon = fullscreenBtn?.querySelector('i');
        const text = fullscreenBtn?.querySelector('span');
        
        if (!this.isFullscreen) {
            // Enter fullscreen
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
            
            container.classList.add('fullscreen');
            if (icon) icon.className = 'fas fa-compress';
            if (text) text.textContent = 'Exit Fullscreen';
            this.isFullscreen = true;
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            
            container.classList.remove('fullscreen');
            if (icon) icon.className = 'fas fa-expand';
            if (text) text.textContent = 'Fullscreen';
            this.isFullscreen = false;
        }
    }
    
    handleFullscreenChange() {
        const container = document.querySelector('.slideshow-container');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const icon = fullscreenBtn?.querySelector('i');
        const text = fullscreenBtn?.querySelector('span');
        
        if (!document.fullscreenElement && !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && !document.msFullscreenElement) {
            // Exited fullscreen
            container.classList.remove('fullscreen');
            if (icon) icon.className = 'fas fa-expand';
            if (text) text.textContent = 'Fullscreen';
            this.isFullscreen = false;
        }
    }
    
    handleKeyboard(e) {
        // Only handle keyboard events when slideshow is in focus or in fullscreen
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (!slideshowContainer.contains(document.activeElement) && !this.isFullscreen) {
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 'Escape':
                if (this.isFullscreen) {
                    e.preventDefault();
                    this.toggleFullscreen();
                }
                break;
            default:
                // Number keys 1-8 for direct slide navigation
                const num = parseInt(e.key);
                if (num >= 1 && num <= this.totalSlides) {
                    e.preventDefault();
                    this.goToSlide(num);
                }
                break;
        }
    }
    
    addTouchSupport() {
        const viewport = document.querySelector('.slideshow-viewport');
        if (!viewport) return;
        
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isDragging = false;
        
        viewport.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        viewport.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
            
            // Prevent scrolling if horizontal swipe is more significant
            const deltaX = Math.abs(endX - startX);
            const deltaY = Math.abs(endY - startY);
            
            if (deltaX > deltaY) {
                e.preventDefault();
            }
        }, { passive: false });
        
        viewport.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only trigger if horizontal swipe is more significant than vertical and meets minimum distance
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }
    
    handleResize() {
        // Temporarily disable transitions during resize to prevent visual glitches
        this.slidesTrack.style.transition = 'none';
        
        // Recalculate position
        const translateX = -(this.currentSlide - 1) * this.slideWidth;
        this.slidesTrack.style.transform = `translateX(${translateX}%)`;
        
        // Re-enable transitions after a short delay
        setTimeout(() => {
            this.slidesTrack.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }, 100);
    }
    
    preloadImages() {
        // Preload all images for smoother experience
        for (let i = 1; i <= this.totalSlides; i++) {
            const img = new Image();
            img.src = `assets/images/pic0${i}.jpg`;
        }
        console.log('🖼️ Images preloaded');
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if slideshow container exists
    if (document.querySelector('.slideshow-container')) {
        window.smoothSlideshow = new SmoothSlideshow();
    }
});

// Add some utility functions for debugging
window.slideshowDebug = {
    goToSlide: (num) => window.smoothSlideshow?.goToSlide(num),
    getCurrentSlide: () => window.smoothSlideshow?.currentSlide,
    isTransitioning: () => window.smoothSlideshow?.isTransitioning
};