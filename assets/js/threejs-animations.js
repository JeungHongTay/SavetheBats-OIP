/**
 * Three.js Animations for EcoNoc Glasgow Website
 * Creates an animated particle system representing bats flying in the night sky
 */

// Initialize Three.js scene for hero background
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create particle system for stars (keeping some blue stars for night sky)
    const starGeometry = new THREE.BufferGeometry();
    const starCount =100;
    const starPositions = new Float32Array(starCount * 3);
    const starVelocities = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 25;     // x
        starPositions[i + 1] = (Math.random() - 0.5) * 20; // y
        starPositions[i + 2] = (Math.random() - 0.5) * 25; // z
        
        starVelocities[i] = (Math.random() - 0.5) * 0.005;
        starVelocities[i + 1] = (Math.random() - 0.5) * 0.005;
        starVelocities[i + 2] = (Math.random() - 0.5) * 0.005;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ 
        color: 0x87CEEB, // Light blue for distant stars
        size: 0.015,
        transparent: true,
        opacity: 0.6
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create firefly-like particles with custom shader material for glow effect
    const fireflyGeometry = new THREE.BufferGeometry();
    const fireflyCount = 50; // Doubled from 25 to 50 for more particles
    const fireflyPositions = new Float32Array(fireflyCount * 3);
    const fireflyVelocities = new Float32Array(fireflyCount * 3);
    const fireflySizes = new Float32Array(fireflyCount);
    const fireflyColors = new Float32Array(fireflyCount * 3);

    for (let i = 0; i < fireflyCount; i++) {
        const i3 = i * 3;
        
        fireflyPositions[i3] = (Math.random() - 0.5) * 25;     // x - spread them out more
        fireflyPositions[i3 + 1] = (Math.random() - 0.5) * 18; // y - wider vertical range
        fireflyPositions[i3 + 2] = (Math.random() - 0.5) * 25; // z - more depth
        
        fireflyVelocities[i3] = (Math.random() - 0.5) * 0.02;
        fireflyVelocities[i3 + 1] = (Math.random() - 0.5) * 0.015;
        fireflyVelocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        
        // MASSIVE sizes for ultra-visibility
        fireflySizes[i] = Math.random() * 0.35 + 0.25; // Much bigger: 0.25-0.60 (doubled from before)
        
        // ULTRA-BRIGHT, maximum contrast colors - extremely vibrant
        const colorVariation = Math.random();
        if (colorVariation < 0.4) {
            // BLAZING ELECTRIC YELLOW - maximum intensity
            fireflyColors[i3] = 1.0;     // R - full red
            fireflyColors[i3 + 1] = 1.0; // G - full green  
            fireflyColors[i3 + 2] = 0.0; // B - zero blue for pure yellow
        } else if (colorVariation < 0.75) {
            // INTENSE BURNING ORANGE - super hot orange
            fireflyColors[i3] = 1.0;     // R - full red
            fireflyColors[i3 + 1] = 0.4; // G - more green for better orange visibility
            fireflyColors[i3 + 2] = 0.0; // B - zero blue
        } else if (colorVariation < 0.9) {
            // BRILLIANT GOLD - maximum shimmer effect
            fireflyColors[i3] = 1.0;     // R - full red
            fireflyColors[i3 + 1] = 0.9; // G - almost full green for bright gold
            fireflyColors[i3 + 2] = 0.0; // B - zero blue
        } else {
            // PURE BLAZING WHITE - maximum visibility
            fireflyColors[i3] = 1.0;     // R - full
            fireflyColors[i3 + 1] = 1.0; // G - full
            fireflyColors[i3 + 2] = 1.0; // B - full white for contrast
        }
    }

    fireflyGeometry.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));
    fireflyGeometry.setAttribute('size', new THREE.BufferAttribute(fireflySizes, 1));
    fireflyGeometry.setAttribute('color', new THREE.BufferAttribute(fireflyColors, 3));

    // Custom shader material for glowing circular fireflies
    const fireflyMaterial = new THREE.ShaderMaterial({
        transparent: true,
        vertexColors: true,
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            varying float vOpacity;
            
            void main() {
                vColor = color;
                // EXTREME pulsing effect for maximum visibility
                vOpacity = 1.2 + 0.8 * sin(position.x * 8.0 + position.y * 8.0);
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                // MASSIVE point size for ultra-visibility
                gl_PointSize = size * (650.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float vOpacity;
            
            void main() {
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);
                
                // Create ULTRA-bright glowing orb
                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                alpha *= vOpacity;
                
                // EXTREME glow layers for maximum impact
                float blazingCore = 1.0 - smoothstep(0.0, 0.08, dist);  // Ultra-bright core
                float innerFire = 1.0 - smoothstep(0.0, 0.2, dist);    // Inner fire
                float middleGlow = 1.0 - smoothstep(0.0, 0.35, dist);  // Middle glow
                float outerAura = 1.0 - smoothstep(0.0, 0.48, dist);   // Outer aura
                
                // MAXIMUM color intensity boost - nuclear bright!
                vec3 finalColor = vColor * 3.0 + 
                                blazingCore * vColor * 2.5 + 
                                innerFire * vColor * 1.8 + 
                                middleGlow * vColor * 1.2 + 
                                outerAura * 0.8;
                
                gl_FragColor = vec4(finalColor, alpha);
            }
        `
    });

    const fireflies = new THREE.Points(fireflyGeometry, fireflyMaterial);
    scene.add(fireflies);

    // ULTRA-bright lighting for maximum firefly visibility
    const ambientLight = new THREE.AmbientLight(0x2a2a3a, 0.7); // Brighter ambient
    scene.add(ambientLight);

    // BLAZING warm golden light - much brighter
    const warmLight = new THREE.PointLight(0xFFD700, 2.0, 120); // Doubled intensity, increased range
    warmLight.position.set(0, 0, 5);
    scene.add(warmLight);

    // INTENSE burning orange light - super bright  
    const orangeLight = new THREE.PointLight(0xFF4400, 1.5, 80); // Much brighter orange, wider range
    orangeLight.position.set(-5, 3, 2);
    scene.add(orangeLight);

    camera.position.z = 5;

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;

    // Mouse move event for parallax effect
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the entire scene slowly
        scene.rotation.y += 0.0005;

        // Update star positions
        const starPos = stars.geometry.attributes.position.array;
        for (let i = 0; i < starCount * 3; i += 3) {
            starPos[i] += starVelocities[i];
            starPos[i + 1] += starVelocities[i + 1];
            starPos[i + 2] += starVelocities[i + 2];

            // Wrap around bounds
            if (starPos[i] > 12) starPos[i] = -12;
            if (starPos[i] < -12) starPos[i] = 12;
            if (starPos[i + 1] > 10) starPos[i + 1] = -10;
            if (starPos[i + 1] < -10) starPos[i + 1] = 10;
        }
        stars.geometry.attributes.position.needsUpdate = true;

        // Update firefly positions with organic movement
        const fireflyPos = fireflies.geometry.attributes.position.array;
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < fireflyCount; i++) {
            const i3 = i * 3;
            
            // Add complex organic movement patterns
            fireflyPos[i3] += fireflyVelocities[i3] + Math.sin(time * 0.5 + i * 0.5) * 0.002;
            fireflyPos[i3 + 1] += fireflyVelocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.7) * 0.002;
            fireflyPos[i3 + 2] += fireflyVelocities[i3 + 2] + Math.sin(time * 0.4 + i * 0.3) * 0.001;

            // Wrap around bounds with larger area for more fireflies
            if (fireflyPos[i3] > 12) fireflyPos[i3] = -12;
            if (fireflyPos[i3] < -12) fireflyPos[i3] = 12;
            if (fireflyPos[i3 + 1] > 9) fireflyPos[i3 + 1] = -9;
            if (fireflyPos[i3 + 1] < -9) fireflyPos[i3 + 1] = 9;
            if (fireflyPos[i3 + 2] > 12) fireflyPos[i3 + 2] = -12;
            if (fireflyPos[i3 + 2] < -12) fireflyPos[i3 + 2] = 12;
        }
        fireflies.geometry.attributes.position.needsUpdate = true;

        // Parallax effect based on mouse position
        camera.position.x = mouseX * 0.3;
        camera.position.y = mouseY * 0.3;
        camera.lookAt(scene.position);

        // INTENSE pulsing light effects - much more dramatic
        warmLight.intensity = 1.8 + Math.sin(time * 1.2) * 0.4; // Stronger pulsing
        orangeLight.intensity = 1.2 + Math.cos(time * 1.6) * 0.3; // More dynamic orange

        // More dramatic light movement
        warmLight.position.x = Math.sin(time * 0.3) * 3;
        warmLight.position.y = Math.cos(time * 0.2) * 1.5;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Return cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', () => {});
        renderer.dispose();
    };
}

// Initialize enhanced scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add specific animation classes based on element type
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
                } else if (entry.target.classList.contains('solution-card')) {
                    entry.target.style.animation = `scaleIn 0.8s ease-out forwards`;
                } else if (entry.target.classList.contains('link-card')) {
                    entry.target.style.animation = `fadeInRight 0.8s ease-out forwards`;
                } else if (entry.target.tagName === 'H2') {
                    entry.target.style.animation = `slideDown 0.6s ease-out forwards`;
                } else {
                    entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableSelectors = [
        '.feature-card', '.link-card', '.solution-card', '.member-card',
        '.lesson-card', '.insight-card', '.alternative-card', '.feedback-item',
        '.overview h2', '.overview p', '.content-section h2', '.content-section h3',
        '.stat-card', '.quote-card', '.justification-item', '.screenshot-item',
        '.dashboard-preview', '.hero-visual', '.feature-icon-large'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    });

    // Stagger animation for multiple cards in a row
    document.querySelectorAll('.feature-grid .feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.solution-grid .solution-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.link-grid .link-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
}

// Add enhanced floating and interactive animations
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.dashboard-preview, .feature-icon-large');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `float 3s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });

    // Add pulsing animation to important buttons
    const importantButtons = document.querySelectorAll('.btn-primary');
    importantButtons.forEach((btn, index) => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulse 2s infinite';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.animation = '';
        });
    });

    // Add shimmer effect to cards on first load
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .solution-card, .link-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.background = `linear-gradient(135deg, white 25%, rgba(59, 130, 246, 0.05) 50%, white 75%)`;
                card.style.backgroundSize = '200% 100%';
                card.style.animation = 'shimmer 2s ease-in-out';
                
                setTimeout(() => {
                    card.style.background = 'white';
                    card.style.animation = '';
                }, 2000);
            }, index * 200);
        });
    }, 1000);

    // Add interactive icon bouncing
    document.querySelectorAll('.feature-icon, .solution-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'bounce 0.6s ease';
        });
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize Three.js on pages with the hero canvas
    if (document.getElementById('hero-canvas')) {
        initHeroAnimation();
    }
    
    initScrollAnimations();
    initFloatingElements();
});

