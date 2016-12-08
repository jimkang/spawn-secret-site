var tracery = require('tracery-grammar');
var grammarSpec = require('./trendyname.json');
var toTitleCase = require('titlecase');

var grammar = tracery.createGrammar(grammarSpec);

var secretAdjectives = [
  'secret',
  'hidden',
  'invisible',
  'unknown',
  'private',
  'classified',
  'unknowable',
  'arcane'
];

function NameSite({probable}) {
  tracery.setRandom(probable.randomFn);

  return nameSite;

  function nameSite({builderName, siteType}) {
    var rawName;
    var secretAdjective = probable.pickFromArray(secretAdjectives);

    var nameTable = probable.createTableFromSizes([
      [6, `The ${siteType} of ${builderName}`],
      [6, `The ${secretAdjective} ${siteType} of ${builderName}`],
      [6, `${builderName} ${siteType}`],
      [8, makeTrendyName]
    ]);

    var trendynameTable = probable.createTableFromSizes([
      [6, `The ${siteType} of #origin#`],
      [6, `The ${secretAdjective} ${siteType} of #origin#`],
      [6, `#origin# ${siteType}`],
      [4, 'The #origin#']
    ]);

    var nameResult = nameTable.roll();

    if (typeof nameResult === 'function') {
      rawName = nameResult();
    }
    else {
      rawName = nameResult;
    }

    return toTitleCase(rawName);

    function makeTrendyName() {
      return grammar.flatten(trendynameTable.roll());
    }
  }
}

module.exports = NameSite;
