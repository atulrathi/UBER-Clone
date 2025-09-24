const axios = require("axios");

module.exports.getCoordinates=async function (address) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=c43caf01b1bc4a379e04bc1b030683b2`;
  const response = await axios.get(url);
  const features = response.data.features;
  if (!features || features.length === 0) return null;

  return {
    lat: features[0].properties.lat,
    lon: features[0].properties.lon,
  };
}
