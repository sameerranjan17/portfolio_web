// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       PRELOADER
       ========================================= */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger initial animations after preloader
                initScrollReveal();
            }, 500);
        }, 1000);
    });

    /* =========================================
       CUSTOM CURSOR
       ========================================= */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add a slight delay to the follower
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hover effects on interactive elements
        const interactives = document.querySelectorAll('a, button, .project-card, .cert-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* =========================================
       SCROLL PROGRESS & BACK TO TOP
       ========================================= */
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;

        // Navbar stickiness
        if (totalScroll > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }

        // Active Link Highlighting
        highlightNav();
    });

    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    /* =========================================
       DARK/LIGHT MODE TOGGLE
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        htmlElement.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            updateParticles('dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            updateParticles('light');
        }
    });

    /* =========================================
       MOBILE MENU
       ========================================= */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuIcon.classList.replace('fa-times', 'fa-bars');
        });
    });

    /* =========================================
       TYPED.JS INIT
       ========================================= */
    if (document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: [
                'AI Automation Developer',
                'Python Developer',
                'Full Stack Developer',
                'Workflow Automation Enthusiast'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    /* =========================================
       COUNTER ANIMATION
       ========================================= */
    const counters = document.querySelectorAll('.counter');
    let counterActivated = false;

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !counterActivated) {
            counters.forEach(counter => {
                counter.innerText = '0';
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target');
                    const c = +counter.innerText;
                    const increment = target / 50;

                    if (c < target) {
                        counter.innerText = `${Math.ceil(c + increment)}`;
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCounter();
            });
            counterActivated = true;
        }
    });

    /* =========================================
       SWIPER JS (CERTIFICATIONS)
       ========================================= */
    if (document.querySelector('.cert-slider')) {
        new Swiper('.cert-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }
        });
    }

    /* =========================================
       PARTICLES.JS INIT
       ========================================= */
    function initParticles(color) {
        if(typeof particlesJS === 'undefined') return;
        
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": color },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": color,
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    function updateParticles(theme) {
        const color = theme === 'dark' ? '#00E5FF' : '#B026FF';
        initParticles(color);
    }

    // Initialize with correct color based on theme
    setTimeout(() => {
        updateParticles(htmlElement.classList.contains('dark') ? 'dark' : 'light');
    }, 500);


    /* =========================================
       SCROLL REVEAL ANIMATIONS
       ========================================= */
    function initScrollReveal() {
        if(typeof ScrollReveal === 'undefined') return;
        
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2000,
            delay: 200,
            reset: false // only animate once
        });

        // Hero
        sr.reveal('.hero-greeting', { origin: 'top' });
        sr.reveal('.hero-title', { origin: 'left', delay: 300 });
        sr.reveal('.hero-subtitle', { origin: 'left', delay: 400 });
        sr.reveal('.hero-desc', { origin: 'left', delay: 500 });
        sr.reveal('.hero-actions', { origin: 'bottom', delay: 600 });
        sr.reveal('.hero-socials', { origin: 'bottom', delay: 700 });
        sr.reveal('.profile-container', { origin: 'right', delay: 400 });

        // Sections Global
        sr.reveal('.section-header', { origin: 'top' });

        // About
        sr.reveal('.about-card', { origin: 'left' });
        sr.reveal('.stat-card', { origin: 'bottom', interval: 100 });
        sr.reveal('.education-timeline', { origin: 'bottom', delay: 300 });

        // Skills
        sr.reveal('.skill-category', { origin: 'bottom', interval: 200 });

        // Projects
        sr.reveal('.project-card', { origin: 'bottom', interval: 200 });

        // Experience
        sr.reveal('.exp-item', { origin: 'left', interval: 200 });

        // Contact
        sr.reveal('.contact-info', { origin: 'left' });
        sr.reveal('.contact-form-container', { origin: 'right' });
    }

    /* =========================================
       CONTACT FORM SUBMISSION
       ========================================= */
    const contactForm = document.getElementById('premium-contact-form');
    const formLoading = document.getElementById('form-loading');
    const successPopup = document.getElementById('success-popup');
    const closePopupBtn = document.getElementById('close-popup');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading
            formLoading.classList.add('active');
            
            // Prepare FormData
            const formData = new FormData(contactForm);
            
            // Send using fetch
            fetch('https://formsubmit.co/ajax/sameerranjan.tech@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Hide loading
                formLoading.classList.remove('active');
                
                // Show success popup
                successPopup.classList.add('active');
                
                // Reset form
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                formLoading.classList.remove('active');
                alert('Oops! Something went wrong. Please try again later.');
            });
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            successPopup.classList.remove('active');
        });
    }

    // Initialize contact section particles
    if(typeof particlesJS !== 'undefined' && document.getElementById('contact-particles')) {
        particlesJS('contact-particles', {
            "particles": {
                "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#B026FF" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00E5FF", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8, "speed": 3 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
});
