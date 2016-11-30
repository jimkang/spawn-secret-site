var siteDefs = require('./table-defs/sites/site-types');
var getContainingGeoEntity = require('./get-containing-geo-entity');
var callNextTick = require('call-next-tick');
// var sb = require('standard-bail')();
var curry = require('lodash.curry');
var waterfall = require('async-waterfall');
var pickLocationInBounds = require('./pick-location-in-bounds');
var reference = require('./reference');
var modernGeopoliticalEntitiesDefs = require('./table-defs/organizations/modern-geopolitical-entities');

function MakeSite({probable}) {
  var siteTable = probable.createTableFromSizes(siteDefs);
  var geopoliticalEntityTable = probable.createTableFromSizes(modernGeopoliticalEntitiesDefs);

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
    else if (probable.roll(8) === 0) {
      // Pick from anywhere in the world. This'll probably end up in the ocean.
      location = pickLocationInBounds(probable, reference.maxGeoBounds);
      waterfall(
        [
          curry(getContainingGeoEntity)(location),
          saveContainingGeoEntity
        ],
        passSite
      );
    }
    else {
      var entity = geopoliticalEntityTable.roll();
      // console.error('entity', entity)
      containingGeoEntity = entity.name;
      location = pickLocationInBounds(probable, entity.bounds);
      callNextTick(passSite);
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
