/**
 * Main JavaScript file for Amaechi Philip Ekaba's Personal Website
 * Handles: Mobile Menu, Smooth Scrolling, Scroll Animations, and Sticky Header
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements for mobile menu interaction
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    /**
     * Mobile Menu Toggle Logic
     * Toggles 'active' class on nav links and 'fa-times' (X icon) on the hamburger button
     */
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('fa-times');
    });

    /**
     * Smooth Scrolling for Internal Navigation Links
     * Intercepts clicks on anchor tags starting with '#'
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default instant jump
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate position with offset to account for the sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Perform the smooth scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Auto-close mobile menu after clicking a link
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('fa-times');
                }
            }
        });
    });

    /**
     * Scroll Animations using Intersection Observer
     * Detects when sections enter the viewport and adds an 'animate' class
     */
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Attach observer to all main sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    /**
     * Sticky Header Visual Effect
     * Shrinks the header and increases opacity when the user scrolls down
     */
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            // Scrolled state
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        } else {
            // Top of page state
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
        }
    });
});