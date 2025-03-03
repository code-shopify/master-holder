<script>
document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById("toggleBeforeAfter");
    var beforeAfterContainer = document.getElementById("before-after-container");

    if (toggleButton && beforeAfterContainer) {
        toggleButton.addEventListener("click", function() {
            // Alternar la visibilidad del contenedor
            if (beforeAfterContainer.style.display === "none" || beforeAfterContainer.style.display === "") {
                beforeAfterContainer.style.display = "block"; // Mostrar
            } else {
                beforeAfterContainer.style.display = "none"; // Ocultar
            }
        });
    }
});
</script>
