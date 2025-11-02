const axios = require("axios");
const captionmodel = require('../Models/caption')

module.exports.getCoordinates = async function (address) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=c43caf01b1bc4a379e04bc1b030683b2`;
  const response = await axios.get(url);
  const features = response.data.features;
  if (!features || features.length === 0) return null;

  return {
    lat: features[0].properties.lat,
    lon: features[0].properties.lon,
  };
};

module.exports.calculateFare=async (distanceKm, durationMin, vehicle) => {
  let baseFare, perKmRate, perMinRate;

  switch (vehicle) {
    case "bike":
      baseFare = 20;
      perKmRate = 5;
      perMinRate = 1;
      break;

    case "auto":
      baseFare = 30;
      perKmRate = 8;
      perMinRate = 1.5;
      break;

    case "car":
    default:
      baseFare = 50;
      perKmRate = 10;
      perMinRate = 2;
      break;
  }

  distanceKm = Number(distanceKm);
  durationMin = Number(durationMin);

  return baseFare + distanceKm * perKmRate + durationMin * perMinRate;
};

module.exports.getcaptionlocation = async (ltd,lng,radius)=>{
  const  caption = await captionmodel.find({
    location:{
      $geoWithin:{
        $centerSphere:[[ltd,lng],radius/6371]
      }
    }
  });
  return caption;
}