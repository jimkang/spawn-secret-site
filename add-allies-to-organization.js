function addAlliesToOrganization({probable, organization, existingOrganizations}) {
  var allies = [];
  for (var i = 0; i < probable.rollDie(3); ++i) {
    let ally = probable.pickFromArray(existingOrganizations);
    if (ally.name !== organization.name) {
      allies.push(ally.name);
    }
  }
  organization.allies = allies;
}

module.exports = addAlliesToOrganization;
