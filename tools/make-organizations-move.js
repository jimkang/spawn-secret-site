/* global process */

var seedrandom = require('seedrandom');
var createProbable = require('probable').createProbable;
var fs = require('fs');
var MakeSite = require('../make-site');
var queue = require('d3-queue').queue;
var sb = require('standard-bail')();
var callNextTick = require('call-next-tick');

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
  else {
    callNextTick(done);
  }

  function addSite(site) {
    state.sites[site.id] = site;
    organization.sites.push(site.id);
    done();
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
