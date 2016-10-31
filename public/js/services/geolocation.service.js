(function () {
  'use strict';

  angular.module('geolocation', []).factory('GeoLocationService', ['$q', '$window', function ($q, $window) {
    function getLocation () {
      var deferred = $q.defer();

      if (!$window.navigator.geolocation) {
        // browser does not support geolocation, just return coords for Seattle
        deferred.reject('your browser does not support geolocation, sorry! so very sorry :<');
      } else {
        $window.navigator.geolocation.getCurrentPosition(function (position) {
          // user allowed geolocation, return object containing latitude/longitude
          deferred.resolve(position.coords);
        }, function (err) {
          // user did not allow geolocation access, or something went wrong, so just use Seattle
          deferred.reject('we could not get your forecast, please allow access access to your location and try again');
        });
      }

      return deferred.promise;
    }

    return {
      getLocation: getLocation
    };
  }]);
})();
