// Función para actualizar la galería
function updateGallery() {
    console.log("🔄 Intentando actualizar la galería...");

    // Verificar si Flickity está definido
    if (typeof Flickity === "undefined") {
        console.error("⚠️ Error: Flickity no está definido. Asegúrate de que el script se carga correctamente.");
        return;
    }

    // Seleccionar todas las galerías en la página
    document.querySelectorAll("[data-main-media]").forEach(gallery => {
        let flickityInstance = Flickity?.data(gallery);

        if (!flickityInstance) {
            console.warn("⚠️ No hay una instancia previa de Flickity. Inicializando...");
            flickityInstance = new Flickity(gallery, {
                cellSelector: "[data-main-slide]:not(.is--media-hide)",
                adaptiveHeight: true,
                contain: true,
                wrapAround: true,
                prevNextButtons: true,
                percentPosition: true,
                pageDots: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                thumbNav: true,
                thumbVertical: false,
                isMedia: true
            });
        } else {
            console.log("🔄 Reiniciando Flickity sin destruir...");
            flickityInstance.resize();
            flickityInstance.reloadCells();
            flickityInstance.select(0, false, true);
        }
        
        console.log("✅ Galería actualizada correctamente.");
    });
}

// Detectar cambios de variante
document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Shopify listo para actualizar la galería.");

    // Verificar que Flickity esté disponible antes de asignar eventos
    if (typeof Flickity === "undefined") {
        console.warn("⚠️ Flickity no está cargado. Intentando cargarlo...");
        
        let flickityScript = document.createElement("script");
        flickityScript.src = "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";
        flickityScript.onload = () => {
            console.log("✅ Flickity cargado correctamente.");
            updateGallery(); // Intentar actualizar la galería después de cargar Flickity
        };
        document.head.appendChild(flickityScript);
    } else {
        updateGallery(); // Si ya está cargado, actualizar la galería de inmediato
    }

    // Evento para cambio de variante
    document.querySelector("[name='id']")?.addEventListener("change", function () {
        console.log("🎨 Cambio de variante detectado...");
        updateGallery();
    });
});
