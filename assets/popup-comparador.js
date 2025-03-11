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
  }

  openPopup(popupId) {
    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-comparador-overlay';
    
    // Crear el contenedor del popup
    const popup = document.createElement('div');
    popup.className = 'popup-comparador';
    popup.id = popupId;

    // Agregar botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-comparador__close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => this.closePopup(popup);

    // Contenedor para el contenido
    const content = document.createElement('div');
    content.className = 'popup-comparador__content';
    
    // Agregar los elementos al DOM
    popup.appendChild(closeBtn);
    popup.appendChild(content);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Agregar clase para la animación de entrada
    requestAnimationFrame(() => {
      overlay.classList.add('is-active');
    });

    // Cargar el contenido del snippet
    this.loadContent(content);
  }

  closePopup(popup) {
    const overlay = popup.parentElement;
    overlay.classList.remove('is-active');
    
    // Remover del DOM después de la animación
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }

  loadContent(container) {
    // Aquí puedes cargar el contenido del snippet
    // Por ahora solo mostraremos un mensaje de carga
    container.innerHTML = 'Cargando...';
    
    // TODO: Implementar la carga del snippet real
    // Esto dependerá de cómo quieras cargar el contenido del snippet
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
  z-index: 9999;
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
  max-width: 90%;
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
}

.popup-comparador__content {
  margin-top: 20px;
}
`;

// Insertar estilos en el documento
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
