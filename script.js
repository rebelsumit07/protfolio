// ==================== PORTFOLIO DATA ====================
// UPDATE THIS SECTION WITH YOUR ACTUAL PROJECT LINKS
// Replace the sample data with your real projects

const portfolioData = [
    {
        title: 'Cafe Website with Management System',
        description: 'Online ordering with AI recommendations',
        url: 'https://prototypeindex.netlify.app/',
        image: 'assets/cafe.png'
    },
    {
        title: 'Gym Membership App',
        description: 'SaaS platform for gym management',
        url: 'https://standardgym.netlify.app',
        image: 'assets/stgym.png'
    },
    {
        title: 'Cafe Online Menu Management',
        description: 'Helps managinr orders menus reservations and more',
        url: 'https://https://prototypeadmin.netlify.app/',
        image: 'assets/cafemanagemnt.png'
    },
    {
        title: 'Chat Application',
        description: 'Real-time messaging web app',
        url: 'https://metufy.netlify.app',
        image: 'assets/metufy.png'
    },
    {
        title: 'Gym Website',
        description: 'A digital face to gym with member login and portal features',
        url: 'https://sfc07.vercel.app',
        image: 'assets/sfc07.png'
    }
];

// ==================== RENDER PORTFOLIO ====================
// This function creates the portfolio cards dynamically from the portfolioData
function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (!portfolioGrid) {
        console.error('Portfolio grid element not found');
        return;
    }

    portfolioGrid.innerHTML = portfolioData.map((project) => `
        <a href="${project.url}" class="portfolio-card" target="_blank" rel="noopener noreferrer">
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="portfolio-content">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <span class="portfolio-link">View Project →</span>
            </div>
        </a>
    `).join('');
}

// ==================== MOBILE MENU TOGGLE ====================
// Handles opening and closing the mobile navigation menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) {
        console.error('Menu elements not found');
        return;
    }

    // Toggle menu when clicking the hamburger button
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ==================== SMOOTH SCROLL ====================
// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links
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
}

// ==================== SCROLL ANIMATIONS ====================
// Add fade-in effect as elements come into view
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.service-card, .process-card, .expertise-card, .portfolio-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== NAVIGATION ACTIVE STATE ====================
// Highlight the active navigation item based on scroll position
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Get all sections and find which one is in view
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== COPY TO CLIPBOARD ====================
// Utility function to copy text (used for easy email/phone copying)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    }).catch(() => {
        alert('Failed to copy');
    });
}

// ==================== FORM VALIDATION ====================
// Basic validation for contact forms if you add one
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ==================== INITIALIZE ALL FEATURES ====================
// Run all initialization functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized');
    
    renderPortfolio();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavigation();
});

// ==================== HANDLE WINDOW RESIZE ====================
// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (window.innerWidth >= 768) {
        menuToggle?.classList.remove('active');
        mobileMenu?.classList.remove('active');
    }
});