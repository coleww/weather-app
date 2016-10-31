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

  var fakeWindow;

  beforeEach(function () {
    // defining fakeWindow here because we manipulate it in one of our tests
    // if we defined this outside of a beforeEach block, then if our tests were run in random order they would sometimes fail
    fakeWindow = {
      navigator: {
        geolocation: {
          getCurrentPosition: function (success, error) {}
        }
      }
    };
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

  it('returns a promise that rejects with an error if geolocation fails', function() {
    var result;
    GeoLocationService.getLocation().catch(function (data) {
      result = data;
    });
    errorCB();
    $scope.$apply();
    expect(result).toEqual('we could not get your forecast, please allow access access to your location and try again');
  });

  it('returns a promise that rejects with a sad error msg if geolocation is unavailable', function() {
    var result;
    fakeWindow.navigator = {};
    GeoLocationService.getLocation().catch(function (data) {
      result = data;
    });
    errorCB();
    $scope.$apply();
    expect(result).toEqual('your browser does not support geolocation, sorry! so very sorry :<');
  });

});
