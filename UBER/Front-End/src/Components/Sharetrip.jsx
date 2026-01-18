import React, { useContext } from "react";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const Sharetrip = ({
  captiondata,
  pickup,
  destination,
  setVehiclepannel,
  setisup,
  setWating,
  setPayment,
  setDriver,
  setotp
}) => {
  const { user,setuser} = useContext(UserDataContext);

  function rideshare() {
    const rideDetails = axios.post("https://uber-clone-t911.onrender.com/otp/getotp", {
      captionSocketID: captiondata?.captionSocketID
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setuser({...user, otp: data.otp});
        setDriver(false);
        setisup(false);
        setWating(false);
        setVehiclepannel(false);
        setotp(true);
      }
    });
  }

  const driver = captiondata?.captionname || {};
  const vehicle = captiondata?.captionvehicle || {};

  const driverFullName =
    driver?.Firstname && driver?.Lastname
      ? `${driver.Firstname} ${driver.Lastname}`
      : "Driver not assigned";

  const selectedVehicle = user.selectedVehicle || {
    fare: 0,
    name: "Uber Go",
    image: "/ubercar.png",
  };

  return (
    <div className="h-full flex flex-col justify-between rounded-tr-3xl p-6 bg-white">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Your Driver is on the way</h1>
        <i
          onClick={() => {
            setisup(false);
            setWating(false);
            setVehiclepannel(false);
          }}
          className="ri-close-line text-2xl text-gray-500 cursor-pointer"
        ></i>
      </div>

      {/* 🔹 Driver Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
          {driverFullName?.charAt(0).toUpperCase()}
        </div>
          <div>
            <h2 className="text-lg font-semibold">{driverFullName}</h2>
            <p className="text-gray-600 text-sm">
              ⭐ 4.8 • 1,245 rides
            </p>
          </div>
        </div>

        {/* 📞 Call Button */}
        <button className="p-3 bg-green-100 rounded-full">
          <i className="ri-phone-fill text-green-600 text-xl"></i>
        </button>
      </div>

      {/* 🔹 Vehicle Info */}
      <div className="flex items-center justify-between p-4 rounded-lg border mb-6">
        <div>
          <h2 className="font-semibold text-lg">
            {vehicle.model || "Unknown Vehicle"}
          </h2>
          <p className="text-gray-600 text-sm">
            {vehicle.color || "Color N/A"} • {vehicle.capacity || "4"} Seater
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">
            {vehicle.numberplate || "Not Available"}
          </h2>
          <p className="text-gray-500 text-sm">Number Plate</p>
        </div>
      </div>

      {/* 🔹 Pickup & Destination */}
      <div className="w-full max-w-md space-y-4 mb-6">
        <div className="flex gap-3 items-start p-3">
          <i className="ri-map-pin-3-fill text-xl text-green-600"></i>
          <div>
            <h2 className="font-semibold text-base">{pickup}</h2>
          </div>
        </div>

        <div className="flex gap-3 items-start p-3">
          <i className="ri-map-pin-line text-xl text-red-500"></i>
          <div>
            <h2 className="font-semibold text-base">{destination}</h2>
          </div>
        </div>
      </div>

      {/* 🔹 Fare & Payment */}
      <div className="flex items-center justify-between p-4 mb-6 border-t">
        <div>
          <h2 className="text-lg font-semibold">
            ₹{selectedVehicle.fare || "0"}
          </h2>
          <p className="text-gray-600 text-sm">{user.payment || "Cash"}</p>
        </div>
        <button
          onClick={() => setPayment(true)}
          className="text-sm text-blue-600 font-medium"
        >
          Change Payment
        </button>
      </div>

      {/* 🔹 Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            setVehiclepannel(false);
            setisup(false);
            setWating(false);
          }}
          className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Cancel Ride
        </button>

        <button
        onClick={()=>{
          rideshare();
        }}
         className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all">
          Share Trip
        </button>
      </div>
    </div>
  );
};

export default Sharetrip;
