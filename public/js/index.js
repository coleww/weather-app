(function () {
  var app = angular.module('weatherApp', []);

  app.controller('ForecastController', function ($scope) {
    // use GeoService to get lat/long, default to seattle
    // use API service to fetch data
    // set the data on $scope
    $scope.stuff = 1
  })

})()
