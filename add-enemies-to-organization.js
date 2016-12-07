function addEnemiesToOrganization({probable, organization, existingOrganizations}) {
  var enemies = [];
  for (var i = 0; i < probable.rollDie(3); ++i) {
    let enemy = probable.pickFromArray(existingOrganizations);
    if (enemy.name !== organization.name) {
      enemies.push(enemy.name);
    }
  }
  organization.enemies = enemies;
}

module.exports = addEnemiesToOrganization;
