<script>
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado, ejecutando script...");

    var toggleButton = document.getElementById("toggleBeforeAfter");
    var beforeAfterContainer = document.getElementById("before-after-container");

    if (toggleButton) {
        console.log("Botón encontrado:", toggleButton);
    } else {
        console.log("⚠️ No se encontró el botón con ID 'toggleBeforeAfter'");
    }

    if (beforeAfterContainer) {
        console.log("Contenedor encontrado:", beforeAfterContainer);
    } else {
        console.log("⚠️ No se encontró el contenedor con ID 'before-after-container'");
    }

    if (toggleButton && beforeAfterContainer) {
        toggleButton.addEventListener("click", function() {
            console.log("Botón clickeado. Estado actual:", beforeAfterContainer.style.display);

            // Alternar visibilidad
            if (beforeAfterContainer.style.display === "none" || beforeAfterContainer.style.display === "") {
                beforeAfterContainer.style.display = "block"; // Mostrar
                console.log("Contenedor mostrado.");
            } else {
                beforeAfterContainer.style.display = "none"; // Ocultar
                console.log("Contenedor ocultado.");
            }
        });
    }
});
</script>

