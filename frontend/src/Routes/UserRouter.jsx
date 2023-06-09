/* eslint-disable no-unused-vars */
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserloginPage from '../Pages/User/UserloginPage'
import UserOtpPage from '../Pages/User/UserOtpPage'
import UserSignuppage from '../Pages/User/UserSignuppage'
import UserHomePage from '../Pages/User/UserHomePage'
import UserForgotPasswordPage from '../Pages/User/UserForgotPasswordPage'
import UserOtpForgotPage from '../Pages/User/UserOtpForgotPage'
import UserNewPasswordPage from '../Pages/User/UserNewPasswordPage'
import PropertyDescribePage from '../Pages/User/PropertyDescribePage'
import PropertyListPage from '../Pages/User/PropertyListPage'
function UserRouter() {
  return (
   <Routes>
<Route path='/signup' element={<UserSignuppage/>}/>
<Route path='/otp' element={<UserOtpPage/>}/>
<Route path='/login' element={<UserloginPage/>}/>
<Route path='/' element={<UserHomePage/>}/>
<Route path='/forgotpassword' element={<UserForgotPasswordPage/>}/>
<Route path='/otpforgot' element={<UserOtpForgotPage/>}/>
<Route path='/newpassword' element={<UserNewPasswordPage/>}/>
<Route path='/addyourhome' element={<PropertyDescribePage/>}/>
<Route path='/propertylist' element={<PropertyListPage/>}/>

 
   </Routes>
  )
}

export default UserRouter
