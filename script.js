/**
 * Lucide Iconsの初期化
 * HTML内の data-lucide 属性をアイコンに置き換えます
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

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
    const animatedElements = document.querySelectorAll('.card:not(.hero-sequence), .mission-box, .section-title, .link-card, .footer-contact, .stats-trigger');

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-up');
        // Add slight stagger for link cards or stats triggers if they are siblings
        if (el.classList.contains('link-card') || el.classList.contains('stats-trigger')) {
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        observer.observe(el);
    });

    // --- Modal Logic ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const triggers = document.querySelectorAll('.stats-trigger');
    const closeBtn = document.querySelector('.modal-close');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            modal.style.display = 'block';
            // Slight delay to allow display:block to apply before adding class for opacity transition
            requestAnimationFrame(() => {
                modal.classList.add('show');
            });

            // Clear existing content
            const contentWrapper = modal.querySelector('.modal-content-wrapper');
            contentWrapper.innerHTML = ''; // Reset

            // Handle multiple images
            const imgPaths = this.getAttribute('data-img').split(',');
            imgPaths.forEach(path => {
                const img = document.createElement('img');
                img.src = path.trim();
                img.className = 'modal-content';
                contentWrapper.appendChild(img);
            });

            // Add caption
            const caption = document.createElement('div');
            caption.id = 'modalCaption';
            caption.textContent = this.getAttribute('data-caption');
            contentWrapper.appendChild(caption);

            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300); // Wait for transition
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
