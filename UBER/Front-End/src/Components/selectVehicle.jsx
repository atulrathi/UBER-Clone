import React, { useContext } from "react";
import { motion } from "framer-motion";
import { UserDataContext } from "../context/userContext";

const SelectVehicle = (props) => {
  
  const { user, setuser } = useContext(UserDataContext);

  const handleSelect = (vehicle) => {
    setuser({ ...user, selectedVehicle: vehicle });
    props.setconfermride(true);
  };

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

      <div className="space-y-4 p-4">
        {/* Uber Go */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition rounded-xl "
          onClick={() =>
            handleSelect({
              name: "Uber Go",
              seats: 4,
              time: "2 mins away",
              desc: "Affordable, compact rides",
              fare: user.fare.car,
              image: "./public/ubercar.png",
            })
          }
        >
          <img src="./public/ubercar.png" alt="Uber Go" className="h-14" />
          <div className="flex-1 px-4">
            <h4 className="font-medium text-base">
              Uber Go <span className="text-gray-500 ml-1"><i className="ri-user-3-fill"></i>4</span>
            </h4>
            <h5 className="text-sm text-green-600">2 mins away</h5>
            <p className="text-gray-500 text-sm">Affordable, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">&#8377;{user.fare.car}</h2>
        </motion.div>

        {/* Uber Bike */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition rounded-xl "
          onClick={() =>
            handleSelect({
              name: "Uber Bike",
              seats: 1,
              time: "2 mins away",
              desc: "Cheaper, faster bike rides",
              fare: user.fare.bike,
              image: "./public/uberbike.webp",
            })
          }
        >
          <img src="./public/uberbike.webp" alt="Uber Bike" className="h-14" />
          <div className="flex-1 px-4">
            <h4 className="font-medium text-base">
              Uber Bike <span className="text-gray-500 ml-1"><i className="ri-user-3-fill"></i>1</span>
            </h4>
            <h5 className="text-sm text-green-600">2 mins away</h5>
            <p className="text-gray-500 text-sm">Cheaper, faster bike rides</p>
          </div>
          <h2 className="text-lg font-semibold">&#8377;{user.fare.bike}</h2>
        </motion.div>

        {/* Uber Auto */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition rounded-xl "
          onClick={() =>
            handleSelect({
              name: "Uber Auto",
              seats: 1,
              time: "3 mins away",
              desc: "Easy auto rides",
              fare: user.fare.auto,
              image: "./public/uberauto.png",
            })
          }
        >
          <img src="./public/uberauto.png" alt="Uber Auto" className="h-14" />
          <div className="flex-1 px-4">
            <h4 className="font-medium text-base">
              Uber Auto <span className="text-gray-500 ml-1"><i className="ri-user-3-fill"></i>1</span>
            </h4>
            <h5 className="text-sm text-green-600">3 mins away</h5>
            <p className="text-gray-500 text-sm">Easy auto rides</p>
          </div>
          <h2 className="text-lg font-semibold">&#8377;{user.fare.auto}</h2>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SelectVehicle;
