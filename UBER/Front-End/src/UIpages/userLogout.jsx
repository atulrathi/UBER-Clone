import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from '../context/userContext';

const Logout = () => {
  const navigate = useNavigate();

 let {user,setuser}= useContext(UserDataContext)

  useEffect(() => {
    const token = localStorage.getItem("ridertoken");
    if(!token){
      navigate("/user-login");
      return;
    }
    user.active=false
    const logoutUser = async () => {
      try {
        const res = await axios.post(
          "https://uber-clone-t911.onrender.com/createuser/logout",
          {}, // no body needed
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // send cookies too if needed
          }
        );

        if (res.status === 200) {
          localStorage.removeItem("ridertoken");
          navigate("/user-login");
        }
      } catch (err) {
        console.error("Logout failed:", err.response?.data || err.message);
        // still clear token on client side
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Logging out...</h1>
    </div>
  );
};

export default Logout;
