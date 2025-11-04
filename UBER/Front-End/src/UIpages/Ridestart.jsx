import React, { useRef, useState,useContext,useEffect } from "react";
import Captionridedown from "../Components/Captionridedown";
import GeoMap from "../Components/MapComponent";
import { useGSAP } from "@GSAP/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";

const Ridestart = () => {
  const [Rideup, setRideup] = useState(false);
  const Rideupref = useRef(null);
  const { socket } = useContext(SocketContext);

      useEffect(() => {
      const ridestarte = (data) => {
        console.log("Ride started data received in Captain:", data);
      };
      socket.on("captionridestart", ridestarte);
      return () => {
        socket.off("captionridestart", ridestarte);
      };
    }, [socket]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (Rideup) {
        gsap.to(Rideupref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(Rideupref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [Rideup, Rideupref]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Uber Logo */}
      <img
        className="z-20 fixed w-[5rem] h-6 ml-[2rem] mt-[3rem]"
        src="./public/uber-logo.png"
        alt="logo"
      />

      {/* 🌍 Responsive Map */}
      <div className="absolute inset-0 z-0 w-full h-full min-h-screen">
        <GeoMap />
      </div>

      {/* Bottom Ride Info */}
      <div className="w-full h-[6rem] bg-white absolute bottom-0 rounded-tr-lg rounded-tl-lg overflow-hidden z-10">
        <div className="w-full flex justify-center items-center p-2">
          <i
            onClick={() => setRideup(true)}
            className="ri-arrow-up-wide-line text-xl text-gray-400 cursor-pointer"
          ></i>
        </div>
        <div className="w-full flex justify-center items-center gap-9">
          <h1 className="text-2xl font-semibold">3km away</h1>
          <div>
            <button className="bg-green-500 px-4 py-2 rounded-xl">
              <h1 className="text-xl text-white">Complete Ride</h1>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-up Panel */}
      <div
        ref={Rideupref}
        className="fixed bottom-0 bg-white w-full z-20 translate-y-full"
      >
        <Captionridedown setRideup={setRideup} />
      </div>
    </div>
  );
};

export default Ridestart;
