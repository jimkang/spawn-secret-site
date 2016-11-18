var config = require('./config');
var request = require('request');
var sb = require('standard-bail')();
var pluck = require('lodash.pluck');

var wantedAddressComponentTypes = [
  'country',
  'administrative_area_level_1',
  'administrative_area_level_2',
  'sublocality',
  'neighborhood'
];

function getContainingGeoEntity(location, done) {
  var apiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${config.googleMapsKey}`;
  var reqOpts = {
    method: 'GET',
    url: apiURL,
    json: true
  };
  request(reqOpts, sb(assembleEntityName, done));

  function assembleEntityName(res, body) {
    if (body.results.length < 1) {
      done(new Error('Could not find lng, lat: ' + location.lng, + ',' + location.lat));
    }
    else {
      var components = body.results[0].address_components
        .filter(componentHasWantedType);
      done(null, pluck(components, 'long_name').join(', '));
    }
  }
}

function componentHasWantedType(component) {
  return component.types.some(typeIsInWantedType);
}

function typeIsInWantedType(type) {
  return wantedAddressComponentTypes.indexOf(type) !== -1;
}

module.exports = getContainingGeoEntity;
