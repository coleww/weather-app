(function () {
  'use strict';

  angular.
    module('forecast', ['geolocation', 'forecast-day']).
    component('forecast', {
      templateUrl: 'js/components/forecast/forecast.template.html',
      controller: ['GeoLocationService',
        function ForecastController (GeoLocationService) {
          var that = this;
          that.stuff = [{name: 'foo'}, {name: 'wow'}]
          GeoLocationService.getLocation().then(function (coords) {
            that.coords = coords;
          });
        }
      ]
    });
})()