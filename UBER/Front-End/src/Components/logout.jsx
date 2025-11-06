import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDatacontext } from '../context/CaptainContext';
import { UserDataContext } from "../context/userContext";

const UserProfile = () => {
  // Temporary user data
  const navigate = useNavigate();
  const { value } = useContext(CaptainDatacontext);
  const { user } = useContext(UserDataContext);
  const userName = value.captionname || user.fullname.Firstname+" "+user.fullname.Lastname || "Captain User";

  // Extract first letter for profile icon
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    if(value.who==='caption'){
          alert("You have been logged out successfully!");
    navigate("/caption-home/logout");
    }else{
      alert("You have been logged out successfully!");
      navigate("/Home/logout");
    }

  };

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 w-full max-w-md mx-auto mt-6 ">
      {/* Left: Profile and Name */}
      <div className="flex items-center gap-4">
        {/* Profile Initial */}
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold ">
          {firstLetter}
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{userName}</h2>
        </div>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
