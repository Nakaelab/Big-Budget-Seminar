/**
 * Lucide Iconsの初期化
 * HTML内の data-lucide 属性をアイコンに置き換えます
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.card, .mission-box, .section-title, .link-card, .footer-contact');

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-up');
        // Add slight stagger for link cards if they are siblings
        if (el.classList.contains('link-card')) {
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        observer.observe(el);
    });
});
