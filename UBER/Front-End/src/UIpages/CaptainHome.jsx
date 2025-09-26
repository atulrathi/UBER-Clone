import React, { useContext, useRef, useState } from 'react'
import Newride from '../Components/Newride'
import OTPVerification from '../Components/Otpverification'
import { useGSAP } from "@GSAP/react";
import gsap from "gsap";
import Rideconfirm from '../Components/Rideconfirm'
import Captiondetails from '../Components/Captiondetails'
import { UserDataContext } from '../context/userContext';

const CaptainHome = () => {

  const {user} = useContext(UserDataContext);
  const vehicle = user.selectedVehicle || { image: "./public/ubercar.png", fare: 0, name: "Uber Go" };

  const [OTP, setOTP] = useState(false)
  const [newride, setnewride] = useState(true)
  const [Ridestart, setRidestart] = useState(false)
  const Ridestartref = useRef(null)
  const Otpref = useRef(null)
  const Newrideref = useRef(null)

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
  }, [Otpref,OTP]);

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
  }, [newride,Newrideref]);

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
  }, [Ridestart,Ridestartref]);

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <div className='h-full w-full'>
        <div  className="fixed h-9 w-10 flex justify-center items-center rounded-full bg-white top-9 right-7">
          <i className="ri-user-settings-fill"></i>
        </div>
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
          className="h-full w-full object-cover"
          src="./public/uber.gif"
          alt=""
        />
      </div>
      </div>
      <div className='fixed w-full h-[10rem] bottom-0 bg-white rounded-tl-xl rounded-tr-xl'>
                   <div className='h-screen w-screen'>
          <div className='w-full flex justify-center items-center gap-30 p-4'>
            <h1 className='text-2xl font-bold '>Harsh Patel</h1>
            <div>
              <h1 className='text-sm font-medium'>Earning</h1>
              <h1 className='font-bold text-xl'>₹123.99</h1>
            </div>
          </div>
          <div className='w-full flex justify-center items-center gap-15'>
           <div className='flex flex-col justify-center items-center'>
             <i className="ri-time-line text-3xl"></i>
             <h1>Time Spend</h1>
           </div>
            <div className='flex flex-col justify-center items-center'>
              <i className="ri-timer-2-line text-3xl"></i>
              <h1>total days</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <i className="ri-booklet-line text-3xl"></i>
              <h1>today</h1>
            </div>
          </div>
        </div>
      </div>
      <div ref={Newrideref} className='fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white rounded-tl-xl rounded-tr-xl translate-y-full'>
        <Newride setnewride={setnewride} setRidestart={setRidestart}/>
      </div>
      <div ref={Otpref} className='fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white rounded-tl-xl rounded-tr-xl translate-y-full'>
        <OTPVerification setOTP={setOTP}/>
      </div>
      <div ref={Ridestartref} className='fixed w-full flex flex-col gap-10 z-30 bottom-0 bg-white rounded-tl-xl rounded-tr-xl translate-y-full'>
        <Rideconfirm setOTP={setOTP} setRidestart={setRidestart}/>
      </div>
    </div>
  )
}

export default CaptainHome
