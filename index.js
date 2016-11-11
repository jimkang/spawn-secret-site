/* global process */
var callNextTick = require('call-next-tick');
var seedrandom = require('seedrandom');
var createWordnok = require('wordnok').createWordnok;
var createProbable = require('probable').createProbable;

var seed = (new Date()).toISOString();
console.log('seed:', seed);

var random = seedrandom(seed);

var probable = createProbable({
  random: random
});

var wordnok = createWordnok({
  apiKey: config.wordnikAPIKey
});
