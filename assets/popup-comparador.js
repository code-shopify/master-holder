// Esperar a que jQuery y Magnific Popup estén disponibles
function waitForDependencies(callback) {
  if (window.jQuery && jQuery.magnificPopup) {
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
      const popupId = $this.data('popup-id');
      
      if (!popupId) {
        console.error('No popup ID found');
        return;
      }

      try {
        $.magnificPopup.open({
          items: {
            src: '#' + popupId,
            type: 'inline'
          },
          mainClass: 'mfp-fade',
          removalDelay: 300,
          closeOnBgClick: true,
          closeBtnInside: true,
          showCloseBtn: true,
          fixedContentPos: true,
          callbacks: {
            beforeOpen: function() {
              console.log('Popup opening...', popupId);
              $('#' + popupId).css({
                'display': 'block',
                'opacity': '1',
                'visibility': 'visible'
              });
            },
            open: function() {
              console.log('Popup opened');
              initComparador();
            },
            close: function() {
              console.log('Popup closed');
              $('#' + popupId).css({
                'display': 'none',
                'opacity': '0',
                'visibility': 'hidden'
              });
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