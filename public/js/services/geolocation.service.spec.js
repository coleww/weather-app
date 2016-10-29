describe('GeoLocationService', function() {
  var GeoLocationService;
  var $scope;

  // spying on the success/error style callback that geolocation uses is super weird >_<
  var successCB;
  var errorCB;

  var fakeLocationData = {
    coords: {
      latitude: '123.456',
      longitude: '789.10'
    }
  };

  var seattleCoords = {
    latitude: '47.6062',
    longitude: '122.3321'
  };

  var fakeWindow = {
    navigator: {
      geolocation: {
        getCurrentPosition: function (success, error) {}
      }
    }
  };

  beforeEach(function () {
    module('geolocation');

    module(function ($provide) {
      $provide.value('$window', fakeWindow);
    });

    spyOn(fakeWindow.navigator.geolocation, 'getCurrentPosition').and.callFake(function (success, error) {
      // store off the success/error callbacks for our mocked geolocation when it is called
      // this way we can manually trigger these callbacks and pass in mocked position data
      successCB = success;
      errorCB = error;
    });
  });

  beforeEach(angular.mock.inject(function (_GeoLocationService_, _$rootScope_) {
    GeoLocationService = _GeoLocationService_;
    $scope = _$rootScope_;
  }));

  it('returns a promise that resolves to a location if geolocation is enabled', function() {
    var result;
    GeoLocationService.getLocation().then(function (data) {
      result = data;
    });
    successCB(fakeLocationData);
    $scope.$apply(); // this triggers a digest cycle, which ensures the promise has been resolved.
    expect(result).toEqual(fakeLocationData.coords);
  });

  it('returns a promise that resolves to Seattle coords if geolocation fails', function() {
    var result;
    GeoLocationService.getLocation().then(function (data) {
      result = data;
    });
    errorCB();
    $scope.$apply();
    expect(result).toEqual(seattleCoords);
  });


  it('returns a promise that resolves to Seattle coords if geolocation is unavailable', function() {
    var result;
    fakeWindow.navigator = {};
    GeoLocationService.getLocation().then(function (data) {
      result = data;
    });
    $scope.$apply();
    expect(result).toEqual(seattleCoords);
  });
});
