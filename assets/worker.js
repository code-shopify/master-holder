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
    console.log('Inicializando Before/After slider');
    
    // Obtener elementos
    const wrapper = document.querySelector('[data-before-after-wrapper]');
    const toggleButton = document.getElementById('toggleBeforeAfter');
    
    if (!wrapper || !toggleButton) {
        console.log('No se encontraron los elementos necesarios');
        return;
    }

    // Función para mostrar/ocultar el slider
    function toggleSlider() {
        console.log('Toggle slider clicked');
        const isVisible = wrapper.classList.contains('is--visible');
        
        if (isVisible) {
            hideSlider();
        } else {
            showSlider();
        }
    }

    // Función para mostrar el slider
    function showSlider() {
        wrapper.classList.add('is--visible');
        wrapper.style.opacity = '1';
        wrapper.style.visibility = 'visible';
        initializeSlider();
    }

    // Función para ocultar el slider
    function hideSlider() {
        wrapper.classList.remove('is--visible');
        wrapper.style.opacity = '0';
        wrapper.style.visibility = 'hidden';
    }

    // Función para inicializar el slider
    function initializeSlider() {
        const slider = wrapper.querySelector('input[type="range"]');
        const beforeAfterContainer = wrapper.querySelector('.before-after-slider');
        
        if (!slider || !beforeAfterContainer) return;

        // Actualizar el slider cuando se mueve
        slider.addEventListener('input', function() {
            beforeAfterContainer.style.setProperty('--position', `${this.value}%`);
        });
    }

    // Remover eventos anteriores para evitar duplicados
    toggleButton.removeEventListener('click', toggleSlider);
    
    // Agregar nuevo evento click
    toggleButton.addEventListener('click', toggleSlider);

    // Cerrar el slider cuando se hace clic fuera
    document.addEventListener('click', function(e) {
        if (wrapper.classList.contains('is--visible') && 
            !wrapper.contains(e.target) && 
            !toggleButton.contains(e.target)) {
            hideSlider();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wrapper.classList.contains('is--visible')) {
            hideSlider();
        }
    });

    // Manejar eventos de la galería
    const mainMedia = document.querySelector('[data-main-media]');
    if (mainMedia) {
        // Observar cambios en la galería usando MutationObserver
        const galleryObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    console.log('Cambio detectado en la galería');
                    if (wrapper.classList.contains('is--visible')) {
                        console.log('Reinicializando slider después del cambio de galería');
                        initializeSlider();
                    }
                }
            });
        });

        galleryObserver.observe(mainMedia, {
            attributes: true,
            subtree: true,
            childList: true
        });

        // Escuchar eventos específicos de la galería
        mainMedia.addEventListener('flickityt4s:select', function() {
            console.log('Evento flickityt4s:select detectado');
            if (wrapper.classList.contains('is--visible')) {
                console.log('Reinicializando slider después de cambio de slide');
                initializeSlider();
            }
        });
    }
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', initBeforeAfter);

// Reinicializar cuando cambia la variante
document.addEventListener('variant:changed', initBeforeAfter);
