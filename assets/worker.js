document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM cargado, esperando clics...");
    
    var toggleButton = document.getElementById("toggleBeforeAfter");
    var beforeAfterContainer = document.getElementById("before-after-container");
    var isBeforeAfterVisible = false;
    var scrollTimeout;

    if (!toggleButton || !beforeAfterContainer) {
        console.error("❌ Elementos no encontrados, revisa los IDs.");
        return;
    }

    // Asegurar que el contenedor está oculto al inicio
    beforeAfterContainer.style.display = "none";

    // Función para mostrar/ocultar el before/after
    function toggleBeforeAfter(show) {
        const containers = document.querySelectorAll("#before-after-container");
        containers.forEach(container => {
            container.style.display = show ? "block" : "none";
        });
        isBeforeAfterVisible = show;
        console.log("🔄 Estado del Before-After cambiado:", show ? "Visible" : "Oculto");
    }

    // Evento para alternar la visibilidad
    toggleButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleBeforeAfter(!isBeforeAfterVisible);
    });

    // Evento adicional para cerrar al hacer clic fuera del contenedor
    document.addEventListener("click", function (event) {
        if (!toggleButton.contains(event.target) && 
            !beforeAfterContainer.contains(event.target) && 
            !event.target.classList.contains('before-after-range')) {
            toggleBeforeAfter(false);
            console.log("🚪 Se ocultó el Before-After por clic fuera del área.");
        }
    });

    // Manejar el scroll
    window.addEventListener('scroll', function() {
        if (!isBeforeAfterVisible) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (isBeforeAfterVisible) {
                toggleBeforeAfter(true);
            }
        }, 150);
    }, { passive: true });

    // Reinicializar el slider cuando cambie el thumbnail
    document.addEventListener('t4s:mediaChange', function() {
        const productId = document.querySelector('[data-product-id]')?.dataset.productId;
        if (productId) {
            beforeAfter(productId);
            // Mantener el estado de visibilidad del before/after
            if (isBeforeAfterVisible) {
                setTimeout(() => {
                    toggleBeforeAfter(true);
                }, 100);
            }
        }
    });

    // Escuchar eventos de la galería
    document.addEventListener('flickityt4s:ready', function() {
        if (isBeforeAfterVisible) {
            setTimeout(() => {
                toggleBeforeAfter(true);
            }, 100);
        }
    });

    document.addEventListener('flickityt4s:change', function() {
        if (isBeforeAfterVisible) {
            setTimeout(() => {
                toggleBeforeAfter(true);
            }, 100);
        }
    });
});
