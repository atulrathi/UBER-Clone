import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptionLogin from './pages/Captionlogin'
import Captionsignup from './pages/CaptionsignUP'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/usersignup'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/caption-Signup' element={<Captionsignup />} />
        <Route path='/caption-Login' element={<CaptionLogin />} />
        <Route path='/user-Login' element={<Userlogin />} />
        <Route path='/user-Signup' element={<Usersignup />} />
      </Routes>
    </div>
  )
}

export default App
