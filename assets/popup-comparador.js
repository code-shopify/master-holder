// Esperar a que jQuery y Magnific Popup estén disponibles
function waitForDependencies(callback) {
  if (window.jQuery && window.jQuery.magnificPopup) {
    callback();
  } else {
    setTimeout(function() {
      waitForDependencies(callback);
    }, 100);
  }
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Iniciando configuración del popup');
  
  waitForDependencies(function() {
    console.log('jQuery y Magnific Popup disponibles');
    
    jQuery(document).ready(function($) {
      // Delegación de eventos para el botón del comparador
      $(document).on('click', '[data-popup-comparador]', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Click en botón del comparador');
        
        var popupId = $(this).data('open-mfp-inline');
        console.log('PopupID:', popupId);
        
        if (!popupId) {
          console.error('No se encontró el ID del popup');
          return;
        }

        try {
          $.magnificPopup.open({
            type: 'inline',
            items: {
              src: popupId,
              type: 'inline'
            },
            mainClass: 't4s-popup-comparador t4s-mfp-move-horizontal',
            removalDelay: 300,
            closeOnBgClick: true,
            closeBtnInside: true,
            showCloseBtn: true,
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            callbacks: {
              beforeOpen: function() {
                console.log('Antes de abrir el popup');
                $(popupId).css('display', 'block');
              },
              open: function() {
                console.log('Popup abierto - inicializando comparador');
                initComparador();
              },
              close: function() {
                console.log('Popup cerrado');
                $(popupId).css('display', 'none');
              }
            }
          });
        } catch (error) {
          console.error('Error al abrir el popup:', error);
        }
      });
    });
  });
});

function initComparador() {
  console.log('Iniciando configuración del comparador');
  
  const range = document.querySelector('.t4s-comparador-range');
  const beforeContainer = document.querySelector('.t4s-before-image-container');
  
  if (range && beforeContainer) {
    console.log('Elementos del comparador encontrados');
    beforeContainer.style.width = '50%';
    
    range.addEventListener('input', function() {
      beforeContainer.style.width = this.value + '%';
    });
  } else {
    console.warn('No se encontraron los elementos necesarios para el comparador', {
      range: !!range,
      beforeContainer: !!beforeContainer
    });
  }
} 