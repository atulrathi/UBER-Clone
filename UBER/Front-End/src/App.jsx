import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Welcome from './UIpages/welcome'
import CaptionLogin from './UIpages/Captionlogin'
import Captionsignup from './UIpages/CaptionsignUP'
import Userlogin from './UIpages/Userlogin'
import Usersignup from './UIpages/UserSignup'
import Home from './UIpages/Home'
import Proctedwraper from './UIpages/Proctedwraper'
import Logout from './UIpages/userLogout'
import Vehicleinfo from './UIpages/vehicledetail'
import CaptainHome from './UIpages/CaptainHome'
import Captainproctedwraper from './UIpages/Captainproctedwraper'
import CaptanLogout from './UIpages/CaptainLogout'


const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path='/caption-Signup' element={<Captionsignup />} />
        <Route path='/vehicle-info' element={<Vehicleinfo />} />
        <Route path='/caption-Login' element={<CaptionLogin />} />
        <Route path='/user-Login' element={<Userlogin />} />
        <Route path='/user-Signup' element={<Usersignup />} />
        <Route path='/Home' element={<Proctedwraper>
          <Home />
        </Proctedwraper>} />
        <Route path='/Home/logout' element={
         <Logout />
        }/>
        <Route path='/caption-home' element={
          <Captainproctedwraper>
            <CaptainHome />
          </Captainproctedwraper>
        }/>
        <Route path='/caption-home/logout' element={<CaptanLogout />} />
      </Routes>
    </div>
  )
}

export default App
