import React from "react";
import "remixicon/fonts/remixicon.css";
import { UserDataContext } from "../context/userContext";
import { useContext } from "react";

const OtpScreen = ({ captiondata }) => {
    const { user } = useContext(UserDataContext);

    const driver = captiondata?.captionname || {};
    const vehicle = captiondata?.captionvehicle || {};

    const driverFullName =
        driver?.Firstname && driver?.Lastname
            ? `${driver.Firstname} ${driver.Lastname}`
            : "Driver not assigned";

    const otpData = {
        otp: "472912",
        driverName:  driver?.Firstname && driver?.Lastname
            ? `${driver.Firstname} ${driver.Lastname}`
            : "Driver not assigned",
        vehicleModel: vehicle?.model || "Vehicle not assigned",
        vehicleNumber: vehicle?.numberplate || "Vehicle not assigned",
    };

    return (
        <div className="inset-0 flex w-full items-center justify-center bg-transparent z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                        Share your OTP
                    </h1>
                    <button
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => alert("This close button will be functional later")}
                    >
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                {/* Driver Info */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                    <p className="text-gray-700 text-base mb-1">
                        Your driver{" "}
                        <span className="font-semibold text-gray-900">
                            {otpData.driverName}
                        </span>{" "}
                        is on the way.
                    </p>
                    <p className="text-gray-600 text-sm">
                        Vehicle:{" "}
                        <span className="font-medium text-gray-800">
                            {otpData.vehicleModel}
                        </span>{" "}
                        — {otpData.vehicleNumber}
                    </p>
                </div>

                {/* OTP Display */}
                <div className="text-center mb-6">
                    <p className="text-gray-500 text-sm mb-2">
                        Provide this OTP to your driver to start the ride
                    </p>
                    <h2 className="text-5xl font-bold tracking-widest text-gray-900 bg-gray-100 py-5 rounded-2xl shadow-inner">
                        {user.otp}
                    </h2>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        ⚠️ Never share your OTP with anyone other than your driver.
                        This helps keep your trip secure.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OtpScreen;
