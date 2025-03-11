// Clase para manejar el popup del comparador
class PopupComparador {
  constructor() {
    this.init();
  }

  init() {
    // Escuchar clicks en elementos con data-popup-comparador
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-popup-comparador]');
      if (trigger) {
        e.preventDefault();
        this.openPopup(trigger.dataset.popupId);
      }
    });

    // Cerrar al hacer click fuera del popup
    document.addEventListener('click', (e) => {
      if (e.target.matches('.popup-comparador-overlay')) {
        this.closePopup(e.target.querySelector('.popup-comparador'));
      }
    });

    // Cerrar con la tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const popup = document.querySelector('.popup-comparador');
        if (popup) {
          this.closePopup(popup);
        }
      }
    });
  }

  openPopup(popupId) {
    // Obtener el contenido del popup existente
    const popupTemplate = document.getElementById(popupId);
    if (!popupTemplate) return;

    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-comparador-overlay';
    
    // Crear el contenedor del popup
    const popup = document.createElement('div');
    popup.className = 'popup-comparador';
    
    // Clonar el contenido del template
    const content = popupTemplate.cloneNode(true);
    content.classList.remove('t4s-mfp-hide');
    content.removeAttribute('id');
    
    // Agregar los elementos al DOM
    popup.appendChild(content);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Agregar clase para la animación de entrada
    requestAnimationFrame(() => {
      overlay.classList.add('is-active');
      
      // Disparar evento de popup abierto
      document.dispatchEvent(new CustomEvent('popup:opened'));
    });

    // Agregar manejador para el botón de cerrar
    const closeBtn = popup.querySelector('.popup-comparador__close');
    if (closeBtn) {
      closeBtn.onclick = () => this.closePopup(popup);
    }

    setTimeout(() => {
      beforeAfter();
      const slider = document.getElementById("before_after_slider_{{ product.id }}");
      if (slider) {
        slider.style.pointerEvents = 'auto';
        slider.style.cursor = 'col-resize';
      }
    }, 100);
  }

  closePopup(popup) {
    const overlay = popup.closest('.popup-comparador-overlay');
    if (!overlay) return;

    overlay.classList.remove('is-active');
    
    // Remover del DOM después de la animación
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new PopupComparador();
});

// Agregar estilos
const styles = `
.popup-comparador-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.popup-comparador-overlay.is-active {
  opacity: 1;
}

.popup-comparador {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.popup-comparador-overlay.is-active .popup-comparador {
  transform: translateY(0);
}

.popup-comparador__close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  z-index: 10;
}

.popup-comparador__content {
  margin-top: 20px;
}

@media (max-width: 767px) {
  .popup-comparador {
    width: calc(100% - 30px);
    margin: 15px;
    padding: 15px;
  }
}
`;

// Insertar estilos en el documento
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
