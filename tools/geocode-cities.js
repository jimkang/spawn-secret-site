var config = require('../config');
var request = require('request');
var sb = require('standard-bail')();
var pluck = require('lodash.pluck');
var through2 = require('through2');
var through2Batch = require('through2-batch');
var split = require('split');
var callNextTick = require('call-next-tick');
var ndjson = require('ndjson');

// Usage: cat line-separated-cities.txt | node geocode-cities.js

process.stdin
  .pipe(split())
  .pipe(through2Batch.obj({batchSize: 100, objectMode: true}, geocodeBatch))
  // .pipe(through2({objectMode: true}, unbatch))
  .pipe(ndjson.stringify())
  .pipe(process.stdout);

function geocodeBatch(cities, enc, done) {
  var stream = this;

  var reqOpts = {
    url: 'https://www.mapquestapi.com/geocoding/v1/batch?&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1&key=' +
      config.mapquestKey + '&' +
      cities.map(getLocationQueryString).join('&'),
    method: 'GET',
    json: true
  };
  request(reqOpts, pushCityObjects);

  function pushCityObjects(error, res, body) {
    if (error) {
      console.error(error);
    }
    else {
      body.results.forEach(pushCityObject);
    }
    done();
  }

  function pushCityObject(result) {
    var nameParts = result.providedLocation.location.split(', ');
    if (result.locations.length > 0) {
      var cityObject = {
        name: nameParts[0],
        containingGeoEntity: nameParts[1],
        location: result.locations[0].latLng
      };
      stream.push(cityObject);
    }
  }
}

// function unbatch(batch, enc, done) {
//   for (var i = 0; i < batch.length; ++i) {
//     this.push(batch[i]);
//   }
//   callNextTick(done);
// }

function getLocationQueryString(city) {
  return 'location=' + city;
}
