
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ DOM cargado, esperando que los elementos estén disponibles...");

    function setupToggleEvent() {
        var toggleButton = document.getElementById("toggleBeforeAfter");
        var beforeAfterContainer = document.getElementById("before-after-container");

        if (!toggleButton) {
            console.log("⚠️ El botón aún no está disponible, esperando...");
            setTimeout(setupToggleEvent, 500);
            return;
        }
        if (!beforeAfterContainer) {
            console.log("⚠️ El contenedor aún no está disponible, esperando...");
            setTimeout(setupToggleEvent, 500);
            return;
        }

        console.log("🎯 Botón y contenedor encontrados, agregando eventos de clic...");

        // Aseguramos que el Before-After esté oculto al inicio
        beforeAfterContainer.classList.add("hidden");

        // Evento para mostrar/ocultar al hacer clic en la imagen fija
        toggleButton.addEventListener("click", function(event) {
            event.preventDefault();
            beforeAfterContainer.classList.toggle("hidden");
            console.log("🔄 Estado cambiado:", beforeAfterContainer.classList.contains("hidden") ? "Oculto" : "Visible");
        });

        // Detectar clics fuera del contenedor para ocultarlo
        document.addEventListener("click", function(event) {
            if (!toggleButton.contains(event.target) && !beforeAfterContainer.contains(event.target)) {
                beforeAfterContainer.classList.add("hidden");
                console.log("🚪 Click fuera detectado, contenedor ocultado.");
            }
        });
    }

    setupToggleEvent(); // Ejecutar la función
});

