/* global process */

var organizationDefs = require('../table-defs/organization-types');
var seedrandom = require('seedrandom');
var createProbable = require('probable').createProbable;

var seed = (new Date()).toISOString();
console.log('seed:', seed);

var random = seedrandom(seed);

var probable = createProbable({
  random: random
});

console.log(probable.createTableFromSizes(organizationDefs).roll());
