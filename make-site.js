var siteDefs = require('./table-defs/sites/site-types');

function MakeSite({probable}) {
  var siteTable = probable.createTableFromSizes(siteDefs);

  return makeSite;

  function makeSite({builder}) {
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

    // TODO: Location, history steps. Physical details?

    return {
      name: name,
      history: history
    };
  }
}

module.exports = MakeSite;
