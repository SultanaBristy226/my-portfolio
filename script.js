

(function() {
    // ========== DOM ELEMENTS ==========
    const navLinks = document.querySelectorAll('.nav-links a');
    const projectCards = document.querySelectorAll('.project-card');
    const footerYear = document.querySelector('.footer p:nth-child(3)');
    const heroImage = document.querySelector('.hero-image');
    
    // ========== INITIALIZATION ==========
    console.log('✨ Portfolio loaded — deep purple mode activated');
    
    // ========== NAVIGATION HIGHLIGHT ==========
    // Add active state to clicked nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active state from all links
            navLinks.forEach(l => {
                l.style.borderBottomColor = 'transparent';
                l.style.color = '#ddd0ec';
            });
            
            // Highlight clicked link
            this.style.borderBottomColor = '#b27bf5';
            this.style.color = '#ffffff';
            
            // Smooth scroll to section (if hash exists)
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== ACTIVE NAV ON SCROLL ==========
    // Highlight nav links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = {
            'home': document.querySelector('.hero'),
            'projects': document.getElementById('projects'),
            'skills': document.getElementById('skills'),
            'contact': document.getElementById('contact')
        };
        
        const scrollPosition = window.scrollY + 200; // Offset for better UX
        
        for (const [key, section] of Object.entries(sections)) {
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Remove active from all
                    navLinks.forEach(l => {
                        l.style.borderBottomColor = 'transparent';
                        l.style.color = '#ddd0ec';
                    });
                    
                    // Find and highlight matching nav link
                    const matchingLink = Array.from(navLinks).find(link => 
                        link.getAttribute('href') === `#${key}` || 
                        (key === 'home' && link.getAttribute('href') === '#')
                    );
                    
                    if (matchingLink) {
                        matchingLink.style.borderBottomColor = '#b27bf5';
                        matchingLink.style.color = '#ffffff';
                    }
                }
            }
        }
    });
    
    // ========== PROJECT CARDS INTERACTION ==========
    projectCards.forEach((card, index) => {
        // Add data attribute for animation
        card.setAttribute('data-index', index);
        
        // Mouse move parallax effect (subtle)
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.style.transform = `translateY(-12px) scale(1.02) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            setTimeout(() => {
                this.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)';
            }, 100);
        });
    });
    
    // ========== HERO IMAGE INTERACTION ==========
    if (heroImage) {
        // Add floating effect with mouse follow
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`;
        });
        
        // Reset on mouse leave window
        document.addEventListener('mouseleave', function() {
            heroImage.style.transform = '';
        });
    }
    
    // ========== SKILL CHIPS ANIMATION ==========
    const skillChips = document.querySelectorAll('.skill-chip');
    skillChips.forEach((chip, index) => {
        // Stagger animation on page load
        chip.style.opacity = '0';
        chip.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.05}s`;
        
        // Add random rotation on hover for fun
        chip.addEventListener('mouseenter', function() {
            const randomRotate = Math.random() * 6 - 3; // -3 to 3 degrees
            this.style.transform = `translateY(-4px) scale(1.02) rotate(${randomRotate}deg)`;
        });
    });
    
    // ========== DYNAMIC FOOTER YEAR ==========
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }
    
    // ========== SMOOTH SCROLL FOR ALL INTERNAL LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== ADD FADE-IN ANIMATION KEYFRAMES ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .project-card, .info-col, .hero-content {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .project-card:nth-child(2) { animation-delay: 0.1s; }
        .project-card:nth-child(3) { animation-delay: 0.2s; }
        .project-card:nth-child(4) { animation-delay: 0.3s; }
        .project-card:nth-child(5) { animation-delay: 0.4s; }
    `;
    document.head.appendChild(style);
    
    // ========== PAGE LOAD ANIMATIONS ==========
    window.addEventListener('load', function() {
        // Trigger any post-load animations
        console.log('🎨 All assets loaded — ready to impress!');
        
        // Add a subtle class to body
        document.body.classList.add('loaded');
    });
    
    
    function checkMobileView() {
        if (window.innerWidth <= 700) {
            
            document.querySelector('.nav-links').style.gap = '20px';
        } else {
            document.querySelector('.nav-links').style.gap = '36px';
        }
    }
    
    window.addEventListener('resize', checkMobileView);
    checkMobileView(); // Initial check
    
})();