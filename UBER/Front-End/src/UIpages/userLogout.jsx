import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from '../context/userContext';

const Logout = () => {
  const navigate = useNavigate();

 let {user,setuser}= useContext(UserDataContext)

  useEffect(() => {
    const token = localStorage.getItem("token");
    user.active=false
    const logoutUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/createuser/logout",
          {}, // no body needed
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // send cookies too if needed
          }
        );

        if (res.status === 200) {
          localStorage.removeItem("token");
          navigate("/user-Login");
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
