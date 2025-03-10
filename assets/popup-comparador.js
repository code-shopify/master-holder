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
    
    $(document).on('click', '[data-popup-comparador]', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const $this = $(this);
      const popupId = $this.attr('data-popup-id');
      
      if (!popupId) {
        console.error('No popup ID found');
        return;
      }

      const $popup = $('#' + popupId);
      if (!$popup.length) {
        console.error('Popup element not found:', popupId);
        return;
      }

      try {
        $.magnificPopup.open({
          items: {
            src: $popup,
            type: 'inline'
          },
          tClose: 'Cerrar (Esc)',
          mainClass: 't4s-popup-wrapper',
          removalDelay: 300,
          closeOnBgClick: true,
          closeBtnInside: true,
          showCloseBtn: true,
          fixedContentPos: true,
          preloader: false,
          midClick: true,
          callbacks: {
            beforeOpen: function() {
              console.log('Popup opening...', popupId);
              this.st.mainClass = 'mfp-move-horizontal';
            },
            open: function() {
              console.log('Popup opened');
              $('body').addClass('t4s-popup-opened');
              initComparador();
            },
            close: function() {
              console.log('Popup closed');
              $('body').removeClass('t4s-popup-opened');
            }
          }
        });
      } catch (error) {
        console.error('Error opening popup:', error);
      }
    });
  });
});

function initComparador() {
  const $container = $('.popup-comparador-content');
  const $range = $container.find('input[type="range"]');
  
  if ($range.length) {
    $range.on('input', function() {
      const width = $(this).val() + '%';
      $container.find('.comparison-container').css('--position', width);
    });
    
    console.log('Comparador initialized');
  } else {
    console.log('Range input not found');
  }
} 