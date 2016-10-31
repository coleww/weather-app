var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var request = require('request');
var httpsRedirect = require('express-https-redirect');

var createDarkSkyUrl = require('./utils/createDarkSkyUrl');

var sampleResponse = require('./sampleResponse.json');

app.set('port', port);

// this will redirect HTTP requests to HTTPS, which we need in order to access the geolocation API
app.use('/', httpsRedirect());

// serve up our app code from /public
app.use(express.static(path.join(__dirname, 'public')));


var server = app.listen(app.get('port'), function() {
  console.log('Express running on ' + port);
});

app.get('/api', function(req,res) {
  // TODO: check that lat/lon are passed as query params, otherwise return an error

  if (process.env.NODE_ENV === "production") {
    var apiUrl = createDarkSkyUrl(req);
    console.log('fetching from dark sky...');
    request(apiUrl).pipe(res);
  } else {
    console.log('returning sampleResponse');
    res.send(JSON.stringify(sampleResponse));
  }
});

