// ================================
// DOCUMENT READY & INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeMobileMenu();
    initializeFeatureAnimations();
    hideLoadingScreen();
    initializeParallaxEffects();
    initializeSmoothScrolling();
    initializeHoverEffects();
    initializeCounters();
});

// ================================
// LOADING SCREEN
// ================================

function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        loading.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
}

// ================================
// NAVIGATION FUNCTIONALITY
// ================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// ================================
// MOBILE MENU
// ================================

function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileNavMenu = document.querySelector('.mobile-nav-menu');
            if (!mobileNavMenu) {
                mobileNavMenu = document.createElement('div');
                mobileNavMenu.className = 'mobile-nav-menu';
                mobileNavMenu.innerHTML = `
                    <a href="#home">Home</a>
                    <a href="#about">About Us</a>
                    <a href="#bumperpick">Bumperpick App</a>
                    <a href="#mission">Mission & Vision</a>
                    <a href="#contact">Contact Us</a>
                `;
                document.querySelector('.nav-container').appendChild(mobileNavMenu);
                
                // Add styles for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-nav-menu {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: rgba(255, 255, 255, 0.98);
                        backdrop-filter: blur(10px);
                        display: none;
                        flex-direction: column;
                        padding: 1rem 2rem;
                        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    }
                    .mobile-nav-menu.active {
                        display: flex;
                    }
                    .mobile-nav-menu a {
                        padding: 1rem 0;
                        text-decoration: none;
                        color: var(--text-dark);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                        transition: all 0.3s ease;
                    }
                    .mobile-nav-menu a:hover {
                        color: var(--primary-blue);
                        padding-left: 1rem;
                    }
                `;
                document.head.appendChild(style);
            }
            
            mobileNavMenu.classList.toggle('active');
            
            // Animate hamburger
            const hamburgers = mobileMenu.querySelectorAll('.hamburger');
            hamburgers.forEach((bar, index) => {
                if (mobileMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                }
            });
        });
    }
}

// ================================
// SCROLL ANIMATIONS
// ================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('feature-item')) {
                    animateFeatureItem(entry.target);
                }
                
                if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .feature-item, .feature-card');
    animatedElements.forEach(el => observer.observe(el));
}

function animateFeatureItem(element) {
    // Staggered animation for feature items
    const items = document.querySelectorAll('.feature-item');
    const index = Array.from(items).indexOf(element);
    
    setTimeout(() => {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }, index * 150);
}

function animateFeatureCard(element) {
    // Scale up animation for feature cards
    const cards = document.querySelectorAll('.feature-card');
    const index = Array.from(cards).indexOf(element);
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, index * 200);
}

// ================================
// FEATURE ANIMATIONS
// ================================

function initializeFeatureAnimations() {
    // Phone mockup interaction
    const phone = document.querySelector('.phone');
    if (phone) {
        phone.addEventListener('mouseenter', () => {
            phone.style.transform = 'translateY(-30px) rotate(5deg) scale(1.05)';
        });
        
        phone.addEventListener('mouseleave', () => {
            phone.style.transform = '';
        });
    }

    // Floating cards interaction
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) scale(1.05)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.zIndex = '';
        });
    });

    // Mission/Vision cards tilt effect
    const mvCards = document.querySelectorAll('.mv-card');
    mvCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ================================
// PARALLAX EFFECTS
// ================================

function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero background parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-card');
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ================================
// SMOOTH SCROLLING
// ================================

function initializeSmoothScrolling() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ================================
// CONTACT FORM
// ================================

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Real-time form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                clearFieldError(input);
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ================================
// NOTIFICATIONS
// ================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ================================
// HOVER EFFECTS
// ================================

function initializeHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Icon rotation effects
    const icons = document.querySelectorAll('.feature-icon, .icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
        });
    });
}

// ================================
// COUNTERS & ANIMATIONS
// ================================

function initializeCounters() {
    // Add some dynamic counters if needed
    const stats = {
        clients: 100,
        projects: 250,
        years: 5
    };
    
    // This can be expanded to show animated counters
    // Currently placeholder for future enhancements
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ================================
// RESIZE HANDLER
// ================================

window.addEventListener('resize', debounce(() => {
    // Recalculate positions and animations on resize
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    if (window.innerWidth > 768 && mobileNavMenu) {
        mobileNavMenu.classList.remove('active');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            // Reset hamburger animation
            const hamburgers = mobileMenu.querySelectorAll('.hamburger');
            hamburgers.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    }
}, 250));

// ================================
// SCROLL PERFORMANCE
// ================================

// Optimize scroll events with throttling
window.addEventListener('scroll', throttle(() => {
    // Additional scroll-based animations can be added here
    
    // Hide/show scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
}, 16)); // ~60fps

// ================================
// ERROR HANDLING
// ================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could show user-friendly error message in production
});

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileNavMenu = document.querySelector('.mobile-nav-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
            mobileNavMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Reset hamburger animation
            const hamburgers = mobileMenu.querySelectorAll('.hamburger');
            hamburgers.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    }
});

// ================================
// INITIALIZATION COMPLETE
// ================================

console.log('🚀 Triosys website initialized successfully!');