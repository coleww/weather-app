describe('forecast-day Component', function () {
  beforeEach(module('forecast-day'));
  beforeEach(module('templates'));
  var momentMock = {
    unix: function () {
      return {
        format: function () {
          return 'Friday, October 28';
        }
      };
    }
  };

  beforeEach(module(function ($provide) {
    spyOn(momentMock, 'unix').and.callThrough();
    $provide.value('moment', momentMock);
  }));

  var createElement;

  beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
    createElement = function (data) {
      var scope = _$rootScope_.$new();
      var element = angular.element('<forecast-day forecast-data="data"></forecast-day>');
      var compiledElement = _$compile_(element)(scope);
      scope.data = data;
      scope.$apply();
      return compiledElement;
    };
  }));

  var defaultData = {
    summary: 'lots and lots of rain',
    temperatureMin: 52,
    temperatureMax: 73,
    icon: 'rain',
    time: 1477627200
  };

  it('should render the summary', function() {
    var element = createElement(defaultData);

    // apparently angular's jqlite find doesn't support querying by class name? weird, why, what?
    var summary = element[0].getElementsByClassName('summary')[0];
    expect(summary.textContent.trim()).toBe('lots and lots of rain');
  });

  it('should render the min/max temperature', function() {
    var element = createElement(defaultData);
    var temperature = element[0].getElementsByClassName('temperature')[0];
    // if we just pull out the text content, it will have a ton of whitespace in it
    // so replace any duplicate white space with a single space, and trim() off any leading/trailing whitespace
    var trimmedContent = temperature.textContent.replace(/\s+/g, ' ').trim();
    expect(trimmedContent).toBe('low: 52°F high: 73°F');
  });

  it('should render out the date', function() {
    var element = createElement(defaultData);

    // check that our component is actually passing the `time` attr to moment for formatting
    expect(momentMock.unix).toHaveBeenCalledWith(1477627200);
    var date = element[0].getElementsByClassName('date')[0];
    expect(date.textContent.trim()).toBe('Friday, October 28');
  });

  it('should render a weather icon', function() {
    var element = createElement(defaultData);

    var icon = element[0].getElementsByClassName('icon')[0];
    expect(icon.src).toMatch(/rain\.svg/);
  });

  it('should render a default icon if it receives a new icon attr', function() {
    var element = createElement(Object.assign(defaultData, {icon: 'brimstone'}));

    var icon = element[0].getElementsByClassName('icon')[0];
    expect(icon.src).toMatch(/default\.svg/);
  });
});
