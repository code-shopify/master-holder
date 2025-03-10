// Esperar a que jQuery y Magnific Popup estén disponibles
function waitForDependencies(callback) {
  if (window.jQuery && typeof jQuery.magnificPopup !== 'undefined') {
    callback();
  } else {
    setTimeout(function() {
      waitForDependencies(callback);
    }, 100);
  }
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, waiting for dependencies...');
  
  waitForDependencies(function() {
    console.log('Dependencies loaded, initializing popup...');
    
    // Elementos del modal
    const trigger = document.querySelector('[data-popup-comparador]');
    const modal = document.getElementById('popup-comparador-' + trigger?.dataset?.popupId);
    
    if (!trigger || !modal) {
      console.log('No se encontraron los elementos necesarios para el comparador');
      return;
    }

    const closeBtn = modal.querySelector('.t4s-comparador-close');
    const overlay = modal.querySelector('.t4s-comparador-overlay');

    // Funciones
    function openModal() {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      initComparador();
    }

    function closeModal() {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    // Event Listeners
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  });
});

function initComparador() {
  const container = document.querySelector('.popup-comparador-content');
  if (!container) {
    console.log('No se encontró el contenedor del comparador');
    return;
  }

  const range = container.querySelector('input[type="range"]');
  const comparisonContainer = container.querySelector('.comparison-container');
  
  if (range && comparisonContainer) {
    // Establecer valor inicial
    const initialValue = '50';
    range.value = initialValue;
    comparisonContainer.style.setProperty('--position', initialValue + '%');

    // Manejar cambios en el range
    range.addEventListener('input', function() {
      comparisonContainer.style.setProperty('--position', this.value + '%');
    });
    
    console.log('Comparador inicializado correctamente');
  } else {
    console.log('No se encontraron los elementos necesarios para el comparador');
  }
} 