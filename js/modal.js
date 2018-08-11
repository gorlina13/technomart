'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var mapLink = document.querySelector('.contacts__map');
  var mapModal = document.querySelector('.modal--map');
  var messageButton = document.querySelector('.contacts__button');
  var messageModal = document.querySelector('.modal--message');
  var cartPlusButtons = document.querySelectorAll('.button--buy');
  var cartPlusModal = document.querySelector('.modal--cart-plus');
  var modals = document.querySelectorAll('.modal');
  var overlay = document.querySelector('.overlay');
  var isStorageSupport = true;
  var storage = '';
  var products = document.querySelectorAll('.product');

  function showModal(event, modal) {
    event.preventDefault();
    if (overlay !== null) {
      overlay.classList.add('overlay--show');
    }
    modal.classList.add('modal--show');
  }

  function hideModal(event, modal) {
    event.preventDefault();
    modal.classList.remove('modal--show');
    modal.classList.remove('modal--without-animation');
    modal.classList.remove('modal--error');
    if (overlay !== null) {
      overlay.classList.remove('overlay--show');
    }
  }

  if ((mapLink !== null) && (mapModal !== null)) {
    mapLink.addEventListener('click', function (event) {
      showModal(event, mapModal);
    });
  }

  if ((messageButton !== null) && (messageModal !== null)) {
    var messageForm = messageModal.querySelector('.message-form');
    var username = messageModal.querySelector('[name=username]');
    var email = messageModal.querySelector('[name=email]');

    try {
      storage = localStorage.getItem('username');
    } catch (err) {
      isStorageSupport = false;
    }

    messageButton.addEventListener('click', function (event) {
      showModal(event, messageModal);
      if (storage) {
        username.value = storage;
        email.focus();
      } else {
        username.focus();
      }
    });

    messageForm.addEventListener('submit', function (event) {
      if ((!username.value) || (!email.value)) {
        event.preventDefault();
        messageModal.classList.remove('modal--error');
        messageModal.classList.add('modal--without-animation');
        messageModal.classList.remove('modal--show');

        setTimeout(function () {
          messageModal.classList.add('modal--error');
        }, 200);

        if ((username.value) && (!email.value)) {
          email.focus();
        } else {
          username.focus();
        }
      } else {
        if (isStorageSupport) {
          localStorage.setItem('username', username.value);
        }
      }
    });
  }

  if ((cartPlusButtons.length > 0) && (cartPlusModal !== null)) {
    [].forEach.call(cartPlusButtons, function (item) {
      item.addEventListener('click', function (event) {
        showModal(event, cartPlusModal);
      });
    });
  }

  if (modals.length > 0) {
    [].forEach.call(modals, function (item) {
      var close = item.querySelector('.modal__close');
      close.addEventListener('click', function (event) {
        hideModal(event, item);
      });
      window.addEventListener('keydown', function (event) {
        if (event.keyCode === ESC_KEYCODE) {
          if ((item.classList.contains('modal--show')) || (item.classList.contains('modal--without-animation'))) {
            hideModal(event, item);
          }
        }
      });
      if (overlay !== null) {
        overlay.addEventListener('click', function (event) {
          hideModal(event, item);
        });
      }
    });
  }

  if (products.length > 0) {
    [].forEach.call(products, function (item) {
      var buttons = item.querySelectorAll('.product__button');
      [].forEach.call(buttons, function (button) {
        button.addEventListener('focus', function () {
          item.classList.remove('product--no-js');
        });
        button.addEventListener('blur', function () {
          item.classList.add('product--no-js');
        });
      });
    });
  }
})();
