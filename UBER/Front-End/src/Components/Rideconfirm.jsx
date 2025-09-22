import React, { useState } from "react";
import { MapPin, Clock, CreditCard, Car, Flag } from "lucide-react";

const Newride = (props) => {
  const [paymentMode, setPaymentMode] = useState("UPI");

  const  onReject = ()=>{
    props.setRidestart(false)
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg p-5 space-y-4">
      {/* Rider Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
          R
        </div>
        <div>
          <h2 className="text-lg font-semibold">Rahul Sharma</h2>
          <p className="text-sm text-gray-500">New Ride Request</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-5 h-5 text-green-600" />
          <p className="text-sm"><span className="font-medium">Pickup:</span> Connaught Place, Delhi</p>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-5 h-5 text-red-600" />
          <p className="text-sm"><span className="font-medium">Drop:</span>Indira Gandhi Airport, Delhi</p>
        </div>
      </div>

      {/* Extra Info */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>12.5 km • 25 mins</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-600" />
          <span>₹350</span>
        </div>
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-orange-600" />
          <span>Sedan</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="pt-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Wallet">Wallet</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-3">
        <button
          onClick={onReject}
          className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 transition"
        >
          Reject
        </button>
        <button
          onClick={()=>{props.setOTP(true),props.setRidestart(false)}}
          className="flex-1 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Ride start
        </button>
      </div>
    </div>
  );
};

export default Newride;
