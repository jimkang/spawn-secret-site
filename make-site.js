var siteDefs = require('./table-defs/sites/site-types');
var getBoundsForGeoEntity = require('./get-bounds-for-geo-entity');
var getContainingGeoEntity = require('./get-containing-geo-entity');
var callNextTick = require('call-next-tick');
// var sb = require('standard-bail')();
var curry = require('lodash.curry');
var waterfall = require('async-waterfall');

var maxGeoBounds = {
  southwest: {
    lat: -90,
    lng: -180
  },
  northeast: {
    lat: 90,
    lng: 180
  }
};

function MakeSite({probable}) {
  var siteTable = probable.createTableFromSizes(siteDefs);

  return makeSite;

  function makeSite({builder}, siteDone) {
    var name = siteTable.roll();
    var location;
    var containingGeoEntity;
    var history = [
      {
        event: 'built', // TODO: Discovered?
        actor: builder
      }
    ];

    // makeLocationDetails({builder: builder}, sb(passSite, done));
    if (builder.isAPlace) {
      containingGeoEntity = builder.name;
      waterfall(
        [
          curry(getBoundsForGeoEntity)(builder.name),
          pickLocationInGeoEntity
        ],
        passSite
      );
    }
    else {
      location = pickLocationInBounds(maxGeoBounds);
      waterfall(
        [
          curry(getContainingGeoEntity)(location),
          saveContainingGeoEntity
        ],
        passSite
      );
    }

    // TODO: Physical details?

    function pickLocationInGeoEntity(bounds, done) {
      location = pickLocationInBounds(bounds);
      callNextTick(done);
    }

    function saveContainingGeoEntity(entity, done) {
      containingGeoEntity = entity;
      callNextTick(done);
    }

    function passSite() {
      var site = {
        name: name,
        location: location,
        containingGeoEntity: containingGeoEntity,
        history: history
      };
      siteDone(null, site);
    }
  }

  function pickLocationInBounds(bounds) {
    console.log('bounds', bounds);
    var xRange = (bounds.northeast.lng - bounds.southwest.lng) * 100;
    var yRange = (bounds.northeast.lat - bounds.southwest.lat) * 100;
    return {
      lng: bounds.southwest.lng + probable.roll(xRange)/100,
      lat: bounds.southwest.lat + (probable.roll(yRange/2) + probable.roll(yRange/2))/100
    };
  }
}

module.exports = MakeSite;
