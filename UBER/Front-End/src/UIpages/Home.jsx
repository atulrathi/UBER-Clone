import React, { useRef, useState, useContext } from "react";
import { useGSAP } from "@GSAP/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchpannel from "../Components/LocationSearchpannel";
import SelectVehicle from "../Components/selectVehicle";
import ConfermRide from "../Components/ConfermRide";
import WatingDriver from "../Components/WatingDriver";
import Sharetrip from '../Components/Sharetrip'
import PaymentPanel from "../Components/Payment";
import GeoMap from "../Components/MapComponent";
import axios from 'axios';
import Loader from "../Components/Lodercomponent";
import Lowinternet from '../Components/lowinternet'
import { UserDataContext } from '../context/userContext';
import { SocketContext } from '../context/SocketContext';
import { useEffect } from "react";

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

  const panelref = useRef(null);
  const downerrow = useRef(null);
  const vehiclepannelref = useRef(null);
  const confermref = useRef(null);
  const waitingref = useRef(null);
  const Paymentref = useRef(null);
  const driverref = useRef(null);

  const { user, setuser } = useContext(UserDataContext);
  let userid=user.id;
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
          setuser({...user, id: data._id});
        }
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    }

    if (token) fetchUser();

    socket.emit('join', { usertype: 'user', userID:userid })


  }, [userid]);

  const submithndler = async (e) => {
    e.preventDefault();
    setisup(false);
    setVehiclepannel(true);
    setLoading(true);

    try {
      const totaldis = await axios.post(
        "http://localhost:4000/distance/time-distance",
        { pickup, destination }
      );
      console.log(totaldis.data);
      setuser({
        ...user, duration: totaldis.data.
          duration_min
        , distance: totaldis.data.distance_km,
        fare:{
          car:totaldis.data.fare.car,
          bike:totaldis.data.fare.bike,
          auto:totaldis.data.fare.auto
        }
      })
      console.log(user)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Location Search Panel
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (isup) {
        gsap.to(panelref.current, {
          height: "70%",
          duration: 0.6,
          ease: "power2.out",
          overflow: 'scroll'
        });
        gsap.to(downerrow.current, { opacity: 1, duration: 0.3 });
        gsap.to(panelref.current.children, {
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
        });
      } else {
        gsap.to(panelref.current, {
          height: "0",
          duration: 0.5,
          ease: "power2.in",
        });
        gsap.to(downerrow.current, { opacity: 0, duration: 0.3 });
        gsap.to(panelref.current.children, { opacity: 0, duration: 0.2 });
      }
    });
    return () => ctx.revert();
  }, [isup]);

  // 📌 Vehicle Panel
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

  // 📌 Confirm Ride Panel
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

  // 📌 Waiting Driver Panel
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
    <div className="relative h-screen overflow-hidden">
      {loading && <Loader />}
      {/* Uber Logo */}

      <Lowinternet />

      <img
        className="z-20 fixed w-[5rem] h-6 ml-[2rem] mt-[3rem]"
        src="./public/uber-logo.png"
        alt=""
      />

      {/* Background Map/Gif */}
      <div className="absolute inset-0 z-10">
        <GeoMap pickup={pickup} destination={destination} />
      </div>



      {/* 🔥 Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 ${Vehiclepannel || confermride || Wating ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Main UI Panels */}
      <div className="absolute top-0 h-screen w-full flex flex-col justify-end z-20">
        {/* Search Form */}
        <div className="p-5 bg-white rounded-tr-2xl rounded-tl-2xl">
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
              placeholder="Add a pickup location "
            />
            <h1 className="text-lg mb-1">Where to go?</h1>
            <input
              required
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              onClick={() => setisup(true)}
              className="bg-[#eeeeee] outline-none px-8 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter your Destination "
            />
            <div className="flex w-full justify-end">
              <button
                disabled={!(pickup?.length >= 3 && destination?.length >= 3)}
                onClick={() => { submithndler }}
                className={`px-3 py-1 ml-[70%] mt-2 rounded-xl transition 
      ${(pickup?.length >= 3 && destination?.length >= 3)
                    ? "bg-green-400 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"}`}
              >
                Find Ride
              </button>
            </div>


          </form>
        </div>

        {/* Panels */}
        <div ref={panelref} className="h-0 bg-white mt-[-1px] overflow-hidden">
          <div className="opacity-0">
            <LocationSearchpannel destination={destination} setdestination={setdestination} setpickup={setpickup} pickup={pickup} setisup={setisup} setVehiclepannel={setVehiclepannel} />
          </div>
        </div>

        <div
          ref={vehiclepannelref}
          className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white px-3 py-6 translate-y-full"
        >
          <SelectVehicle setisup={setisup} setconfermride={setconfermride} setVehiclepannel={setVehiclepannel} />
        </div>

        <div
          ref={confermref}
          className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white translate-y-full"
        >
          <ConfermRide
            pickup={pickup}
            destination={destination}
            setWating={setWating}
            setconfermride={setconfermride}
            setisup={setisup}
            setVehiclepannel={setVehiclepannel}
          />
        </div>

        <div
          ref={waitingref}
          className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white translate-y-[200%]"
        >
          <WatingDriver destination={destination} pickup={pickup} setVehiclepannel={setVehiclepannel} setisup={setisup} setWating={setWating} />
        </div>
        <div ref={driverref} className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white translate-y-[200%]">
          <Sharetrip setVehiclepannel={setVehiclepannel} setisup={setisup} setWating={setWating} setPayment={setPayment} />
        </div>
        <div ref={Paymentref} className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white translate-y-[200%]">
          <PaymentPanel setDriver={setDriver} setPayment={setPayment} />
        </div>
      </div>
    </div>
  );
};

export default Home;
