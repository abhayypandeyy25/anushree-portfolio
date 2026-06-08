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

    // ---- Orbital timeline (AI solution towers) ----
    var ORBITAL_ICONS = {
        chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
        support: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
        speech: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="4" y1="10" x2="4" y2="14"/><line x1="8" y1="6" x2="8" y2="18"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="16" y1="6" x2="16" y2="18"/><line x1="20" y1="10" x2="20" y2="14"/></svg>',
        dex: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l1.9 4.9L19 9.8l-3.8 3.4L16.2 19 12 16.2 7.8 19l1-5.8L5 9.8l5.1-1.9z"/></svg>'
    };
    var ORBITAL_TOWERS = [
        { id: 1, title: 'Agentic AI Chatbots', icon: 'chat', status: 'Live', metric: '60% IT overhead cut', role: 'Design Partner Lead, BigFix AEX', content: 'As Design Partner Lead for BigFix AEX, I shaped the solution design and functional architecture behind self-healing agents that resolve IT tickets with no human in the loop. Automating end-to-end resolution cut IT resource overhead by 60% across enterprise deployments.', relatedIds: [2] },
        { id: 2, title: 'Conversational IT Support', icon: 'support', status: 'Live', metric: 'Gartner MQ partner onboarded', role: 'Productization & co-sell', content: 'I brought conversational IT support to market by onboarding Rezolve.ai and scaling co-sell motions alongside Microsoft Copilot and Moveworks. My work turned raw partner technology into an enterprise-ready product — owning its positioning, pricing, and go-to-market.', relatedIds: [1, 3] },
        { id: 3, title: 'AI Speech Assist', icon: 'speech', status: 'Live', metric: '2 frontier voice-AI partners', role: 'Partner onboarding & GTM', content: 'I onboarded Krisp.ai (Forbes AI 50) and Sanas.ai (Google-backed) and productized real-time noise cancellation and accent translation into AI Speech Assist. I owned the partner relationships and the commercial model that made frontier voice AI sellable to global enterprises.', relatedIds: [2, 4] },
        { id: 4, title: 'Digital Experience (DEX)', icon: 'dex', status: 'Live', metric: '"Everyday AI" framework', role: 'Framework & pricing strategy', content: 'I conceptualized "Everyday AI," a proprietary framework for embedding AI across the digital workplace, and defined its vision, roadmap, and B2B go-to-market. I also pioneered consumption-based pricing that scales with each customer\'s AI maturity.', relatedIds: [3] }
    ];

    function escapeHtml(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function initOrbital() {
        var stage = document.getElementById('orbitalStage');
        if (!stage) return;
        var panel = document.getElementById('orbitalPanel');
        var orbit = stage.querySelector('.orbital-orbit');
        var nodes = Array.prototype.slice.call(stage.querySelectorAll('.orbital-node'));
        if (!nodes.length) return;

        var byId = {};
        ORBITAL_TOWERS.forEach(function (t) { byId[t.id] = t; });
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var rotation = 0, autoRotate = !reduce, activeId = null, R = 180;

        nodes.forEach(function (btn) {
            var t = byId[parseInt(btn.getAttribute('data-id'), 10)];
            if (!t) return;
            btn.innerHTML = '<span class="node-dot">' + ORBITAL_ICONS[t.icon] + '</span>' +
                '<span class="node-label">' + escapeHtml(t.title) + '</span>';
            btn.setAttribute('aria-label', t.title);
            btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(t.id); });
        });

        function computeR() {
            var w = stage.clientWidth, h = stage.clientHeight;
            R = Math.max(96, Math.min(w, h) / 2 - 72);
            if (orbit) { orbit.style.width = orbit.style.height = (R * 2) + 'px'; }
        }

        function position() {
            var n = nodes.length;
            nodes.forEach(function (btn, i) {
                var ang = (((i / n) * 360 + rotation) % 360) * Math.PI / 180;
                var x = R * Math.cos(ang), y = R * Math.sin(ang);
                btn.style.transform = 'translate(-50%,-50%) translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
                if (parseInt(btn.getAttribute('data-id'), 10) !== activeId) {
                    var depth = 0.45 + 0.55 * ((1 + Math.sin(ang)) / 2);
                    // dim other nodes while a panel is open so they recede behind it
                    btn.style.opacity = (activeId === null ? depth : 0.22).toFixed(2);
                    btn.style.zIndex = String(Math.round(100 + 40 * Math.sin(ang)));
                } else {
                    btn.style.opacity = '1';
                    btn.style.zIndex = '210';
                }
            });
        }

        function loop() {
            if (autoRotate) { rotation = (rotation + 0.25) % 360; position(); }
            requestAnimationFrame(loop);
        }

        function centerOn(id) {
            var idx = ORBITAL_TOWERS.findIndex(function (t) { return t.id === id; });
            rotation = 270 - (idx / nodes.length) * 360;
            position();
        }

        function renderPanel(t) {
            var related = t.relatedIds.map(function (rid) {
                return '<button type="button" class="op-related-btn" data-goto="' + rid + '">' +
                    escapeHtml(byId[rid].title) + ' →</button>';
            }).join('');
            panel.innerHTML =
                '<div class="op-top"><span class="op-status">' + escapeHtml(t.status) + '</span>' +
                '<button type="button" class="op-close" aria-label="Close">×</button></div>' +
                '<h3 class="op-title">' + escapeHtml(t.title) + '</h3>' +
                '<p class="op-content">' + escapeHtml(t.content) + '</p>' +
                '<div class="op-meta"><span class="op-impact">' + escapeHtml(t.metric) + '</span>' +
                '<span class="op-role">My role — ' + escapeHtml(t.role) + '</span></div>' +
                (related ? '<div class="op-related"><div class="op-related-label">Connected towers</div>' +
                    '<div class="op-related-btns">' + related + '</div></div>' : '');
            panel.hidden = false;
            panel.querySelector('.op-close').addEventListener('click', function (e) { e.stopPropagation(); close(); });
            Array.prototype.forEach.call(panel.querySelectorAll('.op-related-btn'), function (b) {
                b.addEventListener('click', function (e) { e.stopPropagation(); toggle(parseInt(b.getAttribute('data-goto'), 10)); });
            });
        }

        function toggle(id) {
            if (activeId === id) { close(); return; }
            activeId = id;
            autoRotate = false;
            stage.classList.add('paused');
            nodes.forEach(function (btn) {
                var nid = parseInt(btn.getAttribute('data-id'), 10);
                btn.classList.toggle('is-active', nid === id);
                btn.classList.toggle('is-related', byId[id].relatedIds.indexOf(nid) !== -1);
            });
            centerOn(id);
            renderPanel(byId[id]);
        }

        function close() {
            activeId = null;
            nodes.forEach(function (btn) { btn.classList.remove('is-active', 'is-related'); });
            if (panel) { panel.hidden = true; panel.innerHTML = ''; }
            autoRotate = !reduce;
            position();
        }

        stage.addEventListener('click', function (e) {
            if (e.target === stage || e.target.classList.contains('orbital-orbit')) close();
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && activeId !== null) close(); });
        window.addEventListener('resize', function () { computeR(); position(); });

        computeR();
        position();
        if (!reduce) requestAnimationFrame(loop);
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
        initOrbital();
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
