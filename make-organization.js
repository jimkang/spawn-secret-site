var organizationDefs = require('./table-defs/organizations/organization-types');
var reference = require('./reference');

function MakeOrganization({probable}) {
  var organizationTable = probable.createTableFromSizes(organizationDefs);

  return makeOrganization;

  function makeOrganization() {
    var entry = organizationTable.roll();
    var name;
    var bounds;
    var location;

    if (typeof entry === 'object') {
      name = entry.name;

      if (entry.location) {
        location = entry.location;
      }
      if (entry.bounds) {
        bounds = entry.bounds;
      }

      if (!location && bounds) {
        location = {
          lat: bounds.southwest.lat + (bounds.northeast.lat - bounds.southwest.lat)/2,
          lng: bounds.southwest.lng + (bounds.northeast.lng - bounds.southwest.lng)/2
        };
      }
      else if (!bounds && location) {
        bounds = {
          northeast: {
            lat: location.lat + reference.citySizeInLatOrLngDeg/2,
            lng: location.lng + reference.citySizeInLatOrLngDeg/2
          },
          southwest: {
            lat: location.lat - reference.citySizeInLatOrLngDeg/2,
            lng: location.lng - reference.citySizeInLatOrLngDeg/2
          }
        };
      }
    }
    else {
      name = entry;
    }

    return {
      name: name,
      location: location,
      bounds: bounds,
      power: probable.roll(6) + probable.roll(6),
      reach: probable.roll(6) + probable.roll(6),
      wealth: probable.roll(6) + probable.roll(6),
      sites: []
    };
  }
}

module.exports = MakeOrganization;
