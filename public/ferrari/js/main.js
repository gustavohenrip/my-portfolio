(function() {
    'use strict';

    const CONFIG = {
        cursorSize: 20,
        cursorFollowerSize: 40,
        scrollSpeed: 1,
        magneticForce: 0.3,
        parallaxIntensity: 0.1
    };

    let lenis;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let isMouseMoving = false;
    let animationsInitialized = false;
    let rafId = null;

    const cursor = document.getElementById('cursor');
    const cursorDot = cursor ? cursor.querySelector('.cursor-dot') : null;
    const cursorCircle = cursor ? cursor.querySelector('.cursor-circle') : null;

    const checkDevice = (() => {
        let cached = null;
        return () => {
            if (cached) return cached;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
            cached = { isMobile, isTouch };
            return cached;
        };
    })();

    function initAnimationsOnce() {
        if (animationsInitialized) return;
        animationsInitialized = true;
        document.body.classList.add('animations-ready');
        initAnimations();
    }

    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const preloaderProgress = preloader ? preloader.querySelector('.progress-fill') : null;
        const preloaderChars = preloader ? preloader.querySelectorAll('.preloader-title .char') : [];
        const progressNumber = preloader ? preloader.querySelector('.progress-number') : null;
        
        if (!preloader) {
            initAnimationsOnce();
            return;
        }

        let progress = 0;
        const duration = 2500;
        const startTime = Date.now();

        gsap.set(preloaderChars, { y: 100, opacity: 0 });
        gsap.to(preloaderChars, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out'
        });

        function updateProgress() {
            const elapsed = Date.now() - startTime;
            progress = Math.min((elapsed / duration) * 100, 100);
            
            if (preloaderProgress) {
                preloaderProgress.style.width = progress + '%';
            }
            if (progressNumber) {
                progressNumber.textContent = Math.round(progress);
            }

            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                completePreloader();
            }
        }

        function completePreloader() {
            gsap.to(preloaderChars, {
                y: -100,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power3.in'
            });

            gsap.to(preloader, {
                yPercent: -100,
                duration: 1,
                delay: 0.5,
                ease: 'power4.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    initAnimationsOnce();
                }
            });
        }

        requestAnimationFrame(updateProgress);
        setTimeout(() => {
            if (!animationsInitialized) {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
                initAnimationsOnce();
            }
        }, duration + 1200);
    }

    function initLenis() {
        const { isMobile, isTouch } = checkDevice();
        
        if (isMobile || isTouch) {
            document.documentElement.style.scrollBehavior = 'smooth';
            document.body.style.overflowY = 'auto';
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflowY = 'auto';
            document.documentElement.style.overflowX = 'hidden';
            
            lenis = {
                scrollTo: (target, options) => {
                    if (typeof target === 'number') {
                        window.scrollTo({ top: target, behavior: 'smooth' });
                    } else if (target instanceof Element) {
                        const offset = options?.offset || 0;
                        const top = target.getBoundingClientRect().top + window.pageYOffset + offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                },
                on: () => {},
                raf: () => {},
                destroy: () => {}
            };
            
            ScrollTrigger.config({ ignoreMobileResize: true });
            ScrollTrigger.normalizeScroll(false);
            
            window.addEventListener('load', () => {
                ScrollTrigger.refresh();
            });
            
            return;
        }

        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    function initCursor() {
        if (!cursor || !cursorDot || !cursorCircle) return;
        if (window.innerWidth < 768) return;

        let ticking = false;
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            isMouseMoving = true;
        }, { passive: true });

        function animateCursor() {
            followerX += (cursorX - followerX) * 0.1;
            followerY += (cursorY - followerY) * 0.1;

            cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
            cursorCircle.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

            rafId = requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverElements = document.querySelectorAll('a, button, .timeline-item, .supercar-card, .moment-item, .nav-year, [data-cursor-hover]');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            }, { passive: true });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            }, { passive: true });
        });

        const magneticElements = document.querySelectorAll('[data-magnetic]');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(el, {
                    x: x * CONFIG.magneticForce,
                    y: y * CONFIG.magneticForce,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }, { passive: true });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            }, { passive: true });
        });
    }

    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menuBtn');
        const fullscreenMenu = document.getElementById('fullscreen-menu');
        const menuLinks = document.querySelectorAll('.menu-link');
        const navProgressFill = document.querySelector('.nav-progress-fill');
        const chapterCurrent = document.querySelector('.chapter-current');
        const sections = document.querySelectorAll('[data-section]');
        let isMenuOpen = false;

        if (navbar) {
            ScrollTrigger.create({
                start: 'top -100',
                onUpdate: (self) => {
                    if (self.direction === 1) {
                        navbar.classList.add('scrolled');
                    } else if (self.scroll() < 100) {
                        navbar.classList.remove('scrolled');
                    }
                }
            });

            ScrollTrigger.create({
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    const progress = self.progress * 100;
                    if (navProgressFill) {
                        navProgressFill.style.width = progress + '%';
                    }
                    
                    if (sections.length > 0 && chapterCurrent) {
                        const scrollPos = window.scrollY + window.innerHeight / 2;
                        let currentSection = 1;
                        
                        sections.forEach((section) => {
                            if (scrollPos >= section.offsetTop) {
                                currentSection = parseInt(section.dataset.section) || 1;
                            }
                        });
                        
                        chapterCurrent.textContent = String(currentSection).padStart(2, '0');
                    }
                }
            });
        }

        if (menuToggle && fullscreenMenu) {
            const menuSocial = document.querySelectorAll('.social-link');
            const menuInfo = document.querySelectorAll('.menu-info span');
            
            menuToggle.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                
                if (isMenuOpen) {
                    fullscreenMenu.classList.add('active');
                    menuToggle.classList.add('active');
                    document.body.classList.add('menu-open');
                    document.body.style.overflow = 'hidden';
                    
                    const tl = gsap.timeline();
                    
                    tl.fromTo('.menu-bg-layer', 
                        { yPercent: -100 },
                        { yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out' }
                    )
                    .fromTo(menuLinks, 
                        { y: 100, opacity: 0, rotateX: -15 },
                        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
                        '-=0.4'
                    )
                    .fromTo(menuSocial,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
                        '-=0.5'
                    )
                    .fromTo(menuInfo,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
                        '-=0.4'
                    );
                } else {
                    const tl = gsap.timeline();
                    
                    tl.to(menuInfo, {
                        y: -20,
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.03,
                        ease: 'power3.in'
                    })
                    .to(menuSocial, {
                        y: -30,
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.03,
                        ease: 'power3.in'
                    }, '-=0.2')
                    .to(menuLinks, {
                        y: -60,
                        opacity: 0,
                        rotateX: 15,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: 'power3.in'
                    }, '-=0.2')
                    .to('.menu-bg-layer', {
                        yPercent: -100,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: 'power4.in',
                        onComplete: () => {
                            fullscreenMenu.classList.remove('active');
                            menuToggle.classList.remove('active');
                            document.body.classList.remove('menu-open');
                            document.body.style.overflow = '';
                        }
                    }, '-=0.3');
                }
            });

            menuLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        
                        if (isMenuOpen) {
                            isMenuOpen = false;
                            const tl = gsap.timeline();
                            
                            tl.to(menuLinks, {
                                y: -60,
                                opacity: 0,
                                rotateX: 15,
                                duration: 0.4,
                                stagger: 0.04,
                                ease: 'power3.in'
                            })
                            .to('.menu-bg-layer', {
                                yPercent: -100,
                                duration: 0.6,
                                stagger: 0.05,
                                ease: 'power4.in',
                                onComplete: () => {
                                    fullscreenMenu.classList.remove('active');
                                    menuToggle.classList.remove('active');
                                    document.body.classList.remove('menu-open');
                                    document.body.style.overflow = '';
                                    
                                    const target = document.querySelector(href);
                                    if (target && lenis) {
                                        lenis.scrollTo(target, { offset: -80 });
                                    }
                                }
                            }, '-=0.3');
                        }
                    }
                });
            });
        }
    }

    function initAnimations() {
        initHeroAnimations();
        initIntroAnimations();
        initQuoteAnimations();
        initTimelineAnimations();
        initSupercarsAnimations();
        initRacingAnimations();
        initMomentsAnimations();
        initLegacyAnimations();
        initParallax();
        initBackToTop();
    }

    function initHeroAnimations() {
        const heroSection = document.querySelector('.section-hero');
        if (!heroSection) return;

        const heroTl = gsap.timeline({ delay: 0.5 });

        gsap.set('.title-word', { y: 120, opacity: 0 });
        gsap.set('.hero-title-decoration', { y: 20, opacity: 0 });
        gsap.set('.hero-subtitle', { y: 30, opacity: 0 });
        gsap.set('.year-digit', { y: 100, opacity: 0 });
        gsap.set('.hero-quote', { y: 20, opacity: 0 });
        gsap.set('.hero-scroll-inner', { y: 20, opacity: 0 });
        gsap.set('.hero-year', { y: 20, opacity: 0 });

        heroTl
            .to('.title-word', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out'
            })
            .to('.hero-title-decoration', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .to('.hero-subtitle', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.year-digit', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.4')
            .to('.hero-quote', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .to('.hero-scroll-inner', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .to('.hero-year', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6');

        gsap.to('.hero-bg-text', {
            xPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.hero-video', {
            scale: 1.3,
            ease: 'none',
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    function initIntroAnimations() {
        const introSection = document.querySelector('.section-intro');
        if (!introSection) return;

        gsap.fromTo('.intro-title .char',
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.03,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: introSection,
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.intro-text',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.intro-text',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('.intro-image-reveal',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: '.intro-image-reveal',
                    start: 'top 75%'
                }
            }
        );

        gsap.fromTo('.intro-stat',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.intro-stats',
                    start: 'top 85%'
                }
            }
        );
    }

    function initQuoteAnimations() {
        const quoteSection = document.querySelector('.section-quote');
        if (!quoteSection) return;

        const q = gsap.utils.selector(quoteSection);

        const quoteTl = gsap.timeline({
            scrollTrigger: {
                trigger: quoteSection,
                start: 'top 60%'
            }
        });

        quoteTl
            .fromTo(q('.quote-text'),
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
            )
            .fromTo(q('.author-block'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=0.6'
            );

        gsap.to(q('.quote-floating-elements .float-element'), {
            y: -50,
            rotation: 15,
            scrollTrigger: {
                trigger: quoteSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    function initTimelineAnimations() {
        const timelineSection = document.querySelector('.section-timeline');
        if (!timelineSection) return;

        gsap.fromTo('.timeline-title-line',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.timeline-header',
                    start: 'top 70%'
                }
            }
        );

        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineTrack = document.querySelector('.timeline-items');
        const timelineContainer = document.querySelector('.timeline-track');
        const progressFill = document.querySelector('.timeline-progress-fill');
        const progressDot = document.querySelector('.timeline-progress-dot');
        const navYears = document.querySelectorAll('.nav-year');
        const yearBg = document.querySelector('.timeline-year-bg');
        
        let currentIndex = 0;
        const itemWidth = 440;
        let isHoveringTimeline = false;

        function updateTimeline(index) {
            if (index < 0 || index >= timelineItems.length) return;
            currentIndex = index;

            const offset = -index * itemWidth;
            gsap.to(timelineTrack, {
                x: offset,
                duration: 0.6,
                ease: 'power3.out'
            });

            timelineItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
                
                gsap.to(item, {
                    scale: i === index ? 1 : 0.95,
                    opacity: i === index ? 1 : 0.4,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });

            const progress = (index / (timelineItems.length - 1)) * 100;
            if (progressFill) {
                gsap.to(progressFill, {
                    width: progress + '%',
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
            if (progressDot) {
                gsap.to(progressDot, {
                    left: progress + '%',
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }

            navYears.forEach((year, i) => {
                year.classList.toggle('active', i === index);
            });

            const activeItem = timelineItems[index];
            const yearText = activeItem?.querySelector('.marker-year')?.textContent || '';
            if (yearBg) {
                gsap.to(yearBg, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        yearBg.textContent = yearText;
                        gsap.to(yearBg, {
                            opacity: 1,
                            duration: 0.3
                        });
                    }
                });
            }
        }

        const prevBtn = document.querySelector('.timeline-nav-btn.prev');
        const nextBtn = document.querySelector('.timeline-nav-btn.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateTimeline(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateTimeline(currentIndex + 1);
            });
        }

        navYears.forEach((year, index) => {
            year.addEventListener('click', () => {
                updateTimeline(index);
            });
        });

        if (timelineContainer) {
            timelineContainer.addEventListener('mouseenter', () => {
                isHoveringTimeline = true;
            });
            
            timelineContainer.addEventListener('mouseleave', () => {
                isHoveringTimeline = false;
            });
            
            timelineContainer.addEventListener('wheel', (e) => {
                if (isHoveringTimeline) {
                    if (e.deltaY > 0 && currentIndex < timelineItems.length - 1) {
                        e.preventDefault();
                        e.stopPropagation();
                        updateTimeline(currentIndex + 1);
                    } else if (e.deltaY < 0 && currentIndex > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        updateTimeline(currentIndex - 1);
                    }
                }
            }, { passive: false });
        }

        let touchStartX = 0;
        let touchEndX = 0;
        
        if (timelineContainer) {
            timelineContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            timelineContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        updateTimeline(currentIndex + 1);
                    } else {
                        updateTimeline(currentIndex - 1);
                    }
                }
            }, { passive: true });
        }

        updateTimeline(0);
    }

    function initSupercarsAnimations() {
        const supercarsSection = document.querySelector('.section-supercars');
        if (!supercarsSection) return;

        gsap.fromTo('.supercars-title',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.supercars-header',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.supercars-description',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.supercars-header',
                    start: 'top 60%'
                }
            }
        );

        const galleryTrack = document.querySelector('.gallery-track');
        const galleryWrapper = document.querySelector('.gallery-wrapper');
        const supercarCards = document.querySelectorAll('.supercar-card');
        const progressFill = document.querySelector('.gallery-progress-fill');
        const counterCurrent = document.querySelector('.counter-current');
        const counterTotal = document.querySelector('.counter-total');
        
        let galleryIndex = 0;
        const cardWidth = 432;
        let isHoveringGallery = false;

        if (counterTotal && supercarCards.length > 0) {
            counterTotal.textContent = String(supercarCards.length).padStart(2, '0');
        }

        function updateGallery(index) {
            if (index < 0 || index >= supercarCards.length) return;
            galleryIndex = index;

            const offset = -index * cardWidth;
            gsap.to(galleryTrack, {
                x: offset,
                duration: 0.6,
                ease: 'power3.out'
            });

            supercarCards.forEach((card, i) => {
                gsap.to(card, {
                    scale: i === index ? 1 : 0.95,
                    opacity: i === index ? 1 : 0.6,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });

            const progress = ((index + 1) / supercarCards.length) * 100;
            if (progressFill) {
                gsap.to(progressFill, {
                    width: progress + '%',
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
            if (counterCurrent) {
                gsap.to(counterCurrent, {
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        counterCurrent.textContent = String(index + 1).padStart(2, '0');
                        gsap.to(counterCurrent, {
                            opacity: 1,
                            duration: 0.15
                        });
                    }
                });
            }
        }

        const prevBtn = document.querySelector('.gallery-btn.gallery-prev');
        const nextBtn = document.querySelector('.gallery-btn.gallery-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateGallery(galleryIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateGallery(galleryIndex + 1);
            });
        }

        if (galleryWrapper) {
            galleryWrapper.addEventListener('mouseenter', () => {
                isHoveringGallery = true;
            });
            
            galleryWrapper.addEventListener('mouseleave', () => {
                isHoveringGallery = false;
            });
            
            galleryWrapper.addEventListener('wheel', (e) => {
                if (isHoveringGallery) {
                    if (e.deltaY > 0 && galleryIndex < supercarCards.length - 1) {
                        e.preventDefault();
                        e.stopPropagation();
                        updateGallery(galleryIndex + 1);
                    } else if (e.deltaY < 0 && galleryIndex > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        updateGallery(galleryIndex - 1);
                    }
                }
            }, { passive: false });
        }

        let touchStartX = 0;
        let touchEndX = 0;
        
        if (galleryWrapper) {
            galleryWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            galleryWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        updateGallery(galleryIndex + 1);
                    } else {
                        updateGallery(galleryIndex - 1);
                    }
                }
            }, { passive: true });
        }

        updateGallery(0);
    }

    function initRacingAnimations() {
        const racingSection = document.querySelector('.section-racing');
        if (!racingSection) return;

        gsap.fromTo('.racing-title-line',
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.racing-header',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.racing-enzo-quote',
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.racing-enzo-quote',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('.racing-text',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.racing-text',
                    start: 'top 85%'
                }
            }
        );

        gsap.fromTo('.stack-item',
            { y: 80, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out',
                force3D: true,
                scrollTrigger: {
                    trigger: '.racing-image-stack',
                    start: 'top 75%',
                    fastScrollEnd: true
                }
            }
        );

        gsap.fromTo('.achievement',
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.racing-achievements',
                    start: 'top 75%'
                }
            }
        );

        const achievementNumbers = document.querySelectorAll('.achievement-number');
        achievementNumbers.forEach(num => {
            const finalValue = parseInt(num.dataset.count) || 0;
            
            ScrollTrigger.create({
                trigger: num,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(num, {
                        textContent: finalValue,
                        duration: 2.5,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            num.textContent = Math.round(this.targets()[0].textContent);
                        }
                    });
                },
                once: true
            });
        });
    }

    function initMomentsAnimations() {
        const momentsSection = document.querySelector('.section-moments');
        if (!momentsSection) return;

        gsap.fromTo('.moments-title',
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.moments-header',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.moment-card',
            { y: 100, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.moments-grid',
                    start: 'top 75%'
                }
            }
        );
    }

    function initLegacyAnimations() {
        const legacySection = document.querySelector('.section-legacy');
        if (!legacySection) return;

        gsap.fromTo('.legacy-title-line',
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.legacy-title',
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo('.legacy-subtitle',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.legacy-subtitle',
                    start: 'top 85%'
                }
            }
        );

        gsap.fromTo('.legacy-cta',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.legacy-cta',
                    start: 'top 85%'
                }
            }
        );

        gsap.fromTo('.legacy-footer',
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.legacy-footer',
                    start: 'top 90%'
                }
            }
        );

        gsap.fromTo('.legacy-description',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.legacy-description',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('.legacy-stat',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.legacy-stats',
                    start: 'top 80%'
                }
            }
        );
    }

    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.1;
            
            gsap.to(el, {
                yPercent: -100 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.closest('section') || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    function initBackToTop() {
        const backToTop = document.querySelector('.footer-back-top');
        if (!backToTop) return;

        ScrollTrigger.create({
            start: 'top -500',
            onUpdate: (self) => {
                if (self.scroll() > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });

        backToTop.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 2 });
        });
    }

    function init() {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ limitCallbacks: true });
        initLenis();
        initCursor();
        initNavbar();
        initPreloader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        requestIdleCallback ? requestIdleCallback(init) : setTimeout(init, 1);
    }

})();
