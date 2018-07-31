'use strict';

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
  if (overlay) {
    overlay.classList.add('overlay--show');
  }
  modal.classList.add('modal--show');
}

function hideModal(event, modal) {
  event.preventDefault();
  modal.classList.remove('modal--show');
  modal.classList.remove('modal--without-animation');
  modal.classList.remove('modal--error');
  if (overlay) {
    overlay.classList.remove('overlay--show');
  }
}

if ((mapLink) && (mapModal)) {
  mapLink.addEventListener('click', function (event) {
    showModal(event, mapModal);
  });
}

if ((messageButton) && (messageModal)) {
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

if ((cartPlusButtons) && (cartPlusModal)) {
  [].forEach.call(cartPlusButtons, function (item) {
    item.addEventListener('click', function (event) {
      showModal(event, cartPlusModal);
    });
  });
}

if (modals) {
  [].forEach.call(modals, function (item) {
    var close = item.querySelector('.modal__close');
    close.addEventListener('click', function (event) {
      hideModal(event, item);
    });
    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        if ((item.classList.contains('modal--show')) || (item.classList.contains('modal--without-animation'))) {
          hideModal(event, item);
        }
      }
    });
    if (overlay) {
      overlay.addEventListener('click', function (event) {
        hideModal(event, item);
      });
    }
  });
}

if (products) {
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

function initMap() {
  var myLatLng = {
    lat: 59.938549,
    lng: 30.322993
  };

  var myBigCenter = {
    lat: 59.9395147,
    lng: 30.3151553
  };

  var myPreviewOptions = {
    zoom: 16,
    center: myLatLng,
    scrollwheel: false
  };

  var myBigMapOptions = {
    zoom: 16,
    center: myBigCenter,
    scrollwheel: false
  };

  var mapCanvas1 = document.querySelector('.map__interactive-area--preview');
  var mapCanvas2 = document.querySelector('.map__interactive-area--big');

  if (mapCanvas1) {
    var mapPreview = new google.maps.Map(mapCanvas1, myPreviewOptions);

    var marker1 = new google.maps.Marker({
      position: myLatLng,
      map: mapPreview,
      title: 'Техномарт'
    });
  }

  if (mapCanvas2) {
    var bigMap = new google.maps.Map(mapCanvas2, myBigMapOptions);
    var marker2 = new google.maps.Marker({
      position: myLatLng,
      map: bigMap,
      title: 'Техномарт'
    });
  }
}
