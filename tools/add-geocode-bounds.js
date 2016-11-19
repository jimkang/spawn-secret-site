/* global process */

var fs = require('fs');
var queue = require('d3-queue').queue;
var getBoundsForGeoEntity = require('../get-bounds-for-geo-entity');

if (process.argv.length < 3) {
  console.error('Usage: node add-geocode-bounds.js input.json > bounds-added.json');
  process.exit();
}

var cityMode = (process.argv.length > 3 && process.argv[3] === '--cities');
var tableEntries = JSON.parse(fs.readFileSync(process.argv[2]));

var q = queue(1);
tableEntries.forEach(queueBoundsGet);
q.awaitAll(writeOutUpdatedEntities);

function queueBoundsGet(tableEntry) {
  q.defer(updateBounds, tableEntry);
}

function updateBounds(tableEntry, done) {
  var geoEntity = tableEntry[1];
  var name;

  if (cityMode) {
    name = geoEntity.name.replace('in the depths of ', '');
    name = name.replace('a city in ', '');
    name = name.replace('a city in ', '');
    name = name.replace(' in ', ', ');
    name = name.replace(' of ', ', ');
  }
  else {
    var commaParts = geoEntity.name.split(', ');
    var beforeComma = commaParts[0];
    var nameParts = beforeComma.split(' of ');
    name = nameParts[nameParts.length - 1];
  }

  getBoundsForGeoEntity(name, updateEntity);

  function updateEntity(error, bounds) {
    if (error) {
      // Don't stop things for one error.
      console.error(new Error('Could not update: "' + name + '"'));
    }
    else {
      geoEntity.bounds = bounds;
    }
    done(null, tableEntry);
  }
}

function writeOutUpdatedEntities(error, tableEntries) {
  if (error) {
    console.error(error);
  }
  else {
    console.log(JSON.stringify(tableEntries, null, '  '));
  }
}
