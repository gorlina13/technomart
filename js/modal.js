'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var TAB_KEYCODE = 9;
  var SPACE_KEYCODE = 32;
  var FOCUSABLE_ELEMENTS_SELECTOR = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var mapLink = document.querySelector('.contacts__map-link');
  var mapModal = document.querySelector('.modal--map');
  var messageLink = document.querySelector('.button--contacts');
  var messageModal = document.querySelector('.modal--message');
  var cartPlusLinks = document.querySelectorAll('.button--buy');
  cartPlusLinks = Array.prototype.slice.call(cartPlusLinks);
  var cartPlusModal = document.querySelector('.modal--cart-plus');
  var productLists = document.querySelectorAll('.popular__list--products, .catalog__list');
  productLists = Array.prototype.slice.call(productLists);
  var starters = [mapLink, messageLink, cartPlusLinks];
  var actions = [handleMapModal, handleMessageModal, handleCartPlusModal];
  var modals = document.querySelectorAll('.modal');
  modals = Array.prototype.slice.call(modals);
  var overlay = document.querySelector('.overlay');
  var isStorageSupport = true;
  var storage = '';

  function returnTab(evt) {
    var key = evt.key || evt.keyCode;
    return key === 'Tab' || key === TAB_KEYCODE;
  }

  function returnEsc(evt) {
    var key = evt.key || evt.keyCode;
    return key === 'Escape' || key === 'Esc' || key === ESC_KEYCODE;
  }

  function returnSpaceBar(evt) {
    var key = evt.key || evt.keyCode;
    return key === ' ' || key === 'Spacebar' || key === SPACE_KEYCODE;
  }

  function addButtonRole(link) {
    link.setAttribute('role', 'button');
  }

  function setTabStops(modal) {
    var focusableElements = modal.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    focusableElements = Array.prototype.slice.call(focusableElements);
    modal.firstTabStop = focusableElements[0];
    modal.lastTabStop = focusableElements[focusableElements.length - 1];
  }

  function saveStartPoint(modal) {
    var lastFocusedElement = document.activeElement;
    modal.startPoint = lastFocusedElement;
  }

  function saveShownModal(modal) {
    modals.shownModal = modal;
  }

  function forgetShownModal() {
    modals.shownModal = '';
  }

  function showModal(evt, modal) {
    evt.preventDefault();
    saveStartPoint(modal);
    if (overlay !== null) {
      overlay.classList.add('overlay--show');
    }
    modal.classList.add('modal--show');
    modal.firstTabStop.focus();
    saveShownModal(modal);
  }

  function handleShownModals() {
    window.addEventListener('keydown', function (evt) {
      actIfModalIsShown(evt, onWindowKeydown);
    });

    if (overlay !== null) {
      overlay.addEventListener('click', function (evt) {
        actIfModalIsShown(evt, onOverlayClick)
      });
    }
  }

  function actIfModalIsShown(evt, action) {
    if (modals.shownModal) {
      action(evt, modals.shownModal);
    }
  }

  function onWindowKeydown(evt, modal) {
    if (returnTab(evt)) {
      // If Shift + Tab
      if (evt.shiftKey) {
        if (document.activeElement === modal.firstTabStop) {
          evt.preventDefault();
          modal.lastTabStop.focus();
        }
      // if Tab
      } else {
        if (document.activeElement === modal.lastTabStop) {
          evt.preventDefault();
          modal.firstTabStop.focus();
        }
      }
    }

    if (returnEsc(evt)) {
      onDialogClose(evt, modal);
    }
  }

  function onOverlayClick(evt, modal) {
    hideModal(evt, modal);
    hideOverlay();
  }

  function hideModal(evt, modal) {
    evt.preventDefault();
    modal.classList.remove('modal--show');
    modal.classList.remove('modal--no-animation');
    modal.classList.remove('modal--error');
    modal.startPoint.focus();
    forgetShownModal();
  }

  function hideOverlay() {
    overlay.classList.remove('overlay--show');
  }

  function onDialogClose(evt, modal) {
    hideModal(evt, modal);
    if (overlay !== null) {
      hideOverlay();
    }
  }

  function handleModalClose(modal) {
    var close = modal.querySelector('.modal__close');
    close.addEventListener('click', function (evt) {
      onDialogClose(evt, modal);
    });
  }

  function handleMapModal() {
    if (mapModal !== null) {
      mapLink.addEventListener('click', function (evt) {
        showModal(evt, mapModal);
      });
    }
  }

  function handleMessageModal() {
    function checkStorage() {
      try {
        storage = localStorage.getItem('name');
      } catch (err) {
        isStorageSupport = false;
      }
    }

    function onMessageDialogOpen(evt) {
      showModal(evt, messageModal);
      if (storage) {
        name.value = storage;
        email.focus();
      } else {
        name.focus();
      }
    }

    function onMessageFormSubmit(evt) {
      if ((!name.value) || (!email.value)) {
        evt.preventDefault();
        messageModal.classList.remove('modal--error');
        messageModal.classList.add('modal--no-animation');

        setTimeout(function () {
          messageModal.classList.add('modal--error');
        }, 0);

        if (name.value) {
          email.focus();
        } else {
          name.focus();
        }
      } else {
        if (isStorageSupport) {
          localStorage.setItem('name', name.value);
        }
      }
    }

    if (messageModal !== null) {
      var messageForm = messageModal.querySelector('.message-form');
      var name = messageModal.querySelector('[name=name]');
      var email = messageModal.querySelector('[name=email]');
      checkStorage();
      messageLink.addEventListener('click', function (evt) {
        onMessageDialogOpen(evt);
      });
      addButtonRole(messageLink);

      if (messageLink.tagName === 'A') {
        messageLink.addEventListener('keydown', function (evt) {
          if (returnSpaceBar(evt)) {
            onMessageDialogOpen(evt);
          }
        });
      }
      messageForm.addEventListener('submit', function (evt) {
        onMessageFormSubmit(evt);
      });
    }
  }

  function handleCartPlusModal() {
    function onCartPlus(evt) {
      var target = evt.target;
      while (target !== evt.currentTarget) {
        if (target.classList.contains('button--buy')) {
          showModal(evt, cartPlusModal);
          return;
        }
        target = target.parentElement;
      }
    }

    if ((productLists.length > 0) && (cartPlusLinks.length > 0) && (cartPlusModal !== null)) {
      cartPlusLinks.forEach(function (item) {
        addButtonRole(item);
      });
      productLists.forEach(function (item) {
        item.addEventListener('click', function (evt) {
          onCartPlus(evt);
        });
        item.addEventListener('keydown', function (evt) {
          if (returnSpaceBar(evt)) {
            onCartPlus(evt);
          }
        });
      });
    }
  }

  if (modals.length > 0) {
    modals.forEach(function (item) {
      setTabStops(item);
      handleModalClose(item);
    });
    handleShownModals();
  }

  if (starters.length > 0) {
    starters.forEach(function (item, i) {
      if (item !== null) {
        actions[i]();
      }
    });
  }
})();
