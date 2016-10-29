(function () {
  'use strict';

  angular.module('geolocation', []).factory('GeoLocationService', ['$q', '$window', function ($q, $window) {
    var seattleCoords = {
      latitude: '47.6062',
      longitude: '122.3321'
    };

    function getLocation () {
      var deferred = $q.defer();

      if (!$window.navigator.geolocation) {
        // browser does not support geolocation, just return coords for Seattle
        deferred.resolve(seattleCoords);
      } else {
        $window.navigator.geolocation.getCurrentPosition(function (position) {
          // user allowed geolocation, return object containing latitude/longitude
          deferred.resolve(position.coords);
        }, function (err) {
          // user did not allow geolocation access, or something went wrong, so just use Seattle
          deferred.resolve(seattleCoords);
        });
      }

      return deferred.promise;
    }

    return {
      getLocation: getLocation
    };
  }]);
})();
