/**
 * app.js
 * Punto de entrada del proyecto
 * Filosofía: Un módulo, una responsabilidad
 */

import { initMenu } from './menu.js';
import { initScroll } from './scroll.js';
import { initAnimations } from './animations.js';
import { initWhatsApp } from './whatsapp.js';
import { initCatalog } from './catalog.js';

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initScroll();
    initAnimations();
    initWhatsApp();
    initCatalog();
});