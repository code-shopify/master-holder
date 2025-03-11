// Esperar a que jQuery y Magnific Popup estén disponibles
function waitForDependencies(callback, maxAttempts = 50) {
  let attempts = 0;
  
  function checkDependencies() {
    if (window.jQuery && typeof jQuery.magnificPopup !== 'undefined') {
      callback();
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(checkDependencies, 100);
    } else {
      console.error('No se pudieron cargar las dependencias después de', maxAttempts, 'intentos');
    }
  }
  
  checkDependencies();
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, waiting for dependencies...');
  
  waitForDependencies(function() {
    console.log('Dependencies loaded, initializing popup...');
    
    $(document).on('click', '[data-popup-comparador]', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const $this = $(this);
      const popupId = $this.data('popup-id');
      
      if (!popupId) {
        console.error('No se encontró el ID del popup');
        return;
      }

      const $popup = $('#' + popupId);
      if (!$popup.length) {
        console.error('No se encontró el elemento del popup:', popupId);
        return;
      }

      try {
        $.magnificPopup.open({
          items: {
            src: $popup,
            type: 'inline'
          },
          tClose: 'Cerrar (Esc)',
          mainClass: 't4s-popup-wrapper mfp-move-horizontal',
          removalDelay: 300,
          closeOnBgClick: true,
          closeBtnInside: true,
          showCloseBtn: true,
          fixedContentPos: true,
          preloader: false,
          midClick: true,
          callbacks: {
            beforeOpen: function() {
              console.log('Abriendo popup...', popupId);
              showLoading(popupId.replace('popup-comparador-', ''));
            },
            open: function() {
              console.log('Popup abierto');
              $('body').addClass('t4s-popup-opened');
              const productId = popupId.replace('popup-comparador-', '');
              beforeAfter(productId);
              hideLoading(productId);
            },
            close: function() {
              console.log('Popup cerrado');
              $('body').removeClass('t4s-popup-opened');
            },
            error: function(e) {
              console.error('Error al abrir el popup:', e);
              hideLoading(popupId.replace('popup-comparador-', ''));
            }
          }
        });
      } catch (error) {
        console.error('Error al inicializar el popup:', error);
        hideLoading(popupId.replace('popup-comparador-', ''));
      }
    });
  });
});

function showLoading(productId) {
  const container = document.querySelector(`#popup-comparador-${productId} .loading-overlay`);
  if (container) container.style.display = 'flex';
}

function hideLoading(productId) {
  const container = document.querySelector(`#popup-comparador-${productId} .loading-overlay`);
  if (container) container.style.display = 'none';
}

function beforeAfter(productId) {
  try {
    console.log('Inicializando comparador para producto:', productId);
    const slider = document.getElementById("before_after_" + productId);
    const range = document.getElementById("before_after_slider_" + productId);
    
    if (!slider || !range) {
      throw new Error('No se encontraron los elementos necesarios para el comparador');
    }
    
    // Establecer el ancho inicial
    slider.style.width = range.value + "%";
    
    // Agregar evento para actualización continua
    range.addEventListener('input', function() {
      slider.style.width = this.value + "%";
    });
    
    console.log('Comparador inicializado correctamente');
  } catch (error) {
    console.error('Error en beforeAfter:', error);
    hideLoading(productId);
  }
} 