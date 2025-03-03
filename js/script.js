/**
 * The World of Jacques Tati - Main JavaScript
 * This file handles all interactive elements and animations for the website.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Animation for elements as they enter the viewport
    setupScrollAnimations();
    
    // Filmography card hover effects
    setupFilmCardEffects();
});

/**
 * Sets up smooth scrolling for all navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Sets up animations for elements as they enter the viewport
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section');
    
    // Helper function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };
    
    // Initial check for elements already in viewport on load
    animatedElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animated');
        }
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    });
}

/**
 * Sets up interactive effects for film card elements
 */
function setupFilmCardEffects() {
    const filmCards = document.querySelectorAll('.film-card');
    
    filmCards.forEach(card => {
        // Simple hover effect without tilt
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/**
 * Mobile menu toggle functionality
 * This will be implemented when the mobile menu is added
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

/**
 * Creates a lightbox effect for film gallery images
 * This will be implemented on individual film pages
 */
function setupImageLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const body = document.body;
    
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxImage = document.createElement('img');
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            
            const closeButton = document.createElement('button');
            closeButton.classList.add('lightbox-close');
            closeButton.innerHTML = '&times;';
            
            // Append elements
            lightbox.appendChild(lightboxImage);
            lightbox.appendChild(closeButton);
            body.appendChild(lightbox);
            
            // Prevent body scrolling
            body.style.overflow = 'hidden';
            
            // Handle close button click
            closeButton.addEventListener('click', () => {
                body.removeChild(lightbox);
                body.style.overflow = '';
            });
            
            // Close on background click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    body.removeChild(lightbox);
                    body.style.overflow = '';
                }
            });
        });
    });
} 