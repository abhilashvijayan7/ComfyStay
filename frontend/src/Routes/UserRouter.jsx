/* eslint-disable no-unused-vars */
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserloginPage from '../Pages/User/UserloginPage'
import UserOtpPage from '../Pages/User/UserOtpPage'
import UserSignuppage from '../Pages/User/UserSignuppage'


function UserRouter() {
  return (
   <Routes>
<Route path='/signup' element={<UserSignuppage/>}/>
<Route path='/otp' element={<UserOtpPage/>}/>
<Route path='/login' element={<UserloginPage/>}/>


   </Routes>
  )
}

export default UserRouter
