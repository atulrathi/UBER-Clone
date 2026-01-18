import React, { useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { UserDataContext } from "../context/userContext";

const RideDetails = ({ pickup, destination, captiondata }) => {
  const { user, setuser } = useContext(UserDataContext);
  const vehicle = user.selectedVehicle || { image: "/ubercar.png", fare: 0, name: "Uber Go" };
  const driver = captiondata?.captionname || {};
  const vehicledetails = captiondata?.captionvehicle || {};
  const driverFullName =
    driver?.Firstname && driver?.Lastname
      ? `${driver.Firstname} ${driver.Lastname}`
      : "Driver not assigned";

  const rideData = {
    driver: {
      name: "Sourav Rathi",
      rating: 4.9,
      photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    vehicle: {
      model: "Maruti Suzuki Alto 800",
      number: "HR10AE0001",
      color: "White",
    },
    trip: {
      pickup: "Hindu Institute of Management, Sonipat",
      destination: "Connaught Place, New Delhi",
      distance: "45 km",
      duration: "1 hr 10 min",
      fare: "₹720.00",
      status: "Ride in Progress",
    },
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center pt-8 px-5 overflow-y-auto z-40">
      {/* Ride Status Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          {rideData.trip.status}
        </h1>
        <p className="text-gray-600 text-sm">
          Sit back and relax — your trip has started.
        </p>
      </div>

      {/* Driver Details */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-5 mb-5 flex items-center gap-4">
        <img
          src={rideData.driver.photo}
          alt="Driver"
          className="w-16 h-16 rounded-full border border-gray-200"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {driverFullName}
          </h2>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            <i className="ri-star-fill text-yellow-400"></i>{" "}
            {rideData.driver.rating} ★
          </p>
          <p className="text-sm text-gray-500">Your Driver</p>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-5 mb-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Vehicle Details
        </h3>
        <div className="space-y-1 text-gray-700 text-sm">
          <p>
            <span className="font-medium text-gray-900">
              {vehicledetails.model}
            </span>{" "}
            ({vehicledetails.color})
          </p>
          <p>Number Plate: {vehicledetails.numberplate}</p>
        </div>
      </div>

      {/* Trip Info */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-5 mb-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Trip Information
        </h3>
        <div className="text-gray-700 text-sm space-y-2">
          <p>
            <span className="font-medium text-gray-900">Pickup:</span>{" "}
            {pickup}
          </p>
          <p>
            <span className="font-medium text-gray-900">Destination:</span>{" "}
            {destination}
          </p>
          <p>
            <span className="font-medium text-gray-900">Distance:</span>{" "}
            {user.distance}
          </p>
          <p>
            <span className="font-medium text-gray-900">Duration:</span>{" "}
            {user.duration}
          </p>
          <p className="text-lg font-semibold text-green-600">
            Fare: {vehicle.fare}
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-gray-500 text-xs text-center mt-4 mb-6">
        You can view trip details anytime during your ride.
        Stay safe and enjoy your journey!
      </p>
    </div>
  );
};

export default RideDetails;
