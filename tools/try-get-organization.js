/* global process */

var MakeOrganization = require('../make-organization');
var seedrandom = require('seedrandom');
var createProbable = require('probable').createProbable;

var seed = (new Date()).toISOString();
console.log('seed:', seed);

var random = seedrandom(seed);

var probable = createProbable({
  random: random
});

var makeOrganization = MakeOrganization({probable: probable});

console.log(JSON.stringify(makeOrganization(), null, '  '));

