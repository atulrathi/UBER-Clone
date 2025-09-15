import React from "react";
import { motion } from "framer-motion";

const SelectVehicle = (props) => {
  const vehicles = [
    {
      id: 1,
      name: "Uber Go",
      seats: 4,
      time: "2 mins away",
      desc: "Affordable, compact rides",
      price: 193.2,
      image: "./public/ubercar.png",
    },
    {
      id: 2,
      name: "Uber Bike",
      seats: 1,
      time: "2 mins away",
      desc: "Cheaper, faster bike rides",
      price: 75.5,
      image: "./public/uberbike.webp",
    },
    {
      id: 3,
      name: "Uber Auto",
      seats: 1,
      time: "3 mins away",
      desc: "Easy auto rides",
      price: 120.0,
      image: "./public/uberauto.png",
    },
  ];

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="bg-white rounded-t-3xl"
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold">Choose a vehicle</h1>
        <button
          onClick={() => {
            props.setisup(true);
            props.setVehiclepannel(false);
          }}
          className="text-3xl hover:rotate-180 transition-transform"
        >
          <i className="ri-arrow-down-wide-line"></i>
        </button>
      </div>

      {/* Vehicle Options */}
      <div className="space-y-4 p-4">
        {vehicles.map((v, index) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => props.setconfermride(true)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <img src={v.image} alt={v.name} className="h-14" />

            <div className="flex-1 px-4">
              <h4 className="font-medium text-base">
                {v.name}{" "}
                <span className="text-gray-500 ml-1">
                  <i className="ri-user-3-fill"></i>
                  {v.seats}
                </span>
              </h4>
              <h5 className="text-sm text-green-600">{v.time}</h5>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>

            <h2 className="text-lg font-semibold">&#8377;{v.price}</h2>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SelectVehicle;
