/**
 * Anushree Chandra Portfolio — Main JS
 * Navigation and scroll animations.
 */

(function () {
    'use strict';

    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    var navLinks = document.querySelectorAll('.nav-link');

    // ---- Navigation ----
    function handleNavScroll() {
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }

    function closeMobileNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMobileNav() {
        var open = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    function handleNavClick(e) {
        var href = this.getAttribute('href');
        if (href && href.charAt(0) === '#') {
            e.preventDefault();
            var target = document.getElementById(href.substring(1));
            if (target) {
                closeMobileNav();
                var top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        }
    }

    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section[id], header[id]');
        var pos = window.scrollY + navbar.offsetHeight + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            if (pos >= top && pos < top + section.offsetHeight) {
                var id = section.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }

    // ---- Fade-in animations ----
    function initFadeAnimations() {
        var els = document.querySelectorAll('.fade-in');
        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('visible'); });
            return;
        }
        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });
        els.forEach(function (el) { observer.observe(el); });
    }

    // ---- Theme toggle ----
    function wireThemeToggle() {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var root = document.documentElement;
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
        });
    }

    // ---- Init ----
    function init() {
        wireThemeToggle();
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        window.addEventListener('scroll', updateActiveNavLink, { passive: true });

        if (navToggle) navToggle.addEventListener('click', toggleMobileNav);
        navLinks.forEach(function (link) { link.addEventListener('click', handleNavClick); });

        var backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMobileNav();
        });
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileNav();
            }
        });

        initFadeAnimations();
        handleNavScroll();
        updateActiveNavLink();

        // Reveal hero immediately
        var heroEls = document.querySelectorAll('.hero .fade-in');
        heroEls.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('visible'); }, 80 + i * 90);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
