import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDatacontext } from "../context/CaptainContext";
import { motion } from "framer-motion";
import { ArrowLeft, Car, Hash, Palette, Users, Truck } from "lucide-react";

const VehicleInfo = () => {
  const [Numberplate, setNumberplate] = useState("");
  const [Vehiclecolor, setvehiclecolor] = useState("");
  const [Vehiclemodel, setvehiclemodel] = useState("");
  const [Vehiclecapacity, setvehiclecapacity] = useState("");
  const [Vehicletype, setVehicletype] = useState("car");

  const Nevigate = useNavigate();

  const handleChange = (e) => {
    setVehicletype(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const captindata = {
      Numberplate: Numberplate,
      Vehiclecolor: Vehiclecolor,
      Vehiclemodel: Vehiclemodel,
      Vehiclecapacity: Vehiclecapacity,
      Vehicletype: Vehicletype,
      token: localStorage.getItem("caption"),
    };

    const newuser = await axios.post(
      "https://uber-clone-t911.onrender.com/caption/Vehicle-info",
      captindata
    );

    if (newuser.status == 200) {
      const data = newuser.data;
      console.log(data);
      alert("Vehicle Details Added Successfully");
      localStorage.removeItem("token");
      Nevigate("/caption-login");
    }

    setNumberplate("");
    setvehiclecolor("");
    setvehiclemodel("");
    setvehiclecapacity("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 pt-6"
      >
        <Link
          to="/caption-Signup"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </Link>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col px-6 pt-6 pb-8 max-w-md mx-auto w-full"
      >
        {/* Title Section */}
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-black to-slate-800 shadow-lg mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            Vehicle Details
          </h1>
          <p className="text-slate-600 text-sm">
            Add your vehicle information to complete signup
          </p>
        </motion.div>

        {/* Vehicle Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="space-y-4"
        >
          {/* Vehicle Model */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Vehicle Model
            </label>
            <div className="relative">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={Vehiclemodel}
                onChange={(e) => {
                  setvehiclemodel(e.target.value);
                }}
                className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                type="text"
                required
                placeholder="e.g., Maruti Suzuki Swift"
              />
            </div>
          </div>

          {/* Number Plate & Color */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Number Plate
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={Numberplate}
                  onChange={(e) => {
                    setNumberplate(e.target.value.toUpperCase());
                  }}
                  className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm uppercase"
                  type="text"
                  required
                  placeholder="GJ01AB1234"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Color
              </label>
              <div className="relative">
                <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={Vehiclecolor}
                  onChange={(e) => {
                    setvehiclecolor(e.target.value);
                  }}
                  className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                  type="text"
                  placeholder="White"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Type & Capacity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Vehicle Type
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                <select
                  value={Vehicletype}
                  onChange={handleChange}
                  name="vehicle"
                  id="vehicle"
                  className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Capacity
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={Vehiclecapacity}
                  onChange={(e) => {
                    setvehiclecapacity(e.target.value);
                  }}
                  className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                  type="number"
                  placeholder="4"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3.5 bg-black text-white font-semibold rounded-xl shadow-lg shadow-black/20 hover:bg-slate-900 hover:shadow-xl hover:shadow-black/30 transition-all mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Complete SignUp
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-auto pt-8">
          <p className="text-center text-xs text-slate-500">
            <Link to="/privacy" className="font-semibold text-slate-700 hover:underline underline-offset-2">
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link to="/terms" className="font-semibold text-slate-700 hover:underline underline-offset-2">
              Terms of Service
            </Link>
            {" "}apply
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default VehicleInfo;