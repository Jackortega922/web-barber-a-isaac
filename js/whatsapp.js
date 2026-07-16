/**
 * whatsapp.js
 * Sistema completo de WhatsApp
 * Filosofía: Centralizado, configurable, sin dependencias
 */

// Configuración por defecto (se sobrescribe con datos del JSON)
let whatsappConfig = {
    phone: '519XXXXXXXXX',
    defaultMessage: '¡Hola! Vi tu página web y quiero reservar una cita.',
    messages: {
        reserva: '¡Hola! Quiero reservar una cita para un corte.',
        consulta: '¡Hola! Me gustaría consultar por los servicios y precios.',
        personalizado: '¡Hola! Necesito un servicio personalizado, ¿pueden ayudarme?'
    }
};

export async function initWhatsApp() {
    // Cargar configuración desde JSON
    await loadWhatsAppConfig();

    // Inicializar todos los botones de WhatsApp
    initWhatsAppButtons();

    // Inicializar botón flotante de WhatsApp
    initFloatingButton();

    // Inicializar mensajes de servicio
    initServiceMessages();
}

async function loadWhatsAppConfig() {
    try {
        const response = await fetch('data/whatsapp.json');
        if (response.ok) {
            const data = await response.json();
            whatsappConfig = { ...whatsappConfig, ...data };
        }
    } catch (error) {
        console.warn('Usando configuración por defecto de WhatsApp');
    }
}

function initWhatsAppButtons() {
    // Botón principal del Hero
    const heroBtn = document.getElementById('btnWhatsApp');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            openWhatsApp(whatsappConfig.messages.reserva);
        });
    }

    // Botón secundario de Servicios
    const servicesBtn = document.getElementById('btnWhatsAppServices');
    if (servicesBtn) {
        servicesBtn.addEventListener('click', () => {
            openWhatsApp(whatsappConfig.messages.consulta);
        });
    }

    // Todos los botones con clase whatsapp-trigger
    document.querySelectorAll('.whatsapp-trigger').forEach(button => {
        button.addEventListener('click', (e) => {
            const messageType = button.dataset.whatsappMessage || 'default';
            const message = whatsappConfig.messages[messageType] || whatsappConfig.defaultMessage;

            // Si el botón está en una tarjeta de servicio
            const serviceCard = button.closest('[data-service-id]');
            if (serviceCard) {
                const serviceName = serviceCard.querySelector('h3')?.textContent;
                const servicePrice = serviceCard.querySelector('[data-service-price]')?.dataset.servicePrice;
                if (serviceName) {
                    const customMessage = `¡Hola! Me interesa el servicio "${serviceName}" (S/${servicePrice}). ¿Tienen disponibilidad?`;
                    openWhatsApp(customMessage);
                    return;
                }
            }

            openWhatsApp(message);
        });
    });
}

function initFloatingButton() {
    // Verificar si ya existe el botón flotante
    if (document.getElementById('whatsappFloat')) return;

    // Crear botón flotante
    const floatButton = document.createElement('a');
    floatButton.id = 'whatsappFloat';
    floatButton.href = '#';
    floatButton.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-medium rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105';
    floatButton.setAttribute('aria-label', 'Contactar por WhatsApp');

    floatButton.innerHTML = `
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
        </svg>
        <span class="hidden sm:inline">Reservar cita</span>
    `;

    floatButton.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp(whatsappConfig.messages.reserva);
    });

    document.body.appendChild(floatButton);
}

function initServiceMessages() {
    // Agregar listeners a tarjetas de servicio que no tengan botón específico
    document.querySelectorAll('[data-service-id]').forEach(card => {
        // Solo si no tiene ya un botón de WhatsApp
        if (!card.querySelector('.whatsapp-trigger')) {
            card.addEventListener('click', (e) => {
                // No activar si se hizo clic en un botón o enlace
                if (e.target.closest('button') || e.target.closest('a')) return;

                const serviceName = card.querySelector('h3')?.textContent;
                const servicePrice = card.dataset.servicePrice;

                if (serviceName && servicePrice) {
                    const message = `¡Hola! Me interesa el servicio "${serviceName}" (S/${servicePrice}). ¿Tienen disponibilidad?`;
                    openWhatsApp(message);
                }
            });

            // Agregar cursor pointer para indicar que es clickeable
            card.style.cursor = 'pointer';
        }
    });
}

function openWhatsApp(message) {
    // Limpiar el número de teléfono
    const phone = whatsappConfig.phone.replace(/[\s\+\-\(\)]/g, '');

    // Codificar el mensaje
    const encodedMessage = encodeURIComponent(message);

    // Construir URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}