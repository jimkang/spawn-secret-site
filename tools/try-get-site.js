var MakeOrganization = require('../make-organization');
var MakeSite = require('../make-site');
var seedrandom = require('seedrandom');
var createProbable = require('probable').createProbable;

var seed = (new Date()).toISOString();
console.log('seed:', seed);

var random = seedrandom(seed);

var probable = createProbable({
  random: random
});

var makeOrganization = MakeOrganization({probable: probable});
var makeSite = MakeSite({probable: probable});

var organization = makeOrganization();
makeSite({builder: organization}, logSite);

function logSite(error, site) {
  if (error) {
    console.error(error);
  }
  else {
    console.log(JSON.stringify(site, null, '  '));
  }
}
