(function () {
  'use strict';

  angular.
    module('forecast-day', ['geolocation']).
    component('forecastDay', {
      templateUrl: 'js/components/forecast-day/forecast-day.template.html',
      controller: function ForecastDayController () {
        // ??? do we even need a controller here? it's really just a template (for now)
      },
      bindings: {
        thing: '<'
      }
    });
})()