'use strict';

var mapLink = document.querySelector('.contacts__map');
var messageButton = document.querySelector('.contacts__button');
var toCartButtons = document.querySelectorAll('.button--buy');
var mapModal = document.querySelector('.modal--map');
var messageModal = document.querySelector('.modal--message');
var cartPlusModal = document.querySelector('.modal--cart-plus');
var modals = document.querySelectorAll('.modal');

function showModal(event, modal) {
  event.preventDefault();
  modal.classList.add('modal--show');
}

function hideModal(modal) {
  if (modal.classList.contains('modal--show')) {
    modal.classList.remove('modal--show');
  }
}

if ((mapLink) && (mapModal)) {
  mapLink.addEventListener('click', function (event) {
    showModal(event, mapModal);
  });
}

if ((messageButton) && (messageModal)) {
  messageButton.addEventListener('click', function (event) {
    showModal(event, messageModal);
  });
}

if ((toCartButtons) && (cartPlusModal)) {
  [].forEach.call(toCartButtons, function (item) {
    item.addEventListener('click', function (event) {
      showModal(event, cartPlusModal);
    });
  });
}

if (modals) {
  [].forEach.call(modals, function (item) {
    var close = item.querySelector('.modal__close');
    close.addEventListener('click', function (event) {
      hideModal(item);
    });
    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        hideModal(item);
      }
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
