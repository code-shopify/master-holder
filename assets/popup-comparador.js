// Esperar a que jQuery esté disponible
function waitForJQuery(callback) {
  if (window.jQuery) {
    callback();
  } else {
    setTimeout(function() {
      waitForJQuery(callback);
    }, 50);
  }
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Iniciando configuración del popup');
  
  waitForJQuery(function() {
    console.log('jQuery disponible - Configurando Magnific Popup');
    
    const comparadorBtn = document.querySelector('[data-popup-comparador]');
    
    if (comparadorBtn) {
      console.log('Botón del comparador encontrado');
      
      jQuery(document).ready(function($) {
        $(document).on('click', '[data-popup-comparador]', function(e) {
          e.preventDefault();
          console.log('Click en botón del comparador');
          
          const popupId = this.getAttribute('data-open-mfp-inline');
          console.log('PopupID:', popupId);
          
          $.magnificPopup.open({
            items: {
              src: popupId,
              type: 'inline'
            },
            mainClass: 't4s-popup-comparador t4s-mfp-move-horizontal',
            removalDelay: 300,
            closeOnBgClick: true,
            closeBtnInside: true,
            showCloseBtn: true,
            callbacks: {
              beforeOpen: function() {
                console.log('Antes de abrir el popup');
              },
              open: function() {
                console.log('Popup abierto - inicializando comparador');
                initComparador();
              },
              close: function() {
                console.log('Popup cerrado');
              }
            }
          });
        });
      });
    } else {
      console.warn('No se encontró el botón del comparador');
    }
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