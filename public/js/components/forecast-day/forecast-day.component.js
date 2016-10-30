(function () {
  'use strict';

  // dark sky has a set of possible values for the `icon` attribute,
  // but also notes that they might add new ones at any time,
  // so we'll have to check the icon attr against the list of icons we have before displaying it
  var icons = [
    'clear-day',
    'clear-night',
    'cloudy',
    'fog',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'rain',
    'sleet',
    'snow',
    'wind'
  ];

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
        // but since we are only using moment this one time I think this is fine
        this.formattedDate = moment.unix(this.forecastData.time).format('dddd MMMM Do');

        var icon;
        // if the icon attr exists in the array of icons we have, use that, if not, use a placeholder icon
        if (icons.indexOf(this.forecastData.icon) > -1) {
          icon = this.forecastData.icon
        } else {
          icon = 'default'
        }

        this.iconPath = 'icons/' + icon + '.svg';
      }]
    });
})();