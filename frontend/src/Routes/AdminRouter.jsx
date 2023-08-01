import { Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../Pages/Admin/AdminLoginPage'

import AdminHomePage from '../Pages/Admin/AdminHome'
import AdminProperty from '../Pages/Admin/AdminProperty'
import AdminBookingPage from '../Pages/Admin/AdminBookingPage'
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage'


function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLoginPage/>}/>
        <Route path='/' element={<AdminHomePage/>}/>
        <Route path='/propertylist' element={<AdminProperty/>}/>
        <Route path='/bookinglist' element={<AdminBookingPage/>}/>
        <Route path='/dashboard' element={<AdminDashboardPage/>}/>

      
        

      </Routes>
    </div>
  )
}

export default AdminRouter
