/**
 * scroll.js
 * Navegación suave + efecto navbar al hacer scroll
 */
export function initScroll() {
    // Scroll suave al hacer clic en enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de opacidad en navbar al hacer scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.backgroundColor = window.scrollY > 100
                ? 'rgba(0, 0, 0, 0.98)'
                : 'rgb(0, 0, 0)';
        });
    }
}