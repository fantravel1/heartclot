/**
 * HeartClot - Main JavaScript
 * Optimized for performance and accessibility
 */

(function() {
    'use strict';

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Debounce function to limit execution rate
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function to limit execution rate
     * @param {Function} func - Function to throttle
     * @param {number} limit - Minimum time between executions
     * @returns {Function} Throttled function
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // MOBILE MENU
    // ============================================

    /**
     * Toggle mobile navigation menu
     */
    function toggleMenu() {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');

        if (!navMenu || !menuToggle) return;

        const isActive = navMenu.classList.toggle('active');

        // Update ARIA attribute for accessibility
        menuToggle.setAttribute('aria-expanded', isActive);

        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    }

    /**
     * Close mobile menu (for use in event handlers)
     */
    function closeMenu() {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // TABLE OF CONTENTS SCROLL TRACKING
    // ============================================

    /**
     * Highlight active section in TOC based on scroll position
     */
    function updateTocHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const tocLinks = document.querySelectorAll('.toc a');

        if (!sections.length || !tocLinks.length) return;

        let current = '';
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // 200px offset accounts for fixed header
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href && href.substring(1) === current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Throttled version for better performance
    const throttledTocUpdate = throttle(updateTocHighlight, 100);

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================

    /**
     * Show/hide scroll to top button based on scroll position
     */
    function handleScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (!scrollBtn) return;

        if (window.scrollY > 500) {
            scrollBtn.style.display = 'block';
            scrollBtn.setAttribute('aria-hidden', 'false');
        } else {
            scrollBtn.style.display = 'none';
            scrollBtn.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Scroll smoothly to top of page
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================

    /**
     * Add smooth scrolling to all anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if href is just "#"
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                // Close mobile menu if open
                closeMenu();

                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            });
        });
    }

    // ============================================
    // READING PROGRESS INDICATOR
    // ============================================

    /**
     * Update reading progress bar
     */
    function updateReadingProgress() {
        const progressBar = document.getElementById('readingProgress');
        if (!progressBar) return;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    }

    const throttledProgressUpdate = throttle(updateReadingProgress, 50);

    // ============================================
    // EXTERNAL LINK HANDLING
    // ============================================

    /**
     * Add rel="noopener noreferrer" to external links for security
     */
    function secureExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');

                // Add visual indicator for screen readers
                const srText = document.createElement('span');
                srText.className = 'sr-only';
                srText.textContent = ' (opens in new window)';
                link.appendChild(srText);
            }
        });
    }

    // ============================================
    // LAZY LOADING ENHANCEMENTS
    // ============================================

    /**
     * Add loading="lazy" to images that don't have it
     */
    function enhanceLazyLoading() {
        document.querySelectorAll('img:not([loading])').forEach(img => {
            // Don't lazy load images in the hero section
            if (!img.closest('.hero')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // ============================================

    /**
     * Close mobile menu on Escape key
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    /**
     * Initialize all functionality when DOM is ready
     */
    function init() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        }

        // TOC scroll tracking (only on content pages)
        if (document.querySelector('.toc')) {
            window.addEventListener('scroll', throttledTocUpdate);
            updateTocHighlight(); // Initial call
        }

        // Scroll to top button
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            window.addEventListener('scroll', debounce(handleScrollToTop, 100));
            scrollBtn.addEventListener('click', scrollToTop);
        }

        // Reading progress indicator
        if (document.getElementById('readingProgress')) {
            window.addEventListener('scroll', throttledProgressUpdate);
            updateReadingProgress(); // Initial call
        }

        // Smooth scrolling
        initSmoothScroll();

        // External links security
        secureExternalLinks();

        // Lazy loading
        enhanceLazyLoading();

        // Keyboard navigation
        document.addEventListener('keydown', handleEscapeKey);

        // Close menu when clicking outside or on a nav link
        document.addEventListener('click', function(e) {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');

            if (navMenu && navMenu.classList.contains('active')) {
                // Close if clicking outside the menu or on a nav link
                const clickedNavLink = e.target.closest('.nav-links a');
                if (clickedNavLink || (!navMenu.contains(e.target) && !menuToggle.contains(e.target))) {
                    closeMenu();
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Make functions available globally for backwards compatibility
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
    window.scrollToTop = scrollToTop;

})();
