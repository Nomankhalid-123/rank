// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            
            // Create WhatsApp message
            const message = `Hello! I'm interested in your services.%0A%0A` +
                          `Name: ${name}%0A` +
                          `Phone: ${phone}%0A` +
                          `Service: ${service}%0A` +
                          `I would like to know more about your services.`;
            
            // WhatsApp number (replace with your number)
            const whatsappNumber = '923001888576';
            
            // Open WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Thank you! You will be redirected to WhatsApp to continue.');
        });
    }
    
    // ===== COUNTER ANIMATION =====
    function startCounter(statElement) {
        const target = parseInt(statElement.getAttribute('data-count'));
        const count = parseInt(statElement.innerText);
        const increment = target / 100;
        
        if(count < target) {
            statElement.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(statElement), 10);
        } else {
            statElement.innerText = target + '+';
        }
    }
    
    // Start counters when in viewport
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('[data-count]');
                statItems.forEach(item => {
                    startCounter(item);
                });
            }
        });
    }, observerOptions);
    
    // Observe hero section for stats
    const heroSection = document.querySelector('.hero');
    if(heroSection) {
        observer.observe(heroSection);
    }
    
    // ===== PORTFOLIO HOVER EFFECTS =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== TESTIMONIAL SLIDER (Simple Auto Slide) =====
    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.opacity = i === index ? '1' : '0.5';
            card.style.transform = i === index ? 'scale(1.05)' : 'scale(0.95)';
        });
    }
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Initialize
    showTestimonial(0);
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // ===== ADD BACK TO TOP STYLES =====
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 90px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 80px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== IMAGE LAZY LOADING =====
    const lazyImages = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src') || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        if(img.getAttribute('data-src')) {
            imageObserver.observe(img);
        }
    });
    
    // ===== FORM VALIDATION =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if(this.value.trim() === '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '#e2e8f0';
        });
    });
    
    // ===== INITIALIZE ANIMATIONS =====
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// ===== AOS LIBRARY (Animate On Scroll) =====
// Add this CDN link in your HTML head section:
// <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
// <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

// Note: You need to add AOS library for animations
// Add these lines in your HTML head section if you want animations