describe('DarkSkyService', function() {
  var DarkSkyService;
  var $httpBackend;

  var coords = {
    latitude: 1234,
    longitude: 5678
  };

  beforeEach(module('darksky'));

  beforeEach(angular.mock.inject(function (_DarkSkyService_, _$httpBackend_, _$rootScope_) {
    DarkSkyService = _DarkSkyService_;
    $httpBackend = _$httpBackend_;
    $scope = _$rootScope_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('returns a promise that resolves to forecast data on success', function () {
    var result;
    var responseData = {hello: "world"};

    $httpBackend
      .expect('GET', '/api?lat=1234&lon=5678')
      .respond(200, responseData);

    DarkSkyService.getForecast(coords).then(function (data) {
      result = data;
    });
    // flush the mock backend, otherwise we'd have to make the tests async
    $httpBackend.flush();
    // force a digest cycle so that our promises resolve
    $scope.$apply();
    expect(result.data).toEqual(responseData);
  });

  it('returns a promise that resolves to an erorr if no coordinates are passed', function () {
    var result;
    DarkSkyService.getForecast({}).catch(function (msg) {
      result = msg;
    });
    $scope.$apply();
    expect(result).toEqual('getForecast must be passed a coords object that contains latitude and longitude attrs');
  });

  it('returns a promise that resolves to an erorr if the API fails', function () {
    var result;

    $httpBackend
      .expect('GET', '/api?lat=1234&lon=5678')
      .respond(400);

    DarkSkyService.getForecast(coords).catch(function (msg) {
      result = msg;
    });

    $httpBackend.flush();
    $scope.$apply();
    expect(result).toEqual('error fetching forecast data, please try again');
  });
});
