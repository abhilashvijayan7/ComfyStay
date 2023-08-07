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
import PropertyDetailPage from '../Pages/User/PropertyDetailPage'
import PaymentConfirmPage from '../Pages/User/PaymentConfirmPage'
import OrderSuccessPage from '../Pages/User/OrderSuccessPage'
import BookingListPage from '../Pages/User/BookingListPage'
import UserProfilePage from '../Pages/User/UserProfilePage'
import Error from '../Components/Shared/Error'

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
<Route path='/propertydetail/:id' element={<PropertyDetailPage/>}/>
<Route path='/paymentconfirm' element={<PaymentConfirmPage/>}/>
<Route path='/ordersuccess/:id' element={<OrderSuccessPage/>}/>
<Route path='/bookinglist' element={<BookingListPage/>}/>
<Route path ="/profile" element={<UserProfilePage/>}/>
<Route path ="*" element={<Error/>}/>



 
   </Routes>
  )
}

export default UserRouter
