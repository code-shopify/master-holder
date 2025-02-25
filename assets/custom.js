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
    document.querySelectorAll("[data-swatch-item]").forEach(swatch => {
        swatch.addEventListener("click", function () {
            const selectedValue = this.getAttribute("data-value");

            // Obtener el ID de la variante seleccionada desde el input oculto
            const selectedVariantId = document.querySelector("[name='id']")?.value;

            // Buscar la variante correspondiente
            const newVariant = window.T4SThemeSP?.variants?.find(v => v.id == selectedVariantId);

            if (newVariant) {
                console.log("Variant selected:", newVariant);

                // Actualizar la variable global
                window.T4SThemeSP.oldVariant = window.T4SThemeSP.currentVariant;
                window.T4SThemeSP.currentVariant = newVariant;

                // Disparar evento de cambio de variante
                document.querySelector(".t4s-main-product__content").dispatchEvent(
                    new CustomEvent("variant:changed", {
                        detail: {
                            currentVariant: newVariant,
                            oldVariant: window.T4SThemeSP.oldVariant
                        }
                    })
                );

                // Actualizar las imágenes de la variante seleccionada
                if (typeof window.T4SThemeSP._updateMedia === "function") {
                    window.T4SThemeSP._updateMedia(newVariant, window.T4SThemeSP.oldVariant, document.querySelector(".t4s-main-product__content"));
                }

                console.log("Updated Current Variant:", window.T4SThemeSP.currentVariant);
            } else {
                console.error("No variant found for selected ID:", selectedVariantId);
            }
        });
    });
});

