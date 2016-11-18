var siteDefs = require('./table-defs/sites/site-types');
var getBoundsForGeoEntity = require('./get-bounds-for-geo-entity');
var callNextTick = require('call-next-tick');
var sb = require('standard-bail')();

function MakeSite({probable}) {
  var siteTable = probable.createTableFromSizes(siteDefs);

  return makeSite;

  function makeSite({builder}, done) {
    var name = siteTable.roll();

    // var enemies = [];
    // for (var i = 0; i < probable.rollDie(3); ++i) {
    //   enemies.push(siteTable.roll());
    // }
    var history = [
      {
        event: 'built',
        actor: builder
      }
    ];

    if (builder.isAPlace) {
      getBoundsForGeoEntity(builder.name, sb(pickLocationInBounds, done));
    }
    else {
      // TODO: Pick random geocode.
      callNextTick(passSite);
    }

    function pickLocationInBounds(bounds) {
      console.log(bounds);
      // TODO: Pick from within bounds.
      passSite();
    }

    // TODO: Location, history steps. Physical details?

    function passSite() {
      var site = {
        name: name,
        history: history
      };
      done(null, site);
    }
  }
}

module.exports = MakeSite;
