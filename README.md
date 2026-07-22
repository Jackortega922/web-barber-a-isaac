# 🪒 Barbería Web - Plantilla Premium

Plantilla profesional reutilizable para barberías. Diseñada para vender a múltiples clientes cambiando solo datos de configuración.

## 🚀 Características

- ✅ Diseño premium con Tailwind CSS
- ✅ Arquitectura modular (ES Modules)
- ✅ 100% Responsive
- ✅ Optimización SEO completa
- ✅ WhatsApp integrado
- ✅ Galería con lightbox
- ✅ Catálogo de cortes con filtros
- ✅ Google Maps integrado
- ✅ Preparado para carga dinámica (V2)

## 📦 Tecnologías

- HTML5
- Tailwind CSS (CDN)
- JavaScript ES Modules
- Netlify (Hosting)

## 🏗️ Arquitectura

barberia-web/
├── index.html          # v0 — sitio monolítico ya vendido (Barbería ISAAC), en producción
├── script.js            # Lógica de index.html (v0)
├── dev.html             # v1 en desarrollo — plantilla modular, aún no vendida
├── produccion.html      # Esqueleto en blanco para clonar por cliente (placeholders [NOMBRE]/[DOMINIO])
├── assets/
│   ├── icons/
│   └── logos/
├── css/
├── data/              # Datos configurables (usados por dev.html/produccion.html)
├── img/               # Imágenes locales
└── js/                # Módulos JavaScript (usados por dev.html/produccion.html)
    ├── app.js
    ├── animations.js
    ├── menu.js
    ├── scroll.js
    ├── whatsapp.js
    ├── catalog.js
    ├── gallery.js
    └── footer.js

`dev.html` y `produccion.html` están bloqueados en el sitio publicado (ver `netlify.toml`, redirects a 404) porque todavía no son un producto vendido — siguen abriéndose normal en local para seguir desarrollando.

## 🔧 Personalización

1. Cambiar datos en `data/whatsapp.json`
2. Actualizar imágenes en `img/`
3. Modificar colores en configuración de Tailwind
4. Personalizar textos en `dev.html`

## 💼 Modelo de negocio y versionado

Este proyecto se vende por tiers de versión, cada uno más caro y más completo que el anterior. Las versiones son **acumulativas** (cada una incluye todo lo de la anterior) y se entregan como **una rama de Git por versión** (`v1`, `v2`, `v3`...), que el cliente clona según lo que pagó.

Flujo de trabajo: todo el desarrollo nuevo ocurre en `master`; cuando una versión queda pulida y probada, se corta su rama desde ese commit exacto. No se abren ramas vacías por adelantado.

## 📈 Roadmap

- [x] **V0** - Landing page monolítica (`index.html` + `script.js`) — vendida, congelada, no se modifica
- [ ] **V1** - Sistema modular pulido (`dev.html` + `js/*`): SEO completo, WhatsApp centralizado, galería con lightbox, catálogo con filtros. Contenido aún estático (no lee `data/*.json` para el catálogo)
- [ ] **V2** - Catálogo Dinámico: `catalog.js` renderiza servicios/cortes desde `data/servicios.json` y `data/cortes.json` en vez de HTML fijo
- [ ] **V3** - Panel Administrador (tipo Netlify CMS) para editar esos JSON sin tocar código
- [ ] **V4** - Reservas Online
- [ ] **V5** - Backend Propio + SaaS multi-barbería

## 📄 Licencia

Desarrollado por [Tu Nombre] - Huánuco, Perú