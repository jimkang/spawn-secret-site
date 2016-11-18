var config = require('./config');
var request = require('request');
var sb = require('standard-bail')();

function getBoundsForGeoEntity(entityName, done) {
  var cleaned = cleanName(entityName);
  var apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${cleaned}&key=${config.googleMapsKey}`;
  var reqOpts = {
    method: 'GET',
    url: apiURL,
    json: true
  };
  request(reqOpts, sb(pickBounds, done));

  function pickBounds(res, body) {
    if (body.results.length < 1) {
      done(new Error('Could not find ' + entityName));
    }
    else {
      done(null, body.results[0].geometry.bounds);
    }
  }
}

function cleanName(name) {
  return name
    .replace('in the depths of ', '')
    .replace('a city in ', '');
}

module.exports = getBoundsForGeoEntity;
