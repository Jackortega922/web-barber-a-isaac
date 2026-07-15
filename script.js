/*
 * ============================================
 * CONFIGURACIÓN PRINCIPAL DE LA BARBERÍA
 * ============================================
 * Este archivo contiene toda la funcionalidad JavaScript
 * para la página web de la barbería
 */

// Número de teléfono para WhatsApp
// Formato: código de país + número de teléfono (sin el signo +)
// IMPORTANTE: Cambia este número por el número real de la barbería
const NUMERO_TELEFONO = '51970134565'; // Ejemplo: 51 (Perú) + 1234567890

/*
 * ============================================
 * FUNCIÓN PARA CONTACTAR POR WHATSAPP
 * ============================================
 * Esta función se ejecuta cuando el usuario hace clic
 * en cualquier botón de WhatsApp de la página
 * 
 * Funcionamiento:
 * 1. Define un mensaje predefinido
 * 2. Codifica el mensaje para que sea válido en una URL
 * 3. Abre WhatsApp Web o la app en una nueva pestaña
 */
function contactarWhatsApp() {
    // Mensaje que aparecerá en el chat de WhatsApp
    const mensaje = 'Hola, me gustaría agendar una cita en Barbería ISAAC. ¿Podrían darme información?';

    // Creamos la URL de WhatsApp con el número y mensaje
    // encodeURIComponent() convierte el texto en formato seguro para URL
    const url = `https://wa.me/${NUMERO_TELEFONO}?text=${encodeURIComponent(mensaje)}`;

    // Abrimos la URL en una nueva pestaña
    window.open(url, '_blank');
}

/*
 * ============================================
 * GESTIÓN DEL MENÚ MÓVIL (HAMBURGUESA)
 * ============================================
 * Controla la apertura y cierre del menú en dispositivos móviles
 */

// Obtenemos referencias a los elementos del DOM
const menuBtn = document.getElementById('menuBtn');     // Botón hamburguesa
const mobileMenu = document.getElementById('mobileMenu'); // Menú desplegable

// Evento click en el botón hamburguesa
menuBtn.addEventListener('click', () => {
    // Alternamos la clase 'hidden' para mostrar/ocultar el menú
    // classList.toggle() agrega la clase si no existe, o la quita si existe
    mobileMenu.classList.toggle('hidden');
});

/*
 * Cerrar el menú móvil al hacer clic en cualquier enlace
 * Mejora la experiencia de usuario cerrando automáticamente el menú
 */
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        // Ocultamos el menú agregando la clase 'hidden'
        mobileMenu.classList.add('hidden');
    });
});

/*
 * ============================================
 * NAVEGACIÓN SUAVE (SMOOTH SCROLL)
 * ============================================
 * Hace que los clics en enlaces internos se desplacen suavemente
 * en lugar de saltar bruscamente a la sección
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevenimos el comportamiento predeterminado del enlace
        e.preventDefault();

        // Obtenemos el elemento de destino usando el href del enlace
        const target = document.querySelector(this.getAttribute('href'));

        // Si existe el elemento destino, hacemos scroll suave hacia él
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // Desplazamiento suave
                block: 'start'      // Alinea el elemento al inicio de la ventana
            });
        }
    });
});

/*
 * ============================================
 * ANIMACIONES AL HACER SCROLL
 * ============================================
 * Usa Intersection Observer para detectar cuando los elementos
 * son visibles y aplicar animaciones de entrada
 */

// Configuración del observador
const observerOptions = {
    threshold: 0.1,    // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Margen para activar un poco antes
};

// Creamos el observador con un callback
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Si el elemento está intersectando (visible)
        if (entry.isIntersecting) {
            // Hacemos visible el elemento y lo movemos a su posición original
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/*
 * Aplicamos la animación a todas las tarjetas de servicios
 * Inicialmente las ocultamos y desplazamos hacia abajo
 */
document.querySelectorAll('.bg-gray-900').forEach(el => {
    // Estado inicial: invisible y desplazada 30px hacia abajo
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out'; // Transición suave

    // Observamos el elemento para animarlo cuando sea visible
    observer.observe(el);
});

/*
 * ============================================
 * EFECTO DE SCROLL EN LA BARRA DE NAVEGACIÓN
 * ============================================
 * Cambia la opacidad del fondo del navbar cuando el usuario
 * hace scroll hacia abajo
 */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');

    // Si el scroll es mayor a 100px, hacemos el fondo más opaco
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
    } else {
        // Si está arriba, volvemos a la opacidad original
        navbar.style.backgroundColor = 'rgb(0, 0, 0)';
    }
});

/*
 * ============================================
 * EFECTOS HOVER EN BOTONES DE WHATSAPP
 * ============================================
 * Mejora la interactividad visual de los botones de contacto
 */
const whatsappBtn = document.querySelector('button[onclick="contactarWhatsApp()"]');

if (whatsappBtn) {
    // Cuando el mouse entra en el botón
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.05)'; // Aumenta ligeramente
    });

    // Cuando el mouse sale del botón
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)'; // Vuelve al tamaño normal
    });
}