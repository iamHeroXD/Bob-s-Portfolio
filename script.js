document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Particles.js Background
    // ======================
    if (document.getElementById('particles-bg')) {
        particlesJS('particles-bg', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#7c3aed"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#7c3aed",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // ======================
    // Header Scroll Effect
    // ======================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ======================
    // Smooth Scrolling
    // ======================
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

    // ======================
    // Animated Counters
    // ======================
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        const animate = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = target;
                }
            });
        };
        
        // Only animate when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.hero-stats').forEach(stats => {
            observer.observe(stats);
        });
    };
    animateCounters();

    // ======================
    // Testimonial Slider
    // ======================
    const testimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.testimonial-slider .prev');
        const nextBtn = document.querySelector('.testimonial-slider .next');
        let currentIndex = 0;
        
        if (testimonials.length === 0) return;
        
        const showTestimonial = (index) => {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            currentIndex = index;
            if (currentIndex >= testimonials.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = testimonials.length - 1;
            
            testimonials[currentIndex].classList.add('active');
        };
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => showTestimonial(currentIndex - 1));
            nextBtn.addEventListener('click', () => showTestimonial(currentIndex + 1));
        }
        
        // Auto-rotate
        let slideInterval = setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 5000);
        
        // Pause on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    showTestimonial(currentIndex + 1);
                }, 5000);
            });
        }
        
        // Initialize
        showTestimonial(0);
    };
    testimonialSlider();

    // ======================
    // Contact Form Handling
    // ======================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const contact = document.getElementById('contact').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show a success message
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Reset form
                this.reset();
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                }, 2000);
            }, 1500);
        });
    }

    // ======================
    // Scroll Animations
    // ======================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section, .expertise-card, .timeline-item, .testimonial-slider');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    animateOnScroll();

    // ======================
    // Skill Bar Animations
    // ======================
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    };
    animateSkillBars();

    // ======================
    // Page Load Animations
    // ======================
    const animateHeroElements = () => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const statItems = document.querySelectorAll('.stat-item');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 400);
        }
        
        if (statItems.length > 0) {
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 600 + (index * 100));
            });
        }
    };
    animateHeroElements();
});
