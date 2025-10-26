// Accounting System Presentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    // Initialize navigation
    initNavigation();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize interactive elements
    initInteractiveElements();

    function initNavigation() {
        // Desktop navigation
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                switchSection(targetSection);
            });
        });

        // Mobile navigation
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                switchSection(targetSection);
                closeMobileMenu();
            });
        });
    }

    function initMobileMenu() {
        if (mobileMenuToggle && mobileMenuOverlay) {
            mobileMenuToggle.addEventListener('click', function() {
                toggleMobileMenu();
            });

            // Close mobile menu when clicking outside
            mobileMenuOverlay.addEventListener('click', function(e) {
                if (e.target === mobileMenuOverlay) {
                    closeMobileMenu();
                }
            });

            // Close mobile menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
    }

    function switchSection(targetSection) {
        // Remove active class from all nav items and sections
        navItems.forEach(nav => nav.classList.remove('active'));
        mobileNavItems.forEach(nav => nav.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked nav item and corresponding section
        const desktopNavItem = document.querySelector(`.nav-item[data-section="${targetSection}"]`);
        const mobileNavItem = document.querySelector(`.mobile-menu-item[data-section="${targetSection}"]`);
        const targetElement = document.getElementById(targetSection);
        
        if (desktopNavItem) desktopNavItem.classList.add('active');
        if (mobileNavItem) mobileNavItem.classList.add('active');
        if (targetElement) {
            targetElement.classList.add('active');
            
            // Only scroll to top on desktop, not on mobile
            if (window.innerWidth > 768) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }

    function toggleMobileMenu() {
        if (mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    function initScrollAnimations() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Add scroll animation class to elements
        const animateElements = document.querySelectorAll('.workflow-step, .feature-card, .workflow-item, .benefit-item, .report-category, .document-type');
        animateElements.forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    }

    function initInteractiveElements() {
        // Add hover effects to workflow steps
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach(step => {
            step.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            step.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click effects to feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(102, 126, 234, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add click effects to report items
        const reportItems = document.querySelectorAll('.report-item');
        reportItems.forEach(item => {
            item.addEventListener('click', function() {
                // Toggle active state
                reportItems.forEach(ri => ri.classList.remove('active'));
                this.classList.add('active');
                
                // Add pulse effect
                this.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            });
        });

        // Add click effects to document types
        const documentTypes = document.querySelectorAll('.document-type');
        documentTypes.forEach(type => {
            type.addEventListener('click', function() {
                // Add bounce effect
                this.style.animation = 'bounce 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        .report-item.active {
            background: #667eea !important;
            color: white !important;
            transform: translateX(10px) !important;
        }
        
        .report-item.active i {
            color: white !important;
        }
    `;
    document.head.appendChild(style);

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Only handle navigation if mobile menu is not open
        if (!mobileMenuOverlay.classList.contains('active')) {
            const activeNavIndex = Array.from(navItems).findIndex(nav => nav.classList.contains('active'));
            
            if (e.key === 'ArrowLeft' && activeNavIndex > 0) {
                navItems[activeNavIndex - 1].click();
            } else if (e.key === 'ArrowRight' && activeNavIndex < navItems.length - 1) {
                navItems[activeNavIndex + 1].click();
            }
        }
    });

    // Add progress indicator
    function updateProgressIndicator() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                z-index: 1000;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }

    // Update progress on scroll
    window.addEventListener('scroll', updateProgressIndicator);

    // Add section highlighting based on scroll position
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.content-section');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update both desktop and mobile navigation
        navItems.forEach(nav => {
            nav.classList.remove('active');
            if (nav.getAttribute('data-section') === currentSection) {
                nav.classList.add('active');
            }
        });
        
        mobileNavItems.forEach(nav => {
            nav.classList.remove('active');
            if (nav.getAttribute('data-section') === currentSection) {
                nav.classList.add('active');
            }
        });
    }

    // Update active section on scroll
    window.addEventListener('scroll', highlightActiveSection);

    // Add tooltip functionality
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 14px;
                    z-index: 1000;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                }, 10);
                
                this.tooltipElement = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this.tooltipElement) {
                    this.tooltipElement.remove();
                    this.tooltipElement = null;
                }
            });
        });
    }

    // Initialize tooltips
    initTooltips();

    // Add loading animation
    function initLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <h2>Loading Accounting System Presentation...</h2>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        // Remove loader after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }

    // Initialize loading animation
    initLoadingAnimation();

    // Add analytics tracking
    function initAnalytics() {
        // Track section views
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(`Viewing section: ${entry.target.id}`);
                    // Here you could send analytics data to your tracking service
                }
            });
        }, { threshold: 0.5 });

        contentSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize analytics
    initAnalytics();

    console.log('Accounting System Presentation loaded successfully!');
});
