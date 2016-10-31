Five Day Forecast
----------------------

Simple Angular app that shows your five day weather forecast. 
The user's GPS location data is pulled from the HTML5 Geolocation API. 
Weather data is pulled from [Dark Sky](https://darksky.net) via a proxy Express server.

### Development

- install dependencies: `npm install`
- start up the Express proxy server: `npm start`. This will return `sampleResponse.json` so that you don't hit the API constantly in development. (See "Deployment" for running the app against the live API)
- navigate to `http://localhost:3000/` to see the app

### Testing
- start up the unit test suite: `npm run test`
- this app uses Karma/Jasmine to run tests, any file in the `/js` directory that ends in `.spec.js` will be picked up by the test runner
- jshint will also lint your code on every test run
- `karma-ng-html2js-preprocessor` is used to populate the `$templateCache` in test, so you can use `templateUrl` in components and not worry about it in your tests

### Deployment/Production

- get an API key from [Dark Sky](https://darksky.net/dev/account)
- start the app with the DARK_SKY_KEY and NODE_ENV variables set: `DARK_SKY_KEY=YR_API_KEY NODE_ENV=production npm start`
- to deploy to Heroku:
  - `heroku create yr-name-for-yr-app`
  - `heroku config:set DARK_SKY_KEY=YR_API_KEY`
  - `git push heroku master`
  - Heroku will use the `Procfile` to boot up yr app

### Notes

This was the first Angular app that I built outside of a tutorial, so I just used `<script>` tags to load all my JS. 
If I was going to expand on this app, or start something new in Angular, the first thing I would do is set up a task runner to bundle my JS, populate the `$templateCache`, and pull my dependencies in `/vendor` from NPM. 

