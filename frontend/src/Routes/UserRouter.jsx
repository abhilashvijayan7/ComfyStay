import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserSignuppage from '../Pages/User/UserSignuppage'
function UserRouter() {
  return (
   <Routes>
<Route path='/signup' element={<UserSignuppage/>}/>
   </Routes>
  )
}

export default UserRouter
