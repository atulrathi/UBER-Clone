import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {user , setuser} = useContext(UserDataContext);
    const navigate = useNavigate();

  const submitHandler =async (e)=>{
    e.preventDefault();
    const UserData={
      email: email,
      password: password
    };
    const response =await axios.post("http://localhost:4000/createuser/login",UserData);
    if(response.status===200){
      const data=response.data;
      setuser(data.user._id);
      localStorage.setItem("token",data.token);
      navigate("/Home");
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div>
      
      <form onSubmit={(e)=>{submitHandler(e)}} className="p-7  ">
        <div className="w-full ">
        <Link to='/' className="text-lg"> <strong>Back</strong></Link>
      </div>
        <img
          className="z-9 w-[6rem] ml-[0rem] mt-[1rem] mb-6"
          src="./public/uber-logo.png"
          alt=""
        />
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-3xl font-semibold">User ID</h1>
        </div>
        <h1 className="text-base mb-2 font-sans">Enter You'r Email ?</h1>
        <input
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
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
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
          className="outline-none mb-7 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
          type="password"
          placeholder="Password"
          required
        />
        <button className="font-sans bg-[#111] text-white ml-8 rounded-lg text-xl w-[15rem] font-semibold mb-2 rounded py-2 px-1">
          Login
        </button>
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
        <img className="h-7 w-7 object-fit" src="./public/google.webp" alt="Gmail" />
        <img className="h-10 w-10 object-fit" src="./public/apple.webp" alt="Apple ID" />
        <img className="h-7 w-7 object-fit" src="./public/twitter.png" alt="Twitter ID" />
      </div>
      <div className="w-full flex justify-center mt-[4rem]">
        <Link to="/user-Signup">Don't have a Account ? <strong>SignUp</strong></Link>
      </div>
      <div>
      </div>
      
    </div>
  );
};

export default Userlogin;
