jQuery_T4NT(document).ready(function($) {

     /**
     *  Variant selection changed
     *  data-variant-toggle="{{ variant.id }}"
     */
	   $( document ).on( "variant:changed", function( evt ) {
	     // console.log( evt.currentVariant );
	     // $('[data-variant-toggle]').hide(0);
	     // $('[data-variant-toggle="'+evt.currentVariant.id+'"]').show(0);
	   });
});



document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos todos los swatches de color
    let swatchItems = document.querySelectorAll("[data-swatch-item]");

  console.log("HOla")

    swatchItems.forEach(swatch => {
        swatch.addEventListener("click", function () {
            let selectedColor = this.getAttribute("data-value"); // Obtiene el nombre del color seleccionado
            let productData = JSON.parse(document.querySelector('script[type="application/json"][data-product-json]')?.textContent || "{}");
            
            if (!productData.variants) return;

            // Encuentra la variante correspondiente al color seleccionado
            let selectedVariant = productData.variants.find(variant => variant.option1 === selectedColor);

            if (selectedVariant) {
                // Actualizar el input oculto de Shopify con el nuevo ID de variante
                let variantInput = document.querySelector("input[name='id']");
                if (variantInput) variantInput.value = selectedVariant.id;

                // Actualizar la imagen principal del producto
                let mainImage = document.querySelector(".t4s-product__media img");
                if (mainImage && selectedVariant.featured_image) {
                    mainImage.src = selectedVariant.featured_image.src;
                    mainImage.setAttribute("data-src", selectedVariant.featured_image.src);
                }

                // Actualizar miniaturas de imágenes
                let thumbnails = document.querySelectorAll(".t4s-product__media-item img");
                thumbnails.forEach(thumb => {
                    let imgSrc = selectedVariant.featured_image ? selectedVariant.featured_image.src : "";
                    if (imgSrc) {
                        thumb.src = imgSrc;
                        thumb.setAttribute("data-src", imgSrc);
                    }
                });

                console.log("Variante actualizada:", selectedVariant);
            }
        });
    });
});
