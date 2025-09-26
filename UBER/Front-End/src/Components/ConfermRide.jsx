import React, { useContext } from "react";
import { UserDataContext } from "../context/userContext";

const Vehicledetail = (props) => {
  const { user } = useContext(UserDataContext);
  const vehicle = user.selectedVehicle || { image: "./public/ubercar.png", fare: 0, name: "Uber Go" };

  return (
    <div>
      <div className="h-full flex flex-col justify-center rounded-tr-3xl items-center p-6 bg-white shadow-lg">
        {/* Close Button */}
        <h4
          onClick={() => {
            props.setisup(false);
            props.setVehiclepannel(false);
            props.setconfermride(false);
          }}
          className="w-full flex justify-center mt-[-1rem] text-2xl cursor-pointer"
        >
          <i className="ri-arrow-down-wide-line text-gray-400"></i>
        </h4>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800">Confirm your Ride</h1>

        {/* Vehicle Image */}
        <img className="h-40 p-4 object-contain" src={vehicle.image} alt={vehicle.name} />

        {/* Ride Details */}
        <div className="">
          {/* Pickup */}
          <div className="flex w-full mb-3 gap-4 items-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-map-pin-3-fill text-xl text-green-500"></i>
            <div>
              <h1 className="font-semibold text-lg text-gray-900">{props.pickup}</h1>
            </div>
          </div>

          {/* Destination */}
          <div className="flex w-full mb-3 gap-4 items-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-map-pin-line text-xl text-red-500"></i>
            <div>
              <h1 className="font-semibold text-lg text-gray-900">{props.destination}</h1>
            </div>
          </div>

          {/* Distance & Duration */}
          <div className="flex justify-between w-full mb-3 gap-4 items-center p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <i className="ri-road-map-line text-xl text-indigo-500"></i>
              <div>
                <h1 className="font-semibold text-lg text-gray-900">{user.distance} km</h1>
                <p className="text-gray-600 text-sm">Distance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-time-line text-xl text-purple-500"></i>
              <div>
                <h1 className="font-semibold text-lg text-gray-900">{user.duration} min</h1>
                <p className="text-gray-600 text-sm">Duration</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="flex w-full mb-6 gap-4 items-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-bank-card-line text-xl text-blue-600"></i>
            <div>
              <h1 className="font-semibold text-lg text-gray-900">&#8377;{vehicle.fare}</h1>
              <p className="text-gray-600 text-sm">{user.payment}</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => {
              props.setWating(true);
              props.setconfermride(false);
            }}
            className="py-4 px-12 bg-green-500 hover:bg-green-600 transition rounded-2xl shadow-md"
          >
            <h1 className="text-white font-semibold text-xl">Confirm Ride</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vehicledetail;
