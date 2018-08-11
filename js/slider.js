'use strict';

(function () {
  var sliders = document.querySelectorAll('.slider');

  function handleSlider(slider) {
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
        }

        if (currentControl === controls[controls.length - 1]) {
          buttons[buttons.length - 1].disabled = true;
        }
      }
    }

    function syncSliderElements(currentControl) {
      makeControlActive(currentControl);
      showSlide(currentControl);
      setTabindex();
      disableSlideButton(currentControl);
    }

    function bringBackFocus(currentControl) {
      if (currentControl === controls[controls.length - 1]) {
        currentControl.focus();
      }
      if (currentControl === controls[0]) {
        controls[1].focus();
      }
    }

    function runSlider() {
      setTabindex();

      controls.forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          syncSliderElements(item);
        });
      });

      if (buttons.length > 0) {
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
            bringBackFocus(control);
          });
        });
      }
    }
    runSlider();
  }

  if (sliders.length > 0) {
    [].forEach.call(sliders, function (item) {
      handleSlider(item);
    });
  }
})();