// Enhanced smooth transitions for page navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add transition class to body
    document.body.classList.add('transition-ready');
    document.body.style.opacity = '0';
    
    // Smooth page entrance
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
        
        // Trigger page-specific entrance animations
        triggerPageAnimations();
    }, 100);
    
    // Handle navigation clicks for smooth transitions
    document.querySelectorAll('.nav-link, .btn').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only apply to internal links
            if (link.hostname === window.location.hostname && !link.href.includes('#')) {
                e.preventDefault();
                
                // Smooth exit animation
                document.body.style.transform = 'scale(0.98)';
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });
});

// Trigger page-specific animations
function triggerPageAnimations() {
    // Animate page header
    const pageHeader = document.querySelector('.page-header h1');
    if (pageHeader) {
        pageHeader.style.animation = 'slideDown 1s ease-out 0.3s both';
    }
    
    const pageSubtitle = document.querySelector('.page-header p');
    if (pageSubtitle) {
        pageSubtitle.style.animation = 'fadeInUp 1s ease-out 0.6s both';
    }
    
    // Animate navigation items
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        link.style.animation = `fadeInDown 0.6s ease-out ${index * 0.1}s both`;
    });
    
    // Animate feature grids with stagger
    document.querySelectorAll('.features-section .feature-card').forEach((card, index) => {
        card.style.animation = `fadeInUp 0.8s ease-out ${0.2 + index * 0.1}s both`;
    });
    
    // Animate dashboard tabs
    document.querySelectorAll('.tab-button').forEach((tab, index) => {
        tab.style.animation = `fadeInRight 0.6s ease-out ${index * 0.1}s both`;
    });
    
    // Add loading shimmer to charts
    document.querySelectorAll('.chart-container').forEach((chart, index) => {
        chart.style.animation = `fadeInUp 1s ease-out ${0.5 + index * 0.2}s both`;
    });
}
