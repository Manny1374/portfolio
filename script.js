
document.addEventListener('DOMContentLoaded', () => {

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-title, .content-card, .feature-card, .text-block, .visual-block, .timeline-item, .download-card, .cta-banner, .competence-detail-card, .comp-nav-card, .project-card, .hero-visual, .hero-text');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.classList.add('hidden');
        revealObserver.observe(el);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Ignore empty hash links like dropdown toggles
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Simple implementation)
    // Note: CSS for mobile menu needs to be fully enabled if we want a slide-out menu
    // For now, this is a placeholder for future expansion
    // Dynamic Menu Toggle
    // Handled by CSS :hover

    // Scroll Spy for Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links > li > a');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - headerHeight - 50) {
                current = section.getAttribute('id');
            }
        });

        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                current = lastSection.getAttribute('id');
            }
        }

        if (current) {
            const matchingLink = Array.from(navLinks).find(link => 
                link.getAttribute('href') === `#${current}` || 
                link.getAttribute('href') === `index.html#${current}`
            );
            
            if (matchingLink) {
                navLinks.forEach(link => {
                    if (link.getAttribute('id') !== 'projets-btn' && link.getAttribute('id') !== 'exp-btn') {
                        link.classList.remove('active');
                    }
                });
                matchingLink.classList.add('active');
            }
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // Image Toggle Logic for MUGOCHAUD
    const mocImageTop = document.getElementById('moc-image');
    const mocContainer = document.getElementById('moc-container');
    if (mocImageTop && mocContainer) {
        let isTopVisible = true;

        const toggleImage = () => {
            isTopVisible = !isTopVisible;
            if (isTopVisible) {
                mocImageTop.style.opacity = 1; // Show top image (MOC)
            } else {
                mocImageTop.style.opacity = 0; // Fade to bottom image (MOC_ouvert)
            }
        };

        // Auto slide every 10 seconds
        let autoSlideInterval = setInterval(toggleImage, 10000);

        // Click to change image
        mocContainer.addEventListener('click', () => {
            clearInterval(autoSlideInterval); // reset timer on manual interaction
            toggleImage();
            autoSlideInterval = setInterval(toggleImage, 10000); // restart timer
        });
    }

    // Theme Switcher (Light / Dark mode)
    const themeToggleBtn = document.getElementById('theme-toggle');

    const updateThemeIcon = (theme) => {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fa-solid fa-sun';
                themeToggleBtn.setAttribute('title', 'Passer en mode clair');
                themeToggleBtn.setAttribute('aria-label', 'Passer en mode clair');
            } else {
                icon.className = 'fa-solid fa-moon';
                themeToggleBtn.setAttribute('title', 'Passer en mode sombre');
                themeToggleBtn.setAttribute('aria-label', 'Passer en mode sombre');
            }
        }
    };

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        updateThemeIcon(theme);
    };

    // Initialize theme: default to 'light' per user preference
    const activeTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(activeTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});
