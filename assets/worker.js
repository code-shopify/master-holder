document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM cargado, esperando clics...");
    
    var toggleButton = document.getElementById("toggleBeforeAfter");
    var beforeAfterContainer = document.getElementById("before-after-container");
    var isBeforeAfterVisible = false;

    if (!toggleButton || !beforeAfterContainer) {
        console.error("❌ Elementos no encontrados, revisa los IDs.");
        return;
    }

    // Asegurar que el contenedor está oculto al inicio
    beforeAfterContainer.style.display = "none";

    // Función para mostrar/ocultar el before/after
    function toggleBeforeAfter(show) {
        beforeAfterContainer.style.display = show ? "block" : "none";
        isBeforeAfterVisible = show;
        console.log("🔄 Estado del Before-After cambiado:", show ? "Visible" : "Oculto");
    }

    // Evento para alternar la visibilidad
    toggleButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleBeforeAfter(!isBeforeAfterVisible);
    });

    // Evento adicional para cerrar al hacer clic fuera del contenedor
    document.addEventListener("click", function (event) {
        if (!toggleButton.contains(event.target) && !beforeAfterContainer.contains(event.target)) {
            toggleBeforeAfter(false);
            console.log("🚪 Se ocultó el Before-After por clic fuera del área.");
        }
    });

    // Reinicializar el slider cuando cambie el thumbnail
    document.addEventListener('t4s:mediaChange', function() {
        const productId = document.querySelector('[data-product-id]')?.dataset.productId;
        if (productId) {
            beforeAfter(productId);
            // Mantener el estado de visibilidad del before/after
            if (isBeforeAfterVisible) {
                toggleBeforeAfter(true);
            }
        }
    });
});
