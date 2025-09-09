import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userDataContext } from "../context/userContext";

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [Lastname, setLastname] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('');

  const {user , setuser} = useContext(userDataContext);
    const navigate = useNavigate();

  const submitHandler =async (e)=>{
    e.preventDefault();
    const userdata={
      fullname:{
        Firstname:FirstName,
      Lastname:Lastname,
      },
      email: email,
      password: password,
      confirmPassword:confirmPassword
    };
   const newuser =await axios.post("http://localhost:4000/createuser/register",userdata);
   if(newuser.status===201){
    const data=newuser.data;
    setuser(data.user);
    navigate("/");
   }
    setEmail('');
    setPassword('');
    setconfirmPassword('');
    setFirstName('');
    setLastname('');
    setLastname('');
  }

  return (
    <div>
      <form onSubmit={(e)=>{submitHandler(e)}} className="p-7  ">
        <div className="w-full ">
                <Link to='/user-Login' className="text-lg "><strong>Back</strong></Link>
              </div>
       <div className="w-full flex justify-center text-xl font-semibold">
        <h1>Sign UP</h1>
       </div>
        
        <h1 className="text-base mb-2 font-sans">Enter You'r Name </h1>
        <div className="flex w-full gap-2 ">
          <input
        value={FirstName}
        onChange={(e)=>{
          setFirstName(e.target.value)
        }}
          className="bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base mb-2 outline-none"
          type="text"
          required
          placeholder="First Name"
        />
         <input
        value={Lastname}
        onChange={(e)=>{
          setLastname(e.target.value)
        }}
          className="bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base mb-2 outline-none"
          type="text"
          required
          placeholder="Last Name"
        />
        </div>
        <h1 className="text-base mb-2 font-sans">Enter You'r Email </h1>
         <input
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
          className="bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base mb-2 outline-none"
          type="email"
          required
          placeholder="Email"
        />
        
        <h1 className="font-sans text-base mb-2">Enter You'r Password</h1>
        <input
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
          className="outline-none mb-4 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
          type="password"
          placeholder="Password"
          required 
        />
        <h1 className="font-sans text-base mb-2">Confirm Password</h1>
        <input
        value={confirmPassword}
        onChange={(e)=>{
          setconfirmPassword(e.target.value)
        }}
          className="outline-none mb-1 bg-[#eeeeee] rounded-lg px-2 py-2  w-full text-lg placeholder:text-base"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <div className="flex gap-1 mb-6">
          <h1 className="text-xs">By procceding you consent to get Email's, WhatsApp or SMS message, including by automated means,from UBER and it's affilates to the Email provided</h1>
        </div>
        
        <button className="font-sans bg-[#111] text-white ml-8 rounded-lg text-xl w-[15rem] font-semibold mb-2 rounded py-2 px-1">
          Sign UP
        </button>
      </form>
      <div className="w-full flex justify-center absolute bottom-3">
        <h1 className="text-xs"><strong className="underline">Privacy & Policy</strong> and <strong className="underline">Term of service</strong> apply</h1>
      </div>
    </div>
  );
};

export default Userlogin;
