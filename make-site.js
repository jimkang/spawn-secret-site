var siteDefs = require('./table-defs/sites/site-types');
var getContainingGeoEntity = require('./get-containing-geo-entity');
var callNextTick = require('call-next-tick');
// var sb = require('standard-bail')();
var curry = require('lodash.curry');
var waterfall = require('async-waterfall');
var pickLocationInBounds = require('./pick-location-in-bounds');
var reference = require('./reference');

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
    if (builder.bounds) {
      containingGeoEntity = builder.name;
      location = pickLocationInBounds(probable, builder.bounds);
      callNextTick(passSite);
    }
    else {
      location = pickLocationInBounds(probable, reference.maxGeoBounds);
      waterfall(
        [
          curry(getContainingGeoEntity)(location),
          saveContainingGeoEntity
        ],
        passSite
      );
    }

    // TODO: Physical details?

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
