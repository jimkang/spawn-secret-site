/* global process */

var fs = require('fs');
var reference = require('../reference');

if (process.argv.length < 3) {
  console.error('Usage: node add-bounds-for-locations.js input.json > bounds-added.json');
  process.exit();
}

var tableEntries = JSON.parse(fs.readFileSync(process.argv[2]));

tableEntries.forEach(addBounds);
console.log(JSON.stringify(tableEntries, null, '  '));

function addBounds(tableEntry) {
  tableEntry.bounds = {
    northeast: {
      lat: tableEntry.location.lat + reference.citySizeInLatOrLngDeg/2,
      lng: tableEntry.location.lng + reference.citySizeInLatOrLngDeg/2
    },
    southwest: {
      lat: tableEntry.location.lat - reference.citySizeInLatOrLngDeg/2,
      lng: tableEntry.location.lng - reference.citySizeInLatOrLngDeg/2
    }
  };
}
