var organizationDefs = require('./table-defs/organizations/organization-types');

function MakeOrganization({probable}) {
  var organizationTable = probable.createTableFromSizes(organizationDefs);

  return makeOrganization;

  function makeOrganization() {
    var entry = organizationTable.roll();
    var name;
    var isAPlace = false;

    if (typeof entry === 'object') {
      name = entry.name;
      isAPlace = entry.isAPlace;
    }
    else {
      name = entry;
    }

    var enemies = [];
    for (var i = 0; i < probable.rollDie(3); ++i) {
      enemies.push(organizationTable.roll());
    }

    return {
      name: name,
      isAPlace: isAPlace,
      enemies: enemies,
      power: probable.roll(6) + probable.roll(6),
      reach: probable.roll(6) + probable.roll(6),
      wealth: probable.roll(6) + probable.roll(6)
    };
  }
}

module.exports = MakeOrganization;
