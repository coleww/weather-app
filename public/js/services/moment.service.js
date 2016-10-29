(function () {
  'use strict';

  angular.module('moment', []).factory('moment', ['$window', function ($window) {
    // by wrapping our global moment variable in a module, we can inject it using the DI system
    // this makes it much easier to test, because otherwise we would face lots of weird time zone issues (for example, on a CI server)
    // instead, in our tests we can just use a mock moment object that returns whatever we need it to, and just check that it is called with the correct arguments
    return $window.moment;
  }]);
})();
