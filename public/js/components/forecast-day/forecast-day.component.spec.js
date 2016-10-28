describe('forecast-day Component', function () {
  beforeEach(module('forecast-day'));
  beforeEach(module('templates'));

  var element;
  var scope;

  beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    element = angular.element('<forecast-day forecast-data="data"></forecast-day>');
    element = _$compile_(element)(scope);
    scope.data = {
      summary: 'lots and lots of rain',
      temperatureMin: '52',
      temperatureMax: '73'
    };
    scope.$apply();
  }));

  it('should render the summary', function() {
    // apparently angular's jqlite find doesn't support querying by class name? weird, why, what?
    var summary = element[0].getElementsByClassName('summary')[0];
    expect(summary.textContent.trim()).toBe('lots and lots of rain');
  });

  it('should render the min/max temperature', function() {
    // apparently angular's jqlite find doesn't support querying by class name? weird, why, what?
    var summary = element[0].getElementsByClassName('temperature')[0];
    expect(summary.textContent.trim()).toBe('52°F // 73°F');
  });

});