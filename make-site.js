var siteDefs = require('./table-defs/sites/site-types');
var getBoundsForGeoEntity = require('./get-bounds-for-geo-entity');
var getContainingGeoEntity = require('./get-containing-geo-entity');
var callNextTick = require('call-next-tick');
// var sb = require('standard-bail')();
var curry = require('lodash.curry');
var waterfall = require('async-waterfall');
var pickLocationInBounds = require('./pick-location-in-bounds');
var makeRandomLocation = require('./make-random-location');

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
      location = pickLocationInBounds(probable, bounds);
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

}

module.exports = MakeSite;
