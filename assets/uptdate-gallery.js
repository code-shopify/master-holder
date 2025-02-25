document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script de actualización de galería cargado.");

    // Detectar clic en los swatches de color
    document.querySelectorAll("[data-swatch-item]").forEach((swatch) => {
        swatch.addEventListener("click", function () {
            let selectedColor = this.getAttribute("data-value");
            console.log("🎨 Color seleccionado:", selectedColor);

            // Obtener los datos del producto desde el JSON
            let productData = JSON.parse(document.querySelector('script[type="application/json"][data-product-json]')?.textContent || "{}");

            // Buscar la variante correspondiente
            let selectedVariant = productData.variants.find(v => v.option1 === selectedColor);

            if (selectedVariant) {
                console.log("✅ Variante encontrada:", selectedVariant);

                // Actualizar el selector de variante en el formulario
                let variantInput = document.querySelector("[name='id']");
                if (variantInput) {
                    variantInput.value = selectedVariant.id;
                    console.log("🆕 Variante actualizada en el formulario:", selectedVariant.id);

                    // Disparar un evento para que Shopify actualice la imagen y el precio
                    let changeEvent = new Event("change", { bubbles: true });
                    variantInput.dispatchEvent(changeEvent);

                    // 🔄 Actualizar la galería de imágenes con AJAX
                    let productUrl = `${window.location.pathname}?variant=${selectedVariant.id}&section_id=main-product`;

                    fetch(productUrl)
                        .then(response => response.text())
                        .then(html => {
                            let parser = new DOMParser();
                            let doc = parser.parseFromString(html, "text/html");
                            let newGallery = doc.querySelector("[data-main-media]");

                            if (newGallery) {
                                let currentGallery = document.querySelector("[data-main-media]");
                                currentGallery.replaceWith(newGallery);
                                console.log("✅ Galería actualizada correctamente.");
                                
                                // 🌀 Reinicializar Flickity si está presente
                                if (typeof Flickity !== "undefined") {
                                    console.log("🔄 Reinicializando Flickity...");
                                    document.querySelectorAll("[data-main-media]").forEach(gallery => {
                                        let flickityInstance = Flickity.data(gallery);
                                        if (flickityInstance) {
                                            flickityInstance.destroy();
                                        }
                                        new Flickity(gallery, {
                                            cellSelector: '[data-main-slide]:not(.is--media-hide)',
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
                                    });
                                    console.log("✅ Flickity reiniciado correctamente.");
                                } else {
                                    console.warn("⚠️ Flickity no está definido.");
                                }
                            } else {
                                console.warn("⚠️ No se pudo actualizar la galería.");
                            }
                        })
                        .catch(error => console.error("❌ Error al actualizar la galería:", error));
                }
            } else {
                console.warn("⚠️ No se encontró una variante para el color:", selectedColor);
            }
        });
    });
});
