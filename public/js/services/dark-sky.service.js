(function () {
  'use strict';

  angular.module('darksky', []).factory('DarkSkyService', ['$q', '$http', function ($q, $http) {
    function getForecast (coords) {
      var deferred = $q.defer();
      if (coords && coords.latitude && coords.longitude) {
        $http({
          method: 'GET',
          url: '/api',
          params: {
            lat: coords.latitude,
            lon: coords.longitude
          }
        }).then(function (data) {
          deferred.resolve(data);
        }, function () {
          // in a real production app, would return an actual error object to make debugging/error handling easier
          deferred.reject('error pulling data from the API');
        })
      } else {
        deferred.reject('getForecast must be passed a coords object that contains latitude and longitude attrs');
      }

      return deferred.promise;
    }

    return {
      getForecast: getForecast
    }
  }]);
})();
