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
    const swatches = document.querySelectorAll("[data-swatch-item]");

    if (swatches.length > 0) {
        swatches.forEach((swatch) => {
            swatch.addEventListener("click", function () {
                // Simulamos el evento de cambio de variante
                const event = new CustomEvent("variant:changed", {
                    detail: {
                        currentVariant: window.T4SThemeSP?.currentVariant,
                        oldVariant: window.T4SThemeSP?.oldVariant,
                    },
                });

                // Disparamos el evento en el contenedor principal del producto
                const productContainer = document.querySelector(".t4s-main-product__content");
                if (productContainer) {
                    productContainer.dispatchEvent(event);
                }

                // Si el tema ya tiene una función de actualización, la ejecutamos
                if (typeof window.T4SThemeSP?._updateMedia === "function") {
                    const newVariant = window.T4SThemeSP?.currentVariant;
                    const oldVariant = window.T4SThemeSP?.oldVariant;
                    const productContainer = document.querySelector(".t4s-main-product__content");

                    window.T4SThemeSP._updateMedia(newVariant, oldVariant, productContainer);
                }
            });
        });
    }
});


