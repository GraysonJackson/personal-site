// Personal Site — Y2K Revival
// Custom cursor, theme toggle, scroll animations, page transitions

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursorTrail');
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon = document.getElementById('toggleIcon');

    // ─── Custom Cursor ───
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth trail follow
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.12;
        trailY += (mouseY - trailY) * 0.12;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Cursor hover state on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .nav-link');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // ─── Theme Toggle ───
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.body.classList.add('dark');
        toggleIcon.textContent = '☀';
    } else {
        toggleIcon.textContent = '☾';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        toggleIcon.textContent = isDark ? '☀' : '☾';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ─── Scroll Animations ───
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.section, .project-card, .process-step');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(section);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .project-card:nth-child(2) { transition-delay: 0.1s; }
        .project-card:nth-child(3) { transition-delay: 0.2s; }
        .project-card:nth-child(4) { transition-delay: 0.3s; }
        .project-card:nth-child(5) { transition-delay: 0.4s; }
        .process-step:nth-child(2) { transition-delay: 0.1s; }
        .process-step:nth-child(3) { transition-delay: 0.2s; }
        .process-step:nth-child(4) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);

    // ─── Smooth Nav Scroll ───
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── Chrome Text Shimmer ───
    const chromeTexts = document.querySelectorAll('.chrome-text');
    let shimmerAngle = 0;

    function updateShimmer() {
        shimmerAngle += 0.3;
        chromeTexts.forEach(el => {
            el.style.backgroundPosition = `${shimmerAngle}% 50%`;
        });
        requestAnimationFrame(updateShimmer);
    }

    chromeTexts.forEach(el => {
        el.style.backgroundSize = '200% auto';
    });
    updateShimmer();

    // ─── Reduced Motion ───
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable cursor animation
        cursor.style.transition = 'none';
        cursorTrail.style.transition = 'none';

        // Show all sections immediately
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'none';
            section.style.transition = 'none';
        });

        // Stop shimmer
        chromeTexts.forEach(el => {
            el.style.animation = 'none';
        });
    }
});