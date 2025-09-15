import React from 'react'

const LocationSearchpannel = (props) => {

  const location=[
    '24b,Neat cafe ,shareins coding schoole',
    '24b,Neat cafe ,shareins coding schoole',
    '24b,Neat cafe ,shareins coding schoole',
    '24b,Neat cafe ,shareins coding schoole',
    '24b,Neat cafe ,shareins coding schoole',
    '24b,Neat cafe ,shareins coding schoole',
  ];

  return (
    <div >
      {
        location.map((e,idx)=>{
          return <div key={idx} onClick={()=>{
            props.setVehiclepannel(true);
            props.setisup(false);
          }}  className='px-9 mb-6  rounded-full flex justify-center gap-3 items-center'>
        <h4 className='px-2 py-1 bg-[#eeeeee] rounded-full flex justify-center items-center '>
          <i className="ri-map-pin-add-line"></i>
        </h4>
        <h4 className='text-xl '>
          {e}
        </h4>
      </div>
        })
      }

    </div>
  )
}

export default LocationSearchpannel
