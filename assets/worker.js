// Función para actualizar la galería de imágenes en Shopify
function updateGallery() {
    console.log("🔄 Actualizando galería de imágenes...");

    document.querySelectorAll("[data-main-media]").forEach(gallery => {
        let flickityInstance = Flickity?.data(gallery);
        if (flickityInstance) {
            flickityInstance.destroy();
        }

        new Flickity(gallery, {
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

        console.log("✅ Galería actualizada correctamente.");
    });
}

// Simulación de Web Worker usando eventos en Shopify
document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Shopify: Listo para actualizar la galería.");
    
    // Escuchar cambios en la variante seleccionada
    document.querySelector("[name='id']")?.addEventListener("change", function () {
        console.log("🔄 Cambio de variante detectado, actualizando galería...");
        
        // Llamar la función para actualizar la galería
        updateGallery();
    });
});

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
        if (flickityInstance) {
            flickityInstance.destroy(); // Eliminar instancia previa
        }

        new Flickity(gallery, {
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

        console.log("✅ Galería actualizada correctamente.");
    });
}

// Detectar cambios de variante
document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Shopify listo para actualizar la galería.");

    // Verificar que Flickity esté disponible antes de asignar eventos
    if (typeof Flickity === "undefined") {
        console.error("❌ Flickity aún no está cargado. Intentando recargar...");
        
        let flickityScript = document.createElement("script");
        flickityScript.src = "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";
        flickityScript.onload = () => {
            console.log("✅ Flickity cargado correctamente.");
        };
        document.head.appendChild(flickityScript);
    }

    // Evento para cambio de variante
    document.querySelector("[name='id']")?.addEventListener("change", function () {
        console.log("🎨 Cambio de variante detectado...");
        updateGallery();
    });
});

