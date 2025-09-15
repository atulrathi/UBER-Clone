import React from 'react'
import { Link } from 'react-router-dom'
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <div className='h-screen  w-screen overflow-hidden '>
      <div className=' mt-0  flex flex-col w-full pt-8 flex justify-between flex-col '>
        <img className='z-9 w-[9rem] ml-[3rem] mt-[2rem]' src="./public/uber-logo.png" alt="" />
        <div  className="h-full flex items-center justify-center w-full mt-[5rem]">
 <video  className=' rounded-lg  ' loop autoPlay muted controlsList='nodownload noremoteplayback noplaybackrate' disablePictureInPicture>
      <source src='./public/car.mp4' className='' type='video/mp4' />
      you browser not support video
      </video>
        </div>
         
      <div className= 'py-5 px-10 bg-black h-[15rem]  absolute bottom-[-2rem] rounded-tl-4xl rounded-tr-4xl mb-[2rem] gap-4 flex  w-screen justify-center flex-col '>
        <div className='w-full flex justify-center'>
 <h2 className='text-2xl ml-6 mt-[-2rem] mb-4 font-sans font-bold text-white'> <ReactTyped
        strings={["Get Started with Uber", "Ride Smart, Ride Fast", "Anywhere. Anytime.","Your City, Your Ride","Move Freely with Uber"]}
        typeSpeed={50}
        backSpeed={30}
        loop
      /></h2>
        </div>
       <div className="w-full flex justify-center">
        <Link to='/user-Login' className='w-[13rem] h-11 flex justify-center  font-sans font-semibold items-center rounded-lg bg-white text-xl text-black '>I’m a Rider</Link>
      </div>
        <div className="w-full flex justify-center">
        <Link to='/caption-Login' className='w-[13rem] h-11 flex justify-center  font-sans font-semibold items-center rounded-lg bg-white text-xl text-black '>I’m a Caption</Link>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Home
