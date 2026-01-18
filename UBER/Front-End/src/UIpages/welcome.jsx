import React from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

const Home = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      {/* Header Section */}
      <header className="absolute top-0 left-0 z-20 w-full px-6 pt-6 sm:px-12 sm:pt-10">
        <img 
          className="w-28 sm:w-36 md:w-40" 
          src="/uber-logo.png" 
          alt="Uber Logo" 
        />
      </header>

      {/* Video Section */}
      <div className="flex h-full w-full items-center justify-center px-4 pt-28 pb-64 sm:px-8 sm:pt-32 sm:pb-72 md:pb-64 lg:pb-56">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <video
            className="pointer-events-none h-auto max-h-64 w-full rounded-2xl object-cover shadow-2xl sm:max-h-72 md:max-h-80 lg:max-h-96"
            src="/car.mp4"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            aria-label="Uber promotional video"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="absolute bottom-0 left-0 z-10 w-full bg-white px-6 py-10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-10 sm:py-12">
        {/* Animated Heading */}
        <div className="mb-8 flex w-full justify-center">
          <h1 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            <ReactTyped
              strings={[
                'Get Started with Uber',
                'Ride Smart, Ride Fast',
                'Anywhere. Anytime.',
                'Your City, Your Ride',
                'Move Freely with Uber'
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </h1>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            to="/user-Login"
            className="flex h-14 w-full max-w-sm items-center justify-center rounded-xl bg-black px-8 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl active:scale-98 sm:h-16 sm:text-xl"
            aria-label="Login as a rider"
          >
            I'm a Rider
          </Link>
          
          <Link
            to="/caption-Login"
            className="flex h-14 w-full max-w-sm items-center justify-center rounded-xl border-2 border-black bg-white px-8 text-lg font-semibold text-black shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl active:scale-98 sm:h-16 sm:text-xl"
            aria-label="Login as a captain"
          >
            I'm a Captain
          </Link>
        </div>

        {/* Optional Tagline */}
        <p className="mt-6 text-center text-sm text-gray-600 sm:text-base">
          Choose your role to get started
        </p>
      </div>
    </div>
  );
};

export default Home;