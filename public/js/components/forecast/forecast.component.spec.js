describe('forecast Component', function () {
  beforeEach(module('forecast'));
  beforeEach(module('templates'));


  var createElement;

  beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
    createElement = function (data, loading, errorMsg) {
      var scope = _$rootScope_.$new();
      var element = angular.element('<forecast forecast-data="data" loading="loading" error-msg="errorMsg"></forecast>');
      var compiledElement = _$compile_(element)(scope);
      scope.data = data;
      scope.loading = loading;
      scope.errorMsg = errorMsg;
      scope.$apply();
      return compiledElement;
    };
  }));

  it('should render out a forecast-day component for each element in the data array', function() {
    var element = createElement([{},{}]);
    // because the forecast component has nested forecast-day components, we can't truly test it in isolation
    // however, since we don't really care about the forecast-day components in this test, we can just pass it empty data here
    // we just need to test that forecast renders out a forecast-day component for each element
    // and the forecast-day tests will check that those elements are rendered correctly
    var forecastDayComponents = element.find('forecast-day');
    expect(forecastDayComponents.length).toBe(2);
  });

  it('should show a loading spinner when the app is loading', function() {
    var element = createElement(undefined, true);
    var spinner = element[0].getElementsByClassName('spinner')[0];
    expect(spinner.classList.contains('ng-hide')).toBe(false);
  });

  it('should show an error message if one is passed', function() {
    var element = createElement(undefined, false, 'wow, how errorful');
    var error = element[0].getElementsByClassName('error-msg')[0];
    expect(error.classList.contains('ng-hide')).toBe(false);
    expect(error.textContent.trim()).toBe('wow, how errorful');
  });

  it('should hide error and loading elements if they are falsey', function() {
    var element = createElement(undefined, false, false);
    var error = element[0].getElementsByClassName('error-msg')[0];
    expect(error.classList.contains('ng-hide')).toBe(true);
    var spinner = element[0].getElementsByClassName('spinner')[0];
    expect(spinner.classList.contains('ng-hide')).toBe(true);
  });
});
