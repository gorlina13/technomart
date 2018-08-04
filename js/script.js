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
var sliders = document.querySelectorAll('.slider');

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

function runSlider(slider) {
  var controls = slider.querySelectorAll('.slider__control');
  controls = Array.prototype.slice.call(controls);
  var slides = slider.querySelectorAll('.slider__item');
  slides = Array.prototype.slice.call(slides);
  var buttons = slider.querySelectorAll('.slider__button');
  var buttonsWithin = slider.querySelectorAll('.button');

  function makeControlActive(currentControl) {
    controls.forEach(function (item) {
      item.classList.remove('slider__control--active');
    });

    currentControl.classList.add('slider__control--active');
  }

  function showSlide(currentControl) {
    slides.forEach(function (item) {
      item.classList.remove('slider__item--show');
    });

    var controlIndex = controls.indexOf(currentControl);
    if (slides[controlIndex]) {
      slides[controlIndex].classList.add('slider__item--show');
    }
  }

  function setTabindex() {
    if (buttonsWithin.length > 0) {
      [].forEach.call(buttonsWithin, function (item) {
        item.removeAttribute('tabindex');
        if (!(item.parentElement.classList.contains('slider__item--show'))) {
          item.setAttribute('tabindex', -1);
        }
      });
    }
  }

  function disableSlideButton(currentControl) {
    if (buttons.length > 0) {
      [].forEach.call(buttons, function (item) {
        if (item.disabled) {
          item.disabled = false;
        }
      });

      if (currentControl === controls[0]) {
        buttons[0].disabled = true;
        // buttons[0].nextElementSibling.focus();
      }

      if (currentControl === controls[controls.length - 1]) {
        buttons[buttons.length - 1].disabled = true;
        // buttons[buttons.length - 1].previousElementSibling.focus();
      }
    }
  }

  function syncSliderElements(currentControl) {
    makeControlActive(currentControl);
    showSlide(currentControl);
    setTabindex();
    disableSlideButton(currentControl);
  }

  setTabindex();

  controls.forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      syncSliderElements(item);
    });
  });

  if (buttons) {
    [].forEach.call(buttons, function (item) {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        var shownSlide = slider.querySelector('.slider__item--show');
        var shownSlideIndex = slides.indexOf(shownSlide);
        if (item.classList.contains('slider__button--prev')) {
          var control = controls[shownSlideIndex - 1];
        } else {
          var control = controls[shownSlideIndex + 1];
        }
        syncSliderElements(control);
        if (control === controls[controls.length - 1]){
          control.focus();
        }
        if (control === controls[0]) {
          controls[1].focus();
        }
      });
    });
  }
}

if (sliders) {
  [].forEach.call(sliders, function (item) {
    runSlider(item);
  });
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
