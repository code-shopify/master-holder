// Esperar a que el DOM esté listo
console.log('🚀 Worker.js cargado');

let isInitialized = false;
let sliderElements = null;

function getSliderElements() {
    const beforeAfterWrapper = document.querySelector('[data-before-after-wrapper]');
    const beforeImage = document.querySelector('.before-image');
    const slider = document.querySelector('.before-after-range');
    
    console.log('Elementos encontrados:', {
        wrapper: beforeAfterWrapper,
        beforeImage: beforeImage,
        slider: slider
    });

    return { beforeAfterWrapper, beforeImage, slider };
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

function showSlider() {
    const elements = getSliderElements();
    if (elements.beforeAfterWrapper) {
        elements.beforeAfterWrapper.style.opacity = '1';
        elements.beforeAfterWrapper.style.visibility = 'visible';
    }
}

function hideSlider() {
    const elements = getSliderElements();
    if (elements.beforeAfterWrapper) {
        elements.beforeAfterWrapper.style.opacity = '0';
        elements.beforeAfterWrapper.style.visibility = 'hidden';
    }
}

function handleSliderInput(e) {
    const elements = getSliderElements();
    if (elements.beforeImage) {
        elements.beforeImage.style.width = `${e.target.value}%`;
    }
}

function initBeforeAfter() {
    console.log('Inicializando before-after slider');
    const elements = getSliderElements();
    
    if (!elements.beforeAfterWrapper || !elements.beforeImage || !elements.slider) {
        console.log('No se encontraron todos los elementos necesarios');
        return;
    }

    // Remover listeners anteriores si existen
    elements.slider.removeEventListener('input', handleSliderInput);
    
    // Agregar nuevo listener
    elements.slider.addEventListener('input', handleSliderInput);
    
    // Mostrar el slider inicialmente
    showSlider();
}

// Manejador del botón toggle
document.addEventListener('click', function(e) {
    if (e.target.id === 'toggleBeforeAfter') {
        console.log('Click en toggleBeforeAfter');
        const elements = getSliderElements();
        
        if (!elements.beforeAfterWrapper) {
            console.log('No se encontró el wrapper');
            return;
        }

        if (elements.beforeAfterWrapper.style.visibility === 'visible') {
            hideSlider();
        } else {
            showSlider();
        }
    }
});

// Reinicializar cuando cambia la galería
document.addEventListener('gallery:changed', function() {
    console.log('Galería cambió - reinicializando slider');
    setTimeout(initBeforeAfter, 100); // Pequeño delay para asegurar que los elementos estén listos
});

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - inicializando slider');
    initBeforeAfter();
});

// Reinicializar cuando cambia la variante
document.addEventListener('variant:changed', function() {
    console.log('Variante cambió - reinicializando slider');
    setTimeout(initBeforeAfter, 100);
});
