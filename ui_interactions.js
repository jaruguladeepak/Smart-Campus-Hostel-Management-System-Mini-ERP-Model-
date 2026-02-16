/**
 * UI Interactions & Animations
 * - Ripple Effect
 * - 3D Tilt Effect
 * - Staggered Animations
 * - Keyboard Shortcuts
 */

document.addEventListener('DOMContentLoaded', () => {
    initRippleEffect();
    initTiltEffect();
    initKeyboardShortcuts();
    animateEntrance();
});

// --- RIPPLE EFFECT ---
function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn, .menu-item');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });
}

// --- 3D TILT EFFECT ---
function initTiltEffect() {
    // Disable on mobile/tablet for better performance
    if (window.innerWidth < 1000) return;

    const cards = document.querySelectorAll('.card, .stat-card, .profile-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // REDUCED ROTATION: from 5 to 2 degrees for subtlety
            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.005)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });

        // Add transition for smooth return
        card.style.transition = 'transform 0.2s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
    });
}

// --- KEYBOARD SHORTCUTS ---
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            const closeModalBtn = document.querySelector('.modal .secondary'); // Assuming secondary btn is CLOSE
            if (closeModalBtn) closeModalBtn.click();
        }

        // Enter to submit primary forms (Login, Search)
        if (e.key === 'Enter') {
            const primaryBtn = document.querySelector('button.primary-action, .login-btn');
            if (primaryBtn) primaryBtn.click();
        }
    });

    // Add focus outlines for accessibility
    const inputs = document.querySelectorAll('input, select, textarea, button, a');
    inputs.forEach(el => {
        el.addEventListener('focus', () => {
            el.classList.add('focused-ring');
        });
        el.addEventListener('blur', () => {
            el.classList.remove('focused-ring');
        });
    });
}

// --- ENTRANCE ANIMATIONS ---
function animateEntrance() {
    const elements = document.querySelectorAll('.card, .stat-card, tr, .menu-item');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index); // Staggered delay
    });
}
