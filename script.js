(function() {
    // DOM elements
    const navLinks = document.querySelectorAll('.nav-links a');
    const projectCards = document.querySelectorAll('.project-card');
    const heroImage = document.querySelector('.hero-image');
    const skillChips = document.querySelectorAll('.skill-chip');
    
    console.log('Portfolio loaded');
    
    // nav click highlight
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => {
                l.style.borderBottomColor = 'transparent';
                l.style.color = '#ddd0ec';
            });
            
            this.style.borderBottomColor = '#b27bf5';
            this.style.color = '#ffffff';
            
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
    
    // active nav on scroll
    window.addEventListener('scroll', function() {
        const sections = {
            'home': document.querySelector('.hero'),
            'projects': document.getElementById('projects'),
            'skills': document.getElementById('skills'),
            'contact': document.getElementById('contact')
        };
        
        const scrollPosition = window.scrollY + 200;
        
        for (const [key, section] of Object.entries(sections)) {
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(l => {
                        l.style.borderBottomColor = 'transparent';
                        l.style.color = '#ddd0ec';
                    });
                    
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
    
    // project card hover reset
    projectCards.forEach(card => {
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // hero image parallax effect
    if (heroImage) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            const moveX = (mouseX - 0.5) * 15;
            const moveY = (mouseY - 0.5) * 15;
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        document.addEventListener('mouseleave', function() {
            heroImage.style.transform = '';
        });
    }
    
    // skill chips animation
    skillChips.forEach((chip, index) => {
        chip.style.opacity = '0';
        chip.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.03}s`;
        
        chip.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(-4px) scale(1.02)`;
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
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
    
    // add animation keyframes
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
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .project-card:nth-child(1) { animation-delay: 0s; }
        .project-card:nth-child(2) { animation-delay: 0.1s; }
        .project-card:nth-child(3) { animation-delay: 0.2s; }
        .project-card:nth-child(4) { animation-delay: 0.3s; }
        .project-card:nth-child(5) { animation-delay: 0.4s; }
        .project-card:nth-child(6) { animation-delay: 0.5s; }
        .project-card:nth-child(7) { animation-delay: 0.6s; }
        .project-card:nth-child(8) { animation-delay: 0.7s; }
        .project-card:nth-child(9) { animation-delay: 0.8s; }
    `;
    document.head.appendChild(style);
    
    // responsive nav gap
    function checkMobileView() {
        const navLinksDiv = document.querySelector('.nav-links');
        if (navLinksDiv) {
            if (window.innerWidth <= 700) {
                navLinksDiv.style.gap = '20px';
            } else {
                navLinksDiv.style.gap = '36px';
            }
        }
    }
    
    window.addEventListener('resize', checkMobileView);
    checkMobileView();
    
    // page load complete
    window.addEventListener('load', function() {
        console.log('Portfolio ready');
        document.body.classList.add('loaded');
    });
    
})();