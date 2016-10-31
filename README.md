Five Day Forecast
----------------------

Simple Angular app that shows your five day weather forecast. 
The users GPS location data is pulled from the HTML5 Geolocation API. 
Weather data is pulled from [Dark Sky](https://darksky.net) via a proxy Express server.

### Development

- install dependencies: `npm install`
- start up the Express proxy server: `npm start`. This will return `sampleResponse.json` so that you don't hit the API constantly in development. (See "Deployment" for running the app against the live API)
- navigate to `http://localhost:3000/` to see the app
- start up the unit test suite: `npm run test`

### Deployment/Production

- get an API key from [Dark Sky](https://darksky.net/dev/account)
- start the app with the DARK_SKY_KEY and NODE_ENV variables set: `DARK_SKY_KEY=YR_API_KEY NODE_ENV=production npm start`
- to deploy to Heroku:
  - `heroku create yr-name-for-yr-app`
  - `heroku config:set DARK_SKY_KEY=YR_API_KEY`
  - `git push heroku master`
  - Heroku will use the `Procfile` to boot up yr app
