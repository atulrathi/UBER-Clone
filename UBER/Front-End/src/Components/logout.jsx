import React from "react";

const UserProfile = () => {
  // Temporary user data
  const userName = "Atul Rathi";

  // Extract first letter for profile icon
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    alert("You have been logged out successfully!");
    // Later replace with actual logout logic
    // localStorage.removeItem("token");
    // window.location.href = "/login";
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
          <p className="text-sm text-gray-500">Ready for your next ride?</p>
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
