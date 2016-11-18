var config = require('./config');
var request = require('request');
var sb = require('standard-bail')();

function getBoundsForGeoEntity(entityName, done) {
  var apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${entityName}&key=${config.googleMapsKey}`;
  var reqOpts = {
    method: 'GET',
    url: apiURL,
    json: true
  };
  request(reqOpts, sb(pickWithinBounds, done));

  function pickWithinBounds(res, body) {
    if (body.results.length < 1) {
      done(new Error('Could not find ' + entityName));
    }
    else {
      done(null, body.results[0].geometry.bounds);
    }
  }
}

module.exports = getBoundsForGeoEntity;
