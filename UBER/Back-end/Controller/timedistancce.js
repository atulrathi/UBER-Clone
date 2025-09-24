const fetch = require("node-fetch");
const axios=require('axios')
const {getCoordinates} = require('../services/geocoding')

module.exports.getDrivingDistance = async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    const pickupCoords = await getCoordinates(pickup);         // e.g., "Delhi"
    const destinationCoords = await getCoordinates(destination); // e.g., "Sonipat"

    if (!pickupCoords || !destinationCoords) {
        console.log('no pck up and destination')
      return res.status(400).json({ error: "Pickup and destination are required" });
    }

    const url = `https://api.geoapify.com/v1/routing?waypoints=${pickupCoords.lat},${pickupCoords.lon}|${destinationCoords.lat},${destinationCoords.lon}&mode=drive&apiKey=c43caf01b1bc4a379e04bc1b030683b2`;

    const response = await axios.get(url);
    const data = await response.data;

    if (!data.features || data.features.length === 0) {
        console.log('router is not found')
      return res.status(404).json({ error: "Route not found" });
    }

    const distance = data.features[0].properties.distance; // meters
    const duration = data.features[0].properties.time; // seconds

    // Send JSON response
    console.log(distance/1000,duration/60)
    res.json({
      distance_km: (distance / 1000).toFixed(2),
      duration_min: (duration / 60).toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
