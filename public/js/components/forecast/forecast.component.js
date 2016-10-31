(function () {
  'use strict';

  angular.
    module('forecast', ['forecast-day']).
    component('forecast', {
      templateUrl: 'js/components/forecast/forecast.template.html',
      bindings: {
        forecastData: '<',
        loading: '<',
        errorMsg: '<'
      }
    });
})();