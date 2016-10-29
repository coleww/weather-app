(function () {
  'use strict';

  angular.
    module('forecast-day', ['geolocation']).
    component('forecastDay', {
      templateUrl: 'js/components/forecast-day/forecast-day.template.html',
      bindings: {
        forecastData: '<'
      }
    });
})();