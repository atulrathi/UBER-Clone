import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDatacontext } from "../context/CaptainContext";

const Userlogin = () => {
  const [Numberplate, setNumberplate] = useState("");
  const [Vehiclecolor, setvehiclecolor] = useState("");
  const [Vehiclemodel, setvehiclemodel] = useState("");
  const [Vehiclecapacity, setvehiclecapacity] = useState("");
  const [Vehicletype, setVehicletype] = useState("car");

  const Nevigate = useNavigate();

  const handleChange = (e) => {
    setVehicletype(e.target.value); // update state when option changes
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
  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="p-7  "
      >
        <div className="w-full ">
          <Link to="/caption-Signup" className="text-lg ">
            <strong>Back</strong>
          </Link>
        </div>
        <div className="w-full flex justify-center text-2xl font-semibold mb-6">
          <h1>Vehicle Detail's</h1>
        </div>

        <h1 className="text-base mb-2 font-sans"> Vehicle Model </h1>
        <div className="flex w-full gap-2 mb-3">
          <input
            value={Vehiclemodel}
            onChange={(e) => {
              setvehiclemodel(e.target.value);
            }}
            className="bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base mb-2 outline-none"
            type="text"
            required
            placeholder="Model ex(Maruti Suzuki)"
          />
        </div>

        <div className="w-full flex flex-col-2 gap-2 mb-3">
          <div className=" w-full flex-col-2 gap-2 mb-3">
            <h1 className="text-base  font-sans">Vehicle no. Plate </h1>
            <input
              value={Numberplate}
              onChange={(e) => {
                setNumberplate(e.target.value.toUpperCase());
              }}
              className="outline-none mb-4 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
              type="text"
              required
              placeholder="ex(GJ01AB1234)"
            />
          </div>
          <div className=" w-full flex-col-2 gap-2 mb-3">
            <h1 className="font-sans text-base ">Vehicle Colour</h1>
            <input
              value={Vehiclecolor}
              onChange={(e) => {
                setvehiclecolor(e.target.value);
              }}
              className="outline-none mb-4 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
              type="text"
              placeholder="ex(White,Blue etc) "
              required
            />
          </div>
        </div>
        <div className="flex  gap-4 mb-3">
          <div className=" w-full  flex-col-2  gap-2 mb-3">
            <h1 className="text-base ">Vehicle Type</h1>
            <select
              value={Vehicletype}
              onChange={handleChange}
              name="vehicle"
              id="vehicle"
              className="outline-none mb-4 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className=" w-full  flex-col-2 gap-2 mb-3">
            <h1 className="font-sans text-base ">Vehicle Capacity</h1>
            <input
              value={Vehiclecapacity}
              onChange={(e) => {
                setvehiclecapacity(e.target.value);
              }}
              className="outline-none mb-4 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
              type="Number"
              placeholder="ex(1,2,5) "
              required
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <button className="font-sans bg-[#111] text-white  rounded-lg text-xl w-[15rem] font-semibold mb-2 rounded py-2 px-1">
            Complete SignUp
          </button>
        </div>
      </form>
      <div className="w-full flex justify-center absolute bottom-3">
        <h1 className="text-xs">
          <strong className="underline">Privacy & Policy</strong> and{" "}
          <strong className="underline">Term of service</strong> apply
        </h1>
      </div>
    </div>
  );
};

export default Userlogin;
