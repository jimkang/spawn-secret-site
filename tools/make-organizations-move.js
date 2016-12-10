/* global process */

var seedrandom = require('seedrandom');
var createProbable = require('probable').createProbable;
var fs = require('fs');
var MakeSite = require('../make-site');
var queue = require('d3-queue').queue;
var sb = require('standard-bail')();
var callNextTick = require('call-next-tick');
var without = require('lodash.without');

if (process.argv.length < 3) {
  console.error('Usage: node tools/make-organizations-move.js <seed string> <state JSON dict file>');
  process.exit();
}

var seed = process.argv[2];
var stateFile = process.argv[3];

var random = seedrandom(seed);

var probable = createProbable({
  random: random
});

var makeSite = MakeSite({probable: probable});
var state = JSON.parse(fs.readFileSync(stateFile));

if (!('sites' in state)) {
  state.sites = {};
}

var q = queue(1);
Object.keys(state.organizations).forEach(queueMove);
q.await(writeOutState);

function queueMove(name) {
  q.defer(makeMove, name);
}

function makeMove(name, done) {
  var organization = state.organizations[name];

  // Kinds of moves: Building, finding, destroying, conquering. Sharing? Aligning?
  if (organization.sites.length < 1 ||
    organization.reach + organization.wealth > probable.rollDie(30)) {

    makeSite({builder: organization}, sb(addSite, done));
  }
  else if (organization.sitesKnown.length <= organization.sites.length) {
    findSites(organization);
    callNextTick(done);
  }
  else {
    callNextTick(done);
  }

  function addSite(site) {
    state.sites[site.id] = site;
    organization.sites.push(site.id);
    organization.sitesKnown.push(site.id);
    done();
  }
}

function findSites(organization) {
  var unknownSiteIds = probable.shuffle(
    without(Object.keys(state.sites), organization.sitesKnown)
  );
  var searchAbility = ~~(organization.reach/2) + ~~(organization.wealth/3)
    + ~~(organization.power/4);
  var searchAttempts = ~~(organization.reach/2);
  console.error(organization.name, 'is finding...', searchAttempts, unknownSiteIds.length);
  for (var i = 0; i < searchAttempts && i < unknownSiteIds.length; ++i) {
    var unknownSite = state.sites[unknownSiteIds[i]];
    var score = searchAbility + probable.rollDie(6);
    console.error('score', score, 'hiddenness', unknownSite.hiddenness)
    if (score >= unknownSite.hiddenness) {
      organization.sitesKnown.push(unknownSite.id);
      console.error(organization.name, 'found', unknownSite.id);
    }
  }

  function isUnknown(site) {
    return organization.sitesKnown.indexOf(site.id) === -1;
  }
}

function writeOutState(error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log(JSON.stringify(state, null, '  '));
  }
}
