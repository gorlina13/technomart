'use strict';

(function () {
  var cards = document.querySelectorAll('.product');
  cards = Array.prototype.slice.call(cards);

  function onElementFocus() {
    this.classList.remove('product--no-focus');
  }

  function onElementBlur() {
    this.classList.add('product--no-focus');
  }

  function handleCardHovers() {
    if (cards.length > 0) {
      cards.forEach(function (item) {
        item.addEventListener('focus', onElementFocus, true);
        item.addEventListener('blur', onElementBlur, true);
      });
    }
  }

  handleCardHovers();
})();
