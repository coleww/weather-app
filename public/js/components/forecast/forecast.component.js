(function () {
  'use strict';

  angular.
    module('forecast', ['geolocation', 'darksky', 'forecast-day']).
    component('forecast', {
      templateUrl: 'js/components/forecast/forecast.template.html',
      bindings: {
        forecastData: '<',
        loading: '<'
      }
    });
})();