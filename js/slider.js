'use strict';

(function () {
  var sliders = document.querySelectorAll('.slider');
  sliders = Array.prototype.slice.call(sliders);

  function handleSlider(slider) {
    var controls = slider.querySelectorAll('.slider__control');
    var slides = slider.querySelectorAll('.slider__item');
    var buttons = slider.querySelectorAll('.slider__button');
    var buttonsWithin = slider.querySelectorAll('.button');
    controls = Array.prototype.slice.call(controls);
    slides = Array.prototype.slice.call(slides);
    buttons = Array.prototype.slice.call(buttons);
    buttonsWithin = Array.prototype.slice.call(buttonsWithin);

    function makeControlsInactive() {
      controls.forEach(function (item) {
        item.classList.remove('slider__control--active');
      });
    }

    function makeControlActive(control) {
      control.classList.add('slider__control--active');
    }

    function handleControls(currentControl) {
      makeControlsInactive();
      makeControlActive(currentControl);
    }

    function setIndex(arr) {
      arr.forEach(function (item, i) {
        item.itemIndex = i;
      });
    }

    function saveCurrentSlideIndex() {
      slides.forEach(function (item) {
        if (item.classList.contains('slider__item--show')) {
          var currentSlide = item;
          slider.currentSlideIndex = currentSlide.itemIndex;
        }
      });
    }

    function removeClassBeforeShow() {
      slides.forEach(function (item) {
        item.classList.remove('slider__item--show');
      });
    }

    function showSlide(currentControl) {
      var controlIndex = currentControl.itemIndex;
      if (slides[controlIndex]) {
        removeClassBeforeShow();
        slides[controlIndex].classList.add('slider__item--show');
        saveCurrentSlideIndex();
      }
    }

    function setTabindex() {
      if (buttonsWithin.length > 0) {
        buttonsWithin.forEach(function (item) {
          item.removeAttribute('tabindex');
          var element = item.parentElement;
          while (!(element.classList.contains('slider__slides'))) {
            if (!(element.classList.contains('slider__item--show'))) {
              item.setAttribute('tabindex', -1);
              return;
            }
            element = element.parentElement;
          }
        });
      }
    }

    function enableSlideButtons() {
      buttons.forEach(function (item) {
        if (item.disabled) {
          item.disabled = false;
        }
      });
    }

    function disableSlideButton(currentControl) {
      if (currentControl === controls[0]) {
        buttons[0].disabled = true;
      }

      if (currentControl === controls[controls.length - 1]) {
        buttons[buttons.length - 1].disabled = true;
      }
    }

    function handleSlideButtons(currentControl) {
      if (buttons.length > 0) {
        enableSlideButtons();
        disableSlideButton(currentControl);
      }
    }

    function setFocusWhenButtonIsDisabled(currentControl) {
      if (currentControl === controls[controls.length - 1]) {
        currentControl.focus();
      }
      if (currentControl === controls[0]) {
        controls[1].focus();
      }
    }

    function syncSliderElements(currentControl) {
      handleControls(currentControl);
      showSlide(currentControl);
      setTabindex();
      handleSlideButtons(currentControl);
    }

    function onControlClick(evt, control) {
      evt.preventDefault();
      syncSliderElements(control);
    }

    function onSliderButtonClick(evt, button) {
      evt.preventDefault();
      var index = slider.currentSlideIndex;

      if (button === buttons[0]) {
        var nextControl = controls[index - 1];
      } else {
        var nextControl = controls[index + 1];
      }
      syncSliderElements(nextControl);
      setFocusWhenButtonIsDisabled(nextControl);
    }

    function onSliderClick(evt) {
      var target = evt.target;
      while (target !== evt.currentTarget) {
        if (target.classList.contains('slider__control')) {
          onControlClick(evt, target);
          return;
        }
        if (target.classList.contains('slider__button')) {
          // If IE11
          if (target.disabled) {
            evt.preventDefault();
            var control = controls[slider.currentSlideIndex];
            setFocusWhenButtonIsDisabled(control);
          } else {
            onSliderButtonClick(evt, target);
          }
          return;
        }
        target = target.parentElement;
      }
    }

    function runSlider() {
      setIndex(controls);
      setIndex(slides);
      saveCurrentSlideIndex();
      setTabindex();

      slider.addEventListener('click', function (evt) {
        onSliderClick(evt);
      });
    }

    runSlider();
  }

  if (sliders.length > 0) {
    sliders.forEach(function (item) {
      handleSlider(item);
    });
  }
})();
