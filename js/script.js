// RealMed Solutions - Main JavaScript
// Handles both home page and about page functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================
    // PAGE TRANSITIONS
    // =================================
    const pageLinks = document.querySelectorAll('a[href$=".html"], .nav-link, .footer-link');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply transition for internal page links (not #anchors or external links)
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:')) {
                e.preventDefault();
                
                // Add fade out animation
                document.body.classList.add('page-transition-out');
                
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = href;
                }, 150); // Match the fadeOutPage animation duration
            }
        });
    });
    
    // =================================
    // SMOOTH SCROLLING FOR ALL PAGES
    // =================================
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =================================
    // HOME PAGE FUNCTIONALITY
    // =================================
    
    // CTA Button functionality
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('page-transition-out');
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 150);
        });
    }

    // Feature sections animation (home page)
    const featureSections = document.querySelectorAll('.feature-section');
    
    if (featureSections.length > 0) {
        const featureObserverOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const featureObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const featureImage = entry.target.querySelector('.feature-image');
                    if (featureImage) {
                        featureImage.classList.add('animate-in');
                    }
                }
            });
        }, featureObserverOptions);

        featureSections.forEach(section => {
            featureObserver.observe(section);
        });
    }

    // =================================
    // ABOUT PAGE FUNCTIONALITY
    // =================================
    
    // About page scroll animations
    const aboutObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, aboutObserverOptions);

    // Observe mission section
    const missionText = document.querySelector('.mission-text');
    if (missionText) {
        aboutObserver.observe(missionText);
    }

    // Observe excellence cards
    const excellenceCards = document.querySelectorAll('.excellence-card');
    if (excellenceCards.length > 0) {
        excellenceCards.forEach(card => {
            aboutObserver.observe(card);
        });

        // Add hover effect (visual pulse)
        excellenceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease';
                this.style.transform = 'scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Observe closing section
    const closingText = document.querySelector('.closing-text');
    if (closingText) {
        aboutObserver.observe(closingText);
    }

    // Excellence cards - Touch/Click support for mobile
    const cards = document.querySelectorAll('.excellence-card');
    
    if (cards.length > 0) {
        // Check if device supports touch or is mobile viewport
        const isTouchDevice = ('ontouchstart' in window) || 
                             (navigator.maxTouchPoints > 0) || 
                             (navigator.msMaxTouchPoints > 0);
        const isMobileViewport = () => window.innerWidth <= 1024;
        
        if (isMobileViewport()) {
            // Auto-flip cards on scroll for mobile
            const cardFlipObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    const cardInner = entry.target.querySelector('.card-inner');
                    if (entry.isIntersecting) {
                        // Flip to back when in view
                        setTimeout(() => {
                            cardInner.style.transform = 'rotateY(180deg)';
                        }, 300);
                    } else {
                        // Flip back to front when out of view
                        cardInner.style.transform = 'rotateY(0deg)';
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: '-15% 0px -35% 0px'
            });

            cards.forEach(card => {
                cardFlipObserver.observe(card);
            });
        } else if (isTouchDevice) {
            // Manual tap to flip on larger touch devices
            cards.forEach(card => {
                let isFlipped = false;
                
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Reset all other cards
                    cards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
                        }
                    });
                    
                    // Toggle current card
                    const cardInner = card.querySelector('.card-inner');
                    isFlipped = !isFlipped;
                    cardInner.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
                });
            });

            // Close cards when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.excellence-card')) {
                    cards.forEach(card => {
                        card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
                    });
                }
            });
        }

        // Keyboard accessibility for cards
        cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Excellence card ${index + 1}: ${card.querySelector('.card-title').textContent}. Press Enter or Space to flip.`);
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const cardInner = this.querySelector('.card-inner');
                    const currentRotation = cardInner.style.transform;
                    
                    if (currentRotation === 'rotateY(180deg)') {
                        cardInner.style.transform = 'rotateY(0deg)';
                    } else {
                        cardInner.style.transform = 'rotateY(180deg)';
                    }
                }
            });
        });
    }

    // About hero parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const aboutHeroImg = document.querySelector('.about-hero-img');
        
        if (aboutHeroImg && scrolled < window.innerHeight) {
            aboutHeroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // About page tagline animation
    const taglineWords = document.querySelectorAll('.tagline-word');
    if (taglineWords.length > 0) {
        taglineWords.forEach((word, index) => {
            word.style.animation = `fadeInUp 0.6s ease-out ${0.5 + (index * 0.2)}s both`;
        });
    }

    // =================================
    // CONTACT FORM SUBMISSION
    // =================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success modal
                    showModal();
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Oops! Something went wrong. Please try again or email us directly at info@realmed.ie');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Modal functions
    window.showModal = function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('show');
        }
    }
    
    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('successModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // =================================
    // UTILITY FUNCTIONS
    // =================================
    
    // Progressive number animation (for future use)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
