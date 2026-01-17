import React, { useRef, useState, useContext, useEffect } from "react";
import Captionridedown from "../Components/Captionridedown";
import GeoMap from "../Components/MapComponent";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";

const Ridestart = ({ride,setnewride,setotp,setRidestart,setbasic,setRideup}) => {
  const [Rideupe, setRideupe] = useState(false);
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
      if (Rideupe) {
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
  }, [Rideupe, Rideupref]);

  return (
    <div className="relative h-[7rem] w-screen overflow-hidden bg-transparent">

      {/* Bottom Ride Info */}
      <div className="w-full h-[6rem] bg-white absolute bottom-0 rounded-tr-lg rounded-tl-lg overflow-hidden z-10">
        <div className="w-full flex justify-center items-center p-2">
          <i
            onClick={() => setRideupe(true)}
            className="ri-arrow-up-wide-line text-xl text-gray-400 cursor-pointer"
          ></i>
        </div>
        <div className="w-full flex justify-center items-center gap-9">
          <h1 className="text-2xl font-semibold">{ride.distance} Km away</h1>
          <h1 className="text-2xl font-semibold">({ride.duration} min)</h1>
        </div>
      </div>

      {/* Slide-up Panel */}
      <div
        ref={Rideupref}
        className="fixed bottom-0 bg-white w-full z-20 translate-y-full"
      >
        <Captionridedown setRideup={setRideup} setnewride={setnewride} setRidestart={setRidestart} setRideupe={setRideupe} ride={ride} setotp={setotp} setbasic={setbasic} />
      </div>
    </div>
  );
};

export default Ridestart;
