import React, { useRef, useState, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchpannel from "../Components/LocationSearchpannel";
import SelectVehicle from "../Components/selectVehicle";
import ConfermRide from "../Components/ConfermRide";
import WatingDriver from "../Components/WatingDriver";
import Sharetrip from "../Components/Sharetrip";
import OtpScreen from "../Components/otpscreen";
import RideDetails from "../Components/ridedeatils";
import PaymentPanel from "../Components/Payment";
import GeoMap from "../Components/MapComponent";
import axios from "axios";
import Loader from "../Components/Lodercomponent";
import Lowinternet from "../Components/lowinternet";
import { UserDataContext } from "../context/userContext";
import { SocketContext } from "../context/SocketContext";
import Logout from '../Components/logout';

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [isup, setisup] = useState(false);
  const [Vehiclepannel, setVehiclepannel] = useState(false);
  const [confermride, setconfermride] = useState(false);
  const [Wating, setWating] = useState(false);
  const [Payment, setPayment] = useState(false);
  const [Driver, setDriver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captiondata, setcaptiondata] = useState({});
  const [otp, setotp] = useState("");
  const [Ridestart, setRidestart] = useState(false);
  const [logout, setlogout] = useState(false);

  const panelref = useRef(null);
  const downerrow = useRef(null);
  const vehiclepannelref = useRef(null);
  const confermref = useRef(null);
  const waitingref = useRef(null);
  const Paymentref = useRef(null);
  const driverref = useRef(null);
  const otpref = useRef(null);
  const RideStartref = useRef(null);
  const logoutref = useRef(null);
  const logiconref = useRef(null);
  const mapref = useRef(null);

  const { user, setuser } = useContext(UserDataContext);
  let userid = user.id;
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:4000/setuser/userdata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          let data = res.data;
          setuser({ ...user, id: data._id, fullname: data.fullname, who: 'user' });
        }
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    }
    if (token) fetchUser();
    socket.emit("join", { usertype: "user", userID: userid });
  }, [userid]);

  useEffect(() => {
    if (!socket) return;
    const handleRideAccepted = (data) => {
      setWating(false);
      setDriver(true);
      setcaptiondata(data);
    };
    socket.on("rideAccepted", handleRideAccepted);
    return () => {
      socket.off("rideAccepted", handleRideAccepted);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    const ridestarte = (data) => {
      setRidestart(true);
      setotp(false);
    };
    socket.on("RIDE_STARTED", ridestarte);
    return () => {
      socket.off("RIDE_STARTED", ridestarte);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    const ridecomplete = (data) => {
      setisup(false);
      setVehiclepannel(false);
      setconfermride(false);
      setWating(false);
      setDriver(false);
      setRidestart(false);
      alert("Ride Completed Successfully");
    };
    socket.on("rideCompleted", ridecomplete);
    return () => {
      socket.off("rideCompleted", ridecomplete);
    };
  }, [socket]);

  const submithndler = async (e) => {
    e.preventDefault();
    setisup(false);
    setLoading(true);
    try {
      const totaldis = await axios.post(
        "http://localhost:4000/distance/time-distance",
        { pickup, destination }
      );
      setuser({
        ...user,
        duration: totaldis.data.duration_min,
        distance: totaldis.data.distance_km,
        fare: {
          car: totaldis.data.fare.car,
          bike: totaldis.data.fare.bike,
          auto: totaldis.data.fare.auto,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setVehiclepannel(true);
    }
  };

  // GSAP animations (unchanged)
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (isup) {
        gsap.to(panelref.current, {
          height: "70%",
          duration: 0.6,
          ease: "power2.out",
          overflow: "scroll",
        });
        gsap.to(downerrow.current, { opacity: 1, duration: 0.3 });
        gsap.to(panelref.current.children, {
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
        });
        gsap.to(logiconref.current, {
          zIndex: 10,
        });
        gsap.to(mapref.current, {
          height: "100%",
        });
      } else {
        gsap.to(panelref.current, {
          height: "0",
          duration: 0.5,
          ease: "power2.in",
        });
        gsap.to(downerrow.current, { opacity: 0, duration: 0.3 });
        gsap.to(panelref.current.children, { opacity: 0, duration: 0.2 });
        gsap.to(logiconref.current, {
          zIndex: 21,
        });
        gsap.to(mapref.current, {
          height: "9rem",
        });
      }
    });
    return () => ctx.revert();
  }, [isup]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (Vehiclepannel) {
        gsap.to(vehiclepannelref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(vehiclepannelref.current, {
          y: "100%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [Vehiclepannel]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (confermride) {
        gsap.to(confermref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(confermref.current, {
          y: "100%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [confermride]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (Wating) {
        gsap.to(waitingref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(waitingref.current, {
          y: "100%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [Wating]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (otp) {
        gsap.to(otpref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(otpref.current, {
          y: "100%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [otp, otpref]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (Ridestart) {
        gsap.to(RideStartref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
         gsap.to(logiconref.current, {
          zIndex: 0,
        });
      } else {
        gsap.to(RideStartref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
         gsap.to(logiconref.current, {
          zIndex: 21,
        });
      }
    });
    return () => ctx.revert();
  }, [Ridestart, RideStartref]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (Payment) {
        gsap.to(Paymentref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(Paymentref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [Payment, Paymentref]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (logout) {
        gsap.to(logoutref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(logiconref.current, {
          zIndex: 10,
        });
      } else {
        gsap.to(logoutref.current, {
          y: "-200%",
          duration: 0.6,
          ease: "power3.in",
        });
        gsap.to(logiconref.current, {
          zIndex: 21,
        });
      }
    });
    return () => ctx.revert();
  }, [logout, logoutref, logiconref]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (Driver) {
        gsap.to(driverref.current, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(driverref.current, {
          y: "200%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    });
    return () => ctx.revert();
  }, [Driver, driverref]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      {loading && <Loader />}
      <Lowinternet />

      {/* Uber Logo */}
      <img
        className="fixed z-20 w-24 md:w-32 top-5 left-5"
        src="./public/uber-logo.png"
        alt="Uber Logo"
      />

      <div ref={logiconref} className="fixed top-5 right-5 z-21 h-10 w-10 flex justify-center items-center rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-300">
        <i
          onClick={() => setlogout(true)}
          className="ri-user-settings-fill text-xl text-gray-700"></i>
      </div>

      {/* ✅ Responsive Map Fix */}
      {/* Background Map/Gif */}
      <div className="absolute inset-0 z-19 w-screen h-screen min-h-screen">
        <GeoMap pickup={pickup} destination={destination} />
      </div>

      {/* Bottom Panels */}
      <div ref={mapref} className="fixed bottom-0 w-full h-[9rem] flex flex-col justify-end z-20">
        <div className="p-5 bg-white rounded-tr-2xl rounded-tl-2xl ">
          <h4
            ref={downerrow}
            onClick={() => setisup(false)}
            className="absolute right-6 opacity-0 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h4>
          <h4 className="text-3xl font-semibold mb-2">Find a trip?</h4>
          <form onSubmit={submithndler}>
            <h1 className="text-lg mb-1">Current Location</h1>
            <input
              required
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
              onClick={() => setisup(true)}
              className="bg-[#eeeeee] outline-none px-8 py-2 text-lg rounded-lg w-full mb-3"
              type="text"
              placeholder="Add a pickup location"
            />
            <h1 className="text-lg mb-1">Where to go?</h1>
            <input
              required
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              onClick={() => setisup(true)}
              className="bg-[#eeeeee] outline-none px-8 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter your Destination"
            />
            <div className="flex w-full justify-end">
              <button
                disabled={!(pickup?.length >= 3 && destination?.length >= 3)}
                className={`px-3 py-1 ml-auto mt-3 rounded-xl transition ${pickup?.length >= 3 && destination?.length >= 3
                  ? "bg-green-400 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Find Ride
              </button>
            </div>
          </form>
        </div>

        {/* Other Panels (unchanged) */}
        <div ref={panelref} className="h-0 bg-white mt-[-1px] overflow-hidden">
          <div className="opacity-0">
            <LocationSearchpannel
              destination={destination}
              setdestination={setdestination}
              setpickup={setpickup}
              pickup={pickup}
              setisup={setisup}
              setVehiclepannel={setVehiclepannel}
            />
          </div>
        </div>

        <div
          ref={vehiclepannelref}
          className="fixed bottom-0 left-0 w-full flex flex-col gap-10 z-30 bg-white px-3 py-6 translate-y-full rounded-t-2xl"
        >
          {Vehiclepannel && (
            <SelectVehicle
              setisup={setisup}
              setconfermride={setconfermride}
              setVehiclepannel={setVehiclepannel}
            />
          )}
        </div>

        <div
          ref={confermref}
          className="fixed bottom-0 left-0 w-full flex flex-col gap-10 z-30 bg-white translate-y-full rounded-t-2xl"
        >
          {confermride && (
            <ConfermRide
              pickup={pickup}
              destination={destination}
              setWating={setWating}
              setconfermride={setconfermride}
              setisup={setisup}
              setVehiclepannel={setVehiclepannel}
            />
          )}
        </div>

        <div
          ref={waitingref}
          className="fixed bottom-0 left-0 w-full flex flex-col gap-10 z-30 bg-white translate-y-[200%] rounded-t-2xl"
        >
          {Wating && (
            <WatingDriver
              destination={destination}
              pickup={pickup}
              setVehiclepannel={setVehiclepannel}
              setisup={setisup}
              setWating={setWating}
            />
          )}
        </div>

        <div
          ref={driverref}
          className="fixed bottom-0 left-0 w-full flex flex-col gap-10 z-30 bg-white translate-y-[200%] rounded-t-2xl"
        >
          {Driver && captiondata && (
            <Sharetrip
              captiondata={captiondata}
              destination={destination}
              pickup={pickup}
              setVehiclepannel={setVehiclepannel}
              setisup={setisup}
              setWating={setWating}
              setPayment={setPayment}
              setDriver={setDriver}
              setotp={setotp}
            />
          )}
        </div>

        <div
          ref={Paymentref}
          className="fixed bottom-0 left-0 w-full flex flex-col gap-10 z-30 bg-white translate-y-[200%] rounded-t-2xl"
        >
          <PaymentPanel setDriver={setDriver} setPayment={setPayment} />
        </div>

        <div
          ref={otpref}
          className="fixed bottom-0 left-0 flex flex-col gap-10 z-30 w-full bg-transparent"
        >
          {otp && <OtpScreen captiondata={captiondata} />}
        </div>

        <div
          ref={RideStartref}
          className="fixed top-0 h-screen left-0 w-full flex flex-col  translate-y-[200%] gap-10 z-30 bg-white rounded-t-2xl"
        >
          <RideDetails captiondata={captiondata} pickup={pickup} destination={destination} />
        </div>

        <div
          ref={logoutref}
          className="fixed w-full h-[8rem] z-22 top-0  bg-white rounded-br-3xl rounded-bl-3xl flex flex-col items-center justify-center translate-y-[-100%] "
        >
          {logout && <Logout />}
          <i
            onClick={() => { setlogout(false) }}
            className="ri-arrow-up-wide-line text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Home;
