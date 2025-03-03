
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM cargado, esperando clics...");
    
    var toggleButton = document.getElementById("toggleBeforeAfter");
    var beforeAfterContainer = document.getElementById("before-after-container");

    if (!toggleButton || !beforeAfterContainer) {
        console.error("❌ Elementos no encontrados, revisa los IDs.");
        return;
    }

    // Asegurar que el contenedor está oculto al inicio
    beforeAfterContainer.classList.add("before-after-hidden");

    // Evento para alternar la visibilidad con classList.toggle
    toggleButton.addEventListener("click", function (event) {
        event.preventDefault();
        beforeAfterContainer.classList.toggle("before-after-hidden");
        console.log("🔄 Estado del Before-After cambiado:", beforeAfterContainer.classList.contains("before-after-hidden") ? "Oculto" : "Visible");
    });

    // Evento adicional para cerrar al hacer clic fuera del contenedor
    document.addEventListener("click", function (event) {
        if (!toggleButton.contains(event.target) && !beforeAfterContainer.contains(event.target)) {
            beforeAfterContainer.classList.add("before-after-hidden");
            console.log("🚪 Se ocultó el Before-After por clic fuera del área.");
        }
    });
});






