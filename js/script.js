// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function()
{
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) 
        {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) 
            {
                targetElement.scrollIntoView
                ({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to CTA button
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) 
    {
        ctaButton.addEventListener('click', function() {
            // Scroll to contact section or handle contact action
            const contactSection = document.querySelector('#contact');

            if (contactSection) 
            {
                contactSection.scrollIntoView
                ({
                    behavior: 'smooth',
                    block: 'start'
                });

            } else 
            {
                // If no contact section, you could open a modal or redirect
                alert('Contact functionality would be implemented here');
            }
        });
    }

    // Add intersection observer for feature sections
    const observerOptions = 
    {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) 
    {
        entries.forEach(entry => 
        {
            if (entry.isIntersecting) 
            {
                // Add animation class to the feature image
                const featureImage = entry.target.querySelector('.feature-image');
                if (featureImage) {
                    featureImage.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);

    // Observe feature sections for animation
    const featureSections = document.querySelectorAll('.feature-section');
    featureSections.forEach(section => {
        observer.observe(section);
    });
});

