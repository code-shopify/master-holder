// Esperar a que el DOM esté listo
console.log('🚀 Worker.js cargado');

let isInitialized = false;
let sliderElements = null;

function getSliderElements() {
    // Buscar elementos necesarios
    const toggleButton = document.querySelector('.imagen-fija');
    console.log('🔍 Botón toggle encontrado:', !!toggleButton);

    if (!toggleButton) {
        console.error('❌ No se encontró el botón toggleBeforeAfter');
        return null;
    }

    // Encontrar el ID del producto
    const productFeatured = document.querySelector('[data-product-featured]');
    console.log('🔍 Elemento product-featured encontrado:', !!productFeatured);

    if (!productFeatured) {
        console.error('❌ No se encontró el elemento product-featured');
        return null;
    }

    let productId;
    try {
        productId = JSON.parse(productFeatured.dataset.productFeatured).id;
        console.log('✅ ID de producto encontrado:', productId);
    } catch (error) {
        console.error('❌ Error al obtener ID del producto:', error);
        return null;
    }

    // Obtener elementos del slider
    const beforeAfterContainer = document.getElementById('before-after-container');
    const slider = document.getElementById(`before_after_${productId}`);
    const range = document.getElementById(`before_after_slider_${productId}`);
    const wrapper = document.querySelector('[data-before-after-wrapper]');

    console.log('🔍 Elementos encontrados:', {
        container: !!beforeAfterContainer,
        slider: !!slider,
        range: !!range,
        wrapper: !!wrapper
    });

    if (!beforeAfterContainer || !slider || !range || !wrapper) {
        console.error('❌ No se encontraron todos los elementos necesarios');
        return null;
    }

    return {
        toggleButton,
        beforeAfterContainer,
        slider,
        range,
        wrapper,
        isVisible: false
    };
}

function updateSliderPosition(elements, value) {
    if (!elements || !elements.slider) return;
    requestAnimationFrame(() => {
        elements.slider.style.width = `${value}%`;
    });
}

function resetSlider(elements) {
    if (!elements || !elements.range) return;
    elements.range.value = 50;
    updateSliderPosition(elements, 50);
}

function showSlider(elements) {
    if (!elements) return;
    console.log('👁️ Mostrando slider');
    
    // Primero mostramos el contenedor
    elements.beforeAfterContainer.style.display = 'block';
    
    // Esperamos un frame para asegurar que el contenedor está visible
    requestAnimationFrame(() => {
        elements.wrapper.classList.add('is--active');
        elements.isVisible = true;
        resetSlider(elements);
    });
}

function hideSlider(elements) {
    if (!elements) return;
    console.log('🔒 Ocultando slider');
    
    elements.wrapper.classList.remove('is--active');
    elements.isVisible = false;
    
    // Esperamos a que termine la transición antes de ocultar el contenedor
    setTimeout(() => {
        if (elements && !elements.isVisible) {
            elements.beforeAfterContainer.style.display = 'none';
        }
    }, 300);
}

function handleSliderVisibility(elements) {
    if (!elements) return;
    if (elements.isVisible) {
        hideSlider(elements);
    } else {
        showSlider(elements);
    }
}

function initBeforeAfter() {
    console.log('🔄 Iniciando before/after...');

    // Siempre obtenemos elementos frescos
    const elements = getSliderElements();
    if (!elements) return;

    // Guardamos los elementos para uso futuro
    sliderElements = elements;

    // Configurar eventos
    elements.range.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        console.log('🎚️ Ajustando slider:', value);
        updateSliderPosition(elements, value);
    });

    elements.toggleButton.addEventListener('click', (e) => {
        console.log('🖱️ Click en botón toggle');
        e.preventDefault();
        e.stopPropagation();
        handleSliderVisibility(elements);
    });

    elements.wrapper.addEventListener('click', (e) => {
        if (e.target === elements.wrapper) {
            hideSlider(elements);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.isVisible) {
            hideSlider(elements);
        }
    });

    // Manejar eventos de la galería
    ['flickityt4s:ready', 'flickityt4s:change', 't4s:mediaChange'].forEach(event => {
        document.addEventListener(event, () => {
            console.log(`🔄 Evento de galería detectado: ${event}`);
            // Reinicializamos completamente en cambios de galería
            isInitialized = false;
            sliderElements = null;
            setTimeout(initBeforeAfter, 100);
        });
    });

    // Asegurarse de que el slider esté oculto inicialmente
    hideSlider(elements);

    isInitialized = true;
    console.log('✅ Before/after inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBeforeAfter);
} else {
    initBeforeAfter();
}
