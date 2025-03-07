document.addEventListener("DOMContentLoaded", function () {
    class BeforeAfterSlider {
        constructor(productId) {
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
            if (this.wrapper) {
                this.resetSlider();
                this.wrapper.classList.add('is--active');
                this.isVisible = true;
            }
        }

        hide() {
            if (this.wrapper) {
                this.wrapper.classList.remove('is--active');
                this.isVisible = false;
            }
        }

        toggle() {
            if (this.isVisible) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    // Función para inicializar el slider
    function initializeBeforeAfter() {
        const productElement = document.querySelector('[data-product-id]');
        if (productElement) {
            const productId = productElement.dataset.productId;
            if (productId) {
                return new BeforeAfterSlider(productId);
            }
        }
        return null;
    }

    // Inicializar el slider
    let currentSlider = initializeBeforeAfter();

    // Reinicializar cuando cambie la galería
    document.addEventListener('t4s:mediaChange', () => {
        setTimeout(() => {
            if (currentSlider) {
                currentSlider = initializeBeforeAfter();
            }
        }, 100);
    });
});
