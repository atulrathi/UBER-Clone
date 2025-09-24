// Components/Loader.jsx
import React from "react";
import "remixicon/fonts/remixicon.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      {/* Animated car */}
      <div className="relative">
        <i className="ri-car-line text-6xl text-green-500 animate-bounce" />
      </div>

      {/* Text */}
      <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
        Finding the best route for you...
      </p>

      {/* 3 bouncing dots */}
      <div className="flex space-x-2 mt-4">
        <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
        <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
        <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
      </div>
    </div>
  );
};

export default Loader;
