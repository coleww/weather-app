Five Day Forecast
----------------------

Simple Angular app that shows your five day weather forecast. 
Data is pulled from [Dark Sky](https://darksky.net) via a proxy Express server.

### Development

- install dependencies: `npm install`
- start up the Express proxy server: `npm start`. This will return sample data so that you don't hit the API constantly in development. See "Deployment" for running the app against the live API 
- navigate to `http://localhost:3000/`
- start up the unit test suite: `npm run test`

### Deployment/Production

- get an API key from [Dark Sky](https://darksky.net/dev/account)
- start the app with the DARK_SKY_KEY and NODE_ENV variables set: `DARK_SKY_KEY=YR_API_KEY NODE_ENV=production npm start`


