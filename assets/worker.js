document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM cargado, esperando clics...");
    
    var toggleButton = document.getElementById("toggleBeforeAfter");
    var beforeAfterContainer = document.getElementById("before-after-container");

    if (!toggleButton || !beforeAfterContainer) {
        console.error("❌ Elementos no encontrados, revisa los IDs.");
        return;
    }

    // Asegurar que el contenedor está oculto al inicio
    beforeAfterContainer.style.display = "none";

    // Evento para alternar la visibilidad
    toggleButton.addEventListener("click", function (event) {
        event.preventDefault();
        const isHidden = beforeAfterContainer.style.display === "none";
        beforeAfterContainer.style.display = isHidden ? "block" : "none";
        console.log("🔄 Estado del Before-After cambiado:", isHidden ? "Visible" : "Oculto");
    });

    // Evento adicional para cerrar al hacer clic fuera del contenedor
    document.addEventListener("click", function (event) {
        if (!toggleButton.contains(event.target) && !beforeAfterContainer.contains(event.target)) {
            beforeAfterContainer.style.display = "none";
            console.log("🚪 Se ocultó el Before-After por clic fuera del área.");
        }
    });

    // Reinicializar el slider cuando cambie el thumbnail
    document.addEventListener('t4s:mediaChange', function() {
        const productId = document.querySelector('[data-product-id]')?.dataset.productId;
        if (productId) {
            beforeAfter(productId);
        }
    });
});
