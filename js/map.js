'use strict';

function initMap() {
  var ZOOM = 16;
  var TITLE = 'Техномарт';

  var LAT_LNG = {
    lat: 59.938549,
    lng: 30.322993
  };

  var BIG_MAP_CENTER_LAT_LNG = {
    lat: 59.9395147,
    lng: 30.3151553
  };

  var PREVIEW_OPTIONS = {
    zoom: ZOOM,
    center: LAT_LNG,
    scrollwheel: false
  };

  var BIG_MAP_OPTIONS = {
    zoom: ZOOM,
    center: BIG_MAP_CENTER_LAT_LNG,
    scrollwheel: false
  };

  var mapCanvas1 = document.querySelector('.map__interactive-area--preview');
  var mapCanvas2 = document.querySelector('.map__interactive-area--big');

  if (mapCanvas1 !== null) {
    var mapPreview = new google.maps.Map(mapCanvas1, PREVIEW_OPTIONS);

    var marker1 = new google.maps.Marker({
      position: LAT_LNG,
      map: mapPreview,
      title: TITLE
    });
  }

  if (mapCanvas2 !== null) {
    var bigMap = new google.maps.Map(mapCanvas2, BIG_MAP_OPTIONS);
    var marker2 = new google.maps.Marker({
      position: LAT_LNG,
      map: bigMap,
      title: TITLE
    });
  }
}
