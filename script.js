document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        currentTestimonial = index;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        } else if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        
        testimonials[currentTestimonial].classList.add('active');
    }

    prevBtn.addEventListener('click', function() {
        showTestimonial(currentTestimonial - 1);
    });

    nextBtn.addEventListener('click', function() {
        showTestimonial(currentTestimonial + 1);
    });

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(function() {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    // Pause auto-rotation on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const contactMethod = document.getElementById('contactMethod').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. I'll contact you via ${contactMethod} soon.`);
            
            contactForm.reset();
        });
    }

    // Animation triggers
    function checkScroll() {
        const elements = document.querySelectorAll('.section, .skill-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('animate-pop-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});