/**
 * footer.js
 * Sistema de footer dinámico
 * Filosofía: Automatizar elementos que cambian
 */

export function initFooter() {
    // Actualizar año actual automáticamente
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Inicializar botones de WhatsApp en el footer
    initFooterWhatsApp();
}

function initFooterWhatsApp() {
    // Los botones con clase whatsapp-trigger ya son manejados por whatsapp.js
    // Esta función está preparada para lógica específica del footer si se necesita en V2
    const footerWhatsAppBtns = document.querySelectorAll('footer .whatsapp-trigger');

    footerWhatsAppBtns.forEach(btn => {
        // Preparado para analytics o tracking en V2
        btn.addEventListener('click', () => {
            console.log('Footer WhatsApp click - Preparado para tracking V2');
        });
    });
}