document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM cargado, inicializando before/after...");
    
    class BeforeAfterSlider {
        constructor(productId) {
            console.log("Inicializando slider para producto:", productId);
            this.productId = productId;
            this.isVisible = false;
            this.init();
        }

        init() {
            // Obtener elementos
            this.slider = document.getElementById("before_after_" + this.productId);
            this.range = document.getElementById("before_after_slider_" + this.productId);
            this.wrapper = document.querySelector('[data-before-after-wrapper]');
            this.toggleButton = document.getElementById('toggleBeforeAfter');

            console.log("Elementos encontrados:", {
                slider: !!this.slider,
                range: !!this.range,
                wrapper: !!this.wrapper,
                toggleButton: !!this.toggleButton
            });

            if (!this.slider || !this.range || !this.wrapper || !this.toggleButton) {
                console.error("❌ No se encontraron todos los elementos necesarios");
                return;
            }

            // Configurar estado inicial
            this.resetSlider();
            
            // Configurar eventos
            this.setupEvents();
        }

        resetSlider() {
            if (this.range && this.slider) {
                this.range.value = 50;
                this.slider.style.width = "50%";
            }
        }

        setupEvents() {
            // Eventos del slider
            this.range.addEventListener('input', () => {
                this.slider.style.width = this.range.value + "%";
            });

            // Evento del botón toggle
            this.toggleButton.addEventListener('click', (e) => {
                console.log("🖱️ Click en botón toggle");
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });

            // Cerrar al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (this.isVisible && 
                    !this.toggleButton.contains(e.target) && 
                    !this.wrapper.contains(e.target)) {
                    this.hide();
                }
            });

            // Eventos de la galería
            ['flickityt4s:ready', 'flickityt4s:change', 't4s:mediaChange'].forEach(event => {
                document.addEventListener(event, () => {
                    console.log(`🔄 Evento de galería detectado: ${event}`);
                    if (this.isVisible) {
                        setTimeout(() => {
                            this.resetSlider();
                            this.show();
                        }, 100);
                    }
                });
            });

            // Cerrar con Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isVisible) {
                    this.hide();
                }
            });
        }

        show() {
            console.log("🔍 Mostrando slider");
            if (this.wrapper) {
                this.resetSlider();
                this.wrapper.classList.add('is--active');
                this.isVisible = true;
            }
        }

        hide() {
            console.log("🔒 Ocultando slider");
            if (this.wrapper) {
                this.wrapper.classList.remove('is--active');
                this.isVisible = false;
            }
        }

        toggle() {
            console.log("🔄 Toggle slider - Estado actual:", this.isVisible);
            if (this.isVisible) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    // Función para obtener el ID del producto
    function getProductId() {
        // Intentar obtener el ID de diferentes maneras
        const possibleElements = [
            document.querySelector('[data-product-id]'),
            document.querySelector('[data-section-id]'),
            document.querySelector('.t4s-product__media-item'),
            document.querySelector('[data-product-featured]')
        ];

        for (const element of possibleElements) {
            if (element) {
                const id = element.dataset.productId || 
                          element.dataset.sectionId || 
                          element.dataset.mediaId?.split('-')[0] ||
                          JSON.parse(element.dataset.productFeatured || '{}').id;
                
                if (id) {
                    console.log("✅ ID de producto encontrado:", id);
                    return id;
                }
            }
        }

        console.error("❌ No se pudo encontrar el ID del producto");
        return null;
    }

    // Función para inicializar el slider
    function initializeBeforeAfter() {
        const productId = getProductId();
        if (productId) {
            if (window.currentSlider) {
                window.currentSlider = null;
            }
            window.currentSlider = new BeforeAfterSlider(productId);
            return window.currentSlider;
        }
        return null;
    }

    // Inicializar el slider
    initializeBeforeAfter();

    // Reinicializar cuando cambie la galería
    document.addEventListener('t4s:mediaChange', () => {
        console.log("🔄 Cambio en la galería detectado");
        setTimeout(initializeBeforeAfter, 100);
    });

    // Reinicializar cuando cambie la variante
    document.addEventListener('variant:changed', () => {
        console.log("🔄 Cambio de variante detectado");
        setTimeout(initializeBeforeAfter, 100);
    });
});
