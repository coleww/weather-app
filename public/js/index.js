(function () {
  'use strict';

  var app = angular.module('weatherApp', [
    'geolocation',
    'darksky',
    'forecast'
  ]);

  // use a top level controller to fetch all the data for the app
  // each component will be passed the data it needs, making testing much simpler
  app.controller('MainController', ['$scope', 'GeoLocationService', 'DarkSkyService', function MainController ($scope, GeoLocationService, DarkSkyService) {
    GeoLocationService.getLocation()
      .then(DarkSkyService.getForecast)
      .then(function (forecastData) {
        // pull the forecast for the next 5 days out of the API response
        $scope.fiveDayForecastData = forecastData.data.daily.data.slice(1, 6);
      });
  }]);
})();
