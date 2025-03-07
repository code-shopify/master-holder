// Esperar a que el DOM esté listo
console.log('🚀 Worker.js cargado');

function initBeforeAfter() {
    console.log('🔄 Iniciando before/after...');

    // Buscar elementos necesarios
    const toggleButton = document.getElementById('toggleBeforeAfter');
    console.log('🔍 Botón toggle encontrado:', !!toggleButton);

    if (!toggleButton) {
        console.error('❌ No se encontró el botón toggleBeforeAfter');
        return;
    }

    // Encontrar el ID del producto
    const productFeatured = document.querySelector('[data-product-featured]');
    console.log('🔍 Elemento product-featured encontrado:', !!productFeatured);

    if (!productFeatured) {
        console.error('❌ No se encontró el elemento product-featured');
        return;
    }

    let productId;
    try {
        productId = JSON.parse(productFeatured.dataset.productFeatured).id;
        console.log('✅ ID de producto encontrado:', productId);
    } catch (error) {
        console.error('❌ Error al obtener ID del producto:', error);
        return;
    }

    // Obtener elementos del slider
    const slider = document.getElementById("before_after_" + productId);
    const range = document.getElementById("before_after_slider_" + productId);
    const wrapper = document.querySelector('[data-before-after-wrapper]');

    console.log('🔍 Elementos encontrados:', {
        slider: !!slider,
        range: !!range,
        wrapper: !!wrapper
    });

    if (!slider || !range || !wrapper) {
        console.error('❌ No se encontraron todos los elementos necesarios');
        return;
    }

    // Estado del slider
    let isVisible = false;

    // Función para mostrar el slider
    function showSlider() {
        console.log('👁️ Mostrando slider');
        range.value = 50;
        slider.style.width = "50%";
        wrapper.classList.add('is--active');
        isVisible = true;
    }

    // Función para ocultar el slider
    function hideSlider() {
        console.log('🔒 Ocultando slider');
        wrapper.classList.remove('is--active');
        isVisible = false;
    }

    // Configurar eventos
    range.addEventListener('input', () => {
        slider.style.width = range.value + "%";
    });

    toggleButton.addEventListener('click', (e) => {
        console.log('🖱️ Click en botón toggle');
        e.preventDefault();
        e.stopPropagation();
        if (isVisible) {
            hideSlider();
        } else {
            showSlider();
        }
    });

    wrapper.addEventListener('click', (e) => {
        if (e.target === wrapper) {
            hideSlider();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isVisible) {
            hideSlider();
        }
    });

    // Manejar eventos de la galería
    ['flickityt4s:ready', 'flickityt4s:change', 't4s:mediaChange'].forEach(event => {
        document.addEventListener(event, () => {
            console.log(`🔄 Evento de galería detectado: ${event}`);
            if (isVisible) {
                setTimeout(() => {
                    range.value = 50;
                    slider.style.width = "50%";
                }, 100);
            }
        });
    });

    console.log('✅ Before/after inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBeforeAfter);
} else {
    initBeforeAfter();
}

// Reinicializar cuando cambie la galería
document.addEventListener('t4s:mediaChange', () => {
    console.log('🔄 Cambio en galería detectado, reinicializando...');
    setTimeout(initBeforeAfter, 100);
});
