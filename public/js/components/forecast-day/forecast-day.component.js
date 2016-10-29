(function () {
  'use strict';

  angular.
    module('forecast-day', ['moment']).
    component('forecastDay', {
      templateUrl: 'js/components/forecast-day/forecast-day.template.html',
      bindings: {
        forecastData: '<'
      },
      controller: ['moment', function ForecastDayController (moment) {
        // in a more complex app I would put this sort of date formatting logic into it's own service,
        // that way if we wanted to change how dates were represented we would only have to make the change once in the service
        this.formattedDate = moment.unix(this.forecastData.time).format('dddd MMMM Do')
      }]
    });
})();