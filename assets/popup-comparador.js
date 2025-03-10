document.addEventListener('DOMContentLoaded', function() {
  const comparadorBtn = document.querySelector('[data-popup-comparador]');
  
  if (comparadorBtn) {
    comparadorBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      jQuery('[data-popup-comparador]').magnificPopup({
        items: {
          src: '#PopupComparador',
          type: 'inline'
        },
        mainClass: 't4s-popup-comparador',
        removalDelay: 300,
        callbacks: {
          open: function() {
            console.log('Popup abierto - inicializando comparador');
            initComparador();
          }
        }
      }).magnificPopup('open');
    });
  }
});

function initComparador() {
  const range = document.querySelector('.t4s-comparador-range');
  const beforeContainer = document.querySelector('.t4s-before-image-container');
  
  if (range && beforeContainer) {
    range.addEventListener('input', function() {
      beforeContainer.style.width = this.value + '%';
    });
  }
} 