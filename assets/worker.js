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

function initBeforeAfterPopup() {
    // Buscar elementos necesarios
    const toggleButton = document.querySelector('.imagen-fija');
    console.log('🔍 Botón toggle encontrado:', !!toggleButton);

    if (!toggleButton) {
        console.error('❌ No se encontró el botón toggleBeforeAfter');
        return;
    }

    // Crear el contenido del popup
    function createPopupContent() {
        const beforeImage = document.querySelector('[data-before-after-wrapper] [data-before-image]')?.getAttribute('data-before-image');
        const afterImage = document.querySelector('[data-before-after-wrapper] [data-after-image]')?.getAttribute('data-after-image');
        
        if (!beforeImage || !afterImage) {
            console.error('❌ No se encontraron las imágenes before/after');
            return null;
        }

        return `
            <div class="t4s-before-after-popup">
                <div class="t4s-before-after-wrapper" style="max-width: 800px; margin: 0 auto;">
                    <figure>
                        <div class="before-after-slider" style="
                            --before-image: url(${beforeImage});
                            --after-image: url(${afterImage});
                            width: 100%;
                            aspect-ratio: 1;
                            background-image: var(--after-image);
                            background-size: cover;
                            background-position: center;
                            position: relative;
                        ">
                            <div style="
                                position: absolute;
                                inset: 0;
                                width: 50%;
                                background-image: var(--before-image);
                                background-size: cover;
                                background-position: left center;
                                transition: width 0.1s ease-out;
                            "></div>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value="50" 
                            class="t4s-before-after-range"
                            style="width: 100%; margin-top: 10px;"
                        >
                    </figure>
                </div>
            </div>
        `;
    }

    // Inicializar el popup
    function initPopup() {
        const content = createPopupContent();
        if (!content) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            jQuery_T4NT.magnificPopupT4s.open({
                items: {
                    src: content,
                    type: 'inline'
                },
                mainClass: 't4s-before-after-popup-wrapper',
                removalDelay: 300,
                callbacks: {
                    open: function() {
                        // Inicializar el slider después de que el popup está abierto
                        const popup = document.querySelector('.t4s-before-after-popup');
                        const range = popup.querySelector('input[type="range"]');
                        const slider = popup.querySelector('.before-after-slider > div');

                        range.addEventListener('input', function() {
                            slider.style.width = this.value + '%';
                        });
                    }
                }
            });
        });
    }

    // Agregar estilos necesarios
    const styles = `
        .t4s-before-after-popup {
            max-width: 90vw;
            margin: 0 auto;
            padding: 20px;
        }
        .t4s-before-after-popup .before-after-slider {
            cursor: col-resize;
        }
        .t4s-before-after-popup .t4s-before-after-range {
            -webkit-appearance: none;
            height: 2px;
            background: #ddd;
            cursor: pointer;
        }
        .t4s-before-after-popup .t4s-before-after-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            background: #fff;
            border: 2px solid #222;
            border-radius: 50%;
            cursor: pointer;
        }
        .mfp-bg.t4s-before-after-popup-wrapper {
            opacity: 0.9;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Inicializar
    initPopup();
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', initBeforeAfterPopup);

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el slider en el popup
  document.body.addEventListener('click', function(e) {
    if (e.target.closest('.t4s-popup-before-after')) {
      const popup = e.target.closest('.t4s-popup-before-after');
      const range = popup.querySelector('.t4s-before-after-range');
      const content = popup.querySelector('.t4s-before-after__content');

      if (range && content) {
        range.addEventListener('input', function() {
          content.style.setProperty('--before-width', `${this.value}%`);
          content.querySelector('::before').style.width = `${this.value}%`;
        });
      }
    }
  });
});
