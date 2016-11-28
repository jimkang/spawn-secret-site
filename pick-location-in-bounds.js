function pickLocationInBounds(probable, bounds) {
  // console.log('bounds', bounds);
  var xRange = (bounds.northeast.lng - bounds.southwest.lng) * 100;
  var yRange = (bounds.northeast.lat - bounds.southwest.lat) * 100;
  return {
    lng: bounds.southwest.lng + probable.roll(xRange)/100,
    lat: bounds.southwest.lat + (probable.roll(yRange/2) + probable.roll(yRange/2))/100
  };
}

module.exports = pickLocationInBounds;
