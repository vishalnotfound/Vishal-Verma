/* ========================================
   VISHAL VERMA - Portfolio Scripts
   Minimal Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    ThemeToggle.init();
    ScrollAnimations.init();
    SmoothScroll.init();
});

/* ----------------------------------------
   Theme Toggle (Dark Mode)
   ---------------------------------------- */
const ThemeToggle = {
    init() {
        const toggle = document.getElementById('themeToggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        // Set initial theme
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Toggle theme on click
        toggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Add rotation animation to toggle button
            toggle.style.transform = 'scale(1.1) rotate(360deg)';
            setTimeout(() => {
                toggle.style.transform = '';
            }, 300);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
};

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
