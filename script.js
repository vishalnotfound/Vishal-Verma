/* ========================================
   VISHAL VERMA - Portfolio Scripts
   Minimal Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    ScrollAnimations.init();
    SmoothScroll.init();
});

/* ----------------------------------------
   Scroll Animations
   ---------------------------------------- */
const ScrollAnimations = {
    init() {
        const animatedElements = document.querySelectorAll(
            '.about-text, .project, .process-item, .skill-item'
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `fadeUp 0.6s ease ${index * 0.05}s forwards`;
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }
};

/* ----------------------------------------
   Smooth Scroll
   ---------------------------------------- */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
};
