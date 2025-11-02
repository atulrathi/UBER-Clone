const {getcaptionlocation} = require("../services/geocoding");
const {getCoordinates} = require("../services/geocoding");
const { sendmessagetosocketid } = require("../socket");

module.exports = async (req, res) => {
  try{
      const { userID, fullname, pickup, destination, distance, duration, fare } = req.body;
      console.log(userID, fullname, pickup, destination, distance, duration, fare);

        const pickupCoords = await getCoordinates(pickup);
        const destinationCoords = await getCoordinates(destination);

        if (!pickupCoords || !destinationCoords) {
            console.log('invalid pickup or destination address');
          return res.status(400).json({ message: "Invalid pickup or destination address" });
        }

        const nearbycaption = await getcaptionlocation(pickupCoords.lat,pickupCoords.lon,500);
        if (!nearbycaption) {
            console.log('no caption found near pickup location');
          return res.status(404).json({ message: "No caption found near pickup location" });
        };
        console.log('Nearby captions:', nearbycaption);

        nearbycaption.map(async(caption)=>{
            sendmessagetosocketid(caption.socketID,{
                event:"rideRequest",
                data:{
                    userID,
                    fullname,
                    pickup,
                    destination,
                    distance,
                    duration,
                    fare
                }
            })
        });
        res.status(200).json({ message: "Ride request sent to nearby captions" });
    } catch (error) {
        console.error("Error confirming ride:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};