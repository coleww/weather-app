var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var request = require('request');
var createDarkSkyUrl = require('./utils/createDarkSkyUrl');

var sampleResponse = require('./sampleResponse.json');

app.set('port', port);
app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
  console.log('Express running on ' + port);
});


app.get('/api', function(req,res) {
  console.log('fetching from dark sky...');
  // TODO: check that lat/lon are passed as query params, otherwise return an error

  if (process.env.NODE_ENV === "production") {
    var apiUrl = createDarkSkyUrl(req);
    request(apiUrl).pipe(res);
  } else {
    res.send(JSON.stringify(sampleResponse));
  }
});

