export function initMenu() {
    const menuButton = document.querySelector("#menuBtn");
    const mobileMenu = document.querySelector("#mobileMenu");
    const menuLinks = mobileMenu.querySelectorAll("a");

    if (!menuButton || !mobileMenu) return;

    // Abrir / cerrar menú
    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Cerrar menú al seleccionar una opción
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });
}