/* global process */

var MakeOrganization = require('../make-organization');
var seedrandom = require('seedrandom');
var createProbable = require('probable').createProbable;
var addEnemiesToOrganization = require('../add-enemies-to-organization');

if (process.argv.length < 3) {
  console.error('Usage: node tools/build-initial-organizations.js <seed string> [number of orgs]');
  process.exit();
}

var seed = process.argv[2];
var numberOfOrgs = 20;

if (process.argv.length > 3) {
  numberOfOrgs = process.argv[3];
}

var random = seedrandom(seed);

var probable = createProbable({
  random: random
});

var makeOrganization = MakeOrganization({probable: probable});
var organizations = [];

for (var i = 0; i < numberOfOrgs; ++i) {
  organizations.push(makeOrganization());
}

var organizationDict = {};
organizations.forEach(modifyOrganization);

var state = {
  organizations: organizationDict
};

console.log(JSON.stringify(state, null, '  '));

function modifyOrganization(organization) {
  addEnemies(organization);
  addToDict(organization);
}

function addEnemies(organization) {
  addEnemiesToOrganization({
    organization: organization, existingOrganizations: organizations, probable: probable
  });
}

function addToDict(organization) {
  if (organization.name in organizationDict) {
    console.error(organization.name, 'already exists!');
    console.error(organizationDict[organization.name]);
    console.error(organization);
  }
  else {
    organizationDict[organization.name] = organization;
  }
}
