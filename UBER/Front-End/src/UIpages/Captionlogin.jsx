import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDatacontext } from "../context/CaptainContext";

const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Nevigate = useNavigate();
  const {captain,setcaptain}=React.useContext(CaptainDatacontext);

  const submitHandler =async (e) => {
    e.preventDefault();
    const CaptionData = {
      email: email,
      password: password,
    };
    console.log(CaptionData);
    const newuser =await axios
      .post("https://uber-clone-t911.onrender.com/caption/login", CaptionData)
      .catch((error)=>{
        console.log(error)
        alert("Invalid Email or password")
      });
      if(newuser.status==200){
        const data = newuser.data;
        localStorage.setItem("caption", data.token);
        alert("Login Successful");
        Nevigate("/caption-home");
      };
    setEmail("");
    setPassword("");
  };

  return (
    <div >
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="p-7  "
      >
        <div className="w-full ">
          <Link to="/" className="text-lg">
            {" "}
            <strong>Back</strong>
          </Link>
        </div>
        <img
          className="z-9 w-[6rem] ml-[0rem] mt-[1rem] mb-6"
          src="./public/uber-logo.png"
          alt=""
        />
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-3xl font-semibold">Captain ID</h1>
        </div>
        <h1 className="text-base mb-2 font-sans">Enter You'r Email ?</h1>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base mb-2 outline-none"
          type="email"
          name=""
          id=""
          required
          placeholder="Email"
        />
        <h1 className="font-sans text-base mb-2">Enter You'r Password</h1>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="outline-none mb-7 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
          type="password"
          placeholder="Password"
          required
        />
        <div className="flex justify-center items-center">
          <button className="font-sans bg-[#111] text-white  rounded-lg text-xl w-[50%] font-semibold mb-2  py-2 px-1">
          Login
        </button>
        </div>
        
      </form>
      <div className="flex items-center divide-x divide-gray-300">
        <span className="flex-grow border-t  border-geay-300"></span>
        <span className="px-3 text-gray-500 text-sm">Or</span>
        <span className="flex-grow border-t border-gray-300"></span>
      </div>
      <div className="w-full flex justify-center mt-2">
        <h1>Login with</h1>
      </div>
      <div className="w-full flex justify-center items-center mt-1 gap-4">
        <img
          className="h-7 w-7 object-fit"
          src="/google.webp"
          alt="Gmail"
        />
        <img
          className="h-10 w-10 object-fit"
          src="/apple.webp"
          alt="Apple ID"
        />
        <img
          className="h-7 w-7 object-fit"
          src="/twitter.png"
          alt="Twitter ID"
        />
      </div>
      <div className="w-full flex justify-center mt-[4rem]">
        <Link to="/caption-Signup">
          First time here? <strong>Become a Captain.</strong>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Userlogin;
