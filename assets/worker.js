<script>
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ DOM cargado, esperando que los elementos estén disponibles...");

    function setupToggleEvent() {
        var toggleButton = document.getElementById("toggleBeforeAfter");
        var beforeAfterContainer = document.getElementById("before-after-container");

        if (!toggleButton) {
            console.log("⚠️ El botón aún no está disponible, esperando...");
            setTimeout(setupToggleEvent, 500); // Reintentar en 500ms
            return;
        }
        if (!beforeAfterContainer) {
            console.log("⚠️ El contenedor aún no está disponible, esperando...");
            setTimeout(setupToggleEvent, 500);
            return;
        }

        console.log("🎯 Botón y contenedor encontrados, agregando evento de clic...");

        toggleButton.addEventListener("click", function(event) {
            event.preventDefault(); // Evita comportamiento inesperado
            console.log("🔄 Botón clickeado. Estado actual:", beforeAfterContainer.style.display);

            if (beforeAfterContainer.style.display === "none" || beforeAfterContainer.style.display === "") {
                beforeAfterContainer.style.display = "block"; // Mostrar
                console.log("✅ Contenedor mostrado.");
            } else {
                beforeAfterContainer.style.display = "none"; // Ocultar
                console.log("✅ Contenedor ocultado.");
            }
        });
    }

    setupToggleEvent(); // Llamar a la función
});
</script>



