/* ========================================
   VISHAL VERMA - Portfolio Scripts
   Minimal Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    ThemeToggle.init();
    ScrollAnimations.init();
    SmoothScroll.init();
    ScrollProgress.init();
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

/* ----------------------------------------
   Scroll Progress Indicator
   ---------------------------------------- */
const ScrollProgress = {
    init() {
        const fill = document.getElementById('scrollFill');
        const label = document.getElementById('scrollLabel');
        const dots = document.querySelectorAll('.progress-dot');
        const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

        if (!fill || !label) return;

        // Click-to-scroll on dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sectionId = dot.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Update on scroll
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
            const percent = Math.round(progress * 100);

            // Update fill bar and label
            fill.style.height = percent + '%';
            label.textContent = percent + '%';

            // Update active dot based on which section is in view
            let activeIndex = 0;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.4) {
                        activeIndex = i;
                        break;
                    }
                }
            }

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        };

        window.addEventListener('scroll', update, { passive: true });
        update(); // initial call
    }
};
