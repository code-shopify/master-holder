document.addEventListener('DOMContentLoaded', function() {
  const comparadorBtn = document.querySelector('[data-popup-comparador]');
  
  if (comparadorBtn) {
    comparadorBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const popupId = this.getAttribute('data-open-mfp-inline');
      
      jQuery(document).ready(function($) {
        $(comparadorBtn).magnificPopup({
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
            open: function() {
              console.log('Popup abierto - inicializando comparador');
              initComparador();
            }
          }
        }).magnificPopup('open');
      });
    });
  }
});

function initComparador() {
  const range = document.querySelector('.t4s-comparador-range');
  const beforeContainer = document.querySelector('.t4s-before-image-container');
  
  if (range && beforeContainer) {
    beforeContainer.style.width = '50%';
    
    range.addEventListener('input', function() {
      beforeContainer.style.width = this.value + '%';
    });
  }
} 