import React, { useContext, useEffect } from "react";
import gsap from "gsap";
import { UserDataContext } from "../context/userContext";

const WaitingDriver = (props) => {

  const {user} = useContext(UserDataContext);
  const vehicle = user.selectedVehicle || { image: "/ubercar.png", fare: 0, name: "Uber Go" };

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(".dot", {
      opacity: 1,
      y: -4,
      duration: 0.4,
      stagger: 0.2,
      ease: "power1.inOut",
    }).to(".dot", {
      opacity: 0.3,
      y: 0,
      duration: 0.4,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center rounded-tr-3xl p-6 bg-white">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-1">Finding Your Driver</h1>
      <p className="text-gray-500 text-center mb-4">
        Please wait while we connect you with a nearby driver
      </p>

      {/* Car Image */}
      <div className="w-full flex flex-col justify-center items-center mt-4">
        <img className="h-[7rem]" src={vehicle.image} alt="car" />

        {/* Professional Three Dot Loader */}
        <div className="flex gap-2 mt-6">
          <span className="dot w-2.5 h-2.5 bg-gray-800 rounded-full opacity-30"></span>
          <span className="dot w-2.5 h-2.5 bg-gray-800 rounded-full opacity-30"></span>
          <span className="dot w-2.5 h-2.5 bg-gray-800 rounded-full opacity-30"></span>
        </div>
      </div>

      {/* Ride Details */}
      <div className="w-full max-w-md rounded-xl p-4 mb-6 mt-6">
        {/* Pickup */}
        <div className="flex items-start gap-3 border-b border-gray-200 pb-3 mb-3">
          <i className="ri-map-pin-3-fill text-2xl text-green-600"></i>
          <div>
            <h2 className="font-semibold text-lg">{props.pickup}</h2>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-line text-2xl text-red-500"></i>
          <div>
            <h2 className="font-semibold text-lg">{props.destination}</h2>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      <button
        onClick={() => {
          props.setisup(false);
          props.setWating(false);
          props.setVehiclepannel(false);
        }}
        className="w-full max-w-md py-3 px-6 bg-red-500 rounded-lg hover:bg-red-600 transition-all text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-md"
      >
        Cancel Ride <i className="ri-close-fill text-xl"></i>
      </button>
    </div>
  );
};

export default WaitingDriver;
