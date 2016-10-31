(function () {
  'use strict';

  var app = angular.module('weatherApp', [
    'geolocation',
    'darksky',
    'forecast'
  ]);

  // use a top level controller to fetch all the data for the app
  // each component will be passed the data it needs, making testing much simpler
  // TODO: maaaaybe this makes more sense in the forecast component?
  app.controller('MainController', ['$scope', 'GeoLocationService', 'DarkSkyService', function MainController ($scope, GeoLocationService, DarkSkyService) {
    $scope.loading = true;
    $scope.errorMsg = false;
    GeoLocationService.getLocation()
      .then(DarkSkyService.getForecast)
      .then(function (forecastData) {
        $scope.loading = false;
        // pull the forecast for the next 5 days out of the API response
        $scope.forecastData = forecastData.data.daily.data.slice(0, 5);
      }).catch(function (errMsg) {
        $scope.loading = false;
        $scope.errorMsg = errMsg;
        // in a production app we could handle this by re-trying, routing to an error page, or  display a helpful message if the error was caused by user input, etc.
      });
  }]);
})();
