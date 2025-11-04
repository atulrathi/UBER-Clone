const { sendmessagetosocketid } = require("../socket");
const usermodel = require("../Models/User-Model");
module.exports.ridestart = async (req, res) => {
    const { ridedata } = req.body;
    console.log("Ride data received:", ridedata);
    const user = await usermodel.findOne({ _id: ridedata.userID });
    console.log("Ride started for userID:", user);
    sendmessagetosocketid(user.socketID, { event: "RIDE_STARTED", data: { fullname: ridedata.fullname } });
    sendmessagetosocketid(user.socketID, { event: "captionridestart", data: { fullname: ridedata.fullname, pickup: ridedata.pickup, destination: ridedata.destination, distance: ridedata.distance, duration: ridedata.duration, fare: ridedata.fare } });
    res.status(200).json({ message: "Ride started" });
}