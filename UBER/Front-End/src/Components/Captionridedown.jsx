import React from 'react'

const Vehicledetail = (props) => {
  return (
    <div>
      <div className="h-full flex flex-col justify-center rounded-tr-3xl items-center p-6">
        
        {/* Close Button */}
        <h4
          className="w-full flex justify-center mt-[-1rem] text-2xl cursor-pointer"
        >
          <i onClick={()=>{props.setRideup(false)}} className="ri-arrow-down-wide-line text-gray-400"></i>
        </h4>

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-4">About Ride</h1>



        {/* Pickup */}
        <div className="flex w-full mb-3 gap-4 items-center p-3">
          <i className="ri-map-pin-3-fill text-xl text-green-500"></i>
          <div>
            <h1 className="font-semibold text-2xl">562/11</h1>
            <p className="text-gray-800 text-lg">kankarriya talab, Chatiya Aulia</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex w-full mb-3 gap-4 items-center p-3">
          <i className="ri-map-pin-line text-xl text-red-500"></i>
          <div>
            <h1 className="font-semibold text-2xl">Sonipat</h1>
            <p className="text-gray-800 text-lg">near indra</p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex w-full mb-6 gap-4 items-center p-3">
          <i className="ri-bank-card-line text-xl text-blue-600"></i>
          <div>
            <h1 className="font-semibold text-2xl">&#8377;193.20</h1>
            <p className="text-gray-800 text-lg">Cash</p>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="w-full flex justify-center items-center">
          <button
           onClick={()=>{props.setRideup(false)}}
            className="py-4 px-9 bg-green-500 rounded-xl"
          >
            <h1 className="text-white font-semibold text-2xl">
               Ride Complete
            </h1>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Vehicledetail
