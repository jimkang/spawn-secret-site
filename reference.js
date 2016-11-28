var maxGeoBounds = {
  southwest: {
    lat: -90,
    lng: -180
  },
  northeast: {
    lat: 90,
    lng: 180
  }
};

module.exports = {
  maxGeoBounds: maxGeoBounds,
  // Consider cities to be 12 mi x 12 mi.
  // 69 miles is ~1 deg. lat or lng. (Nice.)
  citySizeInLatOrLngDeg: 12/69
};
