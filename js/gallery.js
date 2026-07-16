/**
 * gallery.js
 * Sistema de galería con lightbox preparado
 * Filosofía: Interacción visual, preparado para V2
 */

export function initGallery() {
    const galleryItems = document.querySelectorAll('#galleryGrid [data-gallery-id]');

    if (!galleryItems.length) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const galleryId = item.dataset.galleryId;
            const category = item.dataset.galleryCategory;

            // Preparado para V2: Lightbox completo
            console.log(`Galería item ${galleryId} - Categoría: ${category}`);

            // Obtener datos de la imagen clickeada
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent;
            const categorySpan = item.querySelector('span')?.textContent;

            if (img && title) {
                openLightbox(img.src, img.alt, title, categorySpan);
            }
        });
    });

    function openLightbox(src, alt, title, category) {
        // Estructura preparada para V2 con lightbox completo
        // Por ahora mostramos un lightbox básico

        const existingLightbox = document.getElementById('galleryLightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }

        const lightbox = document.createElement('div');
        lightbox.id = 'galleryLightbox';
        lightbox.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-label', 'Visor de imagen');

        lightbox.innerHTML = `
            <button 
                class="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Cerrar visor"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            
            <div class="max-w-5xl max-h-[90vh] relative">
                <img 
                    src="${src}" 
                    alt="${alt}"
                    class="max-w-full max-h-[85vh] object-contain rounded-lg"
                >
                
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                    <span class="inline-block px-3 py-1 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-400 text-xs font-medium rounded-full mb-2">
                        ${category}
                    </span>
                    <h3 class="text-xl font-bold text-white">${title}</h3>
                </div>
            </div>
        `;

        // Cerrar lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.closest('button')) {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        });

        // Cerrar con tecla Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                lightbox.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        document.body.style.overflow = 'hidden';
        document.body.appendChild(lightbox);
    }
}