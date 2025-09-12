import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Welcome from './pages/welcome'
import CaptionLogin from './pages/Captionlogin'
import Captionsignup from './pages/CaptionsignUP'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/UserSignup'
import Home from './pages/Home'
import Proctedwraper from './pages/Proctedwraper'
import Logout from './pages/userLogout'
import Vehicleinfo from './pages/vehicledetail'
import CaptainHome from './pages/CaptainHome'
import Captainproctedwraper from './pages/Captainproctedwraper'
import CaptanLogout from './pages/CaptainLogout'


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
        <Route path='/captaion-home' element={
          <Captainproctedwraper>
            <CaptainHome />
          </Captainproctedwraper>
        }/>
        <Route path='/captaion-home/logout' element={<CaptanLogout />} />
      </Routes>
    </div>
  )
}

export default App
