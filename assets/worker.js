<script>
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ DOM cargado, ejecutando script...");

    var toggleButton = document.getElementById("toggleBeforeAfter");
    var beforeAfterContainer = document.getElementById("before-after-container");

    if (!toggleButton) {
        console.error("⚠️ No se encontró el botón con ID 'toggleBeforeAfter'. Verifica que el código Liquid lo esté renderizando correctamente.");
        return;
    }

    if (!beforeAfterContainer) {
        console.error("⚠️ No se encontró el contenedor con ID 'before-after-container'. Verifica que el código Liquid lo esté renderizando correctamente.");
        return;
    }

    // Asegurar que el contenedor esté oculto al inicio
    beforeAfterContainer.style.display = "none";

    toggleButton.addEventListener("click", function() {
        console.log("🔹 Botón clickeado.");
        
        if (beforeAfterContainer.style.display === "none") {
            beforeAfterContainer.style.display = "block"; // Mostrar el contenedor
            console.log("✅ Contenedor mostrado.");
        } else {
            beforeAfterContainer.style.display = "none"; // Ocultar el contenedor
            console.log("✅ Contenedor ocultado.");
        }
    });
});
</script>


