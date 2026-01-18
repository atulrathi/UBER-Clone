import React, { useContext, useRef, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { CaptainDatacontext } from "../context/CaptainContext";
import { io } from "socket.io-client";

const socket = io("https://uber-clone-t911.onrender.com");

const Riderequest = (props) => {
  const { user } = useContext(UserDataContext);
  const vehicle = user.selectedVehicle || { image: "/ubercar.png", fare: 0, name: "Uber Go" };
  const { value, setvalue } = useContext(CaptainDatacontext);

  function rideaccept() {
    props.setRidestart(true);

    socket.emit("ride-accepted", {
      userID: props.ridedata.userID,
      captionID: value.id,
    });
  }


  return (
    <div className="w-full bg-white rounded-t-2xl shadow-lg p-5 flex items-start gap-4">
      {/* Rider Image - Fixed Width */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
          {props.ridedata.fullname?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Ride Details - Full Remaining Width */}
      <div className="flex-1">
        {/* New Ride Header */}
        <i onClick={() => { props.setnewride(false) }} className="ri-close-large-line absolute top-4 right-6"></i>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          New Ride Request
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          {props.ridedata.fullname} has requested a ride. Please review the details below.
        </p>

        {/* Ride Info */}
        <p className="text-sm text-gray-700">
          <span className="font-medium">Pickup:</span>{props.ridedata.pickup}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Destination:</span>{props.ridedata.destination}
        </p>
        <p className="text-sm text-gray-700 mb-3">
          <span className="font-medium">Estimated Fare:</span> ₹{props.ridedata.fare}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => { props.setnewride(false) }}
            className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 rounded-xl hover:bg-gray-300 transition"
          >
            Reject
          </button>
          <button
            onClick={() => {
              rideaccept();
            }}
            className="flex-1 bg-green-600 text-white font-medium py-2 rounded-xl hover:bg-green-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riderequest;
