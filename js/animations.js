/**
 * animations.js
 * Sistema de animaciones por intersección
 * Filosofía: Simple, reutilizable, sin dependencias
 */

export function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animate;
                const delay = element.dataset.delay || 0;

                // Aplicar animación con delay
                setTimeout(() => {
                    element.classList.remove('opacity-0', 'translate-y-4');
                    element.classList.add('opacity-100', 'translate-y-0');
                }, parseInt(delay));

                // Dejar de observar después de animar
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Iniciar observación
    animatedElements.forEach(element => {
        // Estado inicial
        element.classList.add('transition-all', 'duration-700', 'ease-out');
        observer.observe(element);
    });
}