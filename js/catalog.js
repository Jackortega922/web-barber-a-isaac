/**
 * catalog.js
 * Sistema de filtrado del catálogo
 * Filosofía: Reutilizable, preparado para carga dinámica (V2)
 */

export function initCatalog() {
    const filterButtons = document.querySelectorAll('#catalogFilters [data-filter]');
    const catalogCards = document.querySelectorAll('#catalogGrid [data-corte-id]');

    if (!filterButtons.length || !catalogCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Actualizar estado visual de los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-amber-500', 'text-gray-900');
                btn.classList.add('bg-white/5', 'text-gray-300');
                btn.setAttribute('aria-selected', 'false');
            });

            button.classList.remove('bg-white/5', 'text-gray-300');
            button.classList.add('bg-amber-500', 'text-gray-900');
            button.setAttribute('aria-selected', 'true');

            // Filtrar tarjetas
            catalogCards.forEach(card => {
                const category = card.dataset.categoria;

                if (filter === 'todos' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-fadeIn');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-fadeIn');
                }
            });
        });
    });

    // Botón "Ver más estilos"
    const loadMoreBtn = document.getElementById('loadMoreCatalog');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Preparado para V2: Cargar más desde JSON
            console.log('Cargar más estilos - Funcionalidad V2');
        });
    }
}