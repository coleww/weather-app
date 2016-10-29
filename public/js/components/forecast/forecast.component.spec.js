describe('forecast Component', function () {
  beforeEach(module('forecast'));
  beforeEach(module('templates'));

  var element;
  var scope;

  beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    element = angular.element('<forecast forecast-data="data"></forecast>');
    element = _$compile_(element)(scope);

    // because the forecast component has nested forecast-day components, we can't truly test it in isolation
    // however, since we don't really care about the forecast-day components in this test, we can just pass it empty data here
    // we just need to test that forecast renders out a forecast-day component for each element
    // and the forecast-day tests will check that those elements are rendered correctly
    scope.data = [
      {},
      {}
    ];
    scope.$apply();
  }));

  it('should render out a forecast-day component for each element in the data array', function() {
    var forecastDayComponents = element.find('forecast-day');
    expect(forecastDayComponents.length).toBe(2);
  });
});