import React, { useContext, useRef, useState, useEffect } from 'react'
import Newride from '../Components/Newride'
import OTPVerification from '../Components/Otpverification'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Rideconfirm from '../Components/Rideconfirm'
import Captiondetails from '../Components/Captiondetails'
import { UserDataContext } from '../context/userContext';
import Lowinternet from '../Components/lowinternet';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { CaptainDatacontext } from '../context/CaptainContext';
import GeoMap from "../Components/MapComponent";
import Captionridedown from '../UIpages/Ridestart';
import Logout from '../Components/logout';

const CaptainHome = () => {

  const { user } = useContext(UserDataContext);
  const vehicle = user.selectedVehicle || { image: "./public/ubercar.png", fare: 0, name: "Uber Go" };

  const [OTP, setOTP] = useState(false)
  const [newride, setnewride] = useState(false)
  const [Ridestart, setRidestart] = useState(false)
  const [ridedata, setridedata] = useState({})
  const Ridestartref = useRef(null)
  const Otpref = useRef(null)
  const Newrideref = useRef(null)
  const basicref = useRef(null)
  const [otpdata, setotpdata] = useState({})
  const [basic, setbasic] = useState(true)
  const [Rideup, setRideup] = useState(false);
  const Rideupref = useRef(null);
  const [logout, setlogout] = useState(false);
  const logoutref = useRef(null)

  const { socket } = useContext(SocketContext);
  const { value, setvalue } = useContext(CaptainDatacontext)
  let captionid = value.id

  useEffect(() => {
    const token = localStorage.getItem("caption");
    async function fetchUser() {
      try {
        const res = await axios.get("https://uber-clone-t911.onrender.com/setcaption/captiondata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          let data = res.data;
          setvalue({ ...value, id: data._id ,captionname: `${data.fullname.Firstname} ${data.fullname.Lastname}`,who:'caption' });
        }

      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    }
    if (token) fetchUser();
    socket.emit('join', { usertype: 'caption', userID: captionid })

    const interval = setInterval(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          };
          socket.emit('location-update-caption', { userID: captionid, location });
        });
      }
    }, 10000);

    return () => clearInterval(interval);

  }, [captionid]);

  useEffect(() => {
    socket.on("otp-generated", (data) => {
      setotpdata(data);
    });

    return () => {
      socket.off("otp-generated");
    };
  }, [socket]);


  socket.on('rideRequest', (data) => {
    setnewride(true);
    setridedata(data);
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (OTP) {
        gsap.to(Otpref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(Otpref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [Otpref, OTP]);

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

    useGSAP(() => {
    const ctx = gsap.context(() => {
      if (logout) {
        gsap.to(logoutref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(logoutref.current, {
          y: "-200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [logout, logoutref]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (newride) {
        gsap.to(Newrideref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(Newrideref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [newride, Newrideref]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (basic) {
        gsap.to(basicref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(basicref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [basic, basicref]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (Ridestart) {
        gsap.to(Ridestartref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(Ridestartref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [Ridestart, Ridestartref]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">

      <Lowinternet />

      {/* Floating profile button */}
      <div className="fixed top-5 right-5 z-30 h-10 w-10 flex justify-center items-center rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-300">
        <i
        onClick={() => setlogout(true)}
         className="ri-user-settings-fill text-xl text-gray-700"></i>
      </div>

      {/* Logo */}
      <img
        className="fixed z-20 w-24 md:w-32 top-5 left-5"
        src="./public/uber-logo.png"
        alt="Uber Logo"
      />

      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <GeoMap />
      </div>

      {/* Bottom Info Card */}
      <div ref={basicref} className="fixed bottom-0 w-full bg-white rounded-t-2xl shadow-lg p-5 md:p-8 z-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <h1 className="text-xl md:text-2xl font-bold">{value.captionname}</h1>
          <div className="text-center">
            <h1 className="text-sm font-medium text-gray-500">Earning</h1>
            <h1 className="font-bold text-lg md:text-xl">₹123.99</h1>
          </div>
        </div>

        <div className="mt-5 flex justify-around text-center">
          <div className="flex flex-col items-center">
            <i className="ri-time-line text-2xl md:text-3xl text-gray-700"></i>
            <h1 className="text-sm md:text-base mt-1">Time Spend</h1>
          </div>
          <div className="flex flex-col items-center">
            <i className="ri-timer-2-line text-2xl md:text-3xl text-gray-700"></i>
            <h1 className="text-sm md:text-base mt-1">Total Days</h1>
          </div>
          <div className="flex flex-col items-center">
            <i className="ri-booklet-line text-2xl md:text-3xl text-gray-700"></i>
            <h1 className="text-sm md:text-base mt-1">Today</h1>
          </div>
        </div>
      </div>

      {/* New Ride, OTP & Ride Start Modals */}
      <div
        ref={Newrideref}
        className="fixed bottom-0 left-0 w-full z-30 bg-white rounded-t-2xl translate-y-full transition-transform duration-500 shadow-xl"
      >
        {newride && <Newride ridedata={ridedata} setnewride={setnewride} setRidestart={setRidestart} />}
      </div>

      <div
        ref={Otpref}
        className="fixed bottom-0 left-0 w-full z-30 bg-white rounded-t-2xl translate-y-full transition-transform duration-500 shadow-xl"
      >
        {OTP && <OTPVerification setRideup={setRideup} setbasic={setbasic} ridedata={ridedata} setOTP={setOTP} setRidestart={setRidestart} setnewride={setnewride} otpdata={otpdata} />}
      </div>

      <div
        ref={Ridestartref}
        className="fixed bottom-0 left-0 w-full z-30 bg-white rounded-t-2xl translate-y-full transition-transform duration-500 shadow-xl"
      >
        {Ridestart && <Rideconfirm ridedata={ridedata} setOTP={setOTP} setRidestart={setRidestart} />}
      </div>
      <div
        ref={Rideupref}
        className="fixed bottom-0 left-0 w-full z-30 bg-white rounded-t-2xl translate-y-full transition-transform duration-500 shadow-xl"
      >
        {Rideup && <Captionridedown setnewride={setnewride} setRidestart={setRidestart} setRideup={setRideup} setotp={setOTP} setbasic={setbasic} ride={ridedata} />}
      </div>
            <div
        ref={logoutref}
        className="fixed w-full h-[8rem] z-40  bg-white rounded-br-3xl rounded-bl-3xl flex flex-col items-center justify-center translate-y-[-100%]"
      >
        <Logout />
        <i
        onClick={()=>{setlogout(false)}}
         className="ri-arrow-up-wide-line text-2xl"></i>
      </div>

    </div>
  )
}

export default CaptainHome
