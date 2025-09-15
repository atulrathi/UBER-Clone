import React, { useContext } from "react";
import { UserDataContext } from "../context/userContext";

const DriverDetails = (props) => {

  const { user, setuser } = useContext(UserDataContext);

  return (

    <div className="h-full flex flex-col justify-between rounded-tr-3xl p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Your Driver is on the way</h1>
        <i
          onClick={() => {
            props.setDriverFound(false);
          }}
          className="ri-close-line text-2xl text-gray-500 cursor-pointer"
        ></i>
      </div>

      {/* Driver Info */}
      <div className="flex items-center gap-4 mb-6">
        {/* Driver Image */}
      
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Ravi Kumar</h2>
          <p className="text-gray-600 text-sm">⭐ 4.8 • 1,245 rides</p>
        </div>

        {/* Call Button */}
        <button className="p-3 bg-green-100 rounded-full">
          <i className="ri-phone-fill text-green-600 text-xl"></i>
        </button>
      </div>

      {/* Vehicle Info */}
      <div className="flex items-center justify-between p-4 rounded-lg  mb-6">
        <div>
          <h2 className="font-semibold text-lg">Maruti Suzuki Swift</h2>
          <p className="text-gray-600 text-sm">White • 4 Seater</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">HR 26 DK 9876</h2>
          <p className="text-gray-500 text-sm">Number Plate</p>
        </div>
      </div>

      {/* Pickup & Destination */}
      <div className="w-full max-w-md space-y-4 mb-6">
        {/* Pickup */}
        <div className="flex gap-3 items-start p-3 ">
          <i className="ri-map-pin-3-fill text-xl text-green-600"></i>
          <div>
            <h2 className="font-semibold text-base">562/11</h2>
            <p className="text-gray-600 text-sm">
              Kankarriya Talab, Chatiya Aulia
            </p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-3 items-start p-3 ">
          <i className="ri-map-pin-line text-xl text-red-500"></i>
          <div>
            <h2 className="font-semibold text-base">Sonipat</h2>
            <p className="text-gray-600 text-sm">Near Indra</p>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="flex items-center justify-between p-4  mb-6">
        <div>
          <h2 className="text-lg font-semibold">&#8377;193.20</h2>
          <p className="text-gray-600 text-sm">{user.payment}</p>
        </div>
        <button onClick={()=>{
          props.setPayment(true);
        }} className="text-sm text-blue-600 font-medium">
          Change Payment
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            props.setVehiclepannel(false);
            props.setisup(false);
            props.setWating(false);
            props.setWating(false)
          }}
          className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Cancel Ride
        </button>
        <button className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all">
          Share Trip
        </button>
      </div>
    </div>
  );
};

export default DriverDetails;
