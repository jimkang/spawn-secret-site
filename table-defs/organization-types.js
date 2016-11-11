var countries = require('./countries');
var cities = require('./cities');
var empires = require('./empires');
var middleEasternEmpires = require('./middle-eastern-empires');
var medievalPowers = require('./medieval-powers');
var carCompanies = require('./car-companies');
var publicCorps = require('./public-corps');
var newspapers = require('./newspapers');
var religions = require('./religions');

module.exports = [
  [
    10, 
    // 'government'
    [
      [4, countries],
      [5, cities],
      [
        6,
        [
          [10, empires],
          [10, middleEasternEmpires],
          [10, medievalPowers]
        ]
      ]
    ]
  ],
  [
    8,
    // 'corporation'
    [
      [2, carCompanies],
      [10, publicCorps],
      [3, newspapers]
    ]
  ],
  [8 * 1000, religions],
  [3, 'animal'],
  [3, 'nonAnimalLife'],
  [6, 'demihumans'],
  [4, 'profession'],
  [1, 'undead'],
  [4, 'aliens'],
  [2, 'school'],
  [3, 'enthusiasts'],
  [2, 'eliteClass'],
  [2, 'politicalParty'],
  [2, 'inanimateObjects'],
  [2, 'AI'],
  [1, 'naturalPhenomenon'],
  [1, 'concept']
];
