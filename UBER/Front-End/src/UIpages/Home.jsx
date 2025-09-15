import React, { useRef, useState } from "react";
import { useGSAP } from "@GSAP/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchpannel from "../Components/LocationSearchpannel";
import SelectVehicle from "../Components/selectVehicle";
import ConfermRide from "../Components/ConfermRide";
import WatingDriver from "../Components/WatingDriver";
import Sharetrip from '../Components/Sharetrip'
import PaymentPanel from "../Components/Payment";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [isup, setisup] = useState(false);
  const [Vehiclepannel, setVehiclepannel] = useState(false);
  const [confermride, setconfermride] = useState(false);
  const [Wating, setWating] = useState(false);
  const [Payment, setPayment] = useState(false);
  const [Driver, setDriver] = useState(false)

  const panelref = useRef(null);
  const downerrow = useRef(null);
  const vehiclepannelref = useRef(null);
  const confermref = useRef(null);
  const waitingref = useRef(null);
  const Paymentref = useRef(null);
  const driverref = useRef(null);

  const submithndler = (e) => {
    e.preventDefault();
  };

  // 📌 Location Search Panel
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (isup) {
        gsap.to(panelref.current, {
          height: "70%",
          duration: 0.6,
          ease: "power2.out",
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
  }, [Payment,Paymentref]);

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
  }, [Driver,driverref]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Uber Logo */}
      <img
        className="z-20 fixed w-[5rem] h-6 ml-[2rem] mt-[3rem]"
        src="./public/uber-logo.png"
        alt=""
      />

      {/* Background Map/Gif */}
      <div className="h-screen w-screen">
        <img
          onClick={() => {
            setisup(false);
            setVehiclepannel(false);
          }}
          className="h-full w-full z-10 object-cover"
          src="./public/uber.gif"
          alt=""
        />
      </div>

      {/* 🔥 Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 ${
          Vehiclepannel || confermride || Wating ? "opacity-100" : "opacity-0 pointer-events-none"
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
          </form>
        </div>

        {/* Panels */}
        <div ref={panelref} className="h-0 bg-white mt-[-1px] overflow-hidden">
          <div className="opacity-0">
            <LocationSearchpannel setisup={setisup} setVehiclepannel={setVehiclepannel} />
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
            setWating={setWating}
            setconfermride={setconfermride}
            setisup={setisup}
            setVehiclepannel={setVehiclepannel}
          />
        </div>

        <div
          ref={waitingref}
          className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white translate-y-full"
        >
          <WatingDriver setVehiclepannel={setVehiclepannel} setisup={setisup} setWating={setWating}/>
        </div>
        <div ref={driverref} className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white"> 
          <Sharetrip setVehiclepannel={setVehiclepannel} setisup={setisup} setWating={setWating} setPayment={setPayment}/>
        </div>
        <div ref={Paymentref} className="fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white translate-y-full">
          <PaymentPanel setDriver={setDriver} setPayment={setPayment}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
